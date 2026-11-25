import { site, type Lang } from "@/config/site";

// The page the age gate's "No" leads to (spec §3.3). It never shows the gate.
export const acces: Record<Lang, { h1: string; paragraphs: string[]; responsible: string; home: string }> = {
  ro: {
    h1: "Salon Ametist este doar pentru adulți",
    paragraphs: [
      `Sălile de joc sunt deschise doar persoanelor care au împlinit ${site.minAge} ani. Legea din România interzice minorilor accesul în locurile unde se organizează jocuri de noroc, iar la intrare cerem un act de identitate.`,
      "Dacă ai ajuns aici din greșeală, poți răspunde din nou la întrebare de pe pagina principală. Dacă vrei să afli ce înseamnă jocul responsabil, pentru tine sau pentru cineva apropiat, pagina de mai jos e deschisă oricui.",
    ],
    responsible: "Citește despre jocul responsabil",
    home: "Înapoi la pagina principală",
  },
  en: {
    h1: "Salon Ametist is for adults only",
    paragraphs: [
      `The gaming rooms are open only to people aged ${site.minAge} or over. Romanian law bars minors from places where gambling takes place, and we ask for an ID at the door.`,
      "If you got here by mistake, you can answer the question again from the home page. If you want to read about responsible gaming, for yourself or for someone close to you, the page below is open to everyone.",
    ],
    responsible: "Read about responsible gaming",
    home: "Back to the home page",
  },
};
