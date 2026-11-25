import { describe, expect, it } from "vitest";
// @ts-expect-error plain JS module without types
import { THEME_PAIRS } from "@/config/theme.js";

// WCAG 2.x relative luminance and contrast ratio.
const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};
export const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("theme contrast", () => {
  it("the formula matches known values", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrast("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
  });

  it("every THEME_PAIR meets 4.5:1 (3:1 when large)", () => {
    for (const p of THEME_PAIRS as { name: string; fg: string; bg: string; large?: boolean }[])
      expect(contrast(p.fg, p.bg), p.name).toBeGreaterThanOrEqual(p.large ? 3 : 4.5);
  });
});
