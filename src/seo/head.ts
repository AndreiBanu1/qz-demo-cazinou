import { site } from "@/config/site";
import { canonicalUrl, twinOf, type PageMeta } from "@/config/pages";
import { jsonLdText, structuredData } from "./structured-data";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const ogImage = `${site.url}/og-image.png`;
export const ogImageAlt = {
  ro: "Salon Ametist: site demonstrativ realizat de Quality Zone.",
  en: "Salon Ametist: a demo site built by Quality Zone.",
} as const;
export const ogLocale = { ro: "ro_RO", en: "en_GB" } as const;

/** The hreflang alternates: the page in both languages, and the Romanian one as x-default (spec §6). */
export const alternates = (page: PageMeta): { hreflang: string; href: string }[] => {
  const twin = twinOf(page);
  const ro = page.lang === "ro" ? page : twin;
  const en = page.lang === "en" ? page : twin;
  return [
    { hreflang: "ro", href: canonicalUrl(ro.path) },
    { hreflang: "en", href: canonicalUrl(en.path) },
    { hreflang: "x-default", href: canonicalUrl(ro.path) },
  ];
};

// The per-page <head> tags written into each prerendered HTML file. usePageMeta keeps them in sync on client navigation.
export const renderHead = (page: PageMeta): string => {
  const url = canonicalUrl(page.path);
  const meta = (key: "name" | "property", name: string, content: string) =>
    `<meta ${key}="${name}" content="${escape(content)}" />`;
  const hreflang = page.key === "404" ? [] : alternates(page);

  return [
    `<title>${escape(page.title)}</title>`,
    meta("name", "description", page.description),
    meta("name", "robots", "noindex"),
    `<link rel="canonical" href="${escape(url)}" />`,
    ...hreflang.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${escape(a.href)}" />`),
    meta("property", "og:title", page.title),
    meta("property", "og:description", page.description),
    meta("property", "og:url", url),
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", site.fullName),
    meta("property", "og:locale", ogLocale[page.lang]),
    meta("property", "og:image", ogImage),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", ogImageAlt[page.lang]),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", page.title),
    meta("name", "twitter:description", page.description),
    meta("name", "twitter:image", ogImage),
    ...structuredData(page).map((data) => `<script type="application/ld+json">${jsonLdText(data)}</script>`),
  ].join("\n    ");
};
