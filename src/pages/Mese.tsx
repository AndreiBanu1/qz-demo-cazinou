import ArchFrame from "@/components/ArchFrame";
import { ContentSections } from "@/components/ContentSections";
import Illustration from "@/components/Illustration";
import PageHero from "@/components/PageHero";
import { mese } from "@/content/mese";
import type { IllustrationId } from "@/content/types";
import { useLang } from "@/hooks/use-lang";

// The three games as a trio, each with its own drawing, then the shared table manners.
const GAME_DRAWINGS: Record<string, IllustrationId> = { ruleta: "wheel", blackjack: "blackjack", baccara: "baccarat" };

const Mese = () => {
  const lang = useLang();
  const c = mese[lang];
  const games = c.sections.filter((s) => s.id in GAME_DRAWINGS);
  const rest = c.sections.filter((s) => !(s.id in GAME_DRAWINGS));
  return (
    <>
      <PageHero h1={c.h1} lead={c.lead} illustration={c.illustration} />
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {games.map((g) => (
            <li key={g.id}>
              <section aria-labelledby={`s-${g.id}`}>
                <ArchFrame className="mx-auto max-w-[16rem] md:max-w-none">
                  <Illustration id={GAME_DRAWINGS[g.id]} />
                </ArchFrame>
                <h2 id={`s-${g.id}`} className="mt-6 font-display text-h2 text-amethyst">
                  {g.heading}
                </h2>
                {g.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="mt-3">
                    {p}
                  </p>
                ))}
              </section>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <ContentSections sections={rest} />
        </div>
      </div>
    </>
  );
};

export default Mese;
