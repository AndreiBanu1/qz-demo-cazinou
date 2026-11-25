// The Pages Function's logic (functions/api/cerere.ts), kept pure so it can be tested in Node: the Turnstile check,
// the mail sender and the clock are passed in. The endpoint is public, so it trusts nothing the browser did.
// Spec §7.3, steps 1–8, in order. Relative imports only: the Pages Function bundler doesn't know the "@" alias.
import { renderNotification } from "./email-template";
import { isLocalHost, type MailMessage, type Sender } from "./mail";
import { isEmail, requestSchemaAt } from "./request-schema";

export const MAX_BODY_BYTES = 16_384;
export const VENUE = { email: "rezervari@ametist.invalid", name: "Salon Ametist (demo)" };
export const FROM = { email: "demo@ametist.invalid", name: "Ametist (demo)" };

export type VerifyTurnstile = (token: string, ip: string | null) => Promise<boolean>;
export type MailMode = "mailtrap" | "outbox" | "none";

export interface SubmissionDeps {
  verify: VerifyTurnstile;
  /** null when no sender is configured (no secrets yet): every valid request then answers 503 config. */
  sender: Sender | null;
  now: () => Date;
  mode: MailMode;
}

export type ErrorCode = "method" | "media" | "too-large" | "turnstile" | "invalid" | "limit" | "send" | "config" | "server";

const json = (status: number, body: { ok: true } | { error: ErrorCode }, extra: Record<string, string> = {}): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // _headers doesn't apply to Functions, so every response sets these itself.
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
      ...extra,
    },
  });

const fail = (status: number, error: ErrorCode, extra?: Record<string, string>) => json(status, { error }, extra);

class TooLarge extends Error {}

/** Reads the body as text, stopping as soon as it passes the cap. */
async function readCapped(body: ReadableStream<Uint8Array> | null, cap: number): Promise<string> {
  if (!body) return "";
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > cap) {
      reader.releaseLock();
      throw new TooLarge();
    }
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.byteLength;
  }
  return new TextDecoder().decode(out);
}

export async function handleSubmission(req: Request, deps: SubmissionDeps): Promise<Response> {
  try {
    return await handle(req, deps);
  } catch (e) {
    console.error(e);
    return fail(500, "server");
  }
}

async function handle(req: Request, deps: SubmissionDeps): Promise<Response> {
  // 1. Only POST with JSON.
  if (req.method !== "POST") return fail(405, "method", { Allow: "POST" });
  if (!/^application\/json\s*(;|$)/i.test(req.headers.get("content-type") ?? "")) return fail(415, "media");

  // 2. Too large: the declared length first, then the bytes actually read.
  const declared = req.headers.get("content-length");
  if (declared !== null && !(Number(declared) <= MAX_BODY_BYTES)) return fail(413, "too-large");
  let body: unknown;
  try {
    body = JSON.parse(await readCapped(req.body, MAX_BODY_BYTES));
  } catch (e) {
    return e instanceof TooLarge ? fail(413, "too-large") : fail(422, "invalid");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return fail(422, "invalid");
  const { "bot-field": bot, "cf-turnstile-response": token, ...fields } = body as Record<string, unknown>;

  // 3. A filled honeypot: answer like a success and send nothing, so bots learn nothing.
  if (typeof bot === "string" && bot !== "") return json(200, { ok: true });

  // 4. Turnstile. A check that can't be completed (network error) counts as failed.
  if (typeof token !== "string" || token === "") return fail(403, "turnstile");
  let human = false;
  try {
    human = await deps.verify(token, req.headers.get("CF-Connecting-IP"));
  } catch {
    human = false;
  }
  if (!human) return fail(403, "turnstile");

  // 5. The same schema the browser used, with the booking dates checked in Bucharest time.
  const now = deps.now();
  const parsed = requestSchemaAt(now).safeParse(fields);
  if (!parsed.success) return fail(422, "invalid");
  const f = parsed.data;

  // The outbox is a local stand-in only; on any other host there is no sender (spec §7.4).
  const sender = deps.mode === "outbox" && !isLocalHost(req.url) ? null : deps.sender;
  if (!sender) return fail(503, "config");

  // 6–7. One email to the venue; the visitor's email address, if they gave one, is the Reply-To.
  const { subject, text, html } = renderNotification(f, now);
  const message: MailMessage = {
    from: FROM,
    to: [VENUE],
    ...(isEmail(f.contact) ? { reply_to: { email: f.contact.trim(), name: f.nume } } : {}),
    subject,
    text,
    html,
    category: "ametist-demo",
  };
  const result = await sender(message);
  if (result === "limit") return fail(503, "limit");
  if (result === "fail") return fail(502, "send");

  // 8.
  return json(200, { ok: true });
}
