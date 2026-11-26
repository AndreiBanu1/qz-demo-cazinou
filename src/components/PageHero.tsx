import type { ReactNode } from "react";
import type { IllustrationId } from "@/content/types";
import ArchFrame from "./ArchFrame";
import Illustration from "./Illustration";

interface Props {
  h1: string;
  lead: string;
  illustration?: { id: IllustrationId; label: string };
  children?: ReactNode;
}

// The night title band at the top of every inner page: one h1 (focusable, so the age gate can hand focus to it),
// the lead and, on venue pages, a drawing in an arch frame.
const PageHero = ({ h1, lead, illustration, children }: Props) => (
  <div className="bg-night text-mist">
    <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 pb-14 pt-10 md:grid-cols-12 md:pb-20 md:pt-16">
      <div className="md:col-span-7">
        <h1 tabIndex={-1} className="font-display text-h1 text-gilt focus:outline-none">
          {h1}
        </h1>
        <p className="mt-6 max-w-[36ch] text-lead text-mist">{lead}</p>
        {children}
      </div>
      {illustration && (
        <div className="md:col-span-4 md:col-start-9">
          <ArchFrame className="mx-auto max-w-xs md:max-w-none">
            <Illustration id={illustration.id} label={illustration.label} />
          </ArchFrame>
        </div>
      )}
    </div>
  </div>
);

export default PageHero;
