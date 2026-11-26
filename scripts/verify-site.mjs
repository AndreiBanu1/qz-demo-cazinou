// Checks the built site the way a crawler that doesn't run JavaScript sees it (spec §10.1).
// Runs at the end of `npm run build`, so a regression fails the deploy.
// The routes are written out in scripts/lib/routes.mjs on purpose, so this check doesn't trust the code it checks.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ORIGIN, checkImages, checkPage, checkRequestForm, checkSite } from "./lib/checks.mjs";
import { textOf } from "./lib/html.mjs";
import { ROUTES as routes } from "./lib/routes.mjs";

const DIST = "dist";
// The fields the function reads that the server-rendered form must have (written out to match FORM_FIELDS in
// src/lib/request-schema.ts): marime appears only for a private event, and Turnstile adds cf-turnstile-response itself.
const FORM_FIELDS = ["tip", "data", "ora", "persoane", "mesaj", "nume", "contact", "varsta", "acord", "limba", "bot-field"];
const CONTACT_PAGES = ["/contact", "/en/contact"];
// The Turnstile script loads only on the contact pages, after hydration, so no built page may reference it.
const TURNSTILE_HOST = "challenges.cloudflare.com";
const FAVICON_LINK = '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />';

const failures = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);
const files = [];

for (const r of routes) {
  const full = join(DIST, r.file);
  if (!existsSync(full)) {
    fail(r.file, "not built");
    continue;
  }
  const html = readFileSync(full, "utf8");
  files.push({ path: r.path, html });
  for (const m of checkPage(html, r)) fail(r.file, m);
  for (const m of checkImages(html)) fail(r.file, m);
  if (!html.includes(FAVICON_LINK)) fail(r.file, "no favicon link");
  if (CONTACT_PAGES.includes(r.path)) for (const m of checkRequestForm(html, FORM_FIELDS, r.lang)) fail(r.file, m);
  else if (/<form[\s>]/i.test(html)) fail(r.file, "has a <form>; the only form belongs on the contact pages");
  if (html.includes(TURNSTILE_HOST)) fail(r.file, `references ${TURNSTILE_HOST}; the script loads only after hydration`);
  if (r.minWords !== undefined) {
    const main = html.match(/<main[\s>][\s\S]*?<\/main>/i)?.[0] ?? "";
    const words = textOf(main).split(" ").filter(Boolean).length;
    if (words < r.minWords) fail(r.file, `only ${words} words in <main>, expected at least ${r.minWords}`);
  }
}
for (const m of checkSite(files)) fail("site", m);

// The 404 page: Romanian first with English below, gated, its own canonical, no hreflang (it has no twin).
if (!existsSync(join(DIST, "404.html"))) fail("404.html", "not built");
else {
  const html = readFileSync(join(DIST, "404.html"), "utf8");
  for (const m of checkPage(html, { path: "/404", lang: "ro", gated: true })) fail("404.html", m);
  if (!textOf(html).includes("Page not found")) fail("404.html", "no English text");
}

for (const f of ["_headers", "robots.txt", "favicon.svg", "og-image.png"]) if (!existsSync(join(DIST, f))) fail(f, "not built");
// check-copy reads the email samples; without them it would pass without checking the email (spec §10.2).
for (const t of ["masa", "eveniment", "intrebare"])
  for (const ext of ["txt", "html"]) if (!existsSync(join("dist-email", `${t}.${ext}`))) fail(`dist-email/${t}.${ext}`, "not built");

if (!existsSync(join(DIST, "sitemap.xml"))) fail("sitemap.xml", "not built");
else {
  const sitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8");
  for (const r of routes) if (!sitemap.includes(`<loc>${ORIGIN}${r.path}</loc>`)) fail("sitemap.xml", `missing ${r.path}`);
}

if (failures.length) {
  console.error(`verify-site: ${failures.length} problem(s)\n` + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
console.log(`verify-site: ok (${routes.length} pages, 404, sitemap)`);
