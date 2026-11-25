import { describe, expect, it } from "vitest";
import { bucharestToday, dateInRange } from "@/lib/dates";
import { EVENT_SIZES, FORM_FIELDS, REQUEST_TYPES, TIMES, requestSchemaAt } from "@/lib/request-schema";
import { NOW, eveniment, intrebare, masa } from "./fixtures";

const ok = (v: object, now = NOW) => requestSchemaAt(now).safeParse(v).success;

describe("the request schema", () => {
  it("exports the spec's types, sizes, times and field names", () => {
    expect(REQUEST_TYPES).toEqual(["masa", "eveniment", "intrebare"]);
    expect(EVENT_SIZES).toEqual(["10-30", "30-60", "60+"]);
    expect(TIMES[0]).toBe("18:00");
    expect(TIMES.at(-1)).toBe("22:30");
    expect(TIMES).toHaveLength(10);
    expect(FORM_FIELDS).toEqual(["tip", "data", "ora", "persoane", "marime", "mesaj", "nume", "contact", "varsta", "acord", "limba", "bot-field", "cf-turnstile-response"]);
  });

  it("accepts a valid request of each type", () => {
    expect(ok(masa)).toBe(true);
    expect(ok(eveniment)).toBe(true);
    expect(ok(intrebare)).toBe(true);
  });

  it("masa needs data, ora, persoane 1–12", () => {
    for (const k of ["data", "ora", "persoane"] as const) {
      const { [k]: _, ...rest } = masa;
      expect(ok(rest), k).toBe(false);
    }
    expect(ok({ ...masa, persoane: 0 })).toBe(false);
    expect(ok({ ...masa, persoane: 13 })).toBe(false);
    expect(ok({ ...masa, persoane: 2.5 })).toBe(false);
    expect(ok({ ...masa, ora: "23:00" })).toBe(false);
    expect(ok({ ...masa, mesaj: "" })).toBe(true);
  });

  it("eveniment needs data and marime", () => {
    const { marime: _, ...noSize } = eveniment;
    expect(ok(noSize)).toBe(false);
    expect(ok({ ...eveniment, marime: "100" })).toBe(false);
  });

  it("intrebare needs mesaj", () => {
    expect(ok({ ...intrebare, mesaj: "" })).toBe(false);
    expect(ok({ ...intrebare, mesaj: "   " })).toBe(false);
  });

  it("intrebare with ora fails", () => {
    expect(ok({ ...intrebare, ora: "19:00" })).toBe(false);
    expect(ok({ ...masa, marime: "10-30" })).toBe(false);
  });

  it("contact accepts +40 7xx xxx xxx, 07xxxxxxxx and an email, rejects 'abc'", () => {
    for (const c of ["+40 712 345 678", "0712345678", "ana@example.com", "+44 20 7946 0958"]) expect(ok({ ...masa, contact: c }), c).toBe(true);
    for (const c of ["abc", "123", "ana@", "@example.com", ""]) expect(ok({ ...masa, contact: c }), c).toBe(false);
  });

  it("varsta and acord must be true", () => {
    expect(ok({ ...masa, varsta: false })).toBe(false);
    expect(ok({ ...masa, acord: false })).toBe(false);
  });

  it("mesaj over 1000 fails, nume over 100 fails, unknown tip fails, unknown limba fails", () => {
    expect(ok({ ...intrebare, mesaj: "a".repeat(1001) })).toBe(false);
    expect(ok({ ...intrebare, mesaj: "a".repeat(1000) })).toBe(true);
    expect(ok({ ...masa, nume: "a".repeat(101) })).toBe(false);
    expect(ok({ ...masa, tip: "vip" })).toBe(false);
    expect(ok({ ...masa, limba: "de" })).toBe(false);
  });

  it("date range uses Bucharest days", () => {
    // 22:30 UTC on 10 March is 00:30 on 11 March in Bucharest (UTC+2).
    const now = new Date("2026-03-10T22:30:00Z");
    expect(bucharestToday(now)).toBe("2026-03-11");
    expect(dateInRange("2026-03-12", now)).toBe(true);
    expect(dateInRange("2026-03-11", now)).toBe(false);
    expect(ok({ ...masa, data: "2026-03-12" }, now)).toBe(true);
    expect(ok({ ...masa, data: "2026-03-11" }, now)).toBe(false);
  });

  it("90 days ahead accepted, 91 rejected; malformed dates rejected", () => {
    expect(dateInRange("2027-02-23", NOW)).toBe(true); // 25 Nov 2026 + 90 days
    expect(dateInRange("2027-02-24", NOW)).toBe(false);
    for (const d of ["2026-13-01", "2026-02-30", "28.11.2026", ""]) expect(dateInRange(d, NOW), d).toBe(false);
  });
});
