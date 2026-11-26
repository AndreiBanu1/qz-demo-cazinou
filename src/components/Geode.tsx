// The hero's one bold element (docs/design.md): an amethyst geode in cross-section, drawn from fixed numbers so the
// server and the browser produce the same markup. Bands run from a gilt rim to the dark cavity, where the wordmark sits.
// Each band fades in from the rim inwards on load (index.css), unless the visitor prefers reduced motion.
import { colors } from "@/config/theme.js";

// From the rind inwards: a gilt-edged rind, a grey-violet crust, thin agate lines, then the thick amethyst zone and
// the cavity. Thin pale lines are kept few, so the geode reads dark and deep, not pastel.
const BANDS: { fill: string; stroke?: string; step: number }[] = [
  { fill: "#2E2212", stroke: colors.gilt, step: 0 },
  { fill: "#3A2F47", step: 0.045 },
  { fill: "#5C4C70", step: 0.03 },
  { fill: colors.haze, step: 0.02 },
  { fill: "#7D5AA6", step: 0.012 },
  { fill: colors.quartzDeep, step: 0.022 },
  { fill: "#6A4596", step: 0.01 },
  { fill: "#8E62BC", step: 0.024 },
  { fill: "#55307F", step: 0.018 },
  { fill: colors.orchid, step: 0.03 },
  { fill: "#5B2E88", step: 0.012 },
  { fill: colors.amethyst, step: 0.05 },
  { fill: "#351A55", step: 0.06 },
  { fill: "#1E0F33", step: 0.07 }, // the cavity
];
const SCALE = BANDS.reduce<number[]>((acc, b, i) => [...acc, (acc[i - 1] ?? 1) - b.step], []);

const POINTS = 56;
const R = 300;

const radiusAt = (band: number, a: number, k: number) => {
  const wobble = 0.06 * Math.sin(3 * a + band * 0.7) + 0.04 * Math.sin(5 * a + 1.3 + band) + 0.022 * Math.sin(9 * a + band * 2.1);
  // Every other point steps in a little, so the edges read as crystal facets rather than smooth curves.
  const facet = k % 2 === 0 ? 0 : -0.012 - 0.006 * (band % 3);
  return R * SCALE[band] * (1 + wobble + facet);
};

const polygon = (band: number) =>
  Array.from({ length: POINTS }, (_, k) => {
    const a = (k / POINTS) * Math.PI * 2;
    const r = radiusAt(band, a, k);
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a) * 0.86).toFixed(1)}`;
  }).join(" ");

// Crystals growing from the cavity wall towards the centre: long thin triangles of varying length.
const CRYSTALS = Array.from({ length: 76 }, (_, k) => {
  const a = (k / 76) * Math.PI * 2 + 0.02 * Math.sin(k * 1.7);
  const base = radiusAt(BANDS.length - 1, a, 0) * 0.98;
  const len = 0.22 + 0.2 * (0.5 + 0.5 * Math.sin(k * 2.3 + 0.4)) + 0.08 * Math.sin(k * 5.1);
  const tip = base * (1 - len);
  const spread = 0.045;
  const p = (r: number, ang: number) => `${(r * Math.cos(ang)).toFixed(1)},${(r * Math.sin(ang) * 0.86).toFixed(1)}`;
  return { points: `${p(base, a - spread)} ${p(tip, a)} ${p(base, a + spread)}`, light: k % 4 === 0 };
});

// `fit`: "cover" fills a phone screen edge to edge; "contain" shows the whole stone, set in the night, on wide screens.
const Geode = ({ label, fit = "contain" }: { label?: string; fit?: "cover" | "contain" }) => (
  <svg
    viewBox={fit === "cover" ? "-260 -230 520 460" : "-318 -276 636 552"}
    {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    className="h-full w-full"
    preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
  >
    <defs>
      <radialGradient id="geode-depth" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(210 180)">
        <stop offset="0" stopColor={colors.night} stopOpacity="0.96" />
        <stop offset="0.6" stopColor={colors.night} stopOpacity="0.86" />
        <stop offset="1" stopColor={colors.night} stopOpacity="0" />
      </radialGradient>
    </defs>
    {BANDS.map((b, i) => (
      <polygon
        key={i}
        className="geode-band"
        style={{ animationDelay: `${i * 55}ms` }}
        points={polygon(i)}
        fill={b.fill}
        stroke={b.stroke ?? "none"}
        strokeWidth={b.stroke ? 2 : 0}
        strokeLinejoin="round"
      />
    ))}
    <g className="geode-band" style={{ animationDelay: `${BANDS.length * 55}ms` }}>
      {CRYSTALS.map((c, i) => (
        <polygon
          key={i}
          points={c.points}
          fill={c.light ? "#9C72C9" : "#4B2675"}
          fillOpacity={c.light ? 0.6 : 0.85}
          stroke={c.light ? colors.gilt : "none"}
          strokeOpacity="0.5"
          strokeWidth="0.8"
        />
      ))}
      <ellipse cx="0" cy="0" rx="210" ry="180" fill="url(#geode-depth)" />
    </g>
  </svg>
);

export default Geode;
