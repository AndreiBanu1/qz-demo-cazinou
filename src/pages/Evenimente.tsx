import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { evenimente } from "@/content/evenimente";
import { events } from "@/content/program";
import { useLang } from "@/hooks/use-lang";
import ArchFrame from "@/components/ArchFrame";
import Illustration from "@/components/Illustration";
import type { IllustrationId } from "@/content/types";
import GenericPage from "./GenericPage";

const EVENT_DRAWINGS: Record<string, IllustrationId> = { jazz: "jazz", degustare: "tasting", acustic: "acoustic", retro: "retro" };

const Evenimente = () => {
  const lang = useLang();
  const c = evenimente[lang];
  return (
    <GenericPage
      content={c}
      after={
        <p className="mt-8">
          <Link
            to={`${pathFor("contact", lang)}?tip=eveniment`}
            data-private-event-link
            className="inline-block rounded-full bg-amethyst px-7 py-3 text-base font-medium text-mist hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst"
          >
            {c.privateCta}
          </Link>
        </p>
      }
    >
      <section aria-labelledby="formate" className="mt-10">
        <h2 id="formate" className="font-display text-h2 text-amethyst">
          {c.formatsHeading}
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {events.map((e) => (
            <li key={e.id} className="grid grid-cols-[6.5rem_1fr] items-start gap-5 rounded-3xl bg-quartz-deep p-6 sm:grid-cols-[8rem_1fr]">
              <ArchFrame>
                <Illustration id={EVENT_DRAWINGS[e.id]} />
              </ArchFrame>
              <div>
              <p className="text-sm text-ink-soft">{e.when[lang]}</p>
              <h3 className="mt-1 font-display text-h3 text-amethyst">{e.title[lang]}</h3>
              <p className="mt-2 leading-relaxed">{e.text[lang]}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </GenericPage>
  );
};

export default Evenimente;
