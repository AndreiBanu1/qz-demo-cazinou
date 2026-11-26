import type { Lang } from "@/config/site";

// The invented venue's hours and weekly programme (spec §5). No calendar dates, prices, buy-ins or counts.
export interface Hours {
  id: "jocuri" | "restaurant" | "bar";
  area: Record<Lang, string>;
  open: string;
  close: string;
}

export const hours: Hours[] = [
  { id: "jocuri", area: { ro: "Sălile de joc (sloturi, mese, poker)", en: "Gaming rooms (slots, tables, poker)" }, open: "14:00", close: "04:00" },
  { id: "restaurant", area: { ro: "Restaurantul", en: "The restaurant" }, open: "18:00", close: "24:00" },
  { id: "bar", area: { ro: "Barul și scena", en: "The bar and stage" }, open: "18:00", close: "02:00" },
];

export const daily: Record<Lang, string> = { ro: "zilnic", en: "daily" };

/** 0 is Sunday, as in Date#getDay; "daily" is every day. */
export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6 | "daily";

export const dayNames: Record<Lang, Record<Exclude<Day, "daily">, string>> = {
  ro: { 0: "Duminică", 1: "Luni", 2: "Marți", 3: "Miercuri", 4: "Joi", 5: "Vineri", 6: "Sâmbătă" },
  en: { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" },
};

export interface PokerSlot {
  day: Day;
  time: string;
  /** The game's own name, the same in both languages; null for the cash tables, which run several games. */
  game: string | null;
  format: Record<Lang, string>;
}

// The weekly poker programme (spec §5): weekdays and times only. No buy-ins, prizes or seat counts.
export const poker: PokerSlot[] = [
  { day: 2, time: "20:00", game: "Texas Hold'em", format: { ro: "Turneu", en: "Tournament" } },
  { day: 4, time: "20:00", game: "Omaha", format: { ro: "Turneu", en: "Tournament" } },
  { day: 6, time: "19:00", game: "Texas Hold'em", format: { ro: "Turneu", en: "Tournament" } },
  { day: "daily", time: "18:00", game: null, format: { ro: "Mese cash, de la ora de început", en: "Cash tables, from the start time" } },
];

export interface EventFormat {
  id: "jazz" | "degustare" | "acustic" | "retro";
  when: Record<Lang, string>;
  title: Record<Lang, string>;
  text: Record<Lang, string>;
}

// Recurring event formats (spec §5): no dates, prices or performer names.
export const events: EventFormat[] = [
  {
    id: "jazz",
    when: { ro: "Prima vineri din lună", en: "First Friday of the month" },
    title: { ro: "Seară de jazz", en: "Jazz evening" },
    text: {
      ro: "Un trio pe scena barului, lumini joase și o listă scurtă de cocktailuri clasice. Mesele din fața scenei se rezervă din formular.",
      en: "A trio on the bar stage, low lights and a short list of classic cocktails. The tables in front of the stage can be booked through the form.",
    },
  },
  {
    id: "degustare",
    when: { ro: "A doua joi din lună", en: "Second Thursday of the month" },
    title: { ro: "Cină cu degustare", en: "Tasting dinner" },
    text: {
      ro: "Un meniu de mai multe feluri, gândit de bucătarul nostru, cu vinuri românești alese pentru fiecare fel. Locurile sunt puține, așa că rezervarea e necesară.",
      en: "A menu of several courses from our chef, with Romanian wines chosen for each course. Seats are limited, so booking is needed.",
    },
  },
  {
    id: "acustic",
    when: { ro: "În fiecare sâmbătă", en: "Every Saturday" },
    title: { ro: "Concert acustic", en: "Acoustic concert" },
    text: {
      ro: "Muzică acustică pe scena mică, de la începutul serii. Un concert liniștit, potrivit pentru o cină sau un pahar la bar.",
      en: "Acoustic music on the small stage from early evening. A quiet concert that suits a dinner or a drink at the bar.",
    },
  },
  {
    id: "retro",
    when: { ro: "Ultima vineri din lună", en: "Last Friday of the month" },
    title: { ro: "Seară de dans retro", en: "Retro dance night" },
    text: {
      ro: "Muzica anilor '70 și '80, un ring de dans lângă bar și ținută pe măsură, dacă îți place. Sala de joc rămâne separată și liniștită.",
      en: "Music from the 70s and 80s, a dance floor by the bar and a matching outfit if you like. The gaming rooms stay separate and quiet.",
    },
  },
];
