// Words that encourage gambling (spec §3.2). The build fails if any appears in what a visitor can read.
// Patterns run on normalised text (lowercase, no diacritics) and match whole words only.
import { attrTexts, metaTexts, removeElementsWith, textOf, titleOf } from "./html.mjs";

export const BANNED = {
  ro: [
    "castig\\w*", // câștig, câștigă, câștigi, câștigător, câștigurile
    "jackpot\\w*",
    "bonus\\w*",
    "gratuit\\w*",
    "gratis",
    "garantat\\w*",
    "rotir\\w*", // rotiri (gratuite)
    "cot(?:a|e|ele|ei)", // cote (odds)
    "miz(?:a|e|ele|ei)", // miză, mize (stakes)
    "bani rapizi",
    "imbogat\\w*", // îmbogățește, îmbogățești
  ],
  en: [
    "win|wins|winner\\w*|winning\\w*", // not "won", which would flag "won't"
    "jackpot\\w*",
    "bonus\\w*",
    "free",
    "guarantee\\w*",
    "lucky",
    "odds",
    "payout\\w*",
    "spins?",
    "stakes?",
    "rtp",
  ],
};

const RE = new RegExp(`(?<![a-z0-9])(?:${[...BANNED.ro, ...BANNED.en].join("|")})(?![a-z0-9])`, "g");

/** Lowercase, without diacritics (ș → s, ă → a, î → i), so variants written without them are caught too. */
export const normalise = (/** @type {string} */ s) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/**
 * @param {string} text
 * @returns {{ word: string; context: string }[]}
 */
export function findBanned(text) {
  const norm = normalise(text);
  return [...norm.matchAll(RE)].map((m) => ({
    word: m[0],
    context: norm.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).trim(),
  }));
}

/**
 * Everything on a page a visitor can read: the visible text, the title, the meta texts that show in link previews,
 * and alt, aria-label, title and placeholder attributes. Elements marked `data-copy-allow` are left out, so
 * /despre-demo can quote the list it is checked against.
 * @param {string} html
 * @returns {string}
 */
export function copyTextOf(html) {
  const kept = removeElementsWith(html, "data-copy-allow");
  return [titleOf(kept) ?? "", ...metaTexts(kept), textOf(kept), ...attrTexts(kept)].join("\n");
}
