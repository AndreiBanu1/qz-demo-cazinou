import { canonicalUrl, type PageMeta } from "@/config/pages";
import { site } from "@/config/site";
import { hours } from "@/content/program";
import { ui } from "@/content/ui";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const description = {
  ro: "Salon Ametist: restaurant, bar, muzică live și săli de joc, doar pentru adulți.",
  en: "Salon Ametist: a restaurant, a bar, live music and gaming rooms, for adults only.",
} as const;

const disambiguating = {
  ro: "Local inventat, prezentat pe un site demonstrativ realizat de Quality Zone. Nu oferă jocuri de noroc.",
  en: "An invented venue, presented on a demo site built by Quality Zone. It offers no gambling.",
} as const;

// One @graph per page (spec §5): the venue as schema.org Casino, the page, WebSite on home, BreadcrumbList below it.
// No telephone, streetAddress, geo or priceRange: the venue is invented and has none. No Event markup: events need
// dates and the programme deliberately has none.
export const structuredData = (page: PageMeta): object[] => {
  const lang = page.lang;
  const home = canonicalUrl(page.lang === "ro" ? "/" : "/en");
  const casinoId = `${site.url}/#ametist`;
  const gaming = hours.find((h) => h.id === "jocuri")!;

  const nodes: object[] = [
    {
      "@type": "Casino",
      "@id": casinoId,
      name: site.fullName,
      url: home,
      description: description[lang],
      disambiguatingDescription: disambiguating[lang],
      image: `${site.url}/og-image.png`,
      address: { "@type": "PostalAddress", addressCountry: "RO" },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: DAYS, opens: gaming.open, closes: gaming.close },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl(page.path)}#page`,
      url: canonicalUrl(page.path),
      name: page.title,
      inLanguage: lang,
      about: { "@id": casinoId },
    },
  ];

  if (page.key === "home") nodes.push({ "@type": "WebSite", name: site.fullName, url: home, inLanguage: lang });
  else if (page.breadcrumb)
    nodes.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ui[lang].breadcrumbHome, item: home },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: canonicalUrl(page.path) },
      ],
    });

  return [{ "@context": "https://schema.org", "@graph": nodes }];
};

// JSON for a <script> element: "<" is escaped so the text can never close the script early.
export const jsonLdText = (data: object): string => JSON.stringify(data).replace(/</g, "\\u003c");

