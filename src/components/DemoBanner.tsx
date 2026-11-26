import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";

// First in the page, in normal flow (never fixed), inside an <aside> landmark so nothing sits outside a landmark.
const DemoBanner = () => {
  const lang = useLang();
  return (
    <aside aria-label={ui[lang].bannerLabel} className="bg-banner px-4 py-2 text-center text-sm text-ink">
      <Link to={pathFor("despre-demo", lang)} className="underline decoration-gilt-deep underline-offset-2 hover:text-amethyst">
        {ui[lang].banner}
      </Link>
    </aside>
  );
};

export default DemoBanner;
