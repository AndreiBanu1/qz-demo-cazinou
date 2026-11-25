import { site, type Lang } from "@/config/site";

// Shared interface strings in both languages (spec §4, §3.3, §3.4). The two objects must have the same shape:
// tests/unit/content.test.ts compares them key by key, and `satisfies` makes a missing key a type error.
const ro = {
  skip: "Sari la conținut",
  bannerLabel: "Despre acest site",
  banner: site.bannerText.ro,
  nav: {
    label: "Navigare principală",
    menu: "Meniu",
    close: "Închide meniul",
    sloturi: "Sloturi",
    poker: "Poker",
    mese: "Jocuri la masă",
    evenimente: "Evenimente",
    locatia: "Locația",
    contact: "Contact",
  },
  badge: { text: `${site.minAge}+`, label: `Doar pentru persoane de cel puțin ${site.minAge} ani` },
  langSwitch: { label: "English", title: "Read this page in English" },
  footer: {
    hoursTitle: "Program",
    minors: "Jocurile de noroc sunt interzise minorilor. Jocurile de noroc pot crea dependență. Joacă responsabil.",
    licence: "Aici un operator licențiat afișează seria și numărul licenței și sigla ONJN. Demo: fără licență.",
    linksLabel: "Linkuri utile",
    responsible: "Joc responsabil",
    about: "Despre demo",
    privacy: "Confidențialitate",
    onjn: "Oficiul Național pentru Jocuri de Noroc (onjn.gov.ro)",
    builtBy: "Site demonstrativ realizat de",
  },
  gate: {
    title: "Salon Ametist",
    question: `Ai cel puțin ${site.minAge} ani?`,
    text: "Accesul în sălile de joc este permis doar adulților. Răspunsul tău rămâne doar în acest tab al browserului.",
    demo: "Site demonstrativ realizat de Quality Zone, pentru un local inventat.",
    yes: `Da, am ${site.minAge}+`,
    no: "Nu",
  },
  callNote: {
    button: "Sună",
    text: "Pe un site real, butonul acesta ar suna la local. Aici e un site demonstrativ, așa că formularul este drumul spre noi.",
    link: "Mergi la formular",
  },
  breadcrumbHome: "Acasă",
};

type Ui = typeof ro;

const en = {
  skip: "Skip to content",
  bannerLabel: "About this site",
  banner: site.bannerText.en,
  nav: {
    label: "Main navigation",
    menu: "Menu",
    close: "Close the menu",
    sloturi: "Slots",
    poker: "Poker",
    mese: "Table games",
    evenimente: "Events",
    locatia: "Venue",
    contact: "Contact",
  },
  badge: { text: `${site.minAge}+`, label: `Only for people aged ${site.minAge} or over` },
  langSwitch: { label: "Română", title: "Citește pagina în limba română" },
  footer: {
    hoursTitle: "Opening hours",
    minors: "Gambling is prohibited for minors. Gambling can be addictive. Play responsibly.",
    licence: "This is where a licensed operator shows its licence series and number and the ONJN logo. Demo: no licence.",
    linksLabel: "Useful links",
    responsible: "Responsible gaming",
    about: "About the demo",
    privacy: "Privacy",
    onjn: "National Gambling Office of Romania (onjn.gov.ro)",
    builtBy: "Demo site built by",
  },
  gate: {
    title: "Salon Ametist",
    question: `Are you ${site.minAge} or over?`,
    text: "The gaming rooms are for adults only. Your answer stays in this browser tab only.",
    demo: "A demo site built by Quality Zone, for an invented venue.",
    yes: `Yes, I'm ${site.minAge}+`,
    no: "No",
  },
  callNote: {
    button: "Call",
    text: "On a real site, this button would call the venue. This is a demo site, so the form is the way to reach us.",
    link: "Go to the form",
  },
  breadcrumbHome: "Home",
} satisfies Ui;

export const ui: Record<Lang, Ui> = { ro, en };
