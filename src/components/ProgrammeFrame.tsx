import type { ReactNode } from "react";

export interface ProgrammeColumn {
  title: string;
  rows: { left: string; right: string }[];
}

// The programme set as a printed theatre programme (docs/design.md): a full-width amethyst band, a double gilt rule,
// and rows with dotted leaders. Used on the home page (poker and evenings) and on /poker (the weekly programme).
const ProgrammeFrame = ({ id, heading, intro, columns, footer }: { id: string; heading: string; intro: string; columns: ProgrammeColumn[]; footer?: ReactNode }) => (
  <section id={id} aria-labelledby={`${id}-titlu`} className="scroll-mt-4 bg-amethyst py-16 text-mist md:py-20">
    <div className={`mx-auto px-4 ${columns.length > 1 ? "max-w-5xl" : "max-w-3xl"}`}>
      <div className="border-[6px] border-double border-gilt/80 px-6 py-10 md:px-12 md:py-14">
        <h2 id={`${id}-titlu`} className="text-center font-display text-h2 text-gilt">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-[48ch] text-center text-mist">{intro}</p>
        <div className={`mt-10 grid gap-10 ${columns.length > 1 ? "md:grid-cols-2 md:gap-14" : ""}`}>
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="font-display text-h3 text-gilt">{c.title}</h3>
              <ul className="mt-4 space-y-3">
                {c.rows.map((r) => (
                  <li key={r.left + r.right} className="flex items-baseline gap-2">
                    <span>{r.left}</span>
                    <span aria-hidden="true" className="flex-1 border-b border-dotted border-mist/50" />
                    <span className="text-right">{r.right}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {footer && <div className="mt-10 text-center">{footer}</div>}
      </div>
    </div>
  </section>
);

export default ProgrammeFrame;
