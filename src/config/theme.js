// The Ametist palette (docs/design.md), shared by tailwind.config.js and tests/unit/contrast.test.ts.
export const colors = {
  night: "#140C22", // hero, title bands, footer
  nightSoft: "#21153A", // raised surfaces on night
  amethyst: "#4A2470", // the geode's deep bands, emphasis panels
  orchid: "#B48CD8", // the geode's light bands, focus on night
  quartz: "#F3EEF6", // the reading background
  quartzDeep: "#E6DDEE", // quiet panels on quartz
  ink: "#2A1838", // body text on quartz
  inkSoft: "#5A4868", // secondary text on quartz
  mist: "#EEE8F5", // body text on night
  haze: "#C2B4D6", // secondary text on night
  gilt: "#D2AE5A", // wordmark, rules and links on night
  giltDeep: "#76560F", // rules and links on quartz
  banner: "#FBF3DE", // the demo banner
};

// Every text/background pair the components use. `large` is text of 24px, or 18.66px bold, and up (WCAG 3:1).
export const THEME_PAIRS = [
  { name: "body on quartz", fg: colors.ink, bg: colors.quartz },
  { name: "secondary on quartz", fg: colors.inkSoft, bg: colors.quartz },
  { name: "body on quartz panel", fg: colors.ink, bg: colors.quartzDeep },
  { name: "secondary on quartz panel", fg: colors.inkSoft, bg: colors.quartzDeep },
  { name: "deep gilt link on quartz", fg: colors.giltDeep, bg: colors.quartz },
  { name: "deep gilt link on quartz panel", fg: colors.giltDeep, bg: colors.quartzDeep },
  { name: "amethyst heading on quartz", fg: colors.amethyst, bg: colors.quartz },
  { name: "body on night", fg: colors.mist, bg: colors.night },
  { name: "secondary on night", fg: colors.haze, bg: colors.night },
  { name: "gilt on night", fg: colors.gilt, bg: colors.night },
  { name: "body on night surface", fg: colors.mist, bg: colors.nightSoft },
  { name: "secondary on night surface", fg: colors.haze, bg: colors.nightSoft },
  { name: "gilt on night surface", fg: colors.gilt, bg: colors.nightSoft },
  { name: "body on amethyst panel", fg: colors.mist, bg: colors.amethyst },
  { name: "gilt on amethyst panel", fg: colors.gilt, bg: colors.amethyst },
  { name: "night text on gilt button", fg: colors.night, bg: colors.gilt },
  { name: "banner text", fg: colors.ink, bg: colors.banner },
  { name: "deep gilt on banner", fg: colors.giltDeep, bg: colors.banner },
];
