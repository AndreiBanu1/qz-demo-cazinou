// The Ametist palette (spec §8), shared by tailwind.config.js and tests/unit/contrast.test.ts.
export const colors = {
  violet950: "#1a1433",
  violet900: "#26215C",
  violet800: "#2f2870",
  violet700: "#3C3489",
  gold50: "#FAEEDA",
  gold300: "#FAC775",
  gold900: "#412402",
  lavender: "#EEEDFE",
  lavender200: "#CECBF6",
};

// Every text/background pair the components use. `large` is text of 24px, or 18.66px bold, and up (WCAG 3:1).
export const THEME_PAIRS = [
  { name: "body text on page", fg: colors.lavender, bg: colors.violet950 },
  { name: "muted text on page", fg: colors.lavender200, bg: colors.violet950 },
  { name: "body text on surface", fg: colors.lavender, bg: colors.violet900 },
  { name: "muted text on surface", fg: colors.lavender200, bg: colors.violet900 },
  { name: "body text on raised card", fg: colors.lavender, bg: colors.violet700 },
  { name: "muted text on raised card", fg: colors.lavender200, bg: colors.violet700 },
  { name: "gold accent on page", fg: colors.gold300, bg: colors.violet950 },
  { name: "gold accent on surface", fg: colors.gold300, bg: colors.violet900 },
  { name: "gold accent on raised card", fg: colors.gold300, bg: colors.violet700 },
  { name: "button text on gold", fg: colors.gold900, bg: colors.gold300 },
  { name: "banner text", fg: colors.gold900, bg: colors.gold50 },
];
