import { colors } from "@/config/theme.js";
import SceneSvg, { delay } from "./SceneSvg";

// The slot room: a row of cabinets under a lit marquee arch. The screens are blank: no symbols, sevens or fruit, and
// nothing flashes. On load the marquee bulbs warm on one by one and stay on.
const CABINETS = [70, 200, 330, 460];
const BULBS = Array.from({ length: 23 }, (_, i) => {
  const a = Math.PI * (1 - i / 22);
  return { x: 320 + 270 * Math.cos(a), y: 200 - 150 * Math.sin(a) };
});

const SlotsScene = ({ label }: { label: string }) => (
  <SceneSvg label={label}>
    <defs>
      <linearGradient id="slot-screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={colors.orchid} stopOpacity="0.55" />
        <stop offset="1" stopColor={colors.amethyst} stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="slot-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={colors.nightSoft} />
        <stop offset="1" stopColor="#170D28" />
      </linearGradient>
    </defs>
    {/* The marquee arch and its bulbs. */}
    <path d="M50 200a270 150 0 0 1 540 0" fill="none" stroke={colors.gilt} strokeWidth="2.5" />
    {BULBS.map((b, i) => (
      <circle key={i} cx={b.x.toFixed(1)} cy={b.y.toFixed(1)} r="5" fill={colors.gilt} className="scene-warm" style={delay(i, 70, 200)} />
    ))}
    {/* The floor: a carpet border in perspective. */}
    <path d="M20 410h600M60 390h520" stroke={colors.gilt} strokeOpacity="0.35" />
    {CABINETS.map((x, i) => (
      <g key={x}>
        <path d={`M${x} 390V190a55 40 0 0 1 110 0v200Z`} fill="url(#slot-body)" stroke={colors.gilt} strokeWidth="2" />
        <rect x={x + 16} y="196" width="78" height="70" rx="6" fill="url(#slot-screen)" stroke={colors.gilt} strokeOpacity="0.7" className="scene-fade" style={delay(i, 160, 1700)} />
        <path d={`M${x + 16} 290h78M${x + 16} 306h78`} stroke={colors.haze} strokeOpacity="0.6" strokeWidth="2" />
        <rect x={x + 10} y="328" width="90" height="12" rx="3" fill={colors.night} stroke={colors.gilt} strokeOpacity="0.6" />
        <path d={`M${x + 20} 392v14M${x + 90} 392v14`} stroke={colors.haze} strokeOpacity="0.5" />
      </g>
    ))}
  </SceneSvg>
);

export default SlotsScene;
