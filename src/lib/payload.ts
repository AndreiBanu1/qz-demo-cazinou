import type { Lang } from "../config/site";
import type { RequestType } from "./request-schema";

/** What the form holds while someone types: strings and checkboxes, every field of every type. */
export interface FormValues {
  tip: RequestType;
  data: string;
  ora: string;
  persoane: string;
  marime: string;
  mesaj: string;
  nume: string;
  contact: string;
  varsta: boolean;
  acord: boolean;
  "bot-field": string;
}

export const emptyValues = (tip: RequestType = "masa"): FormValues => ({
  tip,
  data: "",
  ora: "",
  persoane: "",
  marime: "",
  mesaj: "",
  nume: "",
  contact: "",
  varsta: false,
  acord: false,
  "bot-field": "",
});

/**
 * The JSON body for POST /api/cerere: only the fields of the chosen type (Review Focus 3: values typed for another
 * type before switching are dropped), with persoane as a number, the page language and the Turnstile token.
 * Empty optional values are left out, so the schema reports a missing required one by name.
 */
export const buildPayload = (v: FormValues, lang: Lang, token: string): Record<string, unknown> => {
  const out: Record<string, unknown> = { tip: v.tip };
  if (v.tip !== "intrebare") out.data = v.data;
  if (v.tip === "masa") {
    out.ora = v.ora;
    if (v.persoane.trim() !== "") out.persoane = Number(v.persoane);
  }
  if (v.tip === "eveniment") out.marime = v.marime;
  if (v.tip === "intrebare" || v.mesaj.trim() !== "") out.mesaj = v.mesaj;
  Object.assign(out, { nume: v.nume, contact: v.contact, varsta: v.varsta, acord: v.acord, limba: lang });
  out["bot-field"] = v["bot-field"];
  out["cf-turnstile-response"] = token;
  return out;
};
