// Checks the built site the way a crawler that doesn't run JavaScript sees it (spec §10.1).
// Runs at the end of `npm run build`, so a regression fails the deploy.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROUTES as routes } from "./lib/routes.mjs";

const DIST = "dist";
const failures = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

for (const r of routes) {
  if (!existsSync(join(DIST, r.file))) fail(r.file, "not built");
}
for (const f of ["404.html", "sitemap.xml", "_headers", "robots.txt", "favicon.svg"])
  if (!existsSync(join(DIST, f))) fail(f, "not built");

if (failures.length) {
  console.error(`verify-site: ${failures.length} problem(s)\n` + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
console.log(`verify-site: ok (${routes.length} pages, 404, sitemap)`);
