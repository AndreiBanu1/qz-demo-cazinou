import type { Lang } from "@/config/site";

// The invented venue's hours and weekly programme (spec §5). No calendar dates, prices, buy-ins or counts.
export interface Hours {
  id: "jocuri" | "restaurant" | "bar";
  area: Record<Lang, string>;
  open: string;
  close: string;
}

export const hours: Hours[] = [
  { id: "jocuri", area: { ro: "Sălile de joc (sloturi, mese, poker)", en: "Gaming rooms (slots, tables, poker)" }, open: "14:00", close: "04:00" },
  { id: "restaurant", area: { ro: "Restaurantul", en: "The restaurant" }, open: "18:00", close: "24:00" },
  { id: "bar", area: { ro: "Barul și scena", en: "The bar and stage" }, open: "18:00", close: "02:00" },
];

export const daily: Record<Lang, string> = { ro: "zilnic", en: "daily" };
