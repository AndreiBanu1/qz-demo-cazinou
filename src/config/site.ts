export type Lang = "ro" | "en";

// The one place the minimum age is written (spec §3.3). If the Chamber of Deputies passes the Turcan bill (age 21),
// change it here; every page, the gate and the form read it.
export const site = {
  name: "Ametist",
  fullName: "Salon Ametist",
  url: "https://ametist-demo.pages.dev",
  minAge: 18,
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
