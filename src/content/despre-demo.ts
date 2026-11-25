import { site } from "@/config/site";
import type { Bilingual, Section } from "./types";

export interface LawRow {
  source: string;
  url: string;
  says: string;
  does: string;
}

export interface AboutContent {
  h1: string;
  lead: string;
  invented: Section;
  real: Section;
  law: { heading: string; intro: string; columns: [string, string, string]; rows: LawRow[]; note: string };
  checks: Section;
  banned: { heading: string; intro: string; roLabel: string; enLabel: string };
  results: { heading: string; empty: string };
  choices: Section;
  qz: { text: string; link: string };
}

const OUG = "https://legislatie.just.ro/Public/DetaliiDocumentAfis/108149";
const NORME = "https://legislatie.just.ro/Public/DetaliiDocumentAfis/230068";
const SENAT =
  "https://www.mediafax.ro/politic/senatul-adopta-doua-proiecte-privind-jocurile-de-noroc-varsta-minima-de-acces-creste-la-21-de-ani-reclamele-online-sunt-restrictionate-23687800";
const TIKTOK = "https://www.tiktok.com/community-guidelines/en/regulated-commercial-activities";

export const despreDemo: Bilingual<AboutContent> = {
  ro: {
    h1: "Despre acest site demonstrativ",
    lead: "Salon Ametist nu există. Este un local inventat, iar site-ul arată cum construiește Quality Zone un site de prezentare pentru o industrie reglementată: în două limbi, accesibil și verificat automat la fiecare modificare.",
    invented: {
      id: "inventat",
      heading: "Ce este inventat",
      paragraphs: ["Tot ce ține de local:"],
      list: [
        "numele Salon Ametist, sălile, restaurantul, barul și programul",
        "turneele și evenimentele lunare",
        "desenele, făcute special pentru acest site, fără oameni și fără mărci reale",
      ],
    },
    real: {
      id: "real",
      heading: "Ce este real",
      paragraphs: ["Ce poți verifica:"],
      list: [
        "regulile legale de mai jos, cu sursele lor",
        "verificările automate și rezultatele testelor, cu data rulării",
        "formularul, care trimite cu adevărat un e-mail, dar într-o căsuță de test care nu livrează nimic",
      ],
    },
    law: {
      heading: "Regulile urmate și sursele lor",
      intro: "Textele au fost citite pe legislatie.just.ro pe 25 noiembrie 2026. Un operator real trebuie să le verifice cu un jurist, în forma lor la zi.",
      columns: ["Sursa", "Ce spune", "Ce face acest site"],
      rows: [
        {
          source: "OUG 77/2009, art. 21 alin. (3) lit. c)",
          url: OUG,
          says: "Denumirea „cazinou” este rezervată organizatorilor licențiați, pentru locațiile autorizate.",
          does: "Marca este „Ametist”, fără „cazinou”. Cuvântul apare doar în descrieri, lângă eticheta de demo.",
        },
        {
          source: "Norme HG 111/2016, art. 6 alin. (1)",
          url: NORME,
          says: "Materialele promoționale arată interdicția pentru minori, seria și numărul licenței și sigla ONJN.",
          does: "Fiecare pagină arată interdicția pentru minori. Licența și sigla sunt înlocuite de un chenar punctat: demo-ul nu are licență și nu folosește sigla reală.",
        },
        {
          source: "OUG 77/2009, art. 7; Norme, art. 150 alin. (1) lit. r)",
          url: OUG,
          says: "Participanții sunt adulți, iar minorii nu au acces în locații.",
          does: `Insigna ${site.minAge}+, întrebarea despre vârstă la prima vizită și regula actului de identitate. Vârsta minimă (${site.minAge}) este scrisă într-un singur loc în cod.`,
        },
        {
          source: "Norme, art. 128 (jocuri la distanță)",
          url: NORME,
          says: "Site-urile de jocuri online arată legătura către ONJN, interdicția sub 18 ani și politica de prevenire a dependenței.",
          does: "Nu e obligatoriu pentru un local fizic, dar site-ul le urmează ca bună practică.",
        },
        {
          source: "Senatul, 16 februarie 2026",
          url: SENAT,
          says: "Două proiecte: vârsta minimă de 21 de ani și restricții pentru reclamele online. Decizia finală e la Camera Deputaților.",
          does: "Vârsta se schimbă într-un singur loc dacă legea trece.",
        },
        {
          source: "Regulile TikTok pentru activități comerciale reglementate",
          url: TIKTOK,
          says: "Conținutul obișnuit (nu reclamele) nu poate promova jocuri de noroc.",
          does: "Demo-ul nu are un episod TikTok construit în jurul lui.",
        },
      ],
      note: "Nu am găsit un text obligatoriu pentru mesajul de joc responsabil al unui local fizic. Mesajul din subsol este ales ca bună practică.",
    },
    checks: {
      id: "verificari",
      heading: "Ce se verifică automat, la fiecare build",
      paragraphs: ["Build-ul se oprește dacă una dintre pagini, în oricare limbă:"],
      list: [
        `nu are bannerul de demo, insigna ${site.minAge}+, rândul despre minori, chenarul pentru licență sau legătura către ONJN`,
        "nu are perechea ei în cealaltă limbă, cu hreflang corect",
        "arată întrebarea despre vârstă unde nu trebuie, sau nu o arată unde trebuie",
        "conține un număr de telefon, o adresă de stradă, un link tel: sau o imagine cu sigla ONJN",
        "folosește un cuvânt care încurajează jocul (lista de mai jos)",
      ],
    },
    banned: {
      heading: "Cuvintele care opresc build-ul",
      intro: "Se caută ca cuvinte întregi, fără să conteze majusculele sau diacriticele, în text, titluri, descrieri și textele alternative, și în e-mailul trimis de formular.",
      roLabel: "În română",
      enLabel: "În engleză",
    },
    results: { heading: "Rezultatele testelor", empty: "Rezultatele vor fi adăugate după primele rulări." },
    choices: {
      id: "alegeri",
      heading: "De ce arată așa",
      paragraphs: [
        "Fără fotografii: pozele de stoc din cazinouri arată aproape mereu mărci reale. Desenele sunt făcute pentru acest site.",
        "Fără telefon și fără adresă: un local inventat nu trebuie confundat cu unul real. Unde un site real ar avea un buton de apel, aici apare o notă.",
        "Întrebarea despre vârstă este o declarație, nu o verificare a vârstei. Paginile despre jocul responsabil, despre demo și confidențialitate se deschid fără ea.",
        "Un singur e-mail pe cerere: căsuța de test, pe planul fără plată, primește un mesaj la zece secunde, așa că demo-ul nu trimite și o confirmare vizitatorului. Un local real ar trimite-o.",
        "Fiecare pagină are noindex, ca niciun motor de căutare să nu trimită pe cineva la un local care nu există. De aceea scorul SEO din Lighthouse nu e 100: auditul „Page is blocked from indexing” pică intenționat.",
      ],
    },
    qz: { text: "Site realizat de Quality Zone: site-uri, testare și automatizări.", link: "Vezi Quality Zone" },
  },
  en: {
    h1: "About this demo site",
    lead: "Salon Ametist does not exist. It is an invented venue, and the site shows how Quality Zone builds a presentation site for a regulated industry: in two languages, accessible, and checked automatically on every change.",
    invented: {
      id: "inventat",
      heading: "What is invented",
      paragraphs: ["Everything about the venue:"],
      list: [
        "the name Salon Ametist, its rooms, restaurant, bar and opening hours",
        "the tournaments and monthly events",
        "the drawings, made for this site, with no people and no real brands",
      ],
    },
    real: {
      id: "real",
      heading: "What is real",
      paragraphs: ["What you can check:"],
      list: [
        "the legal rules below, with their sources",
        "the automated checks and the test results, with the date they ran",
        "the form, which really sends an email, but into a test inbox that delivers nothing",
      ],
    },
    law: {
      heading: "The rules followed, and their sources",
      intro: "The texts were read on legislatie.just.ro on 25 November 2026. A real operator must check them with a lawyer, in their current form.",
      columns: ["Source", "What it says", "What this site does"],
      rows: [
        {
          source: "OUG 77/2009, art. 21(3)(c)",
          url: OUG,
          says: "The name „cazinou” (casino) is reserved for licensed organisers, for their authorised venues.",
          does: "The brand is „Ametist”, without „cazinou”. The word appears only in descriptions, next to the demo label.",
        },
        {
          source: "Norme HG 111/2016, art. 6(1)",
          url: NORME,
          says: "Promotional materials show the ban on minors, the licence series and number, and the ONJN logo.",
          does: "Every page shows the ban on minors. The licence and the logo are replaced by a dashed box: the demo has no licence and never uses the real logo.",
        },
        {
          source: "OUG 77/2009, art. 7; Norme, art. 150(1)(r)",
          url: OUG,
          says: "Participants are adults, and minors may not enter the venues.",
          does: `The ${site.minAge}+ badge, the age question on a first visit, and the ID rule. The minimum age (${site.minAge}) is written in one place in the code.`,
        },
        {
          source: "Norme, art. 128 (remote gambling)",
          url: NORME,
          says: "Online gambling sites show a link to ONJN, the under-18 ban and the addiction-prevention policy.",
          does: "Not required for a land-based venue, but the site follows it as good practice.",
        },
        {
          source: "The Senate, 16 February 2026",
          url: SENAT,
          says: "Two bills: a minimum age of 21 and limits on online ads. The final decision lies with the Chamber of Deputies.",
          does: "The age changes in one place if the law passes.",
        },
        {
          source: "TikTok's rules on regulated commercial activities",
          url: TIKTOK,
          says: "Ordinary (non-ad) content may not promote gambling.",
          does: "The demo has no TikTok episode built around it.",
        },
      ],
      note: "We found no mandatory wording for a land-based venue's responsible-gaming message. The footer message is chosen as good practice.",
    },
    checks: {
      id: "verificari",
      heading: "What is checked automatically, on every build",
      paragraphs: ["The build stops if any page, in either language:"],
      list: [
        `lacks the demo banner, the ${site.minAge}+ badge, the minors line, the licence box or the ONJN link`,
        "lacks its twin in the other language, with the right hreflang",
        "shows the age question where it shouldn't, or doesn't show it where it should",
        "contains a phone number, a street address, a tel: link or an image of the ONJN logo",
        "uses a word that encourages gambling (the list below)",
      ],
    },
    banned: {
      heading: "The words that stop the build",
      intro: "They are matched as whole words, ignoring case and diacritics, in the text, titles, descriptions and alt texts, and in the email the form sends.",
      roLabel: "In Romanian",
      enLabel: "In English",
    },
    results: { heading: "Test results", empty: "The results will be added after the first runs." },
    choices: {
      id: "alegeri",
      heading: "Why it looks like this",
      paragraphs: [
        "No photos: stock photos of casinos nearly always show real brands. The drawings were made for this site.",
        "No phone number and no address: an invented venue must not be mistaken for a real one. Where a real site would have a call button, a note appears instead.",
        "The age question is a self-declaration, not age verification. The pages on responsible gaming, the demo and privacy open without it.",
        "One email per request: the no-cost test inbox accepts one message every ten seconds, so the demo doesn't also send the visitor a confirmation. A real venue would.",
        "Every page is noindex, so no search engine sends anyone to a venue that doesn't exist. That is why the Lighthouse SEO score is not 100: the „Page is blocked from indexing” audit fails on purpose.",
      ],
    },
    qz: { text: "Built by Quality Zone: websites, testing and automation.", link: "Visit Quality Zone" },
  },
};

// The banned words as /despre-demo shows them (inside data-copy-allow). tests/unit/check-copy.test.ts makes sure the
// build's check flags every one, so the page can't promise more than the check does.
export const bannedDisplay = {
  ro: ["câștig (și formele lui)", "jackpot", "bonus", "gratuit", "gratis", "garantat", "rotiri", "cote", "miză", "mize", "bani rapizi", "îmbogățire"],
  en: ["win", "winner", "winning", "jackpot", "bonus", "free", "guaranteed", "lucky", "odds", "payout", "spin", "spins", "stake", "stakes", "RTP"],
};
