import { colors } from "@/config/theme.js";
import SceneSvg, { delay } from "./SceneSvg";

// The building in cross-section, after the Hippodrome's facade drawn in points of light (docs/design.md): a mansard
// roof, the gaming rooms upstairs under chandeliers, and the restaurant, bar and stage on the ground floor. On load the
// building's lights come on, a few at a time, and stay on.
const LIGHTS = [
  // The roof line and cornice, as points of light.
  ...Array.from({ length: 15 }, (_, i) => ({ x: 80 + i * 34.3, y: 96 })),
  ...Array.from({ length: 9 }, (_, i) => ({ x: 182 + i * 34.5, y: 46 })),
  ...Array.from({ length: 15 }, (_, i) => ({ x: 80 + i * 34.3, y: 226 })),
];

const VenueScene = ({ label }: { label: string }) => (
  <SceneSvg label={label}>
    <defs>
      <linearGradient id="venue-room" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={colors.amethyst} stopOpacity="0.55" />
        <stop offset="1" stopColor={colors.nightSoft} />
      </linearGradient>
    </defs>
    {/* Mansard roof */}
    <path d="M60 100 170 40h300l110 60Z" fill="#1E1230" stroke={colors.gilt} strokeWidth="2" />
    {/* Upper floor: the gaming rooms */}
    <rect x="60" y="100" width="520" height="126" fill="url(#venue-room)" stroke={colors.gilt} strokeWidth="2" />
    {[180, 320, 460].map((x) => (
      <g key={x} stroke={colors.gilt} fill="none" strokeOpacity="0.85">
        <path d={`M${x} 100v14`} />
        <path d={`M${x - 22} 126q22 14 44 0M${x - 14} 116h28`} />
        <circle cx={x} cy="130" r="2.5" fill={colors.gilt} />
      </g>
    ))}
    {[150, 300].map((x) => (
      <g key={x}>
        <ellipse cx={x + 20} cy="196" rx="52" ry="12" fill="#1C5A45" stroke={colors.gilt} strokeOpacity="0.8" />
        <path d={`M${x - 20} 210h80`} stroke={colors.gilt} strokeOpacity="0.3" />
      </g>
    ))}
    {[430, 470, 510].map((x) => (
      <path key={x} d={`M${x} 222v-46a14 12 0 0 1 28 0v46Z`} fill={colors.night} stroke={colors.gilt} strokeOpacity="0.8" />
    ))}
    {/* Ground floor: restaurant, bar and stage */}
    <rect x="60" y="226" width="520" height="150" fill={colors.nightSoft} stroke={colors.gilt} strokeWidth="2" />
    {[110, 170, 230].map((x) => (
      <g key={x} stroke={colors.gilt} strokeOpacity="0.8" fill="none">
        <ellipse cx={x} cy="330" rx="20" ry="6" />
        <path d={`M${x} 336v26M${x - 10} 362h20`} />
      </g>
    ))}
    <path d="M290 300h130v62H290Z" fill="#2E2212" stroke={colors.gilt} strokeWidth="1.5" />
    {[300, 330, 360, 390].map((x) => (
      <path key={x} d={`M${x} 270l-6 14h12ZM${x} 284v16`} stroke={colors.haze} strokeOpacity="0.8" fill="none" />
    ))}
    <path d="M450 330h110v32H450Z" fill="#2E2212" stroke={colors.gilt} strokeWidth="1.5" />
    <path d="M505 330v-40M496 290h18" stroke={colors.gilt} strokeWidth="1.5" />
    <path d="M440 236 470 328M570 236l-30 92" stroke={colors.gilt} strokeOpacity="0.35" strokeDasharray="3 6" />
    {/* Street level */}
    <path d="M30 376h580" stroke={colors.gilt} strokeWidth="2" />
    <path d="M290 376v-8h60v8" stroke={colors.gilt} fill="none" />
    {LIGHTS.map((l, i) => (
      <circle key={i} cx={l.x.toFixed(1)} cy={l.y} r="3.2" fill={colors.gilt} className="scene-warm" style={delay(i % 15, 60, 200 + Math.floor(i / 15) * 400)} />
    ))}
  </SceneSvg>
);

export default VenueScene;
