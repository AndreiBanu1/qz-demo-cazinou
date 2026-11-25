import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { home } from "@/content/home";
import HoursList from "@/components/HoursList";
import PageHero from "@/components/PageHero";
import { useLang } from "@/hooks/use-lang";

const Home = () => {
  const lang = useLang();
  const c = home[lang];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageHero h1={c.h1} lead={c.lead} illustration={{ id: "facets", label: c.illustrationLabel }}>
        <p className="mt-6">
          <Link
            to={pathFor("contact", lang)}
            className="inline-block rounded-md bg-gold-300 px-6 py-3 text-lg text-gold-900 hover:bg-gold-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
          >
            {c.cta}
          </Link>
        </p>
      </PageHero>

      <section aria-labelledby="zone" className="mt-16">
        <h2 id="zone" className="font-display text-3xl text-gold-300">
          {c.areasHeading}
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.areas.map((a) => (
            <li key={a.key} className="rounded-xl bg-violet-900 p-4">
              <h3 className="font-display text-2xl text-gold-300">
                <Link to={pathFor(a.key, lang)} className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300">
                  {a.title}
                </Link>
              </h3>
              <p className="mt-2 text-lavender">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="program-scurt" className="mt-16">
        <h2 id="program-scurt" className="font-display text-3xl text-gold-300">
          {c.hoursHeading}
        </h2>
        <HoursList />
      </section>

      <section aria-labelledby="adulti" className="mt-16 rounded-xl border border-gold-300 p-6">
        <h2 id="adulti" className="font-display text-3xl text-gold-300">
          {c.adultsHeading}
        </h2>
        <p className="mt-3 max-w-prose text-lg leading-relaxed">{c.adults}</p>
        <p className="mt-3">
          <Link to={pathFor("joc-responsabil", lang)} className="text-gold-300 underline underline-offset-2">
            {c.responsibleLink}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Home;
