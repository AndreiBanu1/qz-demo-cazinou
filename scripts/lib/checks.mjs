// Checks on built HTML (spec §10.1), shared by scripts/verify-site.mjs and the unit tests.
// The required texts are written out here on purpose, so the check doesn't trust the code it checks;
// tests/unit/content.test.ts makes sure src/content/ui.ts says the same.
import { attrOf, decode, metaDescriptions, textOf, titleOf } from "./html.mjs";

export const ORIGIN = "https://ametist-demo.pages.dev";

export const BANNER = {
  ro: "Site demonstrativ realizat de Quality Zone. Ametist este un local inventat și nu oferă jocuri de noroc, nici online, nici fizic.",
  en: "Demo site built by Quality Zone. Ametist is an invented venue and offers no gambling, online or in person.",
};
export const FOOTER_LINE = {
  ro: "Jocurile de noroc sunt interzise minorilor. Jocurile de noroc pot crea dependență. Joacă responsabil.",
  en: "Gambling is prohibited for minors. Gambling can be addictive. Play responsibly.",
};
export const PLACEHOLDER = {
  ro: "Aici un operator licențiat afișează seria și numărul licenței și sigla ONJN. Demo: fără licență.",
  en: "This is where a licensed operator shows its licence series and number and the ONJN logo. Demo: no licence.",
};
const ABOUT = { ro: "/despre-demo", en: "/en/about-demo" };
const ONJN_HREF = "https://onjn.gov.ro/";

// Romanian numbers: 0, then 7 and 8 more digits (mobile), or 0, then 2 or 3 and 8 more digits (landline);
// or the same after the country code +40. Single separators allowed. A leading digit, dot or dash rules out dates.
export const PHONE_RE = /(?:\+40[ .-]?|(?<![\d.-])0)(?:7(?:[ .-]?\d){8}|[23](?:[ .-]?\d){8})(?!\d)/;
// A street word, a capitalised name, an optional "nr.", and a number.
export const STREET_RE =
  /(?<!\p{L})(?:Str\.|Strada|Bd\.|Bulevardul|Calea|Șos\.|Șoseaua|Street|Avenue)\s+\p{Lu}\p{L}+(?:\s+nr\.?)?\s+\d+/u;

/** @param {unknown} node @param {string[]} keys @returns {string[]} keys found at any depth */
const findKeys = (node, keys) => {
  if (Array.isArray(node)) return node.flatMap((n) => findKeys(n, keys));
  if (node && typeof node === "object")
    return Object.entries(node).flatMap(([k, v]) => [...(keys.includes(k) ? [k] : []), ...findKeys(v, keys)]);
  return [];
};

/** @param {string} tag @param {string} attr */
export const hasAttr = (tag, attr) => new RegExp(`\\s${attr}(?=[\\s=/>])`, "i").test(tag);

/**
 * @param {string} html
 * @param {{ path: string; lang: "ro" | "en"; twin?: string; gated: boolean; h1?: string }} expected
 * @returns {string[]} failure messages
 */
