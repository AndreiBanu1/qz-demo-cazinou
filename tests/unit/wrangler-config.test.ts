import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Review finding 1: deploys must not inherit the local OUTBOX binding, and must run the Mailtrap sender.
// Pages reads [env.production] and [env.preview] for deploys; kv_namespaces and vars are not inherited from the top level.
const toml = readFileSync(new URL("../../wrangler.toml", import.meta.url), "utf8");

/** The lines of one [table], up to the next table header. */
const table = (name: string): string | null => {
  const lines = toml.split("\n");
  const start = lines.findIndex((l) => l.trim() === `[${name}]`);
  if (start < 0) return null;
  const end = lines.findIndex((l, i) => i > start && /^\s*\[/.test(l));
  return lines.slice(start + 1, end < 0 ? undefined : end).join("\n");
};

describe("wrangler.toml", () => {
  for (const env of ["production", "preview"]) {
    it(`env.${env} sets MAIL_MODE=mailtrap and binds no KV namespace`, () => {
      const t = table(`env.${env}`);
      expect(t, `[env.${env}] is missing`).not.toBeNull();
      expect(t).toMatch(/MAIL_MODE\s*=\s*"mailtrap"/);
      expect(toml).not.toMatch(new RegExp(`\\[\\[env\\.${env}\\.kv_namespaces\\]\\]`));
    });
  }

  it("does not mention the old /api/_outbox path", () => {
    expect(toml).not.toContain("_outbox");
  });
});
