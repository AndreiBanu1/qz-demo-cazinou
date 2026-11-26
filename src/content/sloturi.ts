import type { Bilingual, PageContent } from "./types";

export const sloturi: Bilingual<PageContent> = {
  ro: {
    h1: "Sala de sloturi",
    lead: "O sală liniștită, cu lumină caldă și mult spațiu între aparate. Aici vii pentru atmosferă și pentru o pauză de la oraș, nu pentru grabă.",
    illustration: { id: "slots", label: "Desen cu un rând de aparate de joc cu ecrane goale, sub o arcadă de becuri aurii" },
    sections: [
      {
        id: "sala",
        heading: "Cum arată sala",
        paragraphs: [
          "Sala de sloturi este la etaj, separată de restaurant și de bar. Aparatele sunt așezate în rânduri aerisite, cu scaune comode și mese mici pentru un pahar. Muzica e încetă, iar luminile nu clipesc: am vrut o sală în care să te simți bine, nu una care să te grăbească.",
          "Avem aparate clasice, cu role, și aparate video mai noi. Nu le prezentăm pe nume și nu facem promoții pentru ele: pe acest site vorbim despre loc, nu despre joc.",
        ],
      },
      {
        id: "colturi",
        heading: "Colțuri retrase",
        paragraphs: [
          "Pe lângă rândurile principale, sala are câteva colțuri retrase, pentru cine preferă liniștea. Personalul trece regulat și te poate ajuta cu orice întrebare despre aparate sau despre program.",
        ],
      },
      {
        id: "pauze",
        heading: "Pauze la bar",
        paragraphs: [
          "Barul de la etaj servește cafea, ceai, sucuri naturale și băuturi la pahar. O pauză e un obicei bun: te ridici, schimbi locul, te uiți la ceas și decizi cu mintea limpede dacă mai stai.",
        ],
      },
      {
        id: "responsabil",
        heading: "Joacă responsabil",
        paragraphs: [
          "Stabilește dinainte cât timp și câți bani vrei să cheltui într-o seară și respectă limita. Jocul este o formă de divertisment, nu o cale de a face bani. Dacă simți că pierzi controlul, cere ajutorul personalului sau citește pagina despre jocul responsabil.",
        ],
      },
    ],
  },
  en: {
    h1: "The slot room",
    lead: "A quiet room with warm light and plenty of space between the machines. You come here for the atmosphere and a break from the city, not to rush.",
    illustration: { id: "slots", label: "Drawing of a row of gaming machines with blank screens, under an arch of gold lights" },
    sections: [
      {
        id: "sala",
        heading: "What the room is like",
        paragraphs: [
          "The slot room is upstairs, apart from the restaurant and the bar. The machines stand in airy rows, with comfortable seats and small tables for a drink. The music is soft and the lights never flash: we wanted a room where you feel at ease, not one that hurries you.",
          "We have classic reel machines and newer video machines. We don't name them and we don't run promotions for them: this site is about the place, not about playing.",
        ],
      },
      {
        id: "colturi",
        heading: "Tucked-away corners",
        paragraphs: [
          "Besides the main rows, the room has a few quieter corners for anyone who prefers calm. Staff walk through regularly and can help with any question about the machines or the opening hours.",
        ],
      },
      {
        id: "pauze",
        heading: "Breaks at the bar",
        paragraphs: [
          "The upstairs bar serves coffee, tea, fresh juices and drinks by the glass. A break is a good habit: you get up, change places, check the time and decide with a clear head whether to stay.",
        ],
      },
      {
        id: "responsabil",
        heading: "Play responsibly",
        paragraphs: [
          "Decide in advance how long you want to stay and how much you want to spend in an evening, and keep to it. Gaming is a form of entertainment, not a way to make money. If you feel you are losing control, ask the staff for help or read the page on responsible gaming.",
        ],
      },
    ],
  },
};
