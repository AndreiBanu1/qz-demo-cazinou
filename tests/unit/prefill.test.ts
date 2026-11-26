import { describe, expect, it } from "vitest";
import { parsePrefill } from "@/lib/prefill";

describe("parsePrefill", () => {
  it("tip=eveniment kept, tip=vip ignored", () => {
    expect(parsePrefill("?tip=eveniment")).toEqual({ tip: "eveniment" });
    expect(parsePrefill("?tip=vip")).toEqual({});
    expect(parsePrefill("")).toEqual({});
    expect(parsePrefill("?tip=masa&x=1")).toEqual({ tip: "masa" });
  });
});
