import type { Bilingual, PageContent } from "./types";

export const pokerPage: Bilingual<PageContent & { programme: { heading: string; intro: string; column: string; day: string; time: string; game: string; format: string; daily: string; cash: string } }> = {
  ro: {
    h1: "Camera de poker",
    lead: "O cameră separată, cu mese acoperite cu postav verde închis, dealeri care cunosc regulile pe de rost și un program săptămânal de turnee.",
    illustration: { id: "cardTable", label: "Masa de poker văzută de sus: postav verde, cărți cu fața în jos la fiecare loc și locul dealerului" },
    programme: {
      heading: "Programul săptămânal",
      column: "Turnee și mese cash",
      intro: "Programul este același în fiecare săptămână. Înscrierea la turnee se face la recepția camerei de poker, în seara respectivă; site-ul nu primește înscrieri.",
      day: "Ziua",
      time: "Ora",
      game: "Jocul",
      format: "Format",
      daily: "Zilnic",
      cash: "Mai multe jocuri",
    },
    sections: [
      {
        id: "camera",
        heading: "Camera",
        paragraphs: [
          "Camera de poker are intrare separată din holul principal și o atmosferă mai liniștită decât restul salonului. Fiecare masă are dealerul ei, iar un manager de sală are grijă ca jocul să decurgă după reguli.",
          "Între mâini poți comanda de la bar, iar o mică zonă de lounge îți dă loc pentru o pauză departe de mese.",
        ],
      },
      {
        id: "seara",
        heading: "Cum decurge o seară de turneu",
        paragraphs: [
          "Te prezinți la recepția camerei înainte de ora de început, cu actul de identitate. Primești locul la masă prin tragere la sorți, iar dealerul explică structura serii: nivelurile, pauzele și ora la care se termină înscrierile.",
          "Turneul are pauze regulate, în care barul și lounge-ul te așteaptă. Poți pleca oricând, iar personalul te ajută dacă ai nevoie de o pauză mai lungă.",
        ],
      },
      {
        id: "eticheta",
        heading: "Bunele maniere la masă",
        paragraphs: ["Câteva reguli simple fac seara plăcută pentru toată lumea:"],
        list: [
          "telefonul rămâne pe silențios și deoparte în timpul mâinii",
          "joci când îți vine rândul și anunți clar ce faci",
          "nu comentezi mâinile altora în timp ce se joacă",
          "deciziile dealerului și ale managerului de sală se respectă",
        ],
      },
    ],
  },
  en: {
    h1: "The poker room",
    lead: "A separate room with tables in deep green baize, dealers who know the rules by heart, and a weekly tournament programme.",
    illustration: { id: "cardTable", label: "The poker table seen from above: green baize, face-down cards at each seat and the dealer's place" },
    programme: {
      heading: "The weekly programme",
      column: "Tournaments and cash tables",
      intro: "The programme is the same every week. Tournament entry is at the poker room's front desk on the evening itself; the site takes no sign-ups.",
      day: "Day",
      time: "Time",
      game: "Game",
      format: "Format",
      daily: "Daily",
      cash: "Several games",
    },
    sections: [
      {
        id: "camera",
        heading: "The room",
        paragraphs: [
          "The poker room has its own entrance off the main hall and a calmer feel than the rest of the salon. Every table has its own dealer, and a floor manager makes sure the game follows the rules.",
          "Between hands you can order from the bar, and a small lounge gives you somewhere to take a break away from the tables.",
        ],
      },
      {
        id: "seara",
        heading: "How a tournament evening runs",
        paragraphs: [
          "You come to the poker room's front desk before the start time, with your ID. Your seat is drawn at random, and the dealer explains how the evening is structured: the levels, the breaks and the time entries close.",
          "The tournament has regular breaks, when the bar and the lounge are there for you. You can leave at any time, and the staff will help if you need a longer pause.",
        ],
      },
      {
        id: "eticheta",
        heading: "Table manners",
        paragraphs: ["A few simple rules keep the evening pleasant for everyone:"],
        list: [
          "your phone stays silent and put away during a hand",
          "you act in turn and say clearly what you are doing",
          "you don't comment on other players' hands while they are being played",
          "the decisions of the dealer and the floor manager are respected",
        ],
      },
    ],
  },
};
