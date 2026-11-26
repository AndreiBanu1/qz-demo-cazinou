import { describe, expect, it } from "vitest";
import { MAILTRAP_SEND_BASE, mailtrapSender, outboxSender, type MailMessage } from "@/lib/mail";

const message: MailMessage = {
  from: { email: "demo@ametist.invalid", name: "Ametist (demo)" },
  to: [{ email: "rezervari@ametist.invalid", name: "Salon Ametist (demo)" }],
  reply_to: { email: "ana@example.com", name: "Ana Popescu" },
  subject: "[Demo] Cerere",
  text: "text",
  html: "<p>html</p>",
  category: "ametist-demo",
};

const stubFetch = (status: number, body: unknown = { success: status === 200, message_ids: ["1"] }) => {
  const calls: { url: string; init: RequestInit }[] = [];
  const impl = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
  return { impl, calls };
};

describe("mailtrapSender", () => {
  it("posts to MAILTRAP_SEND_BASE + id with Bearer and the documented JSON", async () => {
    const { impl, calls } = stubFetch(200);
    expect(await mailtrapSender("tok", "2564102", impl)(message)).toBe("ok");
    expect(MAILTRAP_SEND_BASE).toBe("https://sandbox.api.mailtrap.io/api/send/");
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe("https://sandbox.api.mailtrap.io/api/send/2564102");
    expect(calls[0].init.method).toBe("POST");
    const headers = new Headers(calls[0].init.headers);
    expect(headers.get("Authorization")).toBe("Bearer tok");
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(JSON.parse(String(calls[0].init.body))).toEqual(message);
  });

  it("maps 200 to ok, 429 to limit, 500/400/network to fail", async () => {
    expect(await mailtrapSender("t", "1", stubFetch(429, { success: false, errors: ["limit"] }).impl)(message)).toBe("limit");
    expect(await mailtrapSender("t", "1", stubFetch(500).impl)(message)).toBe("fail");
    expect(await mailtrapSender("t", "1", stubFetch(400).impl)(message)).toBe("fail");
    expect(await mailtrapSender("t", "1", stubFetch(200, { success: false }).impl)(message)).toBe("fail");
    const offline = (async () => {
      throw new TypeError("network");
    }) as typeof fetch;
    expect(await mailtrapSender("t", "1", offline)(message)).toBe("fail");
  });

  it("never calls any other host", async () => {
    const { impl, calls } = stubFetch(200);
    // A sandbox id that tries to change the path or host is refused without a request.
    for (const id of ["../../evil", "1?x=1", "https://evil.example/", "", "12a"]) {
      expect(await mailtrapSender("t", id, impl)(message), id).toBe("fail");
    }
    await mailtrapSender("t", "42", impl)(message);
    for (const c of calls) expect(new URL(c.url).host).toBe("sandbox.api.mailtrap.io");
    expect(calls).toHaveLength(1);
  });
});

describe("outboxSender", () => {
  it("stores the message as JSON under msg: with a one-day TTL", async () => {
    const puts: { key: string; value: string; opts: { expirationTtl: number } }[] = [];
    const kv = { put: async (key: string, value: string, opts: { expirationTtl: number }) => void puts.push({ key, value, opts }) };
    expect(await outboxSender(kv, () => new Date("2026-11-25T10:00:00Z"), () => "abc123")(message)).toBe("ok");
    expect(puts[0].key).toBe("msg:2026-11-25T10:00:00.000Z-abc123");
    expect(JSON.parse(puts[0].value)).toEqual(message);
    expect(puts[0].opts.expirationTtl).toBe(86400);
  });

  it("a KV error is a failed send", async () => {
    const kv = { put: async () => Promise.reject(new Error("kv")) };
    expect(await outboxSender(kv)(message)).toBe("fail");
  });
});
