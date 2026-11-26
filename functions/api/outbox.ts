// GET /api/outbox lists the local outbox, oldest first; DELETE clears it. For the end-to-end tests only (spec §17):
// it answers only with MAIL_MODE=outbox, an OUTBOX binding and a localhost request, so on the live site it is a 404.
import { OUTBOX_PREFIX, isLocalHost } from "../../src/lib/mail";
import type { Env } from "./cerere";

const headers = { "Content-Type": "application/json; charset=utf-8", "X-Robots-Tag": "noindex", "Cache-Control": "no-store" };
const notFound = () => new Response(JSON.stringify({ error: "not-found" }), { status: 404, headers });

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const kv = env.OUTBOX;
  if (env.MAIL_MODE !== "outbox" || !kv || !isLocalHost(request.url)) return notFound();
  const { keys } = await kv.list({ prefix: OUTBOX_PREFIX });
  const names = keys.map((k) => k.name).sort();
  if (request.method === "DELETE") {
    await Promise.all(names.map((n) => kv.delete(n)));
    return new Response(JSON.stringify({ deleted: names.length }), { headers });
  }
  if (request.method !== "GET") return new Response(null, { status: 405, headers: { ...headers, Allow: "GET, DELETE" } });
  const messages = await Promise.all(names.map(async (n) => JSON.parse((await kv.get(n)) ?? "null")));
  return new Response(JSON.stringify(messages), { headers });
};
