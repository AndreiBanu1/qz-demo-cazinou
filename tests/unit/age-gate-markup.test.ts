import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it } from "vitest";
import AppRoutes from "@/AppRoutes";
import { pages } from "@/config/pages";
import { site } from "@/config/site";

const render = (url: string) => renderToString(createElement(StaticRouter, { location: url }, createElement(AppRoutes)));
const gateOf = (html: string) => html.match(/<div[^>]*data-age-gate[^>]*>[\s\S]*?<\/div>\s*<\/div>/)?.[0];

describe("the age gate markup", () => {
  it("has role=dialog, aria-modal, aria-labelledby, and the minAge in its question", () => {
    const html = render("/poker");
    const open = html.match(/<div[^>]*data-age-gate[^>]*>/)?.[0] ?? "";
    expect(open).toContain('role="dialog"');
    expect(open).toContain('aria-modal="true"');
    const labelId = open.match(/aria-labelledby="([^"]+)"/)?.[1];
    expect(labelId).toBeTruthy();
    expect(html).toContain(`id="${labelId}"`);
    expect(gateOf(html) ?? html).toContain(`Ai cel puțin ${site.minAge} ani?`);
    expect(render("/en/poker")).toContain(`Are you ${site.minAge} or over?`);
  });

  it("ungated pages render no data-age-gate", () => {
    for (const p of pages.filter((p) => !p.gated)) expect(render(p.path), p.path).not.toContain("data-age-gate");
  });

  it("gated pages and the 404 page render it", () => {
    for (const p of pages.filter((p) => p.gated)) expect(render(p.path), p.path).toContain("data-age-gate");
    expect(render("/does-not-exist")).toContain("data-age-gate");
  });

  it("the gate's No goes to the restricted page in the page's language", () => {
    expect(render("/poker")).toContain('href="/acces-restrictionat"');
    expect(render("/en/poker")).toContain('href="/en/restricted"');
  });
});

describe("the language switch", () => {
  it("is not shown on the bilingual 404 page, which has no twin", () => {
    expect(render("/does-not-exist")).not.toContain("data-lang-switch");
  });

  it("links every page to its twin", () => {
    expect(render("/poker")).toMatch(/<a[^>]*href="\/en\/poker"[^>]*data-lang-switch|<a[^>]*data-lang-switch[^>]*href="\/en\/poker"/);
  });
});
