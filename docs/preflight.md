# Pre-flight (Task 0)

Date of all checks: 2026-11-25. Internal document, English on purpose. Nothing here touched an account.

## 1. Turnstile test keys

Cloudflare's published test keys (the same list as in `qz-demo-gradinarit/docs/preflight.md` and `scripts/check-deploy-env.mjs`):

| Key | Value |
|---|---|
| Site key, always passes (visible) | `1x00000000000000000000AA` |
| Site key, always blocks (visible) | `2x00000000000000000000AB` |
| Site key, always passes (invisible) | `1x00000000000000000000BB` |
| Site key, always blocks (invisible) | `2x00000000000000000000BB` |
| Site key, forces an interactive challenge | `3x00000000000000000000FF` |
| Secret, always passes | `1x0000000000000000000000000000000AA` |

The always-pass site key always returns the dummy token `XXXX.DUMMY.TOKEN.XXXX`. Verifying with the test secret still calls siteverify, so the end-to-end tests need network access to challenges.cloudflare.com. The live managed widget gives automated Chromium no token, so the live form test needs a person (finding from Frunza Harnică).

## 2. Mailtrap Email Sandbox (read 2026-11-25)

- Send: `POST https://sandbox.api.mailtrap.io/api/send/{sandbox_id}`, header `Authorization: Bearer {token}` (or `Api-Token`), JSON `{ from: {email, name}, to: [{email, name}], reply_to?, subject, text, html, category }`. Success: 200 `{ "success": true, "message_ids": [...] }`. Errors: 400, 401, 429 ("Billing plan limit exhausted or sandbox rate limit exceeded"), 500, body `{ "success": false, "errors": [...] }`. Source: https://docs.mailtrap.io/api-docs/email-sandbox/send-test-emails/send-email-including-templates.md
- The sandbox ID is the number in the sandbox URL (`https://mailtrap.io/sandboxes/<id>`). Source: https://docs.mailtrap.io/email-sandbox/setup/sandbox-api-integration.md
- List messages: `GET https://mailtrap.io/api/sandboxes/{sandbox_id}/messages`, same auth, up to 30 per page. Source: https://docs.mailtrap.io/api-docs/email-sandbox/messages/get-messages.md
- Free plan: 50 test emails a month, 10 kept per sandbox (oldest removed first), 1 email per sandbox per 10 seconds, 1 sandbox, 5 MB max. Source: https://mailtrap.io/pricing/
- General API rate limit: 150 requests per 10 s per token. Source: https://docs.mailtrap.io/api-docs/rate-limits.md

## 3. The user's checklist before launch

Nothing below has been done. Each item is the user's.

1. **Name check:** „Ametist” and „Salon Ametist” on termene.ro and ONRC.
2. **Legal check** of spec §3 (sources in `docs/surse-legale.md`):
   - OUG 77/2009 art. 21(3)(c): the word „cazinou” in descriptive copy on a demo that is not an operator
   - Norme HG 111/2016 art. 6(1): the licence placeholder instead of a licence number and the ONJN logo
   - the status of the Turcan bills (minimum age 21) in the Chamber of Deputies; if passed, set `site.minAge = 21`
   - whether „Decizia ONJN nr. 1598/16.09.2021” sets a responsible-gaming message for websites
3. **Help service:** whether „Joc responsabil” should list a specific, sourced help service (a national helpline). Today it links to onjn.gov.ro only.
4. **Mailtrap:** create a free account and a sandbox; note the sandbox ID and an API token.
5. **Outward steps** (spec §13): GitHub repo `AndreiBanu1/qz-demo-cazinou` (public) and Pages for the test report; Cloudflare Pages project `ametist-demo`; the Turnstile widget; the secrets `TURNSTILE_SECRET`, `MAILTRAP_TOKEN` and `MAILTRAP_SANDBOX_ID` (`MAIL_MODE=mailtrap` is already set for production and preview in `wrangler.toml`, which is the source of truth for the project's config, so it is not a dashboard variable); `npm run deploy`; then the live Lighthouse run and one real request by a person.
