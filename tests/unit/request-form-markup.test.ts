import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it } from "vitest";
import AppRoutes from "@/AppRoutes";
// @ts-expect-error plain JS module without types
import { checkRequestForm } from "../../scripts/lib/checks.mjs";
import { FORM_FIELDS } from "@/lib/request-schema";

const render = (url: string) => renderToString(createElement(StaticRouter, { location: url }, createElement(AppRoutes)));
// Rendered before hydration for the default type (masa); marime appears only for eveniment, and Turnstile adds its own field.
const SERVER_FIELDS = FORM_FIELDS.filter((f) => f !== "marime" && f !== "cf-turnstile-response");

describe("the request form as served", () => {
  it("no action attribute, submit disabled, noscript in the page language, every field name present", () => {
    expect(checkRequestForm(render("/contact"), SERVER_FIELDS, "ro")).toEqual([]);
    expect(checkRequestForm(render("/en/contact"), SERVER_FIELDS, "en")).toEqual([]);
  });

  it("the check catches a form that would submit before hydration", () => {
    const html = render("/contact").replace("<form", '<form action="/x"').replace(/(<button[^>]*type="submit"[^>]*?) disabled=""/, "$1");
    const problems = checkRequestForm(html, SERVER_FIELDS, "ro") as string[];
    expect(problems.join()).toMatch(/action/);
    expect(problems.join()).toMatch(/disabled/);
  });

  it("the form carries the demo notice", () => {
    expect(render("/contact")).toContain("Formular demonstrativ.");
    expect(render("/en/contact")).toContain("Demo form.");
  });
});
