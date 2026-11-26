# Results, 2026-11-26 (local, after the redesign, before deploy)

Where: `npm run dev:full` on this Mac (`wrangler pages dev` on http://localhost:8788, Turnstile test keys, `MAIL_MODE=outbox`). **Not the live site.** This run replaces `../2026-11-25/` after the redesign (`docs/design.md`).

## Lighthouse 13.6.0 (Chrome headless, first visit, so the age gate is open)

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | mobile | 100 | 100 | 100 | 66 | 761 ms | 0.028 |
| `/` | desktop | 100 | 100 | 100 | 66 | 211 ms | 0.005 |
| `/poker` | mobile | 100 | 100 | 100 | 66 | 787 ms | 0.031 |
| `/poker` | desktop | 100 | 100 | 100 | 66 | 212 ms | 0.009 |
| `/en/venue` | mobile | 100 | 100 | 100 | 66 | 765 ms | 0.013 |
| `/en/venue` | desktop | 100 | 100 | 100 | 66 | 215 ms | 0.007 |
| `/contact` | mobile | 100 | 100 | 100 | 66 | 769 ms | 0.031 |
| `/contact` | desktop | 100 | 100 | 100 | 66 | 221 ms | 0.017 |

- **SEO:** the only failing audit is `is-crawlable` (deliberate `noindex`).
- **CLS:** the small shift comes from the two web fonts swapping in (`font-display: swap`), and it stays well under the 0.1 threshold.
- **Raw reports:** `lighthouse/*.json`. Local numbers flatter performance; the live run is the one to quote.

## Tests

| Suite | Result |
|---|---|
| Vitest | 111 passed |
| Playwright + axe (375 × 812 and 1280 × 800) | 31 passed, 1 skipped (the phone-menu test on the desktop viewport) |
| axe on every route, both languages, gate open and closed | 0 violations of any impact. During the redesign it caught the footer text inheriting the dark ink colour; that is fixed |
| `verify-site` / `check-copy` | ok: 22 pages, 404, sitemap; no banned words in 23 pages and 6 email samples |
