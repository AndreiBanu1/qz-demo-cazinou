import type { ComponentType } from "react";
import type { IllustrationId } from "@/content/types";
import PokerScene from "./PokerScene";
import SlotsScene from "./SlotsScene";
import StageScene from "./StageScene";
import VenueScene from "./VenueScene";
import WheelScene from "./WheelScene";

/** The signature scene for each page whose title band has one (by the page's illustration id). */
export const scenes: Partial<Record<IllustrationId, ComponentType<{ label: string }>>> = {
  cardTable: PokerScene,
  wheel: WheelScene,
  slots: SlotsScene,
  stage: StageScene,
  bar: VenueScene,
};
