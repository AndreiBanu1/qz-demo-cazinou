import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { evenimente } from "@/content/evenimente";
import { events } from "@/content/program";
import { useLang } from "@/hooks/use-lang";
import GenericPage from "./GenericPage";

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
            className="inline-block rounded-md bg-gold-300 px-6 py-3 text-lg text-gold-900 hover:bg-gold-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
          >
            {c.privateCta}
          </Link>
        </p>
      }
    >
      <section aria-labelledby="formate" className="mt-10">
        <h2 id="formate" className="font-display text-3xl text-gold-300">
          {c.formatsHeading}
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {events.map((e) => (
            <li key={e.id} className="rounded-xl bg-violet-900 p-5">
              <p className="text-sm text-lavender-200">{e.when[lang]}</p>
              <h3 className="mt-1 font-display text-2xl text-gold-300">{e.title[lang]}</h3>
              <p className="mt-2 leading-relaxed">{e.text[lang]}</p>
            </li>
          ))}
        </ul>
      </section>
    </GenericPage>
  );
};

export default Evenimente;
