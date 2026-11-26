import plugin from "tailwindcss/plugin";
import { colors } from "./src/config/theme.js";

/** @type {import('tailwindcss').Config} */
export default {
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: colors.night, soft: colors.nightSoft },
        amethyst: colors.amethyst,
        orchid: colors.orchid,
        quartz: { DEFAULT: colors.quartz, deep: colors.quartzDeep },
        ink: { DEFAULT: colors.ink, soft: colors.inkSoft },
        mist: colors.mist,
        haze: colors.haze,
        gilt: { DEFAULT: colors.gilt, deep: colors.giltDeep },
        banner: colors.banner,
      },
      fontFamily: {
        display: ['"Bodoni Moda Variable"', '"Bodoni 72"', "Didot", "Georgia", "serif"],
        sans: ['"Jost Variable"', "ui-sans-serif", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      fontSize: {
        // A 1.333 scale from 18 px body (docs/design.md).
        lead: ["1.333rem", { lineHeight: "1.6" }],
        h3: ["1.5rem", { lineHeight: "1.25" }],
        h2: ["2.375rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h1: ["clamp(2.5rem, 6vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        mark: ["clamp(3.5rem, 10vw, 7.5rem)", { lineHeight: "0.9", letterSpacing: "0.02em" }],
      },
      borderRadius: { arch: "999px 999px 0.75rem 0.75rem" },
      keyframes: {
        band: { from: { opacity: "0", transform: "scale(0.96)" }, to: { opacity: "1", transform: "scale(1)" } },
      },
    },
  },
  plugins: [
    // `js:` styles apply once the inline script in index.html has put the `js` class on <html>.
    plugin(({ addVariant }) => addVariant("js", "html.js &")),
  ],
};
