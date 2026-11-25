import { Link } from "react-router-dom";
import { twinOf } from "@/config/pages";
import { ui } from "@/content/ui";
import { usePage } from "@/hooks/use-lang";

// Always to the same page in the other language, never to the other home page (spec §4).
const LanguageSwitch = () => {
  const page = usePage();
  const twin = twinOf(page);
  const s = ui[page.lang].langSwitch;
  return (
    <Link
      to={twin.path}
      hrefLang={twin.lang}
      lang={twin.lang}
      title={s.title}
      data-lang-switch
      className="rounded px-2 py-1 text-sm text-lavender-200 underline-offset-2 hover:text-gold-300 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
    >
      {s.label}
    </Link>
  );
};

export default LanguageSwitch;
