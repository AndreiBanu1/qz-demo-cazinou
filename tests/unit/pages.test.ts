import { describe, expect, it } from "vitest";
import { canonicalUrl, notFoundPage, pageFor, pages, pathFor, twinOf, PAGE_KEYS } from "@/config/pages";
// @ts-expect-error plain JS module without types
import { ROUTES } from "../../scripts/lib/routes.mjs";

describe("the bilingual route table", () => {
  it("every key has a ro and an en page", () => {
    expect(pages).toHaveLength(22);
    for (const key of PAGE_KEYS) {
      expect(pages.filter((p) => p.key === key).map((p) => p.lang).sort()).toEqual(["en", "ro"]);
    }
  });

  it("paths are unique", () => {
    expect(new Set(pages.map((p) => p.path)).size).toBe(pages.length);
  });

  it("twinOf is symmetric and switches language", () => {
    for (const p of pages) {
      const twin = twinOf(p);
      expect(twin.key).toBe(p.key);
      expect(twin.lang).not.toBe(p.lang);
      expect(twinOf(twin)).toBe(p);
    }
  });

  it("ungated pages are exactly acces, joc-responsabil, despre-demo, confidentialitate", () => {
    const ungated = [...new Set(pages.filter((p) => !p.gated).map((p) => p.key))].sort();
    expect(ungated).toEqual(["acces", "confidentialitate", "despre-demo", "joc-responsabil"]);
    expect(notFoundPage.gated).toBe(true);
  });

  it("uses the spec's paths", () => {
    expect(pathFor("home", "ro")).toBe("/");
    expect(pathFor("home", "en")).toBe("/en");
    expect(pathFor("mese", "ro")).toBe("/jocuri-la-masa");
    expect(pathFor("mese", "en")).toBe("/en/table-games");
    expect(pathFor("acces", "en")).toBe("/en/restricted");
    expect(pathFor("joc-responsabil", "en")).toBe("/en/responsible-gaming");
  });

  it("pageFor finds pages and falls back to the 404 page", () => {
    expect(pageFor("/en/venue").key).toBe("locatia");
    expect(pageFor("/en/venue/").key).toBe("locatia");
    expect(pageFor("/nope")).toBe(notFoundPage);
  });

  it("titles and descriptions are unique and descriptions are 70 to 160 characters", () => {
    expect(new Set(pages.map((p) => p.title)).size).toBe(pages.length);
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length);
    for (const p of pages) {
      expect(p.description.length, p.path).toBeGreaterThanOrEqual(70);
      expect(p.description.length, p.path).toBeLessThanOrEqual(160);
    }
  });

  it("canonicalUrl uses the demo origin", () => {
    expect(canonicalUrl("/en")).toBe("https://ametist-demo.pages.dev/en");
  });

  it("routes.mjs lists the same pages as pages.ts", () => {
    const fromScript = (ROUTES as { path: string; lang: string; twin: string; gated: boolean }[])
      .map((r) => `${r.path}|${r.lang}|${r.twin}|${r.gated}`)
      .sort();
    const fromConfig = pages.map((p) => `${p.path}|${p.lang}|${twinOf(p).path}|${p.gated}`).sort();
    expect(fromScript).toEqual(fromConfig);
  });
});
