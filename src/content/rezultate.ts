// The latest real test runs (spec §11), copied from docs/rezultate/<date>/rezumat.md. Empty until the first runs.
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

export const latestResults: Results | null = null;
