import { describe, expect, it } from "vitest";
import { renderNotification } from "@/lib/email-template";
import { NOW, eveniment, intrebare, masa } from "./fixtures";

describe("the notification email", () => {
  it("subject starts with [Demo] and names the type and the person", () => {
    const { subject } = renderNotification(masa, NOW);
    expect(subject.startsWith("[Demo]")).toBe(true);
    expect(subject).toContain("Masă la restaurant sau bar");
    expect(subject).toContain("Ana Popescu");
  });

  it("text and html contain every field label and value for each type", () => {
    const cases = [
      [masa, ["Data: 2026-11-28", "Ora: 19:30", "Persoane: 4", "Mesaj: O masă", "Nume: Ana Popescu", "Contact: ana@example.com", "Limba paginii: română"]],
      [eveniment, ["Data: 2026-12-12", "Mărimea grupului: 30–60", "Contact: +40 712 345 678"]],
      [intrebare, ["Tip: Întrebare", "Mesaj: Is there a dress code?", "Limba paginii: engleză"]],
    ] as const;
    for (const [fields, lines] of cases) {
      const { text, html } = renderNotification(fields, NOW);
      for (const l of lines) {
        expect(text, l).toContain(l);
        const [label, value] = l.split(": ");
        expect(html, l).toContain(label);
        expect(html, l).toContain(value.replace("–", "–"));
      }
      expect(text).toContain("Primit la: 2026-11-25 12:00 (ora României)");
    }
  });

  it("footer has the demo label", () => {
    const { text, html } = renderNotification(masa, NOW);
    for (const part of [text, html]) expect(part).toContain("Salon Ametist este un local inventat");
  });

  it("html escapes <script> in mesaj", () => {
    const { html } = renderNotification({ ...intrebare, mesaj: '<script>alert("x")</script>' }, NOW);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
