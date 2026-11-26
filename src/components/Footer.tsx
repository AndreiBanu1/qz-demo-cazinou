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
  const link = "underline underline-offset-2 hover:text-gilt focus-visible:outline focus-visible:outline-2 focus-visible:outline-gilt";
  return (
    <footer className="border-t border-gilt/25 bg-night text-mist">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <section aria-labelledby="footer-hours">
          <h2 id="footer-hours" className="font-display text-h3 text-gilt">
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
          <p className="font-semibold text-mist">{s.minors}</p>
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
            <li className="pt-2 text-haze">
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
