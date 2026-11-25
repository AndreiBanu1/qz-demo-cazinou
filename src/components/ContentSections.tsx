import type { Section } from "@/content/types";

export const SectionBlock = ({ section }: { section: Section }) => (
  <section aria-labelledby={`s-${section.id}`} className="mt-10">
    <h2 id={`s-${section.id}`} className="font-display text-3xl text-gold-300">
      {section.heading}
    </h2>
    {section.paragraphs.map((p) => (
      <p key={p.slice(0, 32)} className="mt-3 max-w-prose text-lg leading-relaxed">
        {p}
      </p>
    ))}
    {section.list && (
      <ul className="mt-3 max-w-prose list-disc space-y-1 pl-6 text-lg leading-relaxed marker:text-gold-300">
        {section.list.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    )}
  </section>
);

export const ContentSections = ({ sections }: { sections: Section[] }) => (
  <>
    {sections.map((s) => (
      <SectionBlock key={s.id} section={s} />
    ))}
  </>
);
