import type { PageKey } from "@/config/pages";
import type { Bilingual, IllustrationId } from "./types";

export interface HomeContent {
  h1: string;
  lead: string;
  cta: string;
  illustrationLabel: string;
  areasHeading: string;
  areas: { key: Extract<PageKey, "sloturi" | "poker" | "mese" | "evenimente" | "locatia">; title: string; text: string; illustration: IllustrationId }[];
  hoursHeading: string;
  adultsHeading: string;
  adults: string;
  responsibleLink: string;
}

export const home: Bilingual<HomeContent> = {
  ro: {
    h1: "O seară în oraș, la Salon Ametist",
    lead: "Un restaurant cu bucătărie de sezon, un bar cu muzică live și, la etaj, sălile de joc. Un loc elegant și liniștit, doar pentru adulți.",
    cta: "Rezervă o masă",
    illustrationLabel: "Desen al unei pietre de ametist cu fațete, în linii aurii pe fond violet",
    areasHeading: "Ce găsești la noi",
    areas: [
      { key: "locatia", title: "Restaurantul și barul", text: "Cină la parter, cocktailuri clasice și o scenă mică lângă bar.", illustration: "bar" },
      { key: "evenimente", title: "Evenimente", text: "Seri de jazz, cine cu degustare, concerte acustice și saloane private.", illustration: "stage" },
      { key: "poker", title: "Camera de poker", text: "O cameră separată, cu dealeri și un program săptămânal de turnee.", illustration: "cardTable" },
      { key: "mese", title: "Jocurile la masă", text: "Ruletă, blackjack și baccara, în sala mare, cu dealeri.", illustration: "wheel" },
      { key: "sloturi", title: "Sala de sloturi", text: "O sală liniștită la etaj, cu colțuri retrase și pauze la bar.", illustration: "slots" },
    ],
    hoursHeading: "Când suntem deschiși",
    adultsHeading: "Doar pentru adulți",
    adults:
      "Accesul este permis doar persoanelor care au împlinit vârsta minimă legală, cu act de identitate la fiecare vizită. Jocurile de noroc pot crea dependență: stabilește-ți limitele dinainte și joacă doar cât îți face plăcere.",
    responsibleLink: "Despre jocul responsabil",
  },
  en: {
    h1: "An evening out at Salon Ametist",
    lead: "A restaurant with seasonal food, a bar with live music and, upstairs, the gaming rooms. An elegant, quiet place, for adults only.",
    cta: "Book a table",
    illustrationLabel: "Drawing of a faceted amethyst stone, in gold lines on violet",
    areasHeading: "What you'll find here",
    areas: [
      { key: "locatia", title: "The restaurant and bar", text: "Dinner on the ground floor, classic cocktails and a small stage by the bar.", illustration: "bar" },
      { key: "evenimente", title: "Events", text: "Jazz evenings, tasting dinners, acoustic concerts and private rooms.", illustration: "stage" },
      { key: "poker", title: "The poker room", text: "A separate room with dealers and a weekly tournament programme.", illustration: "cardTable" },
      { key: "mese", title: "The table games", text: "Roulette, blackjack and baccarat in the main hall, with dealers.", illustration: "wheel" },
      { key: "sloturi", title: "The slot room", text: "A quiet room upstairs, with tucked-away corners and breaks at the bar.", illustration: "slots" },
    ],
    hoursHeading: "When we're open",
    adultsHeading: "Adults only",
    adults:
      "Entry is only for people over the legal minimum age, with an ID on every visit. Gambling can be addictive: set your limits in advance and play only for as long as you enjoy it.",
    responsibleLink: "About responsible gaming",
  },
};
