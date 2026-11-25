import type { ReactNode } from "react";
import type { IllustrationId } from "@/content/types";
import Illustration from "./Illustration";

interface Props {
  h1: string;
  lead: string;
  illustration?: { id: IllustrationId; label: string };
  children?: ReactNode;
}

// The first screen of every page: one h1 (focusable, so the age gate can hand focus to it), the lead and a drawing.
const PageHero = ({ h1, lead, illustration, children }: Props) => (
  <div className="grid items-center gap-8 md:grid-cols-2">
    <div>
      <h1 tabIndex={-1} className="font-display text-4xl leading-tight text-gold-300 focus:outline-none md:text-5xl">
        {h1}
      </h1>
      <p className="mt-4 text-xl leading-relaxed text-lavender">{lead}</p>
      {children}
    </div>
    {illustration && <Illustration id={illustration.id} label={illustration.label} />}
  </div>
);

export default PageHero;
