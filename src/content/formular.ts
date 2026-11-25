import { site, type Lang } from "@/config/site";
import type { ErrorCode } from "@/lib/submission";
import type { ErrorKey, RequestType } from "@/lib/request-schema";
import { MAX_MESSAGE, MAX_PEOPLE } from "@/lib/request-schema";

type SendError = Exclude<ErrorCode, "method" | "media" | "server" | "too-large"> | "network";

const ro = {
  notice:
    "Formular demonstrativ. Cererea ta nu ajunge la niciun local: este trimisă într-o căsuță de test a Quality Zone, care nu livrează nimic. Poți folosi date inventate.",
  noscript: "Formularul are nevoie de JavaScript ca să trimită cererea. Pornește JavaScript și reîncarcă pagina.",
  tipLegend: "Ce dorești?",
  types: { masa: "Masă la restaurant sau bar", eveniment: "Eveniment privat", intrebare: "Întrebare" } satisfies Record<RequestType, string>,
  data: "Data",
  dataHint: "Din ziua de mâine, cel mult 90 de zile înainte.",
  ora: "Ora",
  oraPlaceholder: "Alege ora",
  persoane: "Câte persoane?",
  persoaneHint: `Între 1 și ${MAX_PEOPLE}. Pentru grupuri mai mari, alege „Eveniment privat”.`,
  marime: "Câte persoane?",
  marimePlaceholder: "Alege mărimea grupului",
  sizes: { "10-30": "10–30", "30-60": "30–60", "60+": "peste 60" },
  mesaj: "Mesaj",
  mesajOptional: "(opțional)",
  nume: "Nume",
  contact: "Telefon sau email",
  contactHint: "Unul dintre ele e de ajuns.",
  varsta: `Am cel puțin ${site.minAge} ani.`,
  acordBefore: "Am citit pagina de",
  acordLink: "confidențialitate",
  acordAfter: "și sunt de acord ca cererea să fie trimisă.",
  honeypot: "Nu completa acest câmp",
  submit: "Trimite cererea",
  sending: "Se trimite…",
  waiting: "Așteptăm verificarea anti-robot. Încearcă din nou peste câteva secunde.",
  turnstileError: "Verificarea anti-robot nu s-a putut încărca. Verifică conexiunea și reîncarcă pagina.",
  errors: {
    required: "Completează acest câmp.",
    phoneOrEmail: "Scrie un număr de telefon sau o adresă de email.",
    dateRange: "Alege o dată de mâine până la 90 de zile de acum.",
    people: `Scrie un număr între 1 și ${MAX_PEOPLE}.`,
    tooLong: `Textul e prea lung (cel mult ${MAX_MESSAGE} de caractere la mesaj).`,
    mustAccept: "Bifează pentru a trimite cererea.",
    choice: "Alege o variantă.",
  } satisfies Record<ErrorKey, string>,
  success: "Cererea a fost trimisă.",
  successNext:
    "Un local real ți-ar răspunde în scurt timp și ți-ar trimite și o confirmare pe email. Aici, cererea a ajuns doar într-o căsuță de test.",
  again: "Trimite altă cerere",
  sendErrors: {
    turnstile: "Nu am putut verifica că nu ești un robot. Încearcă din nou.",
    invalid: "Unele câmpuri nu sunt completate corect. Verifică-le și încearcă din nou.",
    limit: "Căsuța de test a demo-ului e ocupată sau a atins limita de mesaje de test. Încearcă peste un minut sau mai târziu.",
    send: "Nu s-a putut trimite. Încearcă din nou.",
    config: "Formularul demonstrativ nu este încă legat la căsuța de test. Încearcă mai târziu.",
    network: "Nu s-a putut trimite. Verifică conexiunea și încearcă din nou.",
  } satisfies Record<SendError, string>,
  retry: "Încearcă din nou",
};

type Formular = typeof ro;

const en = {
  notice:
    "Demo form. Your request reaches no venue: it goes to a Quality Zone test inbox that delivers nothing. You can use made-up details.",
  noscript: "The form needs JavaScript to send your request. Turn JavaScript on and reload the page.",
  tipLegend: "What would you like?",
  types: { masa: "A table at the restaurant or bar", eveniment: "A private event", intrebare: "A question" },
  data: "Date",
  dataHint: "From tomorrow, up to 90 days ahead.",
  ora: "Time",
  oraPlaceholder: "Choose a time",
  persoane: "How many people?",
  persoaneHint: `From 1 to ${MAX_PEOPLE}. For larger groups, choose "A private event".`,
  marime: "How many people?",
  marimePlaceholder: "Choose the group size",
  sizes: { "10-30": "10–30", "30-60": "30–60", "60+": "over 60" },
  mesaj: "Message",
  mesajOptional: "(optional)",
  nume: "Name",
  contact: "Phone or email",
  contactHint: "Either one is enough.",
  varsta: `I am ${site.minAge} or over.`,
  acordBefore: "I have read the",
  acordLink: "privacy page",
  acordAfter: "and agree to my request being sent.",
  honeypot: "Leave this field empty",
  submit: "Send the request",
  sending: "Sending…",
  waiting: "Waiting for the robot check. Try again in a few seconds.",
  turnstileError: "The robot check could not load. Check your connection and reload the page.",
  errors: {
    required: "Fill in this field.",
    phoneOrEmail: "Enter a phone number or an email address.",
    dateRange: "Choose a date from tomorrow up to 90 days from now.",
    people: `Enter a number from 1 to ${MAX_PEOPLE}.`,
    tooLong: `The text is too long (at most ${MAX_MESSAGE} characters for the message).`,
    mustAccept: "Tick this box to send the request.",
    choice: "Choose an option.",
  },
  success: "Your request has been sent.",
  successNext:
    "A real venue would reply soon and also email you a confirmation. Here, the request only reached a test inbox.",
  again: "Send another request",
  sendErrors: {
    turnstile: "We couldn't confirm you're not a robot. Try again.",
    invalid: "Some fields aren't filled in correctly. Check them and try again.",
    limit: "The demo's test inbox is busy or has reached its test-message limit. Try again in a minute or later.",
    send: "The request couldn't be sent. Try again.",
    config: "The demo form isn't connected to its test inbox yet. Try again later.",
    network: "The request couldn't be sent. Check your connection and try again.",
  },
  retry: "Try again",
} satisfies Formular;

export const formular: Record<Lang, Formular> = { ro, en };
export type { SendError };
