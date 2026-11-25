import { daily, hours } from "@/content/program";
import { useLang } from "@/hooks/use-lang";

const HoursList = () => {
  const lang = useLang();
  return (
    <dl className="mt-4 grid gap-3 sm:grid-cols-3">
      {hours.map((h) => (
        <div key={h.id} className="rounded-lg bg-violet-900 p-4">
          <dt className="text-sm text-lavender-200">{h.area[lang]}</dt>
          <dd className="mt-1 text-lg text-lavender">
            {daily[lang]} {h.open}–{h.close}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default HoursList;
