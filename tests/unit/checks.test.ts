import { describe, expect, it } from "vitest";
// @ts-expect-error plain JS module without types
import { BANNER, FOOTER_LINE, PLACEHOLDER, checkPage, checkSite } from "../../scripts/lib/checks.mjs";

const ORIGIN = "https://ametist-demo.pages.dev";

type Opts = { lang?: "ro" | "en"; gate?: boolean; body?: string; head?: string; drop?: string[] };

/** A minimal page that passes every check for /poker (ro), so each test changes one thing. */
function page({ lang = "ro", gate = true, body = "", head = "", drop = [] }: Opts = {}) {
  const parts: Record<string, string> = {
    banner: `<aside><a href="${lang === "ro" ? "/despre-demo" : "/en/about-demo"}">${BANNER[lang]}</a></aside>`,
    badge: `<span data-badge="18plus" aria-label="18+">18+</span>`,
    footer: `<p>${FOOTER_LINE[lang]}</p>`,
    placeholder: `<div data-licence-placeholder>${PLACEHOLDER[lang]}</div>`,
    onjn: `<a href="https://onjn.gov.ro/">ONJN</a>`,
    gate: gate ? `<div data-age-gate role="dialog" aria-modal="true"></div>` : "",
    h1: `<main><h1>Poker</h1></main>`,
  };
  for (const d of drop) delete parts[d];
  return `<!DOCTYPE html><html lang="${lang}"><head>
<title>Poker | Salon Ametist</title>
<meta name="description" content="${"Camera de poker de la Salon Ametist, un local inventat, pe un site demonstrativ Quality Zone."}" />
<meta name="robots" content="noindex" />
<link rel="canonical" href="${ORIGIN}/poker" />
<link rel="alternate" hreflang="ro" href="${ORIGIN}/poker" />
<link rel="alternate" hreflang="en" href="${ORIGIN}/en/poker" />
<link rel="alternate" hreflang="x-default" href="${ORIGIN}/poker" />
${head}</head><body>${Object.values(parts).join("")}${body}</body></html>`;
}

const expected = { path: "/poker", lang: "ro", twin: "/en/poker", gated: true };
const check = (html: string, exp: object = expected) => checkPage(html, { ...expected, ...exp }) as string[];

describe("checkPage", () => {
  it("passes a complete page", () => {
    expect(check(page())).toEqual([]);
  });

  it("missing banner fails", () => {
    expect(check(page({ drop: ["banner"] })).join()).toMatch(/banner/);
  });

  it("banner in the wrong language fails", () => {
    expect(check(page().replace(BANNER.ro, BANNER.en)).join()).toMatch(/banner/);
  });

  it("missing 18+ badge fails", () => {
    expect(check(page({ drop: ["badge"] })).join()).toMatch(/18\+ badge/);
  });

  it("missing minors line fails", () => {
    expect(check(page({ drop: ["footer"] })).join()).toMatch(/minors/);
  });

  it("missing licence placeholder fails", () => {
    expect(check(page({ drop: ["placeholder"] })).join()).toMatch(/licence placeholder/);
  });

  it("missing ONJN link fails", () => {
    expect(check(page({ drop: ["onjn"] })).join()).toMatch(/ONJN link/);
  });

  it("lang mismatch fails", () => {
    expect(check(page(), { lang: "en" }).join()).toMatch(/lang/);
  });

  it("hreflang to a wrong twin fails", () => {
    expect(check(page(), { twin: "/en/slots" }).join()).toMatch(/hreflang/);
  });

  it("gate markup on an ungated page fails, and missing on a gated page fails", () => {
    expect(check(page({ gate: true }), { gated: false }).join()).toMatch(/age gate/);
    expect(check(page({ gate: false }), { gated: true }).join()).toMatch(/age gate/);
  });

  it("JSON-LD with telephone, streetAddress, geo or priceRange fails", () => {
    for (const key of ["telephone", "streetAddress", "geo", "priceRange"]) {
      const head = `<script type="application/ld+json">{"@type":"Casino","x":{"${key}":"1"}}</script>`;
      expect(check(page({ head })).join()).toContain(`"${key}"`);
    }
  });

  it("JSON-LD that does not parse fails", () => {
    expect(check(page({ head: `<script type="application/ld+json">{nope</script>` })).join()).toMatch(/JSON-LD/);
  });

  it("tel: link and phone pattern fail", () => {
    expect(check(page({ body: `<a href="tel:0712345678">x</a>` })).join()).toMatch(/tel:/);
    expect(check(page({ body: `<p>Sună la 0712 345 678</p>` })).join()).toMatch(/phone/);
    expect(check(page({ body: `<p>Data 2026-11-25</p>` }))).toEqual([]);
  });

  it("a street address fails", () => {
    expect(check(page({ body: `<p>Strada Lalelelor 12</p>` })).join()).toMatch(/street/);
  });

  it("an img whose src mentions onjn fails", () => {
    expect(check(page({ body: `<img src="/img/onjn-logo.png" alt="x" width="1" height="1">` })).join()).toMatch(/ONJN logo/);
  });

  it("cedilla ş fails", () => {
    expect(check(page({ body: `<p>şi</p>` })).join()).toMatch(/cedilla/);
  });

  it("noindex, one h1, canonical and description are required", () => {
    expect(check(page().replace('content="noindex"', 'content="index"')).join()).toMatch(/noindex/);
    expect(check(page({ body: "<h1>Two</h1>" })).join()).toMatch(/h1/);
    expect(check(page(), { path: "/sloturi" }).join()).toMatch(/canonical/);
  });
});

describe("checkSite", () => {
  it("duplicate titles fail", () => {
    const html = page();
    expect((checkSite([{ path: "/a", html }, { path: "/b", html }]) as string[]).join()).toMatch(/same title/);
  });
});
