// The latest real test runs (spec §11), copied from docs/rezultate/<date>/rezumat.md.
export interface ResultRow {
  tool: string;
  what: string;
  result: string;
}

export interface Results {
  date: string;
  where: { ro: string; en: string };
  rows: ResultRow[];
}

export const latestResults: Results | null = {
  date: "2026-11-25",
  where: {
    ro: "rulare locală, înainte de publicare (wrangler pages dev); rezultatele de pe site-ul live le vor înlocui",
    en: "local run, before deploy (wrangler pages dev); the live-site results will replace them",
  },
  rows: [
    { tool: "Lighthouse 13.6", what: "Performance, Accessibility, Best practices (4 pages × mobile, desktop)", result: "100 / 100 / 100 on all 8 runs" },
    { tool: "Lighthouse 13.6", what: "SEO", result: "66: only is-crawlable fails (noindex on purpose)" },
    { tool: "axe (Playwright)", what: "22 pages, age gate open and closed", result: "0 violations" },
    { tool: "Playwright", what: "375 × 812 and 1280 × 800", result: "30 passed, 1 skipped" },
    { tool: "Vitest", what: "logic, checks, schema, email", result: "96 passed" },
  ],
};
