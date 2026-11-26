import { describe, expect, it } from "vitest";
import { buildPayload, emptyValues, type FormValues } from "@/lib/payload";
import { requestSchemaAt } from "@/lib/request-schema";
import { NOW } from "./fixtures";

const typed: FormValues = {
  ...emptyValues("masa"),
  data: "2026-11-28",
  ora: "19:30",
  persoane: "4",
  marime: "30-60",
  mesaj: "",
  nume: "Ana",
  contact: "ana@example.com",
  varsta: true,
  acord: true,
};

describe("buildPayload", () => {
  it("keeps only the fields of the chosen type, and parses persoane", () => {
    const p = buildPayload(typed, "ro", "tok");
    expect(p).toEqual({
      tip: "masa",
      data: "2026-11-28",
      ora: "19:30",
      persoane: 4,
      nume: "Ana",
      contact: "ana@example.com",
      varsta: true,
      acord: true,
      limba: "ro",
      "bot-field": "",
      "cf-turnstile-response": "tok",
    });
  });

  it("switching masa → intrebare drops data, ora, persoane", () => {
    const p = buildPayload({ ...typed, tip: "intrebare", mesaj: "O întrebare" }, "en", "tok");
    expect(Object.keys(p).sort()).toEqual(["acord", "bot-field", "cf-turnstile-response", "contact", "limba", "mesaj", "nume", "tip", "varsta"]);
    const { "bot-field": _b, "cf-turnstile-response": _t, ...fields } = p;
    expect(requestSchemaAt(NOW).safeParse(fields).success).toBe(true);
  });

  it("eveniment keeps data and marime, not ora or persoane", () => {
    const p = buildPayload({ ...typed, tip: "eveniment" }, "ro", "tok");
    expect(p.marime).toBe("30-60");
    expect(p).not.toHaveProperty("ora");
    expect(p).not.toHaveProperty("persoane");
  });

  it("limba and the token are added; an empty persoane is left out so the schema reports it", () => {
    const p = buildPayload({ ...typed, persoane: "" }, "en", "t2");
    expect(p.limba).toBe("en");
    expect(p["cf-turnstile-response"]).toBe("t2");
    expect(p).not.toHaveProperty("persoane");
  });
});
