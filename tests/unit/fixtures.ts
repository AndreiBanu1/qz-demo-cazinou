// Valid requests of each type, for the schema, template and submission tests.
export const NOW = new Date("2026-11-25T10:00:00Z");

export const masa = {
  tip: "masa",
  data: "2026-11-28",
  ora: "19:30",
  persoane: 4,
  mesaj: "O masă lângă scenă, dacă se poate.",
  nume: "Ana Popescu",
  contact: "ana@example.com",
  varsta: true,
  acord: true,
  limba: "ro",
} as const;

export const eveniment = {
  tip: "eveniment",
  data: "2026-12-12",
  marime: "30-60",
  mesaj: "Cină de firmă.",
  nume: "Dan Ionescu",
  contact: "+40 712 345 678",
  varsta: true,
  acord: true,
  limba: "ro",
} as const;

export const intrebare = {
  tip: "intrebare",
  mesaj: "Is there a dress code?",
  nume: "Sam Green",
  contact: "0712345678",
  varsta: true,
  acord: true,
  limba: "en",
} as const;
