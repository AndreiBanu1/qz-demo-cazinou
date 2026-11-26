import type { Bilingual, PageContent } from "./types";

export const mese: Bilingual<PageContent> = {
  ro: {
    h1: "Jocurile la masă",
    lead: "Ruletă, blackjack și baccara, la mese cu dealeri, în sala mare a salonului. Descriem aici cum arată fiecare joc, nu cum se joacă pentru bani.",
    illustration: { id: "wheel", label: "Roata unei rulete desenată ca un obiect lucrat de mână, fără bilă și fără numere" },
    sections: [
      {
        id: "ruleta",
        heading: "Ruleta",
        paragraphs: [
          "Masa de ruletă e cea mai veche din sala mare și, pentru mulți, cea mai elegantă. Dealerul pornește roata, anunță clar fiecare etapă și ține ritmul mesei. E un joc în care se vorbește încet și se urmărește cu atenție.",
        ],
      },
      {
        id: "blackjack",
        heading: "Blackjack",
        paragraphs: [
          "La blackjack stai față în față cu dealerul, la o masă în formă de semicerc. Dealerul explică regulile casei oricui se așază prima dată și răspunde la întrebări între mâini.",
        ],
      },
      {
        id: "baccara",
        heading: "Baccara",
        paragraphs: [
          "Baccara se joacă la o masă mai mică și mai liniștită, cu un ritm lent și ceremonios. Dealerul conduce totul, așa că e un joc pe care îl poți urmări fără grabă.",
        ],
      },
      {
        id: "eticheta",
        heading: "La masă",
        paragraphs: [
          "Dealerii sunt acolo și ca să te ajute. Dacă e prima ta seară la o masă, spune-le: îți explică pașii fără să te grăbească. Telefoanele rămân deoparte, iar fotografiatul în sala de joc nu este permis, din respect pentru ceilalți oaspeți.",
          "Jocul la masă este un divertisment pentru adulți. Stabilește-ți dinainte limitele de timp și de bani și ia pauze. Dacă simți că jocul nu mai e o plăcere, oprește-te și citește pagina despre jocul responsabil.",
        ],
      },
    ],
  },
  en: {
    h1: "The table games",
    lead: "Roulette, blackjack and baccarat, at dealer tables in the salon's main hall. Here we describe what each game is like, not how to play it for money.",
    illustration: { id: "wheel", label: "A roulette wheel drawn as a piece of craftsmanship, with no ball and no numbers" },
    sections: [
      {
        id: "ruleta",
        heading: "Roulette",
        paragraphs: [
          "The roulette table is the oldest in the main hall and, for many, the most elegant. The dealer sets the wheel going, announces each stage clearly and keeps the table's rhythm. It is a game of quiet voices and close attention.",
        ],
      },
      {
        id: "blackjack",
        heading: "Blackjack",
        paragraphs: [
          "At blackjack you sit facing the dealer at a half-moon table. The dealer explains the house rules to anyone sitting down for the first time and answers questions between hands.",
        ],
      },
      {
        id: "baccara",
        heading: "Baccarat",
        paragraphs: [
          "Baccarat is played at a smaller, quieter table, at a slow and ceremonious pace. The dealer runs everything, so it is a game you can follow without hurry.",
        ],
      },
      {
        id: "eticheta",
        heading: "At the table",
        paragraphs: [
          "The dealers are there to help you, too. If it is your first evening at a table, tell them: they will explain the steps without rushing you. Phones stay put away, and photography is not allowed in the gaming hall, out of respect for other guests.",
          "Table games are entertainment for adults. Set your time and money limits in advance and take breaks. If playing stops being a pleasure, stop and read the page on responsible gaming.",
        ],
      },
    ],
  },
};
