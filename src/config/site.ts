// Plain JS (with age.d.ts) so scripts/build-og-image.mjs can read it too.
import { MIN_AGE } from "./age.js";

export type Lang = "ro" | "en";

// minAge comes from ./age.js, the one place it is written (spec §3.3); every page, the gate, the badge and the form read it.
export const site = {
  name: "Ametist",
  fullName: "Salon Ametist",
  url: "https://ametist-demo.pages.dev",
  minAge: MIN_AGE,
  bannerText: {
    ro: "Site demonstrativ realizat de Quality Zone. Ametist este un local inventat și nu oferă jocuri de noroc, nici online, nici fizic.",
    en: "Demo site built by Quality Zone. Ametist is an invented venue and offers no gambling, online or in person.",
  } satisfies Record<Lang, string>,
  onjnUrl: "https://onjn.gov.ro/",
  qzUrl: "https://qualityzone.netlify.app",
  // From the build variable; the dev and test builds use Cloudflare's always-pass test key. `?.` because
  // Playwright imports this file outside Vite, where import.meta.env is undefined.
  turnstileSiteKey: (import.meta.env?.VITE_TURNSTILE_SITE_KEY as string | undefined) || "1x00000000000000000000AA",
} as const;
