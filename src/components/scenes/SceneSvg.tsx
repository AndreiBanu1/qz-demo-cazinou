import type { ReactNode } from "react";

// The frame every signature scene shares (docs/design.md, revision "page scenes"): a 640 × 440 drawing that blends into
// the night title band, with an accessible name in the page's language. Motion lives in index.css (.scene-*), runs once
// on load and is off with prefers-reduced-motion, where every element simply shows in its final state.
const SceneSvg = ({ label, children }: { label: string; children: ReactNode }) => (
  <svg viewBox="0 0 640 440" width="640" height="440" role="img" aria-label={label} className="block h-auto w-full" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

export default SceneSvg;

/** A stagger delay for the nth element of a sequence. */
export const delay = (n: number, stepMs = 90, startMs = 0) => ({ animationDelay: `${startMs + n * stepMs}ms` });
