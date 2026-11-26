import { colors } from "@/config/theme.js";
import SceneSvg from "./SceneSvg";

// The small stage: a proscenium arch, draped curtains, a microphone, and round tables in front. On load the two
// spotlights fade up, one after the other.
const FOLDS = [0, 1, 2, 3, 4];

const StageScene = ({ label }: { label: string }) => (
  <SceneSvg label={label}>
    <defs>
      <linearGradient id="curtain" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#2B1247" />
        <stop offset="0.5" stopColor={colors.amethyst} />
        <stop offset="1" stopColor="#2B1247" />
      </linearGradient>
      <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={colors.gilt} stopOpacity="0.55" />
        <stop offset="1" stopColor={colors.gilt} stopOpacity="0.04" />
      </linearGradient>
    </defs>
    {/* Proscenium */}
    <path d="M90 330V90q230-70 460 0v240" fill={colors.night} stroke={colors.gilt} strokeWidth="2.5" />
    {/* Curtains, gathered at each side */}
    {[0, 1].map((side) => (
      <g key={side} transform={side ? "translate(640 0) scale(-1 1)" : undefined}>
        {FOLDS.map((f) => (
          <path key={f} d={`M${96 + f * 18} 86q${10 + f * 4} 120 ${-4 + f * 6} 244h18q${6 + f * 2}-124 ${-6 + f * 2}-240Z`} fill="url(#curtain)" stroke={colors.gilt} strokeOpacity="0.25" />
        ))}
      </g>
    ))}
    <path d="M100 98q220-58 440 0" fill="none" stroke={colors.gilt} strokeOpacity="0.6" strokeWidth="6" strokeDasharray="1 12" strokeLinecap="round" />
    {/* Spotlight beams */}
    <path d="M200 70 250 330h90Z" fill="url(#beam)" className="scene-fade" style={{ animationDelay: "300ms" }} />
    <path d="M440 70 300 330h90Z" fill="url(#beam)" className="scene-fade" style={{ animationDelay: "900ms" }} />
    <circle cx="200" cy="66" r="7" fill={colors.gilt} />
    <circle cx="440" cy="66" r="7" fill={colors.gilt} />
    {/* Stage floor and microphone */}
    <path d="M70 330h500l-24 26H94Z" fill="#2E2212" stroke={colors.gilt} strokeWidth="2" />
    <path d="M320 330V236M300 330h40" stroke={colors.gilt} strokeWidth="2.5" />
    <rect x="311" y="212" width="18" height="28" rx="9" fill={colors.night} stroke={colors.gilt} strokeWidth="2" />
    {/* Round tables in front */}
    {[150, 320, 490].map((x) => (
      <g key={x}>
        <ellipse cx={x} cy="398" rx="54" ry="14" fill={colors.nightSoft} stroke={colors.gilt} strokeOpacity="0.7" />
        <path d={`M${x} 412v20M${x - 18} 432h36`} stroke={colors.gilt} strokeOpacity="0.6" />
        <path d={`M${x - 8} 384l-4 12h8Zm4 12v0`} stroke={colors.haze} strokeOpacity="0.7" fill="none" />
      </g>
    ))}
  </SceneSvg>
);

export default StageScene;
