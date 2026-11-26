import { expect, type Page } from "@playwright/test";

export const AGE_KEY = "ametist-age-ok";

/** Opens a page and waits for hydration (AppRoutes sets data-hydrated on <html>). */
export async function open(page: Page, url: string) {
  await page.goto(url);
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
}

/** Marks the age question as answered for this tab before any page script runs. */
export async function answeredYes(page: Page) {
  await page.addInitScript((key) => sessionStorage.setItem(key, "1"), AGE_KEY);
}

export const gate = (page: Page) => page.locator("[data-age-gate]");
