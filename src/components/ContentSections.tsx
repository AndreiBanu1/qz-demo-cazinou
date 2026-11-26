import type { Section } from "@/content/types";

export const SectionBlock = ({ section }: { section: Section }) => (
  <section aria-labelledby={`s-${section.id}`} className="mt-14 first:mt-0">
    <h2 id={`s-${section.id}`} className="font-display text-h2 text-amethyst">
      {section.heading}
    </h2>
    {section.paragraphs.map((p) => (
      <p key={p.slice(0, 32)} className="mt-4 max-w-[65ch]">
        {p}
      </p>
    ))}
    {section.list && (
      <ul className="mt-4 max-w-[65ch] list-disc space-y-1.5 pl-6 marker:text-gilt-deep">
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
