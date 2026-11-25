# Legal sources (spec §3)

Read on 2026-11-25. The consolidated texts on legislatie.just.ro may not be the newest versions. **This is not legal advice.** The owner checks everything here before launch (`docs/preflight.md` §3).

| Source | URL | What it says | What the demo does |
|---|---|---|---|
| OUG 77/2009, art. 21 alin. (3) lit. c); fine in art. 22 alin. (1) | https://legislatie.just.ro/Public/DetaliiDocumentAfis/108149 | Organisers must not use „cazinou”, „casino” or derivatives unless they run casino activity, and then only for authorised venues. Fine 20,000–40,000 lei | The brand is „Ametist” / „Salon Ametist”. „Cazinou” appears only in descriptive copy, next to the demo label |
| OUG 77/2009, art. 7 | same | A participant is „orice persoană fizică majoră” | The 18+ badge, the age gate and the ID rule |
| OUG 77/2009, art. 26 | same | Advertising for prohibited games is a contravention (50,000–100,000 lei) | Nothing on the site is a game or an offer |
| Norme HG 111/2016, art. 6(1); fine in art. 151(2)(b) | https://legislatie.just.ro/Public/DetaliiDocumentAfis/230068 | Promotional materials show the ban on minors, „seria și numărul licenței” and „sigla ONJN”; not near schools or religious institutions | Minors line on every page; a dashed placeholder instead of a licence number and logo; the real logo is never used (checked by `verify-site`) |
| Norme, art. 6(2) | same | An operator may promote on its own premises and its own web pages, under its licence | Explained on `/despre-demo` |
| Norme, art. 80 (slot halls) | same | No images or symbols suggesting gambling outside; no flashing or strobe lights; size limits for signs | No flashing anything; `prefers-reduced-motion` respected; the site leads with the evening out |
| Norme, art. 128 (remote gambling) | same | The site shows the ONJN link, the explicit under-18 ban and the addiction-prevention policy | Followed as good practice: ONJN link, minors line, „Joc responsabil” |
| Norme, art. 150(1)(i), (r), (ș) | same | Opening hours displayed; no minors in venues; the „cazinou” name rule | Hours on home, contact and the footer |
| Senate vote, 16 Feb 2026 (Turcan bills) | https://www.mediafax.ro/politic/senatul-adopta-doua-proiecte-privind-jocurile-de-noroc-varsta-minima-de-acces-creste-la-21-de-ani-reclamele-online-sunt-restrictionate-23687800 | Minimum age 18 → 21; online gambling ads banned 06:00–24:00; no ads with public figures. Sent to the Chamber of Deputies (deciding chamber). No final vote found on 2026-11-25 | `site.minAge` in `src/config/site.ts` is the only place the age is written |
| TikTok Community Guidelines, regulated commercial activities | https://www.tiktok.com/community-guidelines/en/regulated-commercial-activities | Non-ad content may not market gambling | The demo is not built around an episode |

**Not found:** a mandatory responsible-gaming message text or size for land-based venues. One lead remains unverified: „Decizia ONJN nr. 1598/16.09.2021”, cited in a media site footer. The ONJN legislation page returned 404 on 2026-11-25.
