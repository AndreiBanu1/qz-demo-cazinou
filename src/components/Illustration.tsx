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
  blackjack: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M70 90h260a130 130 0 0 1-260 0Z" />
      <path d="M95 105h210a105 105 0 0 1-210 0" stroke={SOFT} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = Math.PI * (0.12 + i * 0.19);
        return <circle key={i} cx={(200 - 158 * Math.cos(a)).toFixed(1)} cy={(90 + 158 * Math.sin(a)).toFixed(1)} r="11" />;
      })}
      <rect x="180" y="60" width="40" height="22" rx="4" />
      <path d="M150 140h20v28h-20ZM230 140h20v28h-20Z" stroke={SOFT} strokeWidth="1.5" />
    </g>
  ),
  baccarat: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round">
      <ellipse cx="200" cy="150" rx="140" ry="70" />
      <ellipse cx="200" cy="150" rx="112" ry="50" stroke={SOFT} strokeWidth="1.5" />
      <rect x="130" y="128" width="54" height="44" rx="6" />
      <rect x="216" y="128" width="54" height="44" rx="6" />
      <path d="M148 140h18v22h-18ZM234 140h18v22h-18Z" stroke={SOFT} strokeWidth="1.5" />
      <circle cx="200" cy="70" r="11" />
      <circle cx="80" cy="200" r="11" />
      <circle cx="320" cy="200" r="11" />
    </g>
  ),
  jazz: (
    <g fill="none" stroke={GOLD} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M90 160h170M90 175h170" />
      <path d="M260 150q60-40 70-60v130q-10-20-70-60" />
      <path d="M90 150v35M150 150v-28h14v28M180 150v-28h14v28M210 150v-28h14v28" />
      <path d="M120 175q0 30 30 30h80" stroke={SOFT} strokeWidth="1.8" />
    </g>
  ),
  tasting: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M250 70h50q4 60-25 72v58M250 70q-4 60 25 72M255 200h40" />
      <path d="M262 105h26" stroke={SOFT} strokeWidth="1.5" />
      <ellipse cx="160" cy="190" rx="80" ry="22" />
      <ellipse cx="160" cy="186" rx="52" ry="12" stroke={SOFT} strokeWidth="1.5" />
      <path d="M60 150v80M54 150v22q6 10 12 0v-22M260 225h0" />
      <path d="M100 230h120" stroke={SOFT} strokeWidth="1.5" />
    </g>
  ),
  acoustic: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M160 140a46 46 0 1 0 0 80a40 40 0 1 0 0-80Z" transform="rotate(-35 180 180)" />
      <circle cx="170" cy="190" r="13" stroke={SOFT} strokeWidth="1.6" />
      <path d="M190 172 300 64M296 58l14 14M300 54l-6-6M314 68l6 6" />
      <path d="M196 178 303 71M201 183 306 76" stroke={SOFT} strokeWidth="1" />
    </g>
  ),
  retro: (
    <g fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round">
      <circle cx="180" cy="160" r="90" />
      <circle cx="180" cy="160" r="70" stroke={SOFT} strokeWidth="1.2" />
      <circle cx="180" cy="160" r="52" stroke={SOFT} strokeWidth="1.2" />
      <circle cx="180" cy="160" r="26" />
      <circle cx="180" cy="160" r="4" fill={GOLD} />
      <path d="M320 60v20l-70 110l-12-4" />
      <circle cx="320" cy="56" r="10" />
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
