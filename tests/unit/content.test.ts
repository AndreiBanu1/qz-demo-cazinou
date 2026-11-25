import { describe, expect, it } from "vitest";
import { ui } from "@/content/ui";

/** Every key path of an object, so ro and en can be compared deeply. Arrays compare by length and item keys. */
export const keyPaths = (o: unknown, prefix = ""): string[] => {
  if (Array.isArray(o)) return [`${prefix}[${o.length}]`, ...o.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`))];
  if (o && typeof o === "object")
    return Object.entries(o).flatMap(([k, v]) => [`${prefix}.${k}`, ...keyPaths(v, `${prefix}.${k}`)]);
  return [];
};

describe("ui strings", () => {
  it("ui.ro and ui.en have the same keys, deeply", () => {
    expect(keyPaths(ui.en)).toEqual(keyPaths(ui.ro));
  });

  it("the footer line and placeholder match the spec", () => {
    expect(ui.ro.footer.minors).toBe(
      "Jocurile de noroc sunt interzise minorilor. Jocurile de noroc pot crea dependență. Joacă responsabil.",
    );
    expect(ui.en.footer.minors).toBe("Gambling is prohibited for minors. Gambling can be addictive. Play responsibly.");
    expect(ui.ro.footer.licence).toBe(
      "Aici un operator licențiat afișează seria și numărul licenței și sigla ONJN. Demo: fără licență.",
    );
  });
});
