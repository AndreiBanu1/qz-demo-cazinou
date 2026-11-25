import plugin from "tailwindcss/plugin";
import { colors } from "./src/config/theme.js";

/** @type {import('tailwindcss').Config} */
export default {
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: { 950: colors.violet950, 900: colors.violet900, 800: colors.violet800, 700: colors.violet700 },
        gold: { 50: colors.gold50, 300: colors.gold300, 900: colors.gold900 },
        lavender: { DEFAULT: colors.lavender, 200: colors.lavender200 },
      },
      fontFamily: { display: ['"Cormorant Garamond"', "Georgia", "serif"] },
    },
  },
  plugins: [
    // `js:` styles apply once the inline script in index.html has put the `js` class on <html>.
    plugin(({ addVariant }) => addVariant("js", "html.js &")),
  ],
};
