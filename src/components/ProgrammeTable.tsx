import { dayNames, poker } from "@/content/program";
import { pokerPage } from "@/content/poker";
import { useLang } from "@/hooks/use-lang";

const ProgrammeTable = () => {
  const lang = useLang();
  const s = pokerPage[lang].programme;
  return (
    <section aria-labelledby="program" className="mt-10">
      <h2 id="program" className="font-display text-3xl text-gold-300">
        {s.heading}
      </h2>
      <p className="mt-3 max-w-prose text-lg leading-relaxed">{s.intro}</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full max-w-2xl border-collapse text-left">
          <thead>
            <tr className="border-b border-gold-300 text-gold-300">
              <th scope="col" className="py-2 pr-4">{s.day}</th>
              <th scope="col" className="py-2 pr-4">{s.time}</th>
              <th scope="col" className="py-2 pr-4">{s.game}</th>
              <th scope="col" className="py-2">{s.format}</th>
            </tr>
          </thead>
          <tbody>
            {poker.map((p) => (
              <tr key={`${p.day}-${p.time}`} className="border-b border-violet-700">
                <th scope="row" className="py-2 pr-4 font-normal">
                  {p.day === "daily" ? s.daily : dayNames[lang][p.day]}
                </th>
                <td className="py-2 pr-4">{p.time}</td>
                <td className="py-2 pr-4">{p.game ?? s.cash}</td>
                <td className="py-2">{p.format[lang]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProgrammeTable;
