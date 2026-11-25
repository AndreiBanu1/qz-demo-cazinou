# Results, 2026-11-25 (local, before deploy)

Where: `npm run dev:full` on this Mac (`wrangler pages dev` on http://localhost:8788, Turnstile test keys, `MAIL_MODE=outbox`). **Not the live site**: nothing is deployed yet. The live runs replace these after the first deploy (spec §11).

## Lighthouse 13.6.0 (Chrome headless, first visit, so the age gate is open)

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | mobile | 100 | 100 | 100 | 66 | 758 ms | 0 |
| `/` | desktop | 100 | 100 | 100 | 66 | 209 ms | 0 |
| `/poker` | mobile | 100 | 100 | 100 | 66 | 757 ms | 0 |
| `/poker` | desktop | 100 | 100 | 100 | 66 | 208 ms | 0 |
| `/en/venue` | mobile | 100 | 100 | 100 | 66 | 757 ms | 0 |
| `/en/venue` | desktop | 100 | 100 | 100 | 66 | 208 ms | 0 |
| `/contact` | mobile | 100 | 100 | 100 | 66 | 756 ms | 0 |
| `/contact` | desktop | 100 | 100 | 100 | 66 | 206 ms | 0 |

SEO: the only failing audit on every page is `is-crawlable` („Page is blocked from indexing”), because every demo page is `noindex` on purpose. Raw reports: `lighthouse/*.json`. Local numbers flatter performance (no network latency); the live run is the one to quote.

## Tests

| Suite | Result |
|---|---|
| Vitest (unit, checks, schema, email, sender, submission) | 96 passed |
| Playwright + axe (`npx playwright test`, 375 × 812 and 1280 × 800) | 30 passed, 1 skipped (the phone-menu test on the desktop viewport) |
| axe on every route, both languages, gate open and closed | 0 violations of any impact |
| `verify-site` | ok: 22 pages, 404, sitemap |
| `check-copy` | ok: 23 pages and 6 email samples, no banned words |

## Not run yet

- schema.org validator and Rich Results Test (they need the live URL)
- live Lighthouse, live axe, and one real request with the real Turnstile widget and the Mailtrap sandbox (needs a person: the managed widget gives automated Chromium no token)
