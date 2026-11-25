import type { ReactNode } from "react";
import { ContentSections } from "@/components/ContentSections";
import PageHero from "@/components/PageHero";
import type { PageContent } from "@/content/types";

// The shared layout of the venue and information pages: hero, then sections; `children` goes after the hero.
const GenericPage = ({ content, children, after }: { content: PageContent; children?: ReactNode; after?: ReactNode }) => (
  <div className="mx-auto max-w-6xl px-4 py-12">
    <PageHero h1={content.h1} lead={content.lead} illustration={content.illustration} />
    {children}
    <ContentSections sections={content.sections} />
    {after}
  </div>
);

export default GenericPage;