export function checkPage(html, expected) {
  /** @type {string[]} */
  const out = [];
  const text = textOf(html);
  const { lang } = expected;

  const htmlLang = html.match(/<html\s[^>]*lang="([^"]*)"/i)?.[1];
  if (htmlLang !== lang) out.push(`<html lang> is ${htmlLang ?? "missing"}, expected ${lang}`);

  if (!/<meta\s[^>]*name="robots"[^>]*content="noindex"/i.test(html)) out.push('missing <meta name="robots" content="noindex">');

  if (!text.includes(BANNER[lang]) || !html.includes(`href="${ABOUT[lang]}"`))
    out.push(`demo banner missing (the ${lang} text linking to ${ABOUT[lang]})`);
  if (!/<[a-z]+\b[^>]*\sdata-badge="18plus"/i.test(html)) out.push("18+ badge missing (data-badge=\"18plus\")");
  if (!text.includes(FOOTER_LINE[lang])) out.push(`minors line missing ("${FOOTER_LINE[lang].slice(0, 40)}…")`);
  const placeholder = html.match(/<[a-z]+\b[^>]*\sdata-licence-placeholder[\s\S]*?<\/(div|p|aside)>/i)?.[0];
  if (!placeholder || !textOf(placeholder).includes(PLACEHOLDER[lang])) out.push("licence placeholder missing");
  if (!html.includes(`href="${ONJN_HREF}"`)) out.push(`ONJN link missing (href="${ONJN_HREF}")`);

  const gate = /<[a-z]+\b[^>]*\sdata-age-gate(?=[\s=/>])/i.test(html);
  if (expected.gated && !gate) out.push("age gate markup missing on a gated page");
  if (!expected.gated && gate) out.push("age gate markup present on an ungated page");

  const canonical = attrOf(html.match(/<link\s[^>]*rel="canonical"[^>]*>/i)?.[0] ?? "", "href");
  const wantCanonical = ORIGIN + expected.path;
  if (canonical !== wantCanonical) out.push(`canonical is ${canonical ?? "missing"}, expected ${wantCanonical}`);

  if (expected.twin !== undefined) {
    const alt = Object.fromEntries(
      [...html.matchAll(/<link\s[^>]*rel="alternate"[^>]*>/gi)].map((m) => [attrOf(m[0], "hreflang"), attrOf(m[0], "href")]),
    );
    const ro = ORIGIN + (lang === "ro" ? expected.path : expected.twin);
    const en = ORIGIN + (lang === "en" ? expected.path : expected.twin);
    if (alt.ro !== ro || alt.en !== en || alt["x-default"] !== ro)
      out.push(`hreflang alternates are ${JSON.stringify(alt)}, expected ro=${ro} en=${en} x-default=${ro}`);
  }

  const h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/gi)].map((m) => textOf(m[0]));
  if (h1s.length !== 1) out.push(`expected exactly one h1, found ${h1s.length}`);
  else if (expected.h1 !== undefined && !h1s[0].startsWith(expected.h1)) out.push(`h1 "${h1s[0]}" does not start with "${expected.h1}"`);

  const descs = metaDescriptions(html);
  if (descs.length !== 1) out.push(`expected one meta description, found ${descs.length}`);
  else if (descs[0].length < 70 || descs[0].length > 160) out.push(`description is ${descs[0].length} characters, expected 70 to 160`);

  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try {
      data = JSON.parse(decode(m[1]));
    } catch {
      out.push("JSON-LD does not parse");
      continue;
    }
    for (const k of new Set(findKeys(data, ["telephone", "streetAddress", "geo", "priceRange"]))) out.push(`JSON-LD contains a "${k}" key`);
  }

  if (/href="tel:/i.test(html)) out.push('contains an href="tel:" link');
  if (PHONE_RE.test(text)) out.push(`visible text looks like a phone number: ${text.match(PHONE_RE)?.[0]}`);
  if (STREET_RE.test(text)) out.push(`visible text looks like a street address: ${text.match(STREET_RE)?.[0]}`);
  if (/[şţŞŢ]/.test(text)) out.push("visible text has cedilla ş, ţ, Ş or Ţ, use comma-below ș, ț, Ș or Ț");
  for (const m of html.matchAll(/<img\b[^>]*>|url\(([^)]*)\)/gi))
    if (/onjn/i.test(attrOf(m[0], "src") ?? m[1] ?? "")) out.push("an image references an ONJN logo file; the real logo is never used");

  return out;
}

/**
 * Cross-page checks: titles and descriptions are unique.
 * @param {{ path: string; html: string }[]} files
 * @returns {string[]} failure messages
 */
export function checkSite(files) {
  /** @type {string[]} */
  const out = [];
  for (const [label, pick] of /** @type {const} */ ([
    ["title", (/** @type {string} */ h) => titleOf(h)],
    ["description", (/** @type {string} */ h) => metaDescriptions(h)[0]],
  ])) {
    /** @type {Map<string, string[]>} */
    const seen = new Map();
    for (const f of files) {
      const v = pick(f.html);
      if (v === undefined) continue;
      seen.set(v, [...(seen.get(v) ?? []), f.path]);
    }
    for (const [v, paths] of seen) if (paths.length > 1) out.push(`same ${label} on ${paths.join(", ")}: "${v.slice(0, 60)}"`);
  }
  return out;
}

/**
 * Every <img> needs a non-empty alt and a width and a height, so the page doesn't jump while images load.
 * @param {string} html @returns {string[]}
 */
export function checkImages(html) {
  /** @type {string[]} */
  const out = [];
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = attrOf(tag, "src") ?? "(no src)";
    if (!(attrOf(tag, "alt") ?? "").trim()) out.push(`<img ${src}> has no alt text`);
    for (const a of ["width", "height"]) if (!/^\d+$/.test(attrOf(tag, a) ?? "")) out.push(`<img ${src}> has no ${a}`);
  }
  return out;
}
