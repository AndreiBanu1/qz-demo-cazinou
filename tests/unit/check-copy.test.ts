import { describe, expect, it } from "vitest";
// @ts-expect-error plain JS module without types
import { copyTextOf, findBanned } from "../../scripts/lib/banned-words.mjs";

const words = (text: string) => (findBanned(text) as { word: string }[]).map((h) => h.word);

describe("findBanned", () => {
  it("flags câștig, Câștigă, castigator (no diacritics), JACKPOT, bonus, free spins, winner, odds", () => {
    for (const t of ["un câștig", "Câștigă acum", "castigator", "JACKPOT", "bonus", "free spins", "the winner", "the odds"])
      expect(words(t).length, t).toBeGreaterThan(0);
  });

  it("flags the rest of the spec's list in both languages", () => {
    for (const t of [
      "intrare gratuită",
      "gratis",
      "garantat",
      "100 de rotiri",
      "cote mari",
      "miza minimă",
      "mize",
      "bani rapizi",
      "te îmbogățești",
      "win big",
      "winning streak",
      "guaranteed",
      "feeling lucky",
      "payout",
      "spin",
      "high stakes",
      "RTP",
      "bonusuri",
      "câștigurile",
    ])
      expect(words(t).length, t).toBeGreaterThan(0);
  });

  it("does not flag winter, window, freedom, mizerie, cotlet, won't", () => {
    for (const t of ["winter", "window", "freedom", "mizerie", "cotlet", "won't", "Wine list", "spinach"])
      expect(words(t), t).toEqual([]);
  });

  it("jocuri de noroc and Joacă responsabil pass", () => {
    expect(words("Jocurile de noroc sunt interzise minorilor. Joacă responsabil. Play responsibly.")).toEqual([]);
  });

  it("returns the context around each hit", () => {
    const [hit] = findBanned("Aici este un text lung înainte de jackpot și după el.") as { context: string }[];
    expect(hit.context).toContain("jackpot");
  });
});

describe("copyTextOf", () => {
  it("data-copy-allow subtrees are skipped, including nested tags", () => {
    const html = `<html><head><title>T</title></head><body><p>Bun venit</p><div data-copy-allow><div><p>jackpot</p></div><p>bonus</p></div><p>după</p></body></html>`;
    const text = copyTextOf(html);
    expect(text).toContain("Bun venit");
    expect(text).toContain("după");
    expect(text).not.toContain("jackpot");
    expect(text).not.toContain("bonus");
  });

  it("attributes and title are checked", () => {
    const html = `<html><head><title>Jackpot night</title><meta name="description" content="free entry"></head><body><img alt="a winner" src="x"><button aria-label="Spin">x</button></body></html>`;
    const hits = words(copyTextOf(html));
    expect(hits).toEqual(expect.arrayContaining(["jackpot", "free", "winner", "spin"]));
  });
});
