import { colors } from "@/config/theme.js";
import SceneSvg from "./SceneSvg";

// A roulette wheel drawn as a piece of craftsmanship: wooden bowl, gilt frets, pockets in amethyst and night and a
// turned turret. No ball and no numbers. On load the wheel turns slowly once and comes to rest; the turret turns back.
const CX = 320;
const CY = 220;
const POCKETS = 37;

const ring = (r: number) =>
  Array.from({ length: POCKETS }, (_, i) => {
    const a = (i / POCKETS) * Math.PI * 2;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
  });

const pocketPaths = (() => {
  const outer = ring(168);
  const inner = ring(126);
  return outer.map((p, i) => {
    const q = outer[(i + 1) % POCKETS];
    const qi = inner[(i + 1) % POCKETS];
    const pi = inner[i];
    const f = (n: number) => n.toFixed(1);
    return `M${f(p[0])} ${f(p[1])}L${f(q[0])} ${f(q[1])}L${f(qi[0])} ${f(qi[1])}L${f(pi[0])} ${f(pi[1])}Z`;
  });
})();

const WheelScene = ({ label }: { label: string }) => (
  <SceneSvg label={label}>
    <defs>
      <radialGradient id="wheel-glow" cx={CX} cy={CY} r="240" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={colors.orchid} stopOpacity="0.22" />
        <stop offset="1" stopColor={colors.orchid} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="wheel-cone" cx={CX} cy={CY} r="126" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#5A3D1A" />
        <stop offset="0.7" stopColor="#3B2A14" />
        <stop offset="1" stopColor="#2A1E0E" />
      </radialGradient>
    </defs>
    <circle cx={CX} cy={CY} r="230" fill="url(#wheel-glow)" />
    <circle cx={CX} cy={CY} r="206" fill="#2E2212" stroke={colors.gilt} strokeWidth="2.5" />
    <circle cx={CX} cy={CY} r="186" fill="#3B2A14" stroke={colors.gilt} strokeOpacity="0.5" />
    <g className="scene-turn">
      <circle cx={CX} cy={CY} r="170" fill={colors.night} stroke={colors.gilt} strokeWidth="1.5" />
      {pocketPaths.map((d, i) => (
        <path key={i} d={d} fill={i === 0 ? "#2E5A45" : i % 2 ? colors.amethyst : colors.nightSoft} stroke={colors.gilt} strokeWidth="1" strokeOpacity="0.8" />
      ))}
      <circle cx={CX} cy={CY} r="126" fill="url(#wheel-cone)" stroke={colors.gilt} strokeWidth="1.5" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <path
            key={i}
            d={`M${(CX + 40 * Math.cos(a)).toFixed(1)} ${(CY + 40 * Math.sin(a)).toFixed(1)}L${(CX + 118 * Math.cos(a)).toFixed(1)} ${(CY + 118 * Math.sin(a)).toFixed(1)}`}
            stroke={colors.gilt}
            strokeOpacity="0.35"
          />
        );
      })}
    </g>
    <g className="scene-turn-back">
      <circle cx={CX} cy={CY} r="34" fill="#2E2212" stroke={colors.gilt} strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <g key={i}>
            <path d={`M${CX} ${CY}L${(CX + 62 * Math.cos(a)).toFixed(1)} ${(CY + 62 * Math.sin(a)).toFixed(1)}`} stroke={colors.gilt} strokeWidth="4" strokeLinecap="round" />
            <circle cx={(CX + 62 * Math.cos(a)).toFixed(1)} cy={(CY + 62 * Math.sin(a)).toFixed(1)} r="6" fill={colors.gilt} />
          </g>
        );
      })}
      <circle cx={CX} cy={CY} r="12" fill={colors.gilt} />
    </g>
  </SceneSvg>
);

export default WheelScene;
