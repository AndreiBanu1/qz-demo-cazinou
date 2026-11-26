// The age gate, the two languages, the compliance chrome and accessibility, on every route (spec §12).
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { pages, twinOf } from "../../src/config/pages";
import { site } from "../../src/config/site";
import { ui } from "../../src/content/ui";
import { AGE_KEY, answeredYes, gate, open } from "./helpers";

const gated = pages.filter((p) => p.gated);
const ungated = pages.filter((p) => !p.gated);

async function axe(page: Page) {
  const results = await new AxeBuilder({ page }).exclude('iframe[src*="challenges.cloudflare.com"]').analyze();
  return results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
}

test.describe("age gate", () => {
  test("gate on first visit to every gated page, focus trapped between the two buttons, Escape ignored", async ({ page }) => {
    for (const p of gated) {
      await open(page, p.path);
      await expect(gate(page), p.path).toBeVisible();
      await expect(page.getByRole("dialog")).toHaveAccessibleName(ui[p.lang].gate.question);
    }
    await open(page, "/");
    const yes = page.getByRole("button", { name: ui.ro.gate.yes });
    const no = page.getByRole("link", { name: ui.ro.gate.no, exact: true });
    await expect(yes).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(no).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(yes).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(no).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(gate(page)).toBeVisible();
    // The page behind is inert: the banner and everything else outside the dialog.
    expect(await page.locator("#root > aside").evaluate((el) => (el as HTMLElement).inert)).toBe(true);
  });

  test("Yes is remembered across pages in the tab; a new context shows the gate again", async ({ page, browser }) => {
    await open(page, "/poker");
    await page.getByRole("button", { name: ui.ro.gate.yes }).click();
    await expect(gate(page)).toBeHidden();
    await expect(page.locator("main h1")).toBeFocused();
    expect(await page.evaluate((k) => sessionStorage.getItem(k), AGE_KEY)).toBe("1");
    // On a phone the links sit behind the menu button.
    if ((page.viewportSize()?.width ?? 0) < 768) await page.getByRole("button", { name: ui.ro.nav.menu }).click();
    await page.getByRole("navigation", { name: ui.ro.nav.label }).getByRole("link", { name: ui.ro.nav.locatia }).click();
    await expect(page).toHaveURL(/\/locatia$/);
    await expect(gate(page)).toBeHidden();
    await page.goto("/sloturi");
    await expect(gate(page)).toBeHidden();

    const fresh = await browser.newContext();
    const other = await fresh.newPage();
    await open(other, "/sloturi");
    await expect(gate(other)).toBeVisible();
    await fresh.close();
  });

  test("No leads to the restricted page, whose Joc responsabil link opens without a gate", async ({ page }) => {
    await open(page, "/en/table-games");
    await page.getByRole("link", { name: ui.en.gate.no, exact: true }).click();
    await expect(page).toHaveURL(/\/en\/restricted$/);
    await expect(gate(page)).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("adults only");
    await page.getByRole("main").getByRole("link", { name: "Read about responsible gaming" }).click();
    await expect(page).toHaveURL(/\/en\/responsible-gaming$/);
    await expect(gate(page)).toHaveCount(0);
  });

  test("ungated pages never show the gate", async ({ page }) => {
    for (const p of ungated) {
      await open(page, p.path);
      await expect(gate(page), p.path).toHaveCount(0);
    }
  });

  test("no gate with JavaScript off", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/poker");
    await expect(gate(page)).toBeHidden();
    await expect(page.locator("h1")).toBeVisible();
    await ctx.close();
  });

  test("the question uses site.minAge", async ({ page }) => {
    await open(page, "/");
    await expect(page.getByRole("dialog")).toContainText(`Ai cel puțin ${site.minAge} ani?`);
  });
});

test.describe("languages", () => {
  test("language switch leads to the twin on every route", async ({ page }) => {
    await answeredYes(page);
    for (const p of pages) {
      await open(page, p.path);
      const twin = twinOf(p);
      await page.locator("[data-lang-switch]").click();
      await expect(page, p.path).toHaveURL(new RegExp(`${twin.path === "/" ? "/$" : twin.path.replace(/\//g, "\\/") + "$"}`));
      await expect(page.locator("html")).toHaveAttribute("lang", twin.lang);
      await expect(page).toHaveTitle(twin.title);
    }
  });

  test("language switch keeps the age answer", async ({ page }) => {
    await open(page, "/contact");
    await page.getByRole("button", { name: ui.ro.gate.yes }).click();
    await page.locator("[data-lang-switch]").click();
    await expect(page).toHaveURL(/\/en\/contact$/);
    await expect(gate(page)).toBeHidden();
    await page.reload();
    await expect(gate(page)).toBeHidden();
    await page.locator("[data-lang-switch]").click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(gate(page)).toBeHidden();
  });
});

test.describe("every route", () => {
  test("every route has banner, badge, minors line, placeholder, ONJN link", async ({ page }) => {
    await answeredYes(page);
    for (const p of pages) {
      await open(page, p.path);
      const s = ui[p.lang];
      await expect(page.getByRole("complementary", { name: s.bannerLabel }), p.path).toContainText(site.bannerText[p.lang]);
      await expect(page.locator('[data-badge="18plus"]')).toBeVisible();
      await expect(page.getByText(s.footer.minors)).toBeVisible();
      await expect(page.locator("[data-licence-placeholder]")).toHaveText(s.footer.licence);
      await expect(page.locator(`a[href="${site.onjnUrl}"]`).first()).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
    }
  });

  test("axe: no violations on every route with the gate open, and with it closed", async ({ page, browser }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    for (const p of gated) {
      await open(page, p.path);
      await expect(gate(page)).toBeVisible();
      expect(await axe(page), `${p.path} (gate open)`).toEqual([]);
    }
    const ctx = await browser.newContext({ viewport: page.viewportSize() ?? undefined });
    const closed = await ctx.newPage();
    await answeredYes(closed);
    for (const p of pages) {
      await open(closed, p.path);
      expect(await axe(closed), `${p.path} (gate closed)`).toEqual([]);
    }
    await ctx.close();
    expect(errors.filter((e) => /hydrat/i.test(e)), "hydration errors").toEqual([]);
  });

  test("mobile menu opens and closes with the keyboard", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) >= 768, "the menu button exists only below md");
    await answeredYes(page);
    await open(page, "/en");
    const button = page.getByRole("button", { name: ui.en.nav.menu });
    const nav = page.getByRole("navigation", { name: ui.en.nav.label });
    await expect(nav).toBeHidden();
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(nav).toBeVisible();
    await expect(page.getByRole("button", { name: ui.en.nav.close })).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Enter");
    await expect(nav).toBeHidden();
  });

  test("404 is served with status 404 and both languages", async ({ page }) => {
    const res = await page.goto("/nu-exista");
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("Pagina nu există");
    await expect(page.locator("h1")).toContainText("Page not found");
  });
});
