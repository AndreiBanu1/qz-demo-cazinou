# Design: research and plan (2026-11-26)

The user found the first version too plain and asked for a design inspired by leading casino websites. These are observations made in a browser on 2026-11-26, with non-essential cookies declined. No content, imagery or brand elements were copied.

## What the leading land-based venues do

| Site | What stands out | Take or leave |
|---|---|---|
| Casino de Monte-Carlo (montecarlosbm.com) | A full-bleed night photo of the building, a large centred serif headline set over it, a crest wordmark, a mosaic of interiors, a row of game types | **Take:** the building as the hero, and a headline at architectural scale. **Leave:** the live jackpot counters (banned by spec §3.2) |
| Wynn Las Vegas (wynnlasvegas.com) | A light warm base, serif headings, a booking bar, promotion and game cards, people "enjoying the thrill" | **Leave** almost all of it: the promotion cards and inducement copy are what the spec forbids, and the card grid is the generic hotel template |
| Casino Baden-Baden (casino-baden-baden.de) | A full-screen interior (chandeliers, red and gold), a tiny centred serif wordmark, almost no chrome, widely spaced serif type for events | **Take:** immersion, restraint, and confident type with little else on screen |
| The Hippodrome, London (hippodromecasino.com) | Near-black, mostly promotional banners, short centred statements, the building drawn as a night-time cloud of points of light | **Take:** the facade as an illustration of light, which works without photos. **Leave:** the promotional banners |
| Marina Bay Sands (marinabaysands.com/casino.html) | An ivory base, architectural photography, a light sculpture as the hero, letterspaced display type, asymmetric image and text blocks, generous white space | **Take:** a light base for reading, and asymmetric editorial blocks instead of a card grid |
| Holland Casino (hollandcasino.nl) | Redirects to its online casino | Out of scope (online gaming) |

**The pattern:** the premium venues sell **the place**, not the games. They have one immersive hero, type at architectural scale, very little chrome, and editorial layouts with room to breathe. The weaker sites sell promotions with card grids and "thrill" imagery, which this demo may not do anyway. So the redesign follows the premium pattern.

**Our constraint:** no photos (spec §2). The hero therefore has to be immersive through illustration, the way the Hippodrome draws its facade in light.

## Plan

**The one bold element:** the hero is **an amethyst geode**, the venue's namesake, drawn as an SVG cross-section. Irregular crystalline bands run from a gilt rim to a deep violet cavity, and the wordmark sits inside it. On load the bands light up from the rim inwards in one orchestrated sequence, the only ambient motion on the site. It is specific to this brand, it signals luxury without any gambling symbol, and it needs no photo. Everything else stays quiet.

**Colour:**

| Name | Hex | Role |
|---|---|---|
| Geode night | `#140C22` | hero, inner-page title bands, footer |
| Amethyst | `#43206A` | the geode's deep bands, emphasis panels, headings on quartz |
| Orchid | `#B48CD8` | the geode's light bands, focus rings on dark |
| Quartz | `#F3EEF6` | the reading background (light, slightly lilac, not cream) |
| Plum ink | `#1C0E2C` (secondary `#3D2C50`) | body text on quartz |
| Gilt | `#D2AE5A` on dark, `#664A08` on quartz | wordmark, hairline rules, links; never as a fill behind text |

**Type:**

- *(Replaced on 2026-11-26 by Fraunces and Figtree; see the revisions at the end.)* **Bodoni Moda** (variable, with optical sizes) for display: high-contrast Didone, the type of the European salon era and of grand programmes and menus. It is set large, with light tracking on the wordmark and tight leading on headlines.
- **Jost** (variable), a geometric sans in the Futura tradition, for body and interface text: the 1920s pairing with Bodoni, and clearly distinct from it.
- Scale: 16/18 px body, 1.6–1.7 leading, rising by 1.333 to 76 px for the hero. Measure under 70 characters.

**Layout:**

```
Home
┌──────────────────────────────────────────────┐
│ banner (demo label)                           │
│ wordmark · nav · EN · 18+          (on night) │
│                                               │
│     ◆◆ geode cross-section, full height ◆◆    │
│        Ametist  (inside the cavity)           │
│        O seară în oraș…   [Rezervă o masă]    │
├──────────────────────────────────────────────┤ quartz
│ O seară la Ametist: a real timeline of hours  │
│ 18:00 cina ─ 20:00 concert/turneu ─ 02:00 bar │
├──────────────────────────────────────────────┤
│ Rooms: alternating editorial rows             │
│ [vignette]  Restaurantul și barul  text  link │
│ text  Camera de poker  [vignette]             │
├──────────────────────────────────────────────┤ amethyst panel
│ The monthly programme, like a printed         │
│ theatre programme: double gilt rule frame     │
├──────────────────────────────────────────────┤
│ Doar pentru adulți (quiet)                    │
└──────────────────────────────────────────────┘ night footer
Inner pages: a night title band (Bodoni h1 + a small geode fragment), then quartz reading columns (left-aligned, 65ch), illustrations set into the margin on wide screens.
```

