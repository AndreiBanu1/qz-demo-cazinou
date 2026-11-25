import type { PageMeta } from "@/config/pages";

// Filled in Task 5 (spec §5).
export const structuredData = (_page: PageMeta): object[] => [];

// JSON for a <script> element: "<" is escaped so the text can never close the script early.
export const jsonLdText = (data: object): string => JSON.stringify(data).replace(/</g, "\\u003c");
