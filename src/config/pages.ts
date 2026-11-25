import { site, type Lang } from "./site";

export type { Lang };

export const PAGE_KEYS = [
  "home",
  "sloturi",
  "poker",
  "mese",
  "evenimente",
  "locatia",
  "contact",
  "joc-responsabil",
  "despre-demo",
  "confidentialitate",
  "acces",
] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export interface PageMeta {
  key: PageKey | "404";
  lang: Lang;
  path: string;
  title: string;
  description: string;
  lastModified: string;
  /** Label in the breadcrumb trail. Every page except home has one. */
  breadcrumb?: string;
  /** Whether the age gate shows on this page (spec §3.3). */
  gated: boolean;
}

// Help, the demo explanation, privacy and the "No" page are readable by anyone (spec §3.3).
const UNGATED: readonly PageKey[] = ["acces", "joc-responsabil", "despre-demo", "confidentialitate"];

const lastModified = "2026-11-25";

type Entry = { path: string; title: string; description: string; breadcrumb?: string };
const table: Record<PageKey, Record<Lang, Entry>> = {
  home: {
    ro: {
      path: "/",
      title: "Salon Ametist: restaurant, bar, muzică și săli de joc | Demo",
      description:
        "O seară în oraș la Salon Ametist: restaurant, bar, muzică live și sălile de joc, doar pentru adulți. Un local inventat, pe un site demonstrativ.",
    },
    en: {
      path: "/en",
      title: "Salon Ametist: restaurant, bar, music and gaming rooms | Demo",
      description:
        "An evening out at Salon Ametist: a restaurant, a bar, live music and the gaming rooms, for adults only. An invented venue on a demo site.",
    },
  },
  sloturi: {
    ro: {
      path: "/sloturi",
      title: "Sala de sloturi | Salon Ametist (demo)",
      description:
        "Cum arată sala de sloturi de la Salon Ametist: o sală liniștită, colțuri retrase și pauze la bar. Doar pentru adulți, cu joc responsabil.",
      breadcrumb: "Sloturi",
    },
    en: {
      path: "/en/slots",
      title: "The slot room | Salon Ametist (demo)",
      description:
        "What the slot room at Salon Ametist is like: a quiet room, tucked-away corners and breaks at the bar. For adults only, with responsible gaming.",
      breadcrumb: "Slots",
    },
  },
  poker: {
    ro: {
      path: "/poker",
      title: "Camera de poker și programul turneelor | Salon Ametist (demo)",
      description:
        "Camera de poker de la Salon Ametist: mesele, programul săptămânal al turneelor și cum decurge o seară de turneu. Doar pentru adulți.",
      breadcrumb: "Poker",
    },
    en: {
      path: "/en/poker",
      title: "The poker room and tournament programme | Salon Ametist (demo)",
      description:
        "The poker room at Salon Ametist: the tables, the weekly tournament programme and how a tournament evening runs. For adults only.",
      breadcrumb: "Poker",
    },
  },
  mese: {
    ro: {
      path: "/jocuri-la-masa",
      title: "Ruletă, blackjack și baccara | Salon Ametist (demo)",
      description:
        "Jocurile la masă de la Salon Ametist: ruletă, blackjack și baccara, cu dealeri și reguli de bună purtare la masă. Doar pentru adulți.",
      breadcrumb: "Jocuri la masă",
    },
    en: {
      path: "/en/table-games",
      title: "Roulette, blackjack and baccarat | Salon Ametist (demo)",
      description:
        "The table games at Salon Ametist: roulette, blackjack and baccarat, with dealers and the etiquette at the table. For adults only.",
      breadcrumb: "Table games",
    },
  },
  evenimente: {
    ro: {
      path: "/evenimente",
      title: "Seri de jazz, concerte și evenimente private | Salon Ametist (demo)",
      description:
        "Evenimentele de la Salon Ametist: seri de jazz, cine cu degustare, concerte acustice și seri retro, plus saloane pentru evenimente private.",
      breadcrumb: "Evenimente",
    },
    en: {
      path: "/en/events",
      title: "Jazz evenings, concerts and private events | Salon Ametist (demo)",
      description:
        "Events at Salon Ametist: jazz evenings, tasting dinners, acoustic concerts and retro dance nights, plus rooms for private events.",
      breadcrumb: "Events",
    },
  },
  locatia: {
    ro: {
      path: "/locatia",
      title: "Restaurantul, barul și regulile casei | Salon Ametist (demo)",
      description:
        "Locația Salon Ametist: restaurantul, barul și scena, ținuta potrivită, accesul cu act de identitate și regula de 18 ani împliniți.",
      breadcrumb: "Locația",
    },
    en: {
      path: "/en/venue",
      title: "The restaurant, the bar and house rules | Salon Ametist (demo)",
      description:
        "The Salon Ametist venue: the restaurant, the bar and the stage, the dress code, entry with an ID check and the over-18 rule.",
      breadcrumb: "Venue",
    },
  },
  contact: {
    ro: {
      path: "/contact",
      title: "Program, rezervări și întrebări | Salon Ametist (demo)",
      description:
        "Programul Salon Ametist pe zone și formularul pentru rezervări la restaurant, evenimente private sau întrebări. Formular demonstrativ.",
      breadcrumb: "Program și contact",
    },
    en: {
      path: "/en/contact",
      title: "Opening hours, bookings and questions | Salon Ametist (demo)",
      description:
        "Salon Ametist opening hours by area, and the form for restaurant bookings, private events or questions. A demo form.",
      breadcrumb: "Hours and contact",
    },
  },
  "joc-responsabil": {
    ro: {
      path: "/joc-responsabil",
      title: "Joc responsabil | Salon Ametist (demo)",
      description:
        "Ce înseamnă jocul responsabil: limite de timp și bani stabilite dinainte, semnele de alarmă, autoexcluderea și unde găsești ajutor.",
      breadcrumb: "Joc responsabil",
    },
    en: {
      path: "/en/responsible-gaming",
      title: "Responsible gaming | Salon Ametist (demo)",
      description:
        "What responsible gaming means: time and money limits set in advance, the warning signs, self-exclusion and where to find help.",
      breadcrumb: "Responsible gaming",
    },
  },
  "despre-demo": {
    ro: {
      path: "/despre-demo",
      title: "Despre acest site demonstrativ | Salon Ametist",
      description:
        "Ce e inventat și ce e real pe acest site demonstrativ Quality Zone: regulile legale urmate, verificările automate și rezultatele testelor.",
      breadcrumb: "Despre demo",
    },
    en: {
      path: "/en/about-demo",
      title: "About this demo site | Salon Ametist",
      description:
        "What is invented and what is real on this Quality Zone demo site: the legal rules it follows, the automated checks and the test results.",
      breadcrumb: "About the demo",
    },
  },
  confidentialitate: {
    ro: {
      path: "/confidentialitate",
      title: "Confidențialitate | Salon Ametist (demo)",
      description:
        "Ce se întâmplă cu ce scrii în formularul demonstrativ: unde ajunge, cine îl vede și cât timp se păstrează. Fără cookie-uri și fără analytics.",
      breadcrumb: "Confidențialitate",
    },
    en: {
      path: "/en/privacy",
      title: "Privacy | Salon Ametist (demo)",
      description:
        "What happens to what you type in the demo form: where it goes, who sees it and how long it is kept. No cookies and no analytics.",
      breadcrumb: "Privacy",
    },
  },
  acces: {
    ro: {
      path: "/acces-restrictionat",
      title: "Acces doar pentru adulți | Salon Ametist (demo)",
      description:
        "Salon Ametist este un local doar pentru adulți. Dacă nu ai împlinit vârsta minimă, aici afli de ce, și unde găsești informații despre joc responsabil.",
      breadcrumb: "Acces restricționat",
    },
    en: {
      path: "/en/restricted",
      title: "Adults only | Salon Ametist (demo)",
      description:
        "Salon Ametist is a venue for adults only. If you are under the minimum age, this page explains why and where to read about responsible gaming.",
      breadcrumb: "Adults only",
    },
  },
};

export const pages: PageMeta[] = PAGE_KEYS.flatMap((key) =>
  (["ro", "en"] as const).map((lang) => ({
    key,
    lang,
    ...table[key][lang],
    lastModified,
    gated: !UNGATED.includes(key),
  })),
);

export const notFoundPage: PageMeta = {
  key: "404",
  lang: "ro",
  path: "/404",
  title: "Pagina nu există / Page not found | Salon Ametist (demo)",
  description:
    "Pagina căutată nu există pe acest site demonstrativ. The page you were looking for does not exist on this demo site.",
  lastModified,
  gated: true,
};

const byPath = new Map(pages.map((p) => [p.path, p]));

export const pageFor = (pathname: string): PageMeta => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return byPath.get(clean || "/") ?? notFoundPage;
};

export const pathFor = (key: PageKey, lang: Lang): string => table[key][lang].path;

export const twinOf = (page: PageMeta): PageMeta => {
  if (page.key === "404") return page;
  const other: Lang = page.lang === "ro" ? "en" : "ro";
  return byPath.get(pathFor(page.key, other))!;
};

export const canonicalUrl = (path: string): string => site.url + path;
