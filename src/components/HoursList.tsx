import { daily, hours } from "@/content/program";
import { useLang } from "@/hooks/use-lang";

const HoursList = () => {
  const lang = useLang();
  return (
    <dl className="mt-6 grid gap-4 sm:grid-cols-3">
      {hours.map((h) => (
        <div key={h.id} className="rounded-3xl bg-quartz-deep p-6">
          <dt className="text-base text-ink-soft">{h.area[lang]}</dt>
          <dd className="mt-2 font-display text-h3 text-ink">
            {h.open}–{h.close}
            <span className="mt-1 block font-sans text-base text-ink-soft">{daily[lang]}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default HoursList;
