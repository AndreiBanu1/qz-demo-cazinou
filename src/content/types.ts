import type { Lang } from "@/config/site";

export type IllustrationId =
  | "facets"
  | "slots"
  | "cardTable"
  | "wheel"
  | "stage"
  | "bar"
  | "blackjack"
  | "baccarat"
  | "jazz"
  | "tasting"
  | "acoustic"
  | "retro";

export interface Section {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
}

/** A venue or information page: a heading, a lead paragraph, an illustration and sections (spec §4). */
export interface PageContent {
  h1: string;
  lead: string;
  illustration?: { id: IllustrationId; label: string };
  sections: Section[];
}

export type Bilingual<T> = Record<Lang, T>;
