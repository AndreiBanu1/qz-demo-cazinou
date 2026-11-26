import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { acces } from "@/content/acces";
import { useLang } from "@/hooks/use-lang";
import PageHero from "@/components/PageHero";

const Acces = () => {
  const lang = useLang();
  const c = acces[lang];
  return (
    <>
    <PageHero h1={c.h1} lead={c.paragraphs[0]} />
    <div className="mx-auto max-w-2xl px-4 py-16">
      {c.paragraphs.slice(1).map((p) => (
        <p key={p.slice(0, 20)} className="mt-4 text-lg leading-relaxed">
          {p}
        </p>
      ))}
      <ul className="mt-8 space-y-3">
        <li>
          <Link to={pathFor("joc-responsabil", lang)} className="text-gilt-deep underline underline-offset-2">
            {c.responsible}
          </Link>
        </li>
        <li>
          <Link to={pathFor("home", lang)} className="text-gilt-deep underline underline-offset-2">
            {c.home}
          </Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Acces;
