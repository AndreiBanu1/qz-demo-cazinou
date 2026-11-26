# Salon Ametist: Quality Zone demo 6

A bilingual (Romanian and English) presentation site for **Salon Ametist, an invented land-based casino**. It covers the restaurant, the bar, the poker room, the table games, the slot room, events, the venue and opening hours. It is a [Quality Zone](https://qualityzone.netlify.app) proof-of-work demo.

> **Demo only.** The venue does not exist. The site offers no gambling of any kind: no games, no accounts, no deposits, no betting and no odds. Every page says so in a banner.

Spec and plan live in the quality-zone repo:

- `docs/superpowers/specs/2026-11-25-demo-6-ametist-design.md`
- `docs/superpowers/plans/2026-11-25-demo-6-ametist.md`

## What it shows

- **Compliance as tests.** The build (`npm run build`) fails if any page, in either language, is missing any of these:
  - the demo banner
  - the 18+ badge
  - the minors-ban line
  - the licence placeholder
  - the ONJN link
  - its twin page with the right `hreflang`

  It also fails if a page shows the age gate where it shouldn't, has a phone number, street address, `tel:` link or ONJN logo, or uses a word that encourages gambling (`scripts/lib/banned-words.mjs`). The notification email is checked too.
- **An accessible age gate:** a dialog that traps focus and sets `inert` on the page behind it. It is remembered per tab in `sessionStorage`, and it has no flash or hydration mismatch (spec §3.3). Help, the demo explanation and privacy stay readable without it.
- **A reservation and question form** with three request types, protected by Turnstile. It sends one email into a **Mailtrap Email Sandbox**, which delivers nothing. Locally and in CI, a stand-in outbox captures the email instead.
- **Tests:** Vitest for the logic and the checks; Playwright with axe on every route, in both languages, with the gate open and closed, at 375 px and 1280 px.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server (no function: sending the form shows an error) |
| `npm run dev:full` | Build with the Turnstile test key, then `wrangler pages dev` on :8788 with the real function and the local outbox |
| `npm test` | Unit tests |
| `npx playwright test` | End-to-end tests (starts `dev:full`; needs network access to challenges.cloudflare.com) |
| `npm run build` | Typecheck, client and SSR builds, prerender (22 pages + 404 + sitemap + email samples), `verify-site`, `check-copy` |
| `npm run og-image` | Redraw `public/og-image.png` |
| `npm run deploy` | Guarded deploy to Cloudflare Pages (refuses a Turnstile test key) |

## Mail modes (`MAIL_MODE`)

- `outbox`: the local default (`.dev.vars.example`). The email goes into the local `OUTBOX` KV namespace. `GET /api/outbox` lists it and `DELETE` clears it, but both answer only on localhost.
- `mailtrap`: production and preview, set in `wrangler.toml` (`[env.production]`, `[env.preview]`). Neither binds `OUTBOX`. It needs the secrets `MAILTRAP_TOKEN` and `MAILTRAP_SANDBOX_ID`. The sender only ever calls `https://sandbox.api.mailtrap.io/api/send/<id>`.
- Anything else, or a missing secret: the form answers `config` ("not connected to its test inbox yet").

The free Mailtrap sandbox accepts 1 email per 10 seconds and 50 a month, and keeps the last 10. That is why there is one email per request and no confirmation to the visitor (spec §7.4).

## Not done yet (needs the owner)

Nothing here has touched an account. The checklist is in `docs/preflight.md` §3:

1. the name check on termene.ro and ONRC
2. the legal check (`docs/surse-legale.md`)
3. whether to list a help service
4. a Mailtrap account
5. the GitHub repo, the Cloudflare Pages project `ametist-demo`, the Turnstile widget, the secrets, the deploy, and then the live Lighthouse run and one real request sent by a person

## Results

Real runs only, in `docs/rezultate/<date>/`. The latest summary is also on `/despre-demo`.
