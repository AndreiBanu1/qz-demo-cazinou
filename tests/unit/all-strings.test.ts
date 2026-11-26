import { globSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
// @ts-expect-error plain JS module without types
import { findBanned } from "../../scripts/lib/banned-words.mjs";
import { pages } from "@/config/pages";
import { acces } from "@/content/acces";
import { contact } from "@/content/contact";
import { despreDemo } from "@/content/despre-demo";
import { formular } from "@/content/formular";
import { home } from "@/content/home";
import { pageContent } from "@/content/pages";
import { events, hours, poker } from "@/content/program";
import { latestResults } from "@/content/rezultate";
import { ui } from "@/content/ui";
import { keyPaths } from "./content.test";

/** Every string leaf, with its path, so text shown only after an interaction is checked too (review finding 4). */
const leaves = (o: unknown, path = ""): [string, string][] =>
  typeof o === "string"
    ? [[path, o]]
    : Array.isArray(o)
      ? o.flatMap((v, i) => leaves(v, `${path}[${i}]`))
      : o && typeof o === "object"
        ? Object.entries(o).flatMap(([k, v]) => leaves(v, `${path}.${k}`))
        : [];

const all: [string, string][] = [
  ...leaves(ui, "ui"),
  ...leaves(formular, "formular"),
  ...leaves(pageContent, "pageContent"),
  ...leaves(home, "home"),
  ...leaves(despreDemo, "despreDemo"),
  ...leaves(acces, "acces"),
  ...leaves(contact, "contact"),
  ...leaves({ events, hours, poker }, "program"),
  ...leaves(latestResults, "rezultate"),
  ...leaves(pages.map((p) => ({ title: p.title, description: p.description })), "pages"),
];

describe("every copy string, including those shown only after an interaction", () => {
  it("has no word that encourages gambling", () => {
    const hits = all.flatMap(([path, s]) => (findBanned(s) as { word: string }[]).map((h) => `${path}: ${h.word}`));
    expect(hits).toEqual([]);
  });

  it("uses comma-below ș ț, never cedilla ş ţ", () => {
    expect(all.filter(([, s]) => /[şţŞŢ]/.test(s)).map(([p]) => p)).toEqual([]);
  });

  it("writes the minimum age only through site.minAge (review finding 2)", () => {
    // Scans the sources, not the rendered strings (which already hold minAge's value). Times like 18:00, colours and
    // digits inside longer numbers are not ages. The one exception quotes Norme art. 128, whose text says 18 whatever
    // site.minAge is.
    const files = [...globSync("src/**/*.{ts,tsx,js}"), "scripts/build-og-image.mjs"].filter((f) => f !== "src/config/age.js")
      // Drawings: their numbers are coordinates, not ages.
      .filter((f) => !f.startsWith("src/components/scenes/") && !["src/components/Illustration.tsx", "src/components/Geode.tsx"].includes(f));
    const offenders = files.flatMap((f) =>
      readFileSync(f, "utf8")
        .split("\n")
        .map((line, i) => [`${f}:${i + 1}`, line] as const)
        .filter(([, line]) => /(?<![\d.:#\w])18(?![\d:%.\w])/.test(line) && !line.includes("interdicția sub 18 ani") && !line.includes("the under-18 ban"))
        .map(([where, line]) => `${where}: ${line.trim()}`),
    );
    expect(offenders).toEqual([]);
  });

  it("has results rows in both languages (review finding 3)", () => {
    expect(latestResults).not.toBeNull();
    for (const row of latestResults!.rows) expect(keyPaths(row.what)).toEqual([".ro", ".en"]);
    for (const row of latestResults!.rows) expect(keyPaths(row.result)).toEqual([".ro", ".en"]);
  });
});
