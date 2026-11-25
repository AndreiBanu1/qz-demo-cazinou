// Mail senders (spec §7.4). The Mailtrap Email Sandbox captures mail and delivers it to no one; the outbox is the local
// stand-in for development and CI. Nothing here can reach any other mail host.

export interface Addr {
  email: string;
  name?: string;
}

export interface MailMessage {
  from: Addr;
  to: Addr[];
  reply_to?: Addr;
  subject: string;
  text: string;
  html: string;
  category: "ametist-demo";
}

export type SendResult = "ok" | "limit" | "fail";
export type Sender = (m: MailMessage) => Promise<SendResult>;

/** The only mail host the code ever calls. */
export const MAILTRAP_SEND_BASE = "https://sandbox.api.mailtrap.io/api/send/";
const SEND_TIMEOUT_MS = 8000;

/**
 * Sends into the sandbox `sandboxId` (the number in https://mailtrap.io/sandboxes/<id>). 200 with success → ok;
 * 429, the monthly quota or the 10-second rate limit, which the API doesn't tell apart → limit; anything else → fail.
 */
export const mailtrapSender =
  (token: string, sandboxId: string, fetchImpl: typeof fetch = fetch): Sender =>
  async (m) => {
    if (!/^\d+$/.test(sandboxId) || !token) return "fail";
    try {
      const res = await fetchImpl(MAILTRAP_SEND_BASE + sandboxId, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(m),
        signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
      });
      if (res.status === 429) return "limit";
      if (res.status !== 200) {
        console.error(`mailtrap: HTTP ${res.status}`);
        return "fail";
      }
      const data = (await res.json().catch(() => null)) as { success?: unknown } | null;
      return data?.success === true ? "ok" : "fail";
    } catch (e) {
      console.error("mailtrap:", e);
      return "fail";
    }
  };

export interface KvLike {
  put(key: string, value: string, opts: { expirationTtl: number }): Promise<void>;
}

export const OUTBOX_PREFIX = "msg:";
const OUTBOX_TTL_SECONDS = 86_400;

/** Writes each message to the local OUTBOX KV namespace (never bound in production). */
export const outboxSender =
  (kv: KvLike, now: () => Date = () => new Date(), randomId: () => string = () => crypto.randomUUID().slice(0, 6)): Sender =>
  async (m) => {
    try {
      await kv.put(`${OUTBOX_PREFIX}${now().toISOString()}-${randomId()}`, JSON.stringify(m), { expirationTtl: OUTBOX_TTL_SECONDS });
      return "ok";
    } catch (e) {
      console.error("outbox:", e);
      return "fail";
    }
  };

/** Whether a request URL is local development, the only place the outbox may answer. */
export const isLocalHost = (url: string): boolean => {
  const host = new URL(url).hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
};
