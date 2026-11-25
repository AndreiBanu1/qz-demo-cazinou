// Reading built HTML as a crawler sees it. Shared by verify-site.mjs, check-copy.mjs and the unit tests.

const NAMED = { icirc: "î", Icirc: "Î", acirc: "â", Acirc: "Â", abreve: "ă", Abreve: "Ă", hellip: "…", ndash: "–", mdash: "—", bdquo: "„", ldquo: "“", rdquo: "”", rsquo: "’", lsquo: "‘", middot: "·" };

/** @param {string} s */
export const decode = (s) =>
  s
    .replace(/&([A-Za-z]+);/g, (m, n) => (Object.hasOwn(NAMED, n) ? NAMED[/** @type {keyof typeof NAMED} */ (n)] : m))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

/** Visible text of an HTML string. @param {string} html @returns {string} */
export const textOf = (html) =>
  decode(
    html
      .replace(/<head[\s\S]*?<\/head>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

/** @param {string} tag @param {string} attr @returns {string | undefined} */
export const attrOf = (tag, attr) => {
  const v = tag.match(new RegExp(`\\s${attr}="([^"]*)"`, "i"))?.[1];
  return v === undefined ? undefined : decode(v);
};

/** @param {string} html @returns {string | undefined} */
export const titleOf = (html) => {
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return t === undefined ? undefined : decode(t).trim();
};

/** Every meta description on the page, so a duplicate tag is caught. @param {string} html @returns {string[]} */
export const metaDescriptions = (html) =>
  [...html.matchAll(/<meta\s[^>]*name="description"[^>]*>/gi)]
    .map((m) => attrOf(m[0], "content"))
    .filter((v) => v !== undefined);

/** The content of every <meta> tag that carries text people read (description, og:*, twitter:*). @param {string} html */
export const metaTexts = (html) =>
  [...html.matchAll(/<meta\s[^>]*>/gi)]
    .filter((m) => /(name|property)="(description|og:title|og:description|og:image:alt|twitter:title|twitter:description)"/i.test(m[0]))
    .map((m) => attrOf(m[0], "content"))
    .filter((v) => v !== undefined);

/** Text people read in attributes: alt, aria-label, title, placeholder. @param {string} html @returns {string[]} */
export const attrTexts = (html) =>
  [...html.matchAll(/\s(?:alt|aria-label|title|placeholder)="([^"]*)"/gi)].map((m) => decode(m[1]));

/**
 * Removes every element carrying `attr` (and its whole subtree), matching nested tags of the same name.
 * @param {string} html @param {string} attr @returns {string}
 */
export const removeElementsWith = (html, attr) => {
  const open = new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\s${attr}(?=[\\s=/>])[^>]*>`, "i");
  let out = html;
  for (;;) {
    const m = open.exec(out);
    if (!m) return out;
    const tag = m[1].toLowerCase();
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
    re.lastIndex = m.index + m[0].length;
    let depth = 1;
    let end = out.length;
    for (let t; (t = re.exec(out)); ) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) {
        end = t.index + t[0].length;
        break;
      }
    }
    out = out.slice(0, m.index) + " " + out.slice(end);
  }
};
