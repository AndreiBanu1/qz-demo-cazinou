import ProgrammeFrame from "@/components/ProgrammeFrame";
import { dayNames, poker } from "@/content/program";
import { pokerPage } from "@/content/poker";
import { useLang } from "@/hooks/use-lang";
import GenericPage from "./GenericPage";

// The weekly programme in the same printed-programme frame as the home page, right under the title band.
const Poker = () => {
  const lang = useLang();
  const c = pokerPage[lang];
  const p = c.programme;
  return (
    <GenericPage
      content={c}
      band={
        <ProgrammeFrame
          id="program"
          heading={p.heading}
          intro={p.intro}
          columns={[
            {
              title: p.column,
              rows: poker.map((s) => ({
                left: s.day === "daily" ? p.daily : dayNames[lang][s.day],
                right: `${s.time}, ${s.game ?? p.cash}, ${s.format[lang].toLowerCase()}`,
              })),
            },
          ]}
        />
      }
    />
  );
};

export default Poker;
