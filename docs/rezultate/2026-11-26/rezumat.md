# Results, 2026-11-26 (local, after the redesign, the font change and the page scenes, before deploy)

Where: `npm run dev:full` on this Mac (`wrangler pages dev` on http://localhost:8788, Turnstile test keys, `MAIL_MODE=outbox`). **Not the live site.** This run replaces `../2026-11-25/` after the redesign (`docs/design.md`).

## Lighthouse 13.6.0 (Chrome headless, first visit, so the age gate is open)

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | mobile | 100 | 100 | 100 | 66 | 759 ms | 0.008 |
| `/` | desktop | 100 | 100 | 100 | 66 | 211 ms | 0.002 |
| `/poker` | mobile | 100 | 100 | 100 | 66 | 757 ms | 0.005 |
| `/poker` | desktop | 100 | 100 | 100 | 66 | 207 ms | 0.003 |
| `/en/venue` | mobile | 100 | 100 | 100 | 66 | 759 ms | 0.009 |
| `/en/venue` | desktop | 100 | 100 | 100 | 66 | 208 ms | 0.001 |
| `/contact` | mobile | 100 | 100 | 100 | 66 | 759 ms | 0.005 |
| `/contact` | desktop | 100 | 100 | 100 | 66 | 210 ms | 0.035 |

- **SEO:** the only failing audit is `is-crawlable` (deliberate `noindex`).
- **CLS:** the small shift comes from the two web fonts (Fraunces and Figtree) swapping in (`font-display: swap`), and it stays well under the 0.1 threshold.
- **When:** the runs above are from after the font change (Bodoni Moda and Jost → Fraunces and Figtree) and the page scenes (`/poker` and `/en/venue` carry them). The JSON files were overwritten by them. The two `/en/venue` runs were repeated after the more detailed venue scene.
- **Raw reports:** `lighthouse/*.json`. Local numbers flatter performance; the live run is the one to quote.

## Tests

| Suite | Result |
|---|---|
| Vitest | 111 passed |
| Playwright + axe (375 × 812 and 1280 × 800) | 31 passed, 1 skipped (the phone-menu test on the desktop viewport) |
| axe on every route, both languages, gate open and closed | 0 violations of any impact. During the redesign it caught the footer text inheriting the dark ink colour; that is fixed |
| `verify-site` / `check-copy` | ok: 22 pages, 404, sitemap; no banned words in 23 pages and 6 email samples |
