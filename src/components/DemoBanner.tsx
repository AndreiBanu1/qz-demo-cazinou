import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";

// First in the page, in normal flow (never fixed), inside an <aside> landmark so nothing sits outside a landmark.
const DemoBanner = () => {
  const lang = useLang();
  return (
    <aside aria-label={ui[lang].bannerLabel} className="bg-gold-50 px-4 py-2 text-center text-sm text-gold-900">
      <Link to={pathFor("despre-demo", lang)} className="underline underline-offset-2">
        {ui[lang].banner}
      </Link>
    </aside>
  );
};

export default DemoBanner;
