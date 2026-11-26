import { defineConfig } from "@playwright/test";

// The built site served with the real Pages Function (`npm run dev:full`: wrangler pages dev, the local OUTBOX KV,
// MAIL_MODE=outbox, Turnstile's always-pass test keys). Tests through the real function also need network access to
// challenges.cloudflare.com, where the Turnstile script and siteverify live, even with the test keys.
const baseURL = "http://localhost:8788";

export default defineConfig({
  testDir: "tests/e2e",
  forbidOnly: !!process.env.CI,
  retries: 0,
  // One worker: the form tests share the local outbox.
  workers: 1,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "mobile", use: { viewport: { width: 375, height: 812 } } },
    { name: "desktop", testMatch: "site.spec.ts", use: { viewport: { width: 1280, height: 800 } } },
  ],
  webServer: {
    command: "npm run dev:full",
    url: baseURL,
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
});
