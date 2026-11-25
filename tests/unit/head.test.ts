import { describe, expect, it } from "vitest";
import { pageFor } from "@/config/pages";
import { renderHead } from "@/seo/head";

describe("renderHead", () => {
  it("writes noindex, a canonical, and hreflang ro, en and x-default with the twin URLs", () => {
    const head = renderHead(pageFor("/en/poker"));
    expect(head).toContain('<meta name="robots" content="noindex" />');
    expect(head).toContain('<link rel="canonical" href="https://ametist-demo.pages.dev/en/poker" />');
    expect(head).toContain('<link rel="alternate" hreflang="ro" href="https://ametist-demo.pages.dev/poker" />');
    expect(head).toContain('<link rel="alternate" hreflang="en" href="https://ametist-demo.pages.dev/en/poker" />');
    expect(head).toContain('<link rel="alternate" hreflang="x-default" href="https://ametist-demo.pages.dev/poker" />');
  });

  it("og:locale is ro_RO or en_GB per page", () => {
    expect(renderHead(pageFor("/"))).toContain('<meta property="og:locale" content="ro_RO" />');
    expect(renderHead(pageFor("/en"))).toContain('<meta property="og:locale" content="en_GB" />');
  });

  it("escapes the title", () => {
    expect(renderHead(pageFor("/"))).not.toMatch(/<title>[^<]*["<>][^<]*<\/title>/);
  });
});
