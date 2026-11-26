import { describe, expect, it } from "vitest";
import { pageFor, pages } from "@/config/pages";
import { structuredData } from "@/seo/structured-data";

type Node = Record<string, unknown>;
const graph = (path: string) => (structuredData(pageFor(path))[0] as { "@graph": Node[] })["@graph"];
const ofType = (path: string, type: string) => graph(path).filter((n) => n["@type"] === type);

const keysDeep = (o: unknown): string[] =>
  Array.isArray(o)
    ? o.flatMap(keysDeep)
    : o && typeof o === "object"
      ? Object.entries(o).flatMap(([k, v]) => [k, ...keysDeep(v)])
      : [];

describe("structured data", () => {
  it("Casino with disambiguatingDescription in the page's language", () => {
    const [ro] = ofType("/", "Casino");
    expect(ro.name).toBe("Salon Ametist");
    expect(String(ro.disambiguatingDescription)).toContain("Local inventat");
    const [en] = ofType("/en", "Casino");
    expect(String(en.disambiguatingDescription)).toContain("invented venue");
  });

  it("no telephone, streetAddress, geo or priceRange on any page", () => {
    for (const p of pages) {
      const keys = keysDeep(structuredData(p));
      for (const k of ["telephone", "streetAddress", "geo", "priceRange"]) expect(keys, `${p.path} ${k}`).not.toContain(k);
    }
  });

  it("address is only addressCountry RO", () => {
    const [c] = ofType("/poker", "Casino");
    expect(c.address).toEqual({ "@type": "PostalAddress", addressCountry: "RO" });
  });

  it("the gaming rooms' hours are 14:00 to 04:00 every day", () => {
    const [c] = ofType("/", "Casino");
    const [spec] = c.openingHoursSpecification as Node[];
    expect(spec.opens).toBe("14:00");
    expect(spec.closes).toBe("04:00");
    expect((spec.dayOfWeek as string[]).length).toBe(7);
  });

  it("inLanguage matches the page", () => {
    for (const p of pages) expect(ofType(p.path, "WebPage")[0].inLanguage, p.path).toBe(p.lang);
  });

  it("WebSite on home only, BreadcrumbList below home only", () => {
    expect(ofType("/", "WebSite")).toHaveLength(1);
    expect(ofType("/poker", "WebSite")).toHaveLength(0);
    expect(ofType("/", "BreadcrumbList")).toHaveLength(0);
    const [crumbs] = ofType("/en/venue", "BreadcrumbList");
    expect((crumbs.itemListElement as Node[]).map((i) => i.name)).toEqual(["Home", "Venue"]);
  });

  it("no Event nodes", () => {
    for (const p of pages) expect(JSON.stringify(structuredData(p))).not.toContain('"Event"');
  });
});
