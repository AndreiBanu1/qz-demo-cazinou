import type { ReactNode } from "react";
import type { IllustrationId } from "@/content/types";
import { colors } from "@/config/theme.js";

// Original line drawings for this demo (spec §8): gilt strokes on night, no people, money, text or brands.
// Shown inside arch-topped frames (rounded-arch), the salon-window shape used for every picture on the site.
const GOLD = colors.gilt;
const SOFT = colors.haze;

const drawings: Record<IllustrationId, ReactNode> = {
  facets: (
    <g fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round">
      <path d="M200 40 290 105 250 240 150 240 110 105Z" />
      <path d="M110 105h180M200 40l-40 65 40 135 40-135-40-65M160 105l-10 135M240 105l10 135" />
    </g>
  ),
  slots: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round">
      {[85, 170, 255].map((x) => (
        <g key={x}>
          <path d={`M${x} 250V120a30 30 0 0 1 60 0v130Z`} />
          <rect x={x + 10} y="124" width="40" height="36" rx="4" />
          <path d={`M${x + 10} 185h40M${x + 10} 198h40`} stroke={SOFT} strokeWidth="1.6" />
          <path d={`M${x} 222h60`} />
        </g>
      ))}
      <path d="M55 250h290" />
      <path d="M200 28v40M184 68h32l-6 12h-20Z" stroke={SOFT} strokeWidth="1.6" />
    </g>
  ),
  cardTable: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2">
      <ellipse cx="200" cy="150" rx="135" ry="78" />
      <ellipse cx="200" cy="150" rx="108" ry="56" stroke={SOFT} strokeWidth="1.6" />
      {[
        [200, 58],
        [292, 80],
        [338, 150],
        [292, 220],
        [200, 242],
        [108, 220],
        [62, 150],
        [108, 80],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="11" />
      ))}
      <path d="M180 120h40v18h-40Z" stroke={SOFT} strokeWidth="1.6" />
    </g>
  ),
  wheel: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2">
      <circle cx="200" cy="150" r="100" />
      <circle cx="200" cy="150" r="76" stroke={SOFT} strokeWidth="1.6" />
      <circle cx="200" cy="150" r="38" />
      <circle cx="200" cy="150" r="9" />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI) / 8;
        const p = (r: number) => `${(200 + r * Math.cos(a)).toFixed(1)} ${(150 + r * Math.sin(a)).toFixed(1)}`;
        return <path key={i} d={`M${p(38)}L${p(76)}`} strokeWidth="1.3" />;
      })}
    </g>
  ),
  stage: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M50 225h300l-17 28H67Z" />
      <path d="M200 225V140M182 225h36" />
      <rect x="190.5" y="118" width="19" height="24" rx="9.5" />
      <path d="M95 50v20M76 70h38l-6 13H82Z" />
      <path d="M84 85 50 222M106 85l36 137" stroke={SOFT} strokeWidth="1.3" strokeDasharray="4 6" />
      <path d="M60 40q140-30 280 0" stroke={SOFT} strokeWidth="1.6" />
    </g>
  ),
  bar: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M50 190h300v60H50ZM50 205h300" />
      <path d="M130 140l-13 28h26Zm0 28v22M112 190h36" />
      <path d="M200 145h18l-3 45h-12Z" />
      <path d="M272 140q0 23 13 23t13-23Zm13 23v27M274 190h22" />
      <path d="M200 40v32M182 72h36l-7 14h-22Z" stroke={SOFT} strokeWidth="1.6" />
    </g>
  ),
};

interface Props {
  id: IllustrationId;
  /** The accessible name; omit for a decorative drawing next to text that already says the same. */
  label?: string;
  className?: string;
}

const Illustration = ({ id, label, className = "" }: Props) => (
  <svg
    {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    viewBox="0 0 400 300"
    width="400"
    height="300"
    className={`block h-auto w-full ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="400" height="300" fill={colors.nightSoft} />
    {drawings[id]}
  </svg>
);

export default Illustration;
