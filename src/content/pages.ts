import { confidentialitate } from "./confidentialitate";
import { jocResponsabil } from "./joc-responsabil";
import { locatia } from "./locatia";
import { mese } from "./mese";
import { sloturi } from "./sloturi";
import type { Bilingual, PageContent } from "./types";
import { evenimente } from "./evenimente";
import { pokerPage } from "./poker";

// The pages built from the generic layout, so tests can compare their two languages in one loop.
export const pageContent: Record<string, Bilingual<PageContent>> = {
  sloturi,
  poker: pokerPage,
  mese,
  evenimente,
  locatia,
  "joc-responsabil": jocResponsabil,
  confidentialitate,
};
