// The routes scripts/verify-site.mjs checks. Written out on purpose, so the check doesn't trust the code it checks;
// tests/unit/pages.test.ts makes sure the list still equals src/config/pages.ts.
// `twin` is the same page in the other language. `gated` says whether the age gate belongs on it (spec §3.3).
// `minWords` is the least number of words of visible text inside <main>.
/** @type {{ path: string; file: string; lang: "ro" | "en"; twin: string; gated: boolean; minWords?: number }[]} */
export const ROUTES = [
  { path: "/", file: "index.html", lang: "ro", twin: "/en", gated: true, minWords: 150 },
  { path: "/en", file: "en.html", lang: "en", twin: "/", gated: true, minWords: 150 },
  { path: "/sloturi", file: "sloturi.html", lang: "ro", twin: "/en/slots", gated: true, minWords: 150 },
  { path: "/en/slots", file: "en/slots.html", lang: "en", twin: "/sloturi", gated: true, minWords: 150 },
  { path: "/poker", file: "poker.html", lang: "ro", twin: "/en/poker", gated: true, minWords: 150 },
  { path: "/en/poker", file: "en/poker.html", lang: "en", twin: "/poker", gated: true, minWords: 150 },
  { path: "/jocuri-la-masa", file: "jocuri-la-masa.html", lang: "ro", twin: "/en/table-games", gated: true, minWords: 150 },
  { path: "/en/table-games", file: "en/table-games.html", lang: "en", twin: "/jocuri-la-masa", gated: true, minWords: 150 },
  { path: "/evenimente", file: "evenimente.html", lang: "ro", twin: "/en/events", gated: true, minWords: 150 },
  { path: "/en/events", file: "en/events.html", lang: "en", twin: "/evenimente", gated: true, minWords: 150 },
  { path: "/locatia", file: "locatia.html", lang: "ro", twin: "/en/venue", gated: true, minWords: 150 },
  { path: "/en/venue", file: "en/venue.html", lang: "en", twin: "/locatia", gated: true, minWords: 150 },
  { path: "/contact", file: "contact.html", lang: "ro", twin: "/en/contact", gated: true },
  { path: "/en/contact", file: "en/contact.html", lang: "en", twin: "/contact", gated: true },
  { path: "/joc-responsabil", file: "joc-responsabil.html", lang: "ro", twin: "/en/responsible-gaming", gated: false, minWords: 150 },
  { path: "/en/responsible-gaming", file: "en/responsible-gaming.html", lang: "en", twin: "/joc-responsabil", gated: false, minWords: 150 },
  { path: "/despre-demo", file: "despre-demo.html", lang: "ro", twin: "/en/about-demo", gated: false, minWords: 300 },
  { path: "/en/about-demo", file: "en/about-demo.html", lang: "en", twin: "/despre-demo", gated: false, minWords: 300 },
  { path: "/confidentialitate", file: "confidentialitate.html", lang: "ro", twin: "/en/privacy", gated: false },
  { path: "/en/privacy", file: "en/privacy.html", lang: "en", twin: "/confidentialitate", gated: false },
  { path: "/acces-restrictionat", file: "acces-restrictionat.html", lang: "ro", twin: "/en/restricted", gated: false },
  { path: "/en/restricted", file: "en/restricted.html", lang: "en", twin: "/acces-restrictionat", gated: false },
];
