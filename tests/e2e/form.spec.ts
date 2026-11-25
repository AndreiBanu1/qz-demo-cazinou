// The request form on the contact pages (spec §7, §12; Review Focus 5), on the built site served by `npm run dev:full`.
// Through the real function: the real Turnstile widget with the always-pass test site key, the always-pass test secret,
// and MAIL_MODE=outbox, which writes each email into the local OUTBOX KV that GET /api/outbox lists.
// Intercepted: page.route("**/api/cerere") answers instead of the function, for the error codes.
import { expect, test, type Page } from "@playwright/test";
import { formular } from "../../src/content/formular";
import type { MailMessage } from "../../src/lib/mail";
import { answeredYes, open } from "./helpers";

const NETWORK_HINT = "These tests need network access to challenges.cloudflare.com (Turnstile, used even with the test keys).";

const field = (page: Page, name: string) => page.locator(`form [name="${name}"]`);
const submit = (page: Page) => page.locator('form button[type="submit"]');

async function outbox(page: Page): Promise<MailMessage[]> {
  const res = await page.request.get("/api/outbox");
  expect(res.ok(), "GET /api/outbox (needs MAIL_MODE=outbox in .dev.vars)").toBe(true);
  return res.json();
}

async function waitForToken(page: Page) {
  const ok = await page
    .waitForFunction(() => !!document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value, null, { timeout: 30_000 })
    .then(() => true)
    .catch(() => false);
  if (!ok) throw new Error(`No Turnstile token after 30 s. ${NETWORK_HINT}`);
}

/** A date three days from now: always inside the bookable range (tomorrow to 90 days ahead, Bucharest days). */
const soon = () => new Date(Date.now() + 3 * 86_400_000).toISOString().slice(0, 10);

async function fillMasa(page: Page, contact: string) {
  await page.locator('input[name="tip"][value="masa"]').check();
  await field(page, "data").fill(soon());
  await field(page, "ora").selectOption("19:30");
  await field(page, "persoane").fill("4");
  await field(page, "mesaj").fill("Test automat: o masă lângă scenă.");
  await field(page, "nume").fill("Test E2E");
  await field(page, "contact").fill(contact);
  await field(page, "varsta").check();
  await field(page, "acord").check();
}

test.beforeEach(async ({ page }) => {
  await answeredYes(page);
  await page.request.delete("/api/outbox");
});

test("masa from RO puts one email in the outbox with every field, limba ro, and Reply-To for an email contact", async ({ page }) => {
  await open(page, "/contact");
  await fillMasa(page, "test@example.com");
  await waitForToken(page);
  await submit(page).click();
  await expect(page.getByRole("status")).toContainText(formular.ro.success);
  const mail = await outbox(page);
  expect(mail).toHaveLength(1);
  const [m] = mail;
  expect(m.to).toEqual([{ email: "rezervari@ametist.invalid", name: "Salon Ametist (demo)" }]);
  expect(m.reply_to).toEqual({ email: "test@example.com", name: "Test E2E" });
  expect(m.subject).toBe("[Demo] Cerere nouă: Masă la restaurant sau bar, Test E2E");
  for (const line of [`Data: ${soon()}`, "Ora: 19:30", "Persoane: 4", "Mesaj: Test automat", "Contact: test@example.com", "Limba paginii: română"])
    expect(m.text).toContain(line);
});

test("intrebare from EN with a phone contact: one email, no Reply-To, limba en", async ({ page }) => {
  await open(page, "/en/contact");
  await page.locator('input[name="tip"][value="intrebare"]').check();
  await expect(field(page, "data")).toHaveCount(0);
  await field(page, "mesaj").fill("Is there a dress code?");
  await field(page, "nume").fill("Sam Test");
  await field(page, "contact").fill("+40 712 345 678");
  await field(page, "varsta").check();
  await field(page, "acord").check();
  await waitForToken(page);
  await submit(page).click();
  await expect(page.getByRole("status")).toContainText(formular.en.success);
  const [m, ...rest] = await outbox(page);
  expect(rest).toHaveLength(0);
  expect(m.reply_to).toBeUndefined();
  expect(m.text).toContain("Tip: Întrebare");
  expect(m.text).toContain("Limba paginii: engleză");
  expect(m.text).not.toContain("Data:");
});

test("eveniment link from /evenimente pre-selects eveniment", async ({ page }) => {
  await open(page, "/evenimente");
  await page.locator("[data-private-event-link]").click();
  await expect(page).toHaveURL(/\/contact\?tip=eveniment$/);
  await expect(page.locator('input[name="tip"][value="eveniment"]')).toBeChecked();
  await expect(field(page, "marime")).toBeVisible();
  await expect(field(page, "ora")).toHaveCount(0);
});

test("empty submit shows errors in the page language and focuses the first", async ({ page }) => {
  await open(page, "/en/contact");
  await submit(page).click();
  await expect(field(page, "data")).toBeFocused();
  await expect(page.getByText(formular.en.errors.required).first()).toBeVisible();
  await expect(page.getByText(formular.en.errors.mustAccept).first()).toBeVisible();
  await expect(field(page, "data")).toHaveAttribute("aria-invalid", "true");
  const describedBy = await field(page, "nume").getAttribute("aria-describedby");
  expect(await page.locator(`[id="${describedBy}"]`).textContent()).toBe(formular.en.errors.required);
});

test("intercepted turnstile, limit, send and 500 responses show their messages and keep the values", async ({ page }) => {
  await open(page, "/contact");
  for (const [status, code, message] of [
    [403, "turnstile", formular.ro.sendErrors.turnstile],
    [503, "limit", formular.ro.sendErrors.limit],
    [502, "send", formular.ro.sendErrors.send],
    [500, "server", formular.ro.sendErrors.send],
    [503, "config", formular.ro.sendErrors.config],
  ] as const) {
    await page.unroute("**/api/cerere");
    await page.route("**/api/cerere", (r) => r.fulfill({ status, contentType: "application/json", body: JSON.stringify({ error: code }) }));
    await fillMasa(page, "test@example.com");
    await waitForToken(page);
    await submit(page).click();
    await expect(page.getByRole("alert")).toHaveText(message);
    await expect(field(page, "nume")).toHaveValue("Test E2E");
    await expect(field(page, "persoane")).toHaveValue("4");
  }
  expect(await outbox(page)).toHaveLength(0);
});

test("submit disabled before hydration; noscript shown with JavaScript off", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto("/contact");
  await expect(submit(page)).toBeDisabled();
  // getByText skips <noscript> subtrees, so the notice is found by its element.
  const notice = page.locator("noscript p");
  await expect(notice).toBeVisible();
  await expect(notice).toHaveText(formular.ro.noscript);
  expect(await page.locator("form").getAttribute("action"), "the form has no action").toBeNull();
  await ctx.close();
});

test("double submit sends one email", async ({ page }) => {
  await open(page, "/contact");
  await fillMasa(page, "test@example.com");
  await waitForToken(page);
  // Hold the request so the second click lands while the first is in flight.
  let release!: () => void;
  const held = new Promise<void>((r) => (release = r));
  await page.route("**/api/cerere", async (route) => {
    await held;
    await route.continue();
  });
  await submit(page).click();
  await submit(page).click({ force: true });
  release();
  await expect(page.getByRole("status")).toContainText(formular.ro.success);
  expect(await outbox(page)).toHaveLength(1);
});
