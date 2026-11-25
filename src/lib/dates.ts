// Day arithmetic in Europe/Bucharest time (spec §7.1): "tomorrow" is the next day for the venue, wherever the server or
// the visitor's clock is. Relative imports only in src/lib: the Pages Function bundler doesn't know the "@" alias.
const BUCHAREST = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest", year: "numeric", month: "2-digit", day: "2-digit" });
const BUCHAREST_TIME = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Bucharest", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

export const MAX_DAYS_AHEAD = 90;

/** Today's date in Bucharest, as YYYY-MM-DD. */
export const bucharestToday = (now: Date): string => BUCHAREST.format(now);

/** "YYYY-MM-DD HH:MM" in Bucharest time. */
export const bucharestDateTime = (now: Date): string => `${BUCHAREST.format(now)} ${BUCHAREST_TIME.format(now)}`;

const parse = (ymd: string): number | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return null;
  const t = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  // Rejects 2026-02-30 and 2026-13-01, which Date.UTC would roll over.
  return new Date(t).toISOString().slice(0, 10) === ymd ? t : null;
};

/** `ymd` plus `days`, as YYYY-MM-DD. */
export const addDays = (ymd: string, days: number): string => {
  const t = parse(ymd);
  if (t === null) throw new Error(`not a date: ${ymd}`);
  return new Date(t + days * 86_400_000).toISOString().slice(0, 10);
};

/** The first and last bookable day: tomorrow and 90 days from today, in Bucharest. */
export const bookingRange = (now: Date): { min: string; max: string } => {
  const today = bucharestToday(now);
  return { min: addDays(today, 1), max: addDays(today, MAX_DAYS_AHEAD) };
};

/** Whether `date` (YYYY-MM-DD) is from tomorrow to 90 days ahead, in Bucharest days. */
export const dateInRange = (date: string, now: Date): boolean => {
  if (parse(date) === null) return false;
  const { min, max } = bookingRange(now);
  return date >= min && date <= max;
};
