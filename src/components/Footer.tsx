import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { site } from "@/config/site";
import { daily, hours } from "@/content/program";
import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";
import LicencePlaceholder from "./LicencePlaceholder";

const Footer = () => {
  const lang = useLang();
  const s = ui[lang].footer;
  const link = "underline underline-offset-2 hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300";
  return (
    <footer className="mt-16 border-t border-violet-700 bg-violet-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <section aria-labelledby="footer-hours">
          <h2 id="footer-hours" className="font-display text-xl text-gold-300">
            {s.hoursTitle}
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {hours.map((h) => (
              <li key={h.id}>
                {h.area[lang]}: {daily[lang]} {h.open}–{h.close}
              </li>
            ))}
          </ul>
        </section>
        <section aria-label={s.minors.split(".")[0]} className="space-y-3">
          <p className="font-semibold text-lavender">{s.minors}</p>
          <LicencePlaceholder />
        </section>
        <nav aria-label={s.linksLabel}>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={pathFor("joc-responsabil", lang)} className={link}>
                {s.responsible}
              </Link>
            </li>
            <li>
              <Link to={pathFor("despre-demo", lang)} className={link}>
                {s.about}
              </Link>
            </li>
            <li>
              <Link to={pathFor("confidentialitate", lang)} className={link}>
                {s.privacy}
              </Link>
            </li>
            <li>
              <a href={site.onjnUrl} className={link} rel="noopener">
                {s.onjn}
              </a>
            </li>
            <li className="pt-2 text-lavender-200">
              {s.builtBy}{" "}
              <a href={site.qzUrl} className={link}>
                Quality Zone
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
