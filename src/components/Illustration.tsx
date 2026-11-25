import type { ReactNode } from "react";
import type { IllustrationId } from "@/content/types";

// Original line drawings for this demo (spec §8): gold strokes on violet, no people, money, text or brands.
const GOLD = "#FAC775";
const SOFT = "#CECBF6";

const drawings: Record<IllustrationId, ReactNode> = {
  facets: (
    <g fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round">
      <path d="M200 30 290 95 250 230 150 230 110 95Z" />
      <path d="M110 95h180M200 30l-40 65 40 135 40-135-40-65M160 95l-10 135M240 95l10 135" />
      <path d="M60 60l8 0M64 56l0 8M330 170l10 0M335 165l0 10M320 50l6 0M323 47l0 6" stroke={SOFT} strokeWidth="2" />
    </g>
  ),
  slots: (
    <g fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round">
      {[70, 165, 260].map((x) => (
        <g key={x}>
          <path d={`M${x} 230V90a35 35 0 0 1 70 0v140Z`} />
          <rect x={x + 12} y="95" width="46" height="40" rx="4" />
          <path d={`M${x + 12} 160h46M${x + 12} 175h46`} stroke={SOFT} strokeWidth="2" />
          <path d={`M${x} 200h70`} />
        </g>
      ))}
      <path d="M40 230h320" />
    </g>
  ),
  cardTable: (
    <g fill="none" stroke={GOLD} strokeWidth="2.5">
      <ellipse cx="200" cy="130" rx="150" ry="85" />
      <ellipse cx="200" cy="130" rx="120" ry="60" stroke={SOFT} strokeWidth="2" />
      {[
        [200, 30],
        [300, 52],
        [352, 130],
        [300, 208],
        [200, 230],
        [100, 208],
        [48, 130],
        [100, 52],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="12" />
      ))}
      <path d="M175 95h50v20h-50Z" stroke={SOFT} strokeWidth="2" />
    </g>
  ),
  wheel: (
    <g fill="none" stroke={GOLD} strokeWidth="2.5">
      <circle cx="200" cy="130" r="105" />
      <circle cx="200" cy="130" r="80" stroke={SOFT} strokeWidth="2" />
      <circle cx="200" cy="130" r="40" />
      <circle cx="200" cy="130" r="10" />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI) / 8;
        const p = (r: number) => `${(200 + r * Math.cos(a)).toFixed(1)} ${(130 + r * Math.sin(a)).toFixed(1)}`;
        return <path key={i} d={`M${p(40)}L${p(80)}`} strokeWidth="1.5" />;
      })}
    </g>
  ),
  stage: (
    <g fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round">
      <path d="M40 200h320l-20 30H60Z" />
      <path d="M200 200V110M180 200h40" />
      <rect x="190" y="88" width="20" height="26" rx="10" />
      <path d="M90 30v20M70 50h40l-6 14H76Z" />
      <path d="M78 66 40 196M102 66l40 130" stroke={SOFT} strokeWidth="1.5" strokeDasharray="4 6" />
    </g>
  ),
  bar: (
    <g fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round">
      <path d="M40 170h320v60H40ZM40 185h320" />
      <path d="M120 120l-14 30h28Zm0 30v20M100 170h40" />
      <path d="M200 125h20l-3 45h-14Z" />
      <path d="M280 120q0 25 14 25t14-25Zm14 25v25M282 170h24" />
      <path d="M200 20v30M180 50h40l-8 16h-24Z" stroke={SOFT} strokeWidth="2" />
    </g>
  ),
};

interface Props {
  id: IllustrationId;
  label: string;
  className?: string;
}

const Illustration = ({ id, label, className = "" }: Props) => (
  <svg
    role="img"
    aria-label={label}
    viewBox="0 0 400 260"
    width="400"
    height="260"
    className={`h-auto w-full ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="400" height="260" rx="16" fill="#26215C" />
    {drawings[id]}
  </svg>
);

export default Illustration;
