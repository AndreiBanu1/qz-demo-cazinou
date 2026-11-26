import type { Bilingual, PageContent } from "./types";

// Spec §4 and §3.4. No specific help-line number yet: the user decides before launch whether to list a sourced one
// (docs/preflight.md, checklist item 3).
export const jocResponsabil: Bilingual<PageContent> = {
  ro: {
    h1: "Joc responsabil",
    lead: "Jocurile de noroc sunt un divertisment pentru adulți și pot crea dependență. Pagina aceasta e deschisă oricui, inclusiv celor care își fac griji pentru cineva apropiat.",
    sections: [
      {
        id: "ce-inseamna",
        heading: "Ce înseamnă să joci responsabil",
        paragraphs: [
          "Să joci responsabil înseamnă să tratezi jocul ca pe o cheltuială de divertisment, la fel ca un bilet de concert, și niciodată ca pe o cale de a face bani sau de a rezolva probleme. Pierderile fac parte din joc și nu se „recuperează” jucând mai mult.",
        ],
      },
      {
        id: "limite",
        heading: "Stabilește limitele înainte să ajungi",
        paragraphs: ["Cele mai bune decizii le iei acasă, nu în sală:"],
        list: [
          "hotărăște cât timp stai și pune-ți o alarmă",
          "hotărăște o sumă pe care ți-o permiți să o cheltui și lasă cardul acasă",
          "nu juca atunci când ești supărat, obosit sau după ce ai băut",
          "nu împrumuta bani ca să joci",
          "ia pauze și ieși din sală măcar o dată pe oră",
        ],
      },
      {
        id: "semne",
        heading: "Semne la care să fii atent",
        paragraphs: ["Vorbește cu cineva dacă recunoști unele dintre aceste semne, la tine sau la cineva apropiat:"],
        list: [
          "joci mai mult sau mai des decât ți-ai propus",
          "te gândești la joc tot timpul sau ascunzi cât joci",
          "încerci să recuperezi ce ai pierdut",
          "apar certuri, datorii sau probleme la serviciu din cauza jocului",
          "te simți neliniștit sau iritat când încerci să te oprești",
        ],
      },
      {
        id: "autoexcludere",
        heading: "Autoexcluderea",
        paragraphs: [
          "Poți cere oricând, la recepție, să nu mai ai acces în sălile de joc pentru o perioadă aleasă de tine. Cererea este confidențială, iar personalul o respectă la fiecare intrare. Nu trebuie să explici de ce.",
        ],
      },
      {
        id: "ajutor",
        heading: "Unde găsești ajutor",
        paragraphs: [
          "Dependența de jocuri de noroc se tratează. Primul pas poate fi o discuție cu medicul de familie, care te poate îndruma spre un psiholog sau un psihiatru. Există și linii de sprijin și grupuri de suport pentru jucători și pentru familiile lor.",
          "Oficiul Național pentru Jocuri de Noroc (ONJN) este autoritatea care reglementează jocurile de noroc în România. Pe site-ul lui găsești informații despre jocul responsabil și despre operatorii licențiați.",
        ],
      },
    ],
  },
  en: {
    h1: "Responsible gaming",
    lead: "Gambling is entertainment for adults and can be addictive. This page is open to everyone, including people who are worried about someone close to them.",
    sections: [
      {
        id: "ce-inseamna",
        heading: "What playing responsibly means",
        paragraphs: [
          "Playing responsibly means treating gaming as money spent on entertainment, like a concert ticket, and never as a way to make money or solve problems. Losses are part of the game, and playing more never brings them back.",
        ],
      },
      {
        id: "limite",
        heading: "Set your limits before you arrive",
        paragraphs: ["The best decisions are made at home, not in the gaming room:"],
        list: [
          "decide how long you will stay and set an alarm",
          "decide an amount you can afford to spend and leave your card at home",
          "don't play when you are upset, tired or have been drinking",
          "never borrow money to play",
          "take breaks and leave the room at least once an hour",
        ],
      },
      {
        id: "semne",
        heading: "Signs to watch for",
        paragraphs: ["Talk to someone if you recognise some of these signs, in yourself or in someone close to you:"],
        list: [
          "playing longer or more often than you meant to",
          "thinking about gaming all the time, or hiding how much you play",
          "trying to get back what you have lost",
          "arguments, debts or problems at work because of gaming",
          "feeling restless or irritable when you try to stop",
        ],
      },
      {
        id: "autoexcludere",
        heading: "Self-exclusion",
        paragraphs: [
          "At any time you can ask at the front desk to be barred from the gaming rooms for a period you choose. The request is confidential and the staff respect it at every entry. You don't have to explain why.",
        ],
      },
      {
        id: "ajutor",
        heading: "Where to find help",
        paragraphs: [
          "Gambling addiction can be treated. A first step can be a talk with your GP, who can refer you to a psychologist or a psychiatrist. There are also support lines and support groups for players and their families.",
          "The National Gambling Office (ONJN) is the authority that regulates gambling in Romania. Its website has information on responsible gaming and on licensed operators.",
        ],
      },
    ],
  },
};
