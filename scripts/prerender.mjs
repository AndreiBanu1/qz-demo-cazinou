// Writes a static HTML file per route and language, with that page's own <html lang>, title, description, canonical
// and hreflang alternates, plus 404.html and sitemap.xml. Runs after both Vite builds.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render, pages, notFoundPage, canonicalUrl, renderHead, alternates, renderNotification } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

const template = readFileSync(join(dist, "index.html"), "utf8");
const HEAD = /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/;
const APP = "<!--app-->";
const LANG = '<html lang="ro">';
if (!template.includes(LANG)) throw new Error('index.html must have <html lang="ro">');
if (!HEAD.test(template)) throw new Error("index.html is missing the <!--seo-head--> … <!--/seo-head--> block");
if (!template.includes(APP)) throw new Error("index.html is missing <!--app--> inside #root");

const write = (file, content) => {
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  writeFileSync(join(dist, file), content);
  console.log(`prerendered ${file}`);
};

const pageHtml = (page, url) =>
  template
    .replace(LANG, `<html lang="${page.lang}">`)
    .replace(HEAD, () => renderHead(page))
    .replace(APP, () => render(url));

export const fileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);

for (const page of pages) write(fileFor(page.path), pageHtml(page, page.path));
// Cloudflare Pages serves 404.html, with a 404 status, for any path that has no file.
write("404.html", pageHtml(notFoundPage, "/this-page-does-not-exist"));

write(
  "sitemap.xml",
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...pages.map(
      (p) =>
        `  <url><loc>${canonicalUrl(p.path)}</loc><lastmod>${p.lastModified}</lastmod>` +
        alternates(p).map((a) => `<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`).join("") +
        "</url>",
    ),
    "</urlset>",
    "",
  ].join("\n"),
);

// The notification email for each request type with sample data (spec §10.2: check-copy reads these too).
const emailDir = join(root, "dist-email");
rmSync(emailDir, { recursive: true, force: true });
mkdirSync(emailDir, { recursive: true });
const common = { nume: "Exemplu Nume", contact: "exemplu@example.com", varsta: true, acord: true };
const samples = {
  masa: { tip: "masa", data: "2026-12-01", ora: "19:30", persoane: 4, mesaj: "Mesaj de exemplu.", limba: "ro", ...common },
  eveniment: { tip: "eveniment", data: "2026-12-12", marime: "30-60", mesaj: "Mesaj de exemplu.", limba: "en", ...common },
  intrebare: { tip: "intrebare", mesaj: "Mesaj de exemplu.", limba: "ro", ...common, contact: "0712 000 000" },
};
for (const [name, fields] of Object.entries(samples)) {
  const { subject, text, html } = renderNotification(fields, new Date("2026-11-25T10:00:00Z"));
  writeFileSync(join(emailDir, `${name}.txt`), `${subject}\n\n${text}`);
  writeFileSync(join(emailDir, `${name}.html`), html);
}
console.log(`email samples: ${Object.keys(samples).length} in dist-email/`);

rmSync(ssrDir, { recursive: true, force: true });
