import type { Bilingual, PageContent } from "./types";

export const locatia: Bilingual<PageContent> = {
  ro: {
    h1: "Locația",
    lead: "Salon Ametist este o clădire veche, renovată, într-un oraș din România: un restaurant la parter, un bar cu scenă și sălile de joc la etaj.",
    illustration: { id: "bar", label: "Clădirea în secțiune: sălile de joc la etaj, restaurantul, barul și scena la parter, legate de scări și un lift" },
    sections: [
      {
        id: "etaje",
        heading: "Cum e așezat salonul",
        paragraphs: ["Desenul de sus arată clădirea în secțiune. Pe scurt:"],
        list: [
          "parterul: restaurantul, barul și scena mică, deschise oricui are vârsta minimă",
          "etajul: sălile de joc, cu camera de poker, mesele de joc și sala de sloturi, separate de zona de seară",
          "un lift și scări leagă cele două niveluri",
        ],
      },
      {
        id: "restaurant",
        heading: "Restaurantul",
        paragraphs: [
          "Restaurantul de la parter are bucătărie românească și europeană, cu un meniu care se schimbă după sezon. Seara, luminile coboară și restaurantul devine locul de început pentru o seară în oraș.",
        ],
      },
      {
        id: "bar",
        heading: "Barul și scena",
        paragraphs: [
          "Barul are o listă de cocktailuri clasice, vinuri românești la pahar și băuturi fără alcool la fel de îngrijite. Scena mică de lângă bar găzduiește concertele și serile de dans.",
        ],
      },
      {
        id: "tinuta",
        heading: "Ținuta",
        paragraphs: [
          "Ținuta este smart casual: fără haine de sport sau de plajă. La cinele cu degustare și la evenimentele private, mulți oaspeți aleg o ținută de seară, dar nu e obligatoriu.",
        ],
      },
      {
        id: "intrare",
        heading: "Regulile de la intrare",
        paragraphs: [
          "Accesul este permis doar persoanelor care au împlinit vârsta minimă legală. La intrare îți cerem un act de identitate valabil, la fiecare vizită, ca să păstrăm sălile de joc doar pentru adulți.",
        ],
        list: [
          "act de identitate valabil, la fiecare vizită",
          "doar adulți, inclusiv la restaurant și la evenimente",
          "fotografiatul în sălile de joc nu este permis",
          "personalul poate refuza accesul cuiva care pare să nu se simtă bine",
        ],
      },
      {
        id: "accesibilitate",
        heading: "Accesibilitate",
        paragraphs: [
          "Parterul și etajul sunt legate printr-un lift, iar toaletele de la fiecare nivel sunt accesibile cu scaunul rulant. Dacă ai nevoie de ajutor la sosire, scrie-ne în formular și te așteptăm.",
        ],
      },
    ],
  },
  en: {
    h1: "The venue",
    lead: "Salon Ametist is an old, restored building in a city in Romania: a restaurant on the ground floor, a bar with a stage, and the gaming rooms upstairs.",
    illustration: { id: "bar", label: "The building in cross-section: the gaming rooms upstairs, the restaurant, bar and stage on the ground floor, joined by stairs and a lift" },
    sections: [
      {
        id: "etaje",
        heading: "How the salon is laid out",
        paragraphs: ["The drawing above shows the building in cross-section. In short:"],
        list: [
          "the ground floor: the restaurant, the bar and the small stage, open to anyone over the minimum age",
          "upstairs: the gaming rooms, with the poker room, the gaming tables and the slot room, apart from the evening areas",
          "a lift and stairs connect the two levels",
        ],
      },
      {
        id: "restaurant",
        heading: "The restaurant",
        paragraphs: [
          "The ground-floor restaurant serves Romanian and European food, with a menu that changes with the seasons. In the evening the lights go down and the restaurant becomes the place to start a night out.",
        ],
      },
      {
        id: "bar",
        heading: "The bar and stage",
        paragraphs: [
          "The bar has a list of classic cocktails, Romanian wines by the glass and non-alcoholic drinks made with the same care. The small stage next to the bar hosts the concerts and dance nights.",
        ],
      },
      {
        id: "tinuta",
        heading: "Dress code",
        paragraphs: [
          "The dress code is smart casual: no sportswear or beachwear. At tasting dinners and private events many guests choose evening wear, but it is not required.",
        ],
      },
      {
        id: "intrare",
        heading: "House rules at the door",
        paragraphs: [
          "Entry is only for people over the legal minimum age. We ask for a valid ID at the door on every visit, to keep the gaming rooms for adults only.",
        ],
        list: [
          "a valid ID, on every visit",
          "adults only, including in the restaurant and at events",
          "no photography in the gaming rooms",
          "staff may refuse entry to anyone who seems unwell",
        ],
      },
      {
        id: "accesibilitate",
        heading: "Accessibility",
        paragraphs: [
          "A lift connects the ground floor and the upper floor, and the toilets on each level are wheelchair accessible. If you need help when you arrive, tell us in the form and we'll be waiting.",
        ],
      },
    ],
  },
};
