import { confidentialitate } from "@/content/confidentialitate";
import { jocResponsabil } from "@/content/joc-responsabil";
import { locatia } from "@/content/locatia";
import { sloturi } from "@/content/sloturi";
import { site } from "@/config/site";
import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";
import GenericPage from "./GenericPage";

export const Sloturi = () => <GenericPage content={sloturi[useLang()]} />;
export const Locatia = () => <GenericPage content={locatia[useLang()]} />;
export const Confidentialitate = () => <GenericPage content={confidentialitate[useLang()]} />;

export const JocResponsabil = () => {
  const lang = useLang();
  return (
    <GenericPage
      content={jocResponsabil[lang]}
      after={
        <p className="mt-6">
          <a href={site.onjnUrl} className="text-gilt-deep underline underline-offset-2" rel="noopener">
            {ui[lang].footer.onjn}
          </a>
        </p>
      }
    />
  );
};
