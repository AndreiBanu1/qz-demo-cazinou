import { site } from "@/config/site";
import { SectionBlock } from "@/components/ContentSections";
import { bannedDisplay, despreDemo } from "@/content/despre-demo";
import { latestResults } from "@/content/rezultate";
import { useLang } from "@/hooks/use-lang";

const DespreDemo = () => {
  const lang = useLang();
  const c = despreDemo[lang];
  const h2 = "font-display text-3xl text-gold-300";
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 tabIndex={-1} className="font-display text-4xl text-gold-300 focus:outline-none md:text-5xl">
        {c.h1}
      </h1>
      <p className="mt-4 max-w-prose text-xl leading-relaxed">{c.lead}</p>
      <div className="grid gap-x-10 md:grid-cols-2">
        <SectionBlock section={c.invented} />
        <SectionBlock section={c.real} />
      </div>

      <section aria-labelledby="lege" className="mt-12">
        <h2 id="lege" className={h2}>
          {c.law.heading}
        </h2>
        <p className="mt-3 max-w-prose text-lg leading-relaxed">{c.law.intro}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-base">
            <thead>
              <tr className="border-b border-gold-300 text-gold-300">
                {c.law.columns.map((col) => (
                  <th key={col} scope="col" className="py-2 pr-4 align-bottom">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.law.rows.map((r) => (
                <tr key={r.source} className="border-b border-violet-700 align-top">
                  <th scope="row" className="py-3 pr-4 font-normal">
                    <a href={r.url} className="text-gold-300 underline underline-offset-2" rel="noopener">
                      {r.source}
                    </a>
                  </th>
                  <td className="py-3 pr-4">{r.says}</td>
                  <td className="py-3">{r.does}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-prose text-lavender-200">{c.law.note}</p>
      </section>

      <SectionBlock section={c.checks} />

      <section aria-labelledby="cuvinte" className="mt-10" data-copy-allow>
        <h2 id="cuvinte" className={h2}>
          {c.banned.heading}
        </h2>
        <p className="mt-3 max-w-prose text-lg leading-relaxed">{c.banned.intro}</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {(["ro", "en"] as const).map((l) => (
            <div key={l}>
              <h3 className="text-lg text-gold-300">{l === "ro" ? c.banned.roLabel : c.banned.enLabel}</h3>
              <p className="mt-1" lang={l}>
                {bannedDisplay[l].join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="rezultate" className="mt-10">
        <h2 id="rezultate" className={h2}>
          {c.results.heading}
        </h2>
        {latestResults ? (
          <>
            <p className="mt-3 text-lavender-200">
              {latestResults.date} · {latestResults.where[lang]}
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full max-w-3xl border-collapse text-left">
                <tbody>
                  {latestResults.rows.map((r) => (
                    <tr key={r.tool + r.what} className="border-b border-violet-700 align-top">
                      <th scope="row" className="py-2 pr-4 font-normal text-gold-300">
                        {r.tool}
                      </th>
                      <td className="py-2 pr-4">{r.what}</td>
                      <td className="py-2">{r.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="mt-3">{c.results.empty}</p>
        )}
      </section>

      <SectionBlock section={c.choices} />

      <p className="mt-10">
        {c.qz.text}{" "}
        <a href={site.qzUrl} className="text-gold-300 underline underline-offset-2">
          {c.qz.link}
        </a>
      </p>
    </div>
  );
};

export default DespreDemo;
