// POST /api/cerere: the form's endpoint. The logic lives in src/lib/submission.ts, tested in Node;
// this file only wires in the Turnstile check and the mail sender from the environment.
// Relative imports: Pages Functions bundling doesn't know the "@" alias.
import { mailtrapSender, outboxSender, type Sender } from "../../src/lib/mail";
import { handleSubmission, type MailMode, type SubmissionDeps, type VerifyTurnstile } from "../../src/lib/submission";

export interface Env {
  TURNSTILE_SECRET?: string;
  /** "mailtrap" in production, "outbox" in local development and CI (spec §7.4). Anything else: no sender. */
  MAIL_MODE?: string;
  MAILTRAP_TOKEN?: string;
  MAILTRAP_SANDBOX_ID?: string;
  /** Local only, never bound in production. */
  OUTBOX?: KVNamespace;
}

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 5000;

const turnstileVerifier =
  (secret: string | undefined): VerifyTurnstile =>
  async (token, ip) => {
    if (!secret) {
      console.error("TURNSTILE_SECRET is not set");
      return false;
    }
    const body = new FormData();
    body.append("secret", secret);
    body.append("response", token);
    if (ip) body.append("remoteip", ip);
    const res = await fetch(SITEVERIFY, { method: "POST", body, signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS) });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: unknown };
    return data.success === true;
  };

export const mailModeOf = (env: Env): MailMode =>
  env.MAIL_MODE === "mailtrap" ? "mailtrap" : env.MAIL_MODE === "outbox" ? "outbox" : "none";

const senderFor = (env: Env, mode: MailMode): Sender | null => {
  if (mode === "mailtrap" && env.MAILTRAP_TOKEN && env.MAILTRAP_SANDBOX_ID)
    return mailtrapSender(env.MAILTRAP_TOKEN, env.MAILTRAP_SANDBOX_ID);
  if (mode === "outbox" && env.OUTBOX) return outboxSender(env.OUTBOX);
  return null;
};

const depsFor = (env: Env): SubmissionDeps => {
  const mode = mailModeOf(env);
  return { verify: turnstileVerifier(env.TURNSTILE_SECRET), sender: senderFor(env, mode), now: () => new Date(), mode };
};

// Every method: handleSubmission answers 405 for anything but POST.
export const onRequest: PagesFunction<Env> = ({ request, env }) => handleSubmission(request, depsFor(env));
