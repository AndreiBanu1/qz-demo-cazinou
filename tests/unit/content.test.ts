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

import { hours, poker, events } from "@/content/program";
import { pageContent } from "@/content/pages";
import { home } from "@/content/home";
import { despreDemo } from "@/content/despre-demo";

describe("page content", () => {
  it("every page content module has ro and en with the same keys", () => {
    for (const [key, c] of Object.entries(pageContent)) expect(keyPaths(c.en), key).toEqual(keyPaths(c.ro));
    expect(keyPaths(home.en)).toEqual(keyPaths(home.ro));
    expect(keyPaths(despreDemo.en)).toEqual(keyPaths(despreDemo.ro));
  });

  it("the programme has no dates", () => {
    const text = JSON.stringify({ poker, events });
    expect(text).not.toMatch(/\d{4}-\d{2}-\d{2}|\d{1,2}\.\d{1,2}\.\d{2,4}/);
    expect(text).not.toMatch(/ianuarie|februarie|martie|aprilie|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie/i);
  });

  it("the hours and poker programme match the spec", () => {
    expect(hours.map((h) => [h.id, h.open, h.close])).toEqual([
      ["jocuri", "14:00", "04:00"],
      ["restaurant", "18:00", "24:00"],
      ["bar", "18:00", "02:00"],
    ]);
    expect(poker.map((p) => [p.day, p.time, p.game])).toEqual([
      [2, "20:00", "Texas Hold'em"],
      [4, "20:00", "Omaha"],
      [6, "19:00", "Texas Hold'em"],
      ["daily", "18:00", null],
    ]);
    expect(events.map((e) => e.id)).toEqual(["jazz", "degustare", "acustic", "retro"]);
  });
});