- **Alignment:** left-aligned text throughout. Only the hero wordmark is centred, inside the geode.
- **Structure:** the evening timeline is numbered by **real times**, because it really is a sequence. Nothing else is numbered. There are no eyebrow labels above headings and no all-caps labels.

**Principles:**

- **The place, not the games:** no promotions, counters or "thrill".
- **One memorable thing (the geode),** with everything around it disciplined.
- **Gilt is a line, never a fill behind text.**
- **Every compliance element stays first-class:** the banner, the 18+ badge, the minors line and the licence box are set in the same type system, not hidden.

## Review against the brief (what changed after the first draft)

1. **The first idea was dark violet everywhere with a gold accent.** That is the "near-black and a single accent" default, and it is what the current site already is. **Changed to:** a light quartz reading base, with night reserved for the hero, the title bands and the footer.
2. **The first idea for type was Cormorant again, or Cinzel.** Cinzel is the casino-site cliché, and Cormorant reads as the generic "elegant serif". **Changed to:** Bodoni Moda with Jost, a period-true pairing that suits a salon.
3. **The first idea for the areas was a grid of identical cards.** That is the SaaS card kit. **Changed to:** alternating editorial rows with the line vignettes, like Marina Bay Sands' asymmetric blocks.
4. **The first idea for the events was a list.** **Changed to:** a printed-programme frame, because the content is literally a programme, and the double rule carries the meaning "this is the programme".
5. **The first idea for motion was reveals on each section.** **Changed to:** one sequence, on the hero geode only, and off with `prefers-reduced-motion`.

## Revision, 2026-11-26: stronger text on the light background

The user found the text in the room rows hard to see on the quartz background. It passed WCAG AA, but it read faint: Jost at weight 400, the soft secondary colour, and Bodoni's hairlines all thin it out on a light ground.

**Changed:**
- **Colours:** plum ink `#2A1838` → `#1C0E2C`; secondary `#5A4868` → `#3D2C50`; deep gilt `#76560F` → `#664A08`; amethyst `#4A2470` → `#43206A`.
- **Body text:** Jost at weight 450.
- **Bodoni on quartz:** weight 600; on night it stays at 500, where the gilt reads well.
- **Room descriptions and the timeline:** now in the main ink colour, not the secondary one.

## Revision, 2026-11-26: a new pair of typefaces

The user still found the text hard to see and asked for the fonts to change completely. Bodoni Moda's hairlines are its whole character, and Jost is a light geometric face, so no weight setting could make the pair solid on a light background.

**Changed:**
- **Display: Fraunces** (variable). A sturdy "old-style soft" serif with thick, even strokes, still warm and premium. Its optical size is held at 24 (`font-optical-sizing: none`), because the automatic setting would thin large headings into hairlines again. Weight 600.
- **Body: Figtree** (variable). A clean sans with solid, even strokes, made for screens. Weight 500.

The palette, layout and geode are unchanged. The tests, axe and Lighthouse were rerun (`docs/rezultate/2026-11-26/`).

## Revision, 2026-11-26: a signature scene for each page

The user found the inner pages plain next to the home page and approved three changes.

1. **One scene per page,** in the geode's style, in the title band (`src/components/scenes/`):
   - **Poker:** the table from above, with green baize, face-down cards and the dealer's place
   - **Table games:** a roulette wheel drawn as craftsmanship, with no ball and no numbers
   - **Slots:** cabinets with blank screens under a lit marquee, with no symbols
   - **Events:** a small stage with curtains and two spotlights
   - **Venue:** the building in cross-section, after the Hippodrome's facade in points of light
2. **One movement per scene, once, on load,** and off with reduced motion:
   - the wheel turns once and comes to rest, while the turret turns back
   - the poker lamp's light fades up and the cards appear seat by seat
   - the slot marquee bulbs warm on one by one and stay on
   - the spotlights fade up one after the other
   - the building's lights come on a few at a time

   **Nothing loops, flashes or spins like reels:** Norme art. 80 bans flashing lights in slot halls, and the site keeps well clear of that.
3. **Structure where the content has it:**
   - **Poker:** the weekly programme in the printed-programme frame, a shared `ProgrammeFrame` (the home page uses it too)
   - **Table games:** the three games as a trio with their own drawings
   - **Events:** each monthly format with its own vignette (trumpet, glass and plate, guitar, record)
   - **Venue:** a "how the salon is laid out" section beside the cross-section

## Revision, 2026-11-26: a more detailed venue scene

The user asked for more detail in the venue cross-section. It now shows what the page's "how the salon is laid out" section describes: the stairs and the lift joining the floors; upstairs the poker room (a table with cards dealt face down and chairs), the table games (a roulette table with no ball and no numbers) and the slot room (cabinets with blank screens and stools), under chandeliers and arched windows; downstairs the restaurant (laid tables, candles, pendant lamps), the bar (a mirrored back bar with bottles, the counter, stools) and the stage (curtains, two spotlights, a grand piano, a microphone). Outside there are a mansard roof with dormers and an amethyst crest, a cornice, quoins, a stone plinth, street lamps, still stars and a crescent moon.

The movement stays a single one: the lights come on once, in waves from the street up to the roof, and stay on.
