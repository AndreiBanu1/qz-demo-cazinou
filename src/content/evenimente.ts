import type { Bilingual, PageContent } from "./types";

export const evenimente: Bilingual<PageContent & { formatsHeading: string; privateCta: string }> = {
  ro: {
    h1: "Evenimente",
    lead: "Seri cu muzică live, cine cu degustare și saloane pentru evenimentele tale. Programul se repetă în fiecare lună, așa că știi mereu ce urmează.",
    illustration: { id: "stage", label: "Desen al unei scene mici cu un microfon și o lampă, în linii aurii" },
    formatsHeading: "Ce se întâmplă în fiecare lună",
    privateCta: "Cere o ofertă pentru un eveniment privat",
    sections: [
      {
        id: "privat",
        heading: "Evenimente private",
        paragraphs: [
          "Salonul are saloane private, separate de sălile de joc, potrivite pentru o cină de firmă, o aniversare sau o seară cu prietenii. Bucătăria pregătește meniul împreună cu tine, iar scena poate găzdui o formație sau un DJ.",
          "Spune-ne în formular data la care te gândești, câți invitați ai și ce fel de seară vrei. Îți răspundem cu o propunere. Toți invitații trebuie să fie adulți, pentru că locul este doar pentru persoane de peste vârsta minimă.",
        ],
      },
      {
        id: "intrare",
        heading: "La intrare",
        paragraphs: [
          "La toate evenimentele, intrarea se face cu act de identitate, ca în fiecare seară. Mesele pentru concerte și cine se rezervă din formular, iar locurile la bar rămân pentru cine vine fără rezervare.",
        ],
      },
    ],
  },
  en: {
    h1: "Events",
    lead: "Evenings of live music, tasting dinners and rooms for your own events. The programme repeats every month, so you always know what comes next.",
    illustration: { id: "stage", label: "Drawing of a small stage with a microphone and a lamp, in gold lines" },
    formatsHeading: "What happens every month",
    privateCta: "Ask about a private event",
    sections: [
      {
        id: "privat",
        heading: "Private events",
        paragraphs: [
          "The salon has private rooms, apart from the gaming rooms, that suit a company dinner, a birthday or an evening with friends. The kitchen plans the menu with you, and the stage can host a band or a DJ.",
          "Tell us in the form the date you have in mind, how many guests you expect and what kind of evening you want. We'll reply with a proposal. Every guest must be an adult, because the venue is only for people over the minimum age.",
        ],
      },
      {
        id: "intrare",
        heading: "At the door",
        paragraphs: [
          "At every event, entry is with an ID, as on any evening. Tables for concerts and dinners are booked through the form, and the seats at the bar stay open for anyone who comes without a booking.",
        ],
      },
    ],
  },
};
