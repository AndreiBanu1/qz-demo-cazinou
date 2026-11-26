import { REQUEST_TYPES, type RequestType } from "./request-schema";

/** `?tip=` from a link such as the private-event button on /evenimente. Unknown values are ignored, never shown. */
export const parsePrefill = (search: string): { tip?: RequestType } => {
  const tip = new URLSearchParams(search).get("tip");
  return REQUEST_TYPES.includes(tip as RequestType) ? { tip: tip as RequestType } : {};
};
