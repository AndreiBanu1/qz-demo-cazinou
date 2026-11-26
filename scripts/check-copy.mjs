// Fails the build on words that encourage gambling (spec §3.2, §10.2), in every built page and in the email samples.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { copyTextOf, findBanned } from "./lib/banned-words.mjs";

const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((name) => {
        const full = join(dir, name);
        return statSync(full).isDirectory() ? walk(full) : [full];
      })
    : [];

const pages = walk("dist").filter((f) => f.endsWith(".html"));
// The notification email rendered with sample data (written by scripts/render-email-samples.mjs, Task 6).
const emails = walk("dist-email").filter((f) => /\.(html|txt)$/.test(f));

const problems = [];
for (const file of [...pages, ...emails]) {
  const raw = readFileSync(file, "utf8");
  const text = file.endsWith(".txt") ? raw : copyTextOf(raw);
  for (const hit of findBanned(text)) problems.push(`${file}: „${hit.word}” in „…${hit.context}…”`);
}

if (problems.length) {
  console.error(`check-copy: ${problems.length} banned word(s)\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`check-copy: ok (${pages.length} pages, ${emails.length} email samples)`);
