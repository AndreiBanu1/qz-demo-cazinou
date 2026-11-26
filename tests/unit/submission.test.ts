import { describe, expect, it } from "vitest";
import type { MailMessage, Sender, SendResult } from "@/lib/mail";
import { handleSubmission, type SubmissionDeps } from "@/lib/submission";
import { NOW, eveniment, intrebare, masa } from "./fixtures";

const LOCAL = "http://localhost:8788/api/cerere";
const LIVE = "https://ametist-demo.pages.dev/api/cerere";

const recording = (result: SendResult = "ok") => {
  const sent: MailMessage[] = [];
  const sender: Sender = async (m) => {
    sent.push(m);
    return result;
  };
  return { sent, sender };
};

const deps = (over: Partial<SubmissionDeps> = {}): SubmissionDeps => ({
  verify: async (token) => token === "good",
  sender: recording().sender,
  now: () => NOW,
  mode: "mailtrap",
  ...over,
});

const post = (body: unknown, { url = LIVE, type = "application/json", raw }: { url?: string; type?: string; raw?: string } = {}) =>
  new Request(url, { method: "POST", headers: { "Content-Type": type }, body: raw ?? JSON.stringify(body) });

const valid = (fields: object = masa) => ({ ...fields, "bot-field": "", "cf-turnstile-response": "good" });

const json = async (r: Response) => ({ status: r.status, body: await r.json() });

describe("handleSubmission", () => {
  it("405 for GET", async () => {
    const r = await handleSubmission(new Request(LIVE), deps());
    expect(await json(r)).toEqual({ status: 405, body: { error: "method" } });
    expect(r.headers.get("Allow")).toBe("POST");
  });

  it("415 for multipart", async () => {
    expect((await handleSubmission(post(null, { type: "multipart/form-data; boundary=x", raw: "x" }), deps())).status).toBe(415);
  });

  it("413 for a 17 KB body", async () => {
    const r = await handleSubmission(post({ ...valid(), mesaj: "a".repeat(17_000) }), deps());
    expect(await json(r)).toEqual({ status: 413, body: { error: "too-large" } });
  });

  it("422 for a body that is not JSON or not an object", async () => {
    expect((await handleSubmission(post(null, { raw: "{nope" }), deps())).status).toBe(422);
    expect((await handleSubmission(post([1, 2]), deps())).status).toBe(422);
  });

  it("a filled honeypot gives 200 and no send", async () => {
    const { sent, sender } = recording();
    const r = await handleSubmission(post({ ...valid(), "bot-field": "spam" }), deps({ sender }));
    expect(await json(r)).toEqual({ status: 200, body: { ok: true } });
    expect(sent).toHaveLength(0);
  });

  it("a missing or failed token gives 403", async () => {
    expect((await handleSubmission(post({ ...valid(), "cf-turnstile-response": "" }), deps())).status).toBe(403);
    expect((await handleSubmission(post({ ...valid(), "cf-turnstile-response": "bad" }), deps())).status).toBe(403);
    const throwing = deps({ verify: async () => Promise.reject(new Error("net")) });
    expect(await json(await handleSubmission(post(valid()), throwing))).toEqual({ status: 403, body: { error: "turnstile" } });
  });

  it("an invalid body gives 422", async () => {
    const { sent, sender } = recording();
    expect((await handleSubmission(post(valid({ ...masa, persoane: 99 })), deps({ sender }))).status).toBe(422);
    expect((await handleSubmission(post(valid({ ...intrebare, ora: "19:00" })), deps({ sender }))).status).toBe(422);
    expect((await handleSubmission(post(valid({ ...masa, data: "2026-11-25" })), deps({ sender }))).status).toBe(422);
    expect((await handleSubmission(post({ ...valid(), extra: "x" }), deps({ sender }))).status).toBe(422);
    expect(sent).toHaveLength(0);
  });

  it("sender: null gives 503 config", async () => {
    expect(await json(await handleSubmission(post(valid()), deps({ sender: null })))).toEqual({ status: 503, body: { error: "config" } });
  });

  it("limit gives 503, fail gives 502 send", async () => {
    expect(await json(await handleSubmission(post(valid()), deps({ sender: recording("limit").sender })))).toEqual({ status: 503, body: { error: "limit" } });
    expect(await json(await handleSubmission(post(valid()), deps({ sender: recording("fail").sender })))).toEqual({ status: 502, body: { error: "send" } });
  });

  it("a valid request gives 200 with exactly one send to the venue, reply_to only for an email contact", async () => {
    const a = recording();
    expect(await json(await handleSubmission(post(valid(masa)), deps({ sender: a.sender })))).toEqual({ status: 200, body: { ok: true } });
    expect(a.sent).toHaveLength(1);
    expect(a.sent[0].to).toEqual([{ email: "rezervari@ametist.invalid", name: "Salon Ametist (demo)" }]);
    expect(a.sent[0].from.email).toBe("demo@ametist.invalid");
    expect(a.sent[0].reply_to).toEqual({ email: "ana@example.com", name: "Ana Popescu" });
    expect(a.sent[0].category).toBe("ametist-demo");

    const b = recording();
    await handleSubmission(post(valid(eveniment)), deps({ sender: b.sender }));
    expect(b.sent).toHaveLength(1);
    expect(b.sent[0].reply_to).toBeUndefined();
  });

  it("every response has noindex and no-store", async () => {
    for (const r of [
      await handleSubmission(new Request(LIVE), deps()),
      await handleSubmission(post(valid()), deps()),
      await handleSubmission(post(valid()), deps({ sender: null })),
    ]) {
      expect(r.headers.get("X-Robots-Tag")).toBe("noindex");
      expect(r.headers.get("Cache-Control")).toBe("no-store");
      expect(r.headers.get("Content-Type")).toContain("application/json");
    }
  });

  it("outbox mode on host ametist-demo.pages.dev gives 503 config", async () => {
    const { sent, sender } = recording();
    expect(await json(await handleSubmission(post(valid()), deps({ mode: "outbox", sender })))).toEqual({ status: 503, body: { error: "config" } });
    expect(sent).toHaveLength(0);
    const local = recording();
    expect((await handleSubmission(post(valid(), { url: LOCAL }), deps({ mode: "outbox", sender: local.sender }))).status).toBe(200);
    expect(local.sent).toHaveLength(1);
  });
});
