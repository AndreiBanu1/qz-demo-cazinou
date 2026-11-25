// Deploy guard (plan Task 12). A production build must carry the real Turnstile
// site key: the real secret on Cloudflare rejects tokens from a test site key, so
// shipping one would make every real request fail with 403.
//
//   node scripts/check-deploy-env.mjs          → checks VITE_TURNSTILE_SITE_KEY (before the build)
//   node scripts/check-deploy-env.mjs --dist   → also checks the built dist/ for a test key (after the build)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Cloudflare's published Turnstile test site keys (docs/preflight.md).
export const TEST_SITE_KEYS = [
  "1x00000000000000000000AA",
  "2x00000000000000000000AB",
  "1x00000000000000000000BB",
  "2x00000000000000000000BB",
  "3x00000000000000000000FF",
];

function fail(message) {
  console.error(`check-deploy-env: ${message}`);
  process.exit(1);
}

const key = process.env.VITE_TURNSTILE_SITE_KEY?.trim();
if (!key) fail("VITE_TURNSTILE_SITE_KEY is missing. Set it to the site key of the Turnstile widget for ametist-demo.pages.dev.");
if (TEST_SITE_KEYS.includes(key)) fail("VITE_TURNSTILE_SITE_KEY is a Turnstile test key. Use the real site key.");

if (process.argv.includes("--dist")) {
  const withTestKey = [];
  let hasRealKey = false;
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(js|html)$/.test(name)) {
        const text = readFileSync(path, "utf8");
        if (TEST_SITE_KEYS.some((k) => text.includes(k))) withTestKey.push(path);
        if (text.includes(key)) hasRealKey = true;
      }
    }
  };
  walk("dist");
  if (withTestKey.length) fail(`a Turnstile test site key is in the build: ${withTestKey.join(", ")}`);
  if (!hasRealKey) fail("the build doesn't contain VITE_TURNSTILE_SITE_KEY; rebuild with it set.");
}

console.log("check-deploy-env: ok");
