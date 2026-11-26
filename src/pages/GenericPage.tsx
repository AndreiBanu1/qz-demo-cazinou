import type { ReactNode } from "react";
import { ContentSections } from "@/components/ContentSections";
import PageHero from "@/components/PageHero";
import type { PageContent } from "@/content/types";

// The shared layout of the venue and information pages: the night title band, then quartz reading sections.
// `children` go first in the reading column, `after` last.
// `band` is a full-width block between the title band and the reading column (the programme frame on /poker).
const GenericPage = ({ content, children, after, band }: { content: PageContent; children?: ReactNode; after?: ReactNode; band?: ReactNode }) => (
  <>
    <PageHero h1={content.h1} lead={content.lead} illustration={content.illustration} />
    {band}
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      {children}
      <ContentSections sections={content.sections} />
      {after}
    </div>
  </>
);

export default GenericPage;
