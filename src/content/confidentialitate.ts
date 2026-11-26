import type { Bilingual, PageContent } from "./types";

export const confidentialitate: Bilingual<PageContent> = {
  ro: {
    h1: "Confidențialitate",
    lead: "Acesta este un site demonstrativ. Ce scrii în formular nu ajunge la niciun local și nu este folosit în alt scop.",
    sections: [
      {
        id: "formular",
        heading: "Ce se întâmplă cu ce scrii în formular",
        paragraphs: [
          "Formularul trimite cererea ta ca e-mail într-o căsuță de test Mailtrap (Email Sandbox) a Quality Zone. O căsuță de test primește mesajele, dar nu le livrează nimănui: nici unui local, nici adresei tale. Poți folosi date inventate.",
          "Căsuța păstrează doar ultimele zece mesaje primite; când sosește unul nou, cel mai vechi se șterge singur. Le citește doar Quality Zone, ca să verifice că formularul funcționează.",
        ],
      },
      {
        id: "turnstile",
        heading: "Verificarea anti-robot",
        paragraphs: [
          "Formularul folosește Cloudflare Turnstile, un serviciu Cloudflare care verifică, de obicei fără să observi, că nu ești un robot. Site-ul este găzduit tot de Cloudflare (Cloudflare Pages).",
        ],
      },
      {
        id: "stocare",
        heading: "Fără cookie-uri și fără analytics",
        paragraphs: [
          "Site-ul nu pune cookie-uri și nu folosește analytics. Singurul lucru păstrat în browserul tău este răspunsul la întrebarea despre vârstă, în sessionStorage, doar cât timp ții deschis tabul.",
        ],
      },
      {
        id: "stergere",
        heading: "Dacă vrei să ștergem ceva",
        paragraphs: [
          "Dacă ai trimis date reale din greșeală și vrei să le ștergem mai repede, scrie-ne prin pagina de contact a Quality Zone.",
        ],
      },
    ],
  },
  en: {
    h1: "Privacy",
    lead: "This is a demo site. What you type in the form never reaches any venue and is not used for anything else.",
    sections: [
      {
        id: "formular",
        heading: "What happens to what you type in the form",
        paragraphs: [
          "The form sends your request as an email into a Mailtrap test inbox (Email Sandbox) belonging to Quality Zone. A test inbox receives messages but delivers them to no one: not to a venue, not to your address. You can use made-up details.",
          "The inbox keeps only the last ten messages it received; when a new one arrives, the oldest is deleted automatically. Only Quality Zone reads them, to check that the form works.",
        ],
      },
      {
        id: "turnstile",
        heading: "The robot check",
        paragraphs: [
          "The form uses Cloudflare Turnstile, a Cloudflare service that checks, usually without you noticing, that you are not a robot. The site itself is hosted by Cloudflare too (Cloudflare Pages).",
        ],
      },
      {
        id: "stocare",
        heading: "No cookies and no analytics",
        paragraphs: [
          "The site sets no cookies and uses no analytics. The only thing kept in your browser is your answer to the age question, in sessionStorage, for as long as the tab stays open.",
        ],
      },
      {
        id: "stergere",
        heading: "If you want something deleted",
        paragraphs: [
          "If you sent real details by mistake and want them deleted sooner, write to us through the Quality Zone contact page.",
        ],
      },
    ],
  },
};
