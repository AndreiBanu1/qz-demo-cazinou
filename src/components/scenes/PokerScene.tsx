import { colors } from "@/config/theme.js";
import SceneSvg, { delay } from "./SceneSvg";

// The poker table from above: a gilt-edged rail, deep green baize, face-down cards at each seat and the dealer's place.
// On load the lamp's pool of light fades up and the cards appear seat by seat. No chips, no money, no faces.
// Seven players spaced evenly around the table; the dealer sits at the top (angle −90°).
const SEATS = Array.from({ length: 7 }, (_, i) => {
  const a = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / 8;
  return { x: 320 + 262 * Math.cos(a), y: 220 + 160 * Math.sin(a), a };
});

const PokerScene = ({ label }: { label: string }) => (
  <SceneSvg label={label}>
    <defs>
      <radialGradient id="poker-lamp" cx="320" cy="215" r="250" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={colors.gilt} stopOpacity="0.42" />
        <stop offset="1" stopColor={colors.gilt} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="poker-felt" cx="320" cy="220" r="230" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#1C5A45" />
        <stop offset="1" stopColor="#0C2E24" />
      </radialGradient>
      <pattern id="card-back" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="7" height="7" fill="#6B3E98" />
        <path d="M0 0v7" stroke={colors.orchid} strokeWidth="2" />
      </pattern>
    </defs>
    <ellipse cx="320" cy="225" rx="300" ry="200" fill="url(#poker-lamp)" className="scene-fade" />
    {SEATS.map((s, i) => (
      <rect
        key={i}
        x={s.x - 22}
        y={s.y - 16}
        width="44"
        height="32"
        rx="12"
        fill={colors.nightSoft}
        stroke={colors.haze}
        strokeOpacity="0.6"
        transform={`rotate(${((s.a * 180) / Math.PI + 90).toFixed(1)} ${s.x.toFixed(1)} ${s.y.toFixed(1)})`}
      />
    ))}
    <ellipse cx="320" cy="220" rx="238" ry="132" fill="#3B2A14" stroke={colors.gilt} strokeWidth="2.5" />
    <ellipse cx="320" cy="220" rx="214" ry="112" fill="url(#poker-felt)" />
    <ellipse cx="320" cy="220" rx="176" ry="86" fill="none" stroke={colors.gilt} strokeOpacity="0.45" strokeDasharray="2 7" strokeWidth="2" strokeLinecap="round" />
    {/* The dealer's place and tray, at the top of the table. */}
    <path d="M276 108q44 22 88 0" fill="none" stroke={colors.gilt} strokeWidth="2" />
    <rect x="288" y="118" width="64" height="20" rx="4" fill={colors.night} stroke={colors.gilt} strokeOpacity="0.8" />
    <rect x="304" y="44" width="32" height="30" rx="12" fill={colors.nightSoft} stroke={colors.gilt} strokeOpacity="0.8" />
    {SEATS.map((s, i) => {
      const cx = 320 + (s.x - 320) * 0.7;
      const cy = 220 + (s.y - 220) * 0.6;
      const r = ((s.a * 180) / Math.PI + 90).toFixed(1);
      return (
        <g key={i} className="scene-fade" style={delay(i, 120, 500)} transform={`rotate(${r} ${cx.toFixed(1)} ${cy.toFixed(1)})`}>
          <rect x={cx - 25} y={cy - 19} width="26" height="38" rx="3.5" fill="url(#card-back)" stroke={colors.gilt} strokeWidth="1.6" />
          <rect x={cx - 3} y={cy - 18} width="26" height="38" rx="3.5" fill="url(#card-back)" stroke={colors.gilt} strokeWidth="1.6" transform={`rotate(14 ${cx + 10} ${cy})`} />
        </g>
      );
    })}
  </SceneSvg>
);

export default PokerScene;
