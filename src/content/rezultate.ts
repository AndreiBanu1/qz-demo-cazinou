import type { Lang } from "@/config/site";

// The latest real test runs (spec §11), copied from docs/rezultate/<date>/rezumat.md. Every cell is in both languages.
export interface ResultRow {
  tool: string;
  what: Record<Lang, string>;
  result: Record<Lang, string>;
}

export interface Results {
  date: string;
  where: Record<Lang, string>;
  rows: ResultRow[];
}

export const latestResults: Results | null = {
  date: "2026-11-26",
  where: {
    ro: "rulare locală, înainte de publicare (wrangler pages dev); rezultatele de pe site-ul live le vor înlocui",
    en: "local run, before deploy (wrangler pages dev); the live-site results will replace them",
  },
  rows: [
    {
      tool: "Lighthouse 13.6",
      what: { ro: "Performanță, accesibilitate, bune practici (4 pagini × mobil, desktop)", en: "Performance, accessibility, best practices (4 pages × mobile, desktop)" },
      result: { ro: "100 / 100 / 100 la toate cele 8 rulări", en: "100 / 100 / 100 on all 8 runs" },
    },
    {
      tool: "Lighthouse 13.6",
      what: { ro: "SEO", en: "SEO" },
      result: { ro: "66: pică doar is-crawlable (noindex, intenționat)", en: "66: only is-crawlable fails (noindex on purpose)" },
    },
    {
      tool: "axe (Playwright)",
      what: { ro: "22 de pagini, cu întrebarea despre vârstă deschisă și închisă", en: "22 pages, with the age question open and closed" },
      result: { ro: "0 probleme", en: "0 violations" },
    },
    {
      tool: "Playwright",
      what: { ro: "375 × 812 și 1280 × 800", en: "375 × 812 and 1280 × 800" },
      result: { ro: "31 trecute, 1 sărit", en: "31 passed, 1 skipped" },
    },
    {
      tool: "Vitest",
      what: { ro: "logică, verificări, schemă, e-mail", en: "logic, checks, schema, email" },
      result: { ro: "111 trecute", en: "111 passed" },
    },
  ],
};
