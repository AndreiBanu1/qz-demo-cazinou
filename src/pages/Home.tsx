import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { home } from "@/content/home";
import { dayNames, events, poker } from "@/content/program";
import { pokerPage } from "@/content/poker";
import ArchFrame from "@/components/ArchFrame";
import Geode from "@/components/Geode";
import Illustration from "@/components/Illustration";
import ProgrammeFrame from "@/components/ProgrammeFrame";
import { useLang } from "@/hooks/use-lang";

const primary =
  "inline-block rounded-full bg-gilt px-7 py-3 text-base font-medium text-night transition-colors hover:bg-mist focus-visible:outline-gilt";
const secondary =
  "inline-block rounded-full px-7 py-3 text-base text-mist ring-1 ring-mist/60 transition-colors hover:ring-gilt hover:text-gilt focus-visible:outline-gilt";

const Home = () => {
  const lang = useLang();
  const c = home[lang];
  const p = pokerPage[lang].programme;
  return (
    <>
      {/* The one bold element: the geode, with the wordmark in its cavity (docs/design.md). */}
      <section aria-labelledby="titlu" className="relative isolate overflow-hidden bg-night text-mist">
        <div className="absolute inset-0 -z-10 md:hidden">
          <Geode fit="cover" />
        </div>
        <div className="absolute inset-0 -z-10 hidden md:block">
          <Geode label={c.illustrationLabel} />
        </div>
        <div className="mx-auto flex min-h-[80svh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center md:min-h-[86svh]">
          <p aria-hidden="true" className="font-display text-mark text-gilt">
            Ametist
          </p>
          <h1 id="titlu" tabIndex={-1} className="mt-4 font-display text-h2 text-mist focus:outline-none">
            {c.h1}
          </h1>
          <p className="mt-4 max-w-[32ch] text-lg text-mist">{c.lead}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to={pathFor("contact", lang)} className={primary}>
              {c.cta}
            </Link>
            <a href="#program" className={secondary}>
              {c.programme.heading}
            </a>
          </div>
        </div>
      </section>

      {/* A real sequence, so it is numbered by real times. */}
      <section aria-labelledby="seara" className="mx-auto max-w-6xl px-4 py-20">
        <h2 id="seara" className="font-display text-h2 text-amethyst">
          {c.evening.heading}
        </h2>
        <p className="mt-4 max-w-[60ch] text-lead text-ink">{c.evening.intro}</p>
        <ol className="mt-12 grid gap-8 border-l border-gilt-deep/40 pl-6 md:grid-cols-6 md:gap-6 md:border-l-0 md:border-t md:pl-0 md:pt-8">
          {c.evening.steps.map((s) => (
            <li key={s.time} className="relative">
              <span aria-hidden="true" className="absolute -left-[1.85rem] top-2 h-2.5 w-2.5 rounded-full bg-gilt-deep md:-top-[2.45rem] md:left-0" />
              <p className="font-display text-h3 text-gilt-deep">{s.time}</p>
              <p className="mt-1 text-base font-medium text-ink">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="zone" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 id="zone" className="font-display text-h2 text-amethyst">
          {c.areasHeading}
        </h2>
        <ul className="mt-12 space-y-14 md:space-y-16">
          {c.areas.map((a, i) => (
            <li key={a.key} className="grid items-center gap-8 md:grid-cols-12">
              <div className={`md:col-span-4 ${i % 2 ? "md:order-2 md:col-start-8" : "md:col-start-2"}`}>
                <ArchFrame className="mx-auto max-w-[17rem] md:max-w-[19rem]">
                  <Illustration id={a.illustration} />
                </ArchFrame>
              </div>
              <div className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-2" : "md:col-start-7"}`}>
                <h3 className="font-display text-h2 text-ink">
                  <Link to={pathFor(a.key, lang)} className="underline decoration-gilt-deep/60 decoration-1 underline-offset-[0.2em] hover:text-amethyst hover:decoration-amethyst">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-4 max-w-[46ch] text-lead text-ink">{a.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ProgrammeFrame
        id="program"
        heading={c.programme.heading}
        intro={c.programme.intro}
        columns={[
          {
            title: c.programme.poker,
            rows: poker.map((s) => ({ left: s.day === "daily" ? p.daily : dayNames[lang][s.day], right: `${s.time} ${s.game ?? p.cash}` })),
          },
          { title: c.programme.evenings, rows: events.map((e) => ({ left: e.title[lang], right: e.when[lang] })) },
        ]}
        footer={
          <Link to={pathFor("evenimente", lang)} className="text-gilt underline decoration-1 underline-offset-4 hover:text-mist">
            {c.programme.link}
          </Link>
        }
      />

      <section aria-labelledby="adulti" className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl rounded-3xl bg-quartz-deep p-8 md:p-10">
          <h2 id="adulti" className="font-display text-h3 text-amethyst">
            {c.adultsHeading}
          </h2>
          <p className="mt-3 max-w-[60ch]">{c.adults}</p>
          <p className="mt-4">
            <Link to={pathFor("joc-responsabil", lang)} className="text-gilt-deep underline underline-offset-4 hover:text-amethyst">
              {c.responsibleLink}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
