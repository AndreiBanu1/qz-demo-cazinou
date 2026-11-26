// The form's schema (spec §7.1), shared by the browser and the Pages Function. Each request type allows only its own
// fields (.strict()), so a field left over from another type is rejected (Review Focus 3).
// Error messages are keys; the form turns them into Romanian or English text (src/content/formular.ts).
import { z } from "zod";
import { dateInRange } from "./dates";

export const REQUEST_TYPES = ["masa", "eveniment", "intrebare"] as const;
export type RequestType = (typeof REQUEST_TYPES)[number];
export const EVENT_SIZES = ["10-30", "30-60", "60+"] as const;
export const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"] as const;
export const MAX_PEOPLE = 12;
export const MAX_MESSAGE = 1000;
export const MAX_NAME = 100;

/** Every field name the function reads; the form must render them (verify-site checks the contact pages). */
export const FORM_FIELDS = [
  "tip",
  "data",
  "ora",
  "persoane",
  "marime",
  "mesaj",
  "nume",
  "contact",
  "varsta",
  "acord",
  "limba",
  "bot-field",
  "cf-turnstile-response",
] as const;

export type ErrorKey = "required" | "phoneOrEmail" | "dateRange" | "people" | "tooLong" | "mustAccept" | "choice";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// A phone number: an optional +, then digits with single spaces, dots or dashes, 9 to 15 digits in all.
const PHONE_RE = /^\+?\d(?:[ .-]?\d){8,14}$/;
export const isEmail = (s: string) => EMAIL_RE.test(s.trim());
export const isPhoneOrEmail = (s: string) => isEmail(s) || PHONE_RE.test(s.trim());

const msg = (key: ErrorKey) => ({ message: key });
const required = z.string(msg("required")).trim().min(1, msg("required"));

const common = {
  nume: required.max(MAX_NAME, msg("tooLong")),
  contact: required.refine(isPhoneOrEmail, msg("phoneOrEmail")),
  varsta: z.literal(true, { errorMap: () => msg("mustAccept") }),
  acord: z.literal(true, { errorMap: () => msg("mustAccept") }),
  limba: z.enum(["ro", "en"]),
};
const optionalMessage = z.string().trim().max(MAX_MESSAGE, msg("tooLong")).optional();

const dateField = (now: Date) =>
  required.refine((d) => dateInRange(d, now), msg("dateRange"));

/** The schema with the booking-date range checked against `now` (tomorrow to 90 days ahead, Bucharest days). */
export const requestSchemaAt = (now: Date) =>
  z.discriminatedUnion("tip", [
    z
      .object({
        tip: z.literal("masa"),
        data: dateField(now),
        ora: z.enum(TIMES, { errorMap: () => msg("choice") }),
        persoane: z.number(msg("people")).int(msg("people")).min(1, msg("people")).max(MAX_PEOPLE, msg("people")),
        mesaj: optionalMessage,
        ...common,
      })
      .strict(),
    z
      .object({
        tip: z.literal("eveniment"),
        data: dateField(now),
        marime: z.enum(EVENT_SIZES, { errorMap: () => msg("choice") }),
        mesaj: optionalMessage,
        ...common,
      })
      .strict(),
    z
      .object({
        tip: z.literal("intrebare"),
        mesaj: required.max(MAX_MESSAGE, msg("tooLong")),
        ...common,
      })
      .strict(),
  ]);

export type RequestFields = z.infer<ReturnType<typeof requestSchemaAt>>;
