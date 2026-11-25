import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { acces } from "@/content/acces";
import { useLang } from "@/hooks/use-lang";

const Acces = () => {
  const lang = useLang();
  const c = acces[lang];
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 tabIndex={-1} className="font-display text-4xl text-gold-300">
        {c.h1}
      </h1>
      {c.paragraphs.map((p) => (
        <p key={p.slice(0, 20)} className="mt-4 text-lg leading-relaxed">
          {p}
        </p>
      ))}
      <ul className="mt-8 space-y-3">
        <li>
          <Link to={pathFor("joc-responsabil", lang)} className="text-gold-300 underline underline-offset-2">
            {c.responsible}
          </Link>
        </li>
        <li>
          <Link to={pathFor("home", lang)} className="text-gold-300 underline underline-offset-2">
            {c.home}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Acces;
