import type { Bilingual } from "./types";

export const contact: Bilingual<{ h1: string; lead: string; hoursHeading: string; formHeading: string; callHeading: string }> = {
  ro: {
    h1: "Program și contact",
    lead: "Programul pe zone și formularul pentru rezervări la restaurant sau bar, evenimente private și întrebări.",
    hoursHeading: "Programul",
    formHeading: "Rezervări și întrebări",
    callHeading: "Preferi să suni?",
  },
  en: {
    h1: "Opening hours and contact",
    lead: "Opening hours by area, and the form for restaurant or bar bookings, private events and questions.",
    hoursHeading: "Opening hours",
    formHeading: "Bookings and questions",
    callHeading: "Rather call?",
  },
};
