import { useEffect } from "react";
import { canonicalUrl, type PageMeta } from "@/config/pages";
import { alternates, ogImage, ogImageAlt, ogLocale } from "@/seo/head";
import { jsonLdText, structuredData } from "@/seo/structured-data";

const setTag = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    for (const [, key, name] of selector.matchAll(/\[([\w:-]+)="([^"]+)"\]/g)) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

// Each page is prerendered with its own head (src/seo/head.ts); this keeps the same tags right after client-side
// navigation, including <html lang> and the hreflang alternates.
export const usePageMeta = (page: PageMeta) => {
  useEffect(() => {
    const url = canonicalUrl(page.path);
    document.documentElement.lang = page.lang;
    document.title = page.title;
    setTag('meta[name="description"]', "content", page.description);
    setTag('meta[name="robots"]', "content", "noindex");
    setTag('link[rel="canonical"]', "href", url);
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => l.remove());
    if (page.key !== "404")
      for (const a of alternates(page)) setTag(`link[rel="alternate"][hreflang="${a.hreflang}"]`, "href", a.href);
    setTag('meta[property="og:title"]', "content", page.title);
    setTag('meta[property="og:description"]', "content", page.description);
    setTag('meta[property="og:url"]', "content", url);
    setTag('meta[property="og:locale"]', "content", ogLocale[page.lang]);
    setTag('meta[property="og:image"]', "content", ogImage);
    setTag('meta[property="og:image:alt"]', "content", ogImageAlt[page.lang]);
    setTag('meta[name="twitter:title"]', "content", page.title);
    setTag('meta[name="twitter:description"]', "content", page.description);
    setTag('meta[name="twitter:image"]', "content", ogImage);
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
    for (const data of structuredData(page)) {
      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.textContent = jsonLdText(data);
      document.head.appendChild(ld);
    }
  }, [page]);
};
