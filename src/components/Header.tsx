import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { pathFor, type PageKey } from "@/config/pages";
import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";
import LanguageSwitch from "./LanguageSwitch";

const NAV: Exclude<PageKey, "home" | "joc-responsabil" | "despre-demo" | "confidentialitate" | "acces">[] = [
  "sloturi",
  "poker",
  "mese",
  "evenimente",
  "locatia",
  "contact",
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded px-2 py-2 text-base hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300 md:py-1 md:text-sm ${
    isActive ? "text-gold-300 underline underline-offset-4" : "text-lavender"
  }`;

const Header = () => {
  const lang = useLang();
  const s = ui[lang];
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="border-b border-violet-700 bg-violet-950">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link
          to={pathFor("home", lang)}
          className="rounded font-display text-2xl text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
        >
          Ametist
        </Link>
        <div className="flex items-center gap-2 md:order-3">
          <LanguageSwitch />
          <span
            data-badge="18plus"
            role="img"
            aria-label={s.badge.label}
            className="rounded-md border border-gold-300 px-2 py-0.5 text-sm text-gold-300"
          >
            {s.badge.text}
          </span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-lavender-200 px-3 py-1.5 text-sm text-lavender focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300 md:hidden"
          >
            {open ? s.nav.close : s.nav.menu}
          </button>
        </div>
        <nav
          id={menuId}
          aria-label={s.nav.label}
          className={`${open ? "block" : "hidden"} w-full md:order-2 md:block md:w-auto`}
        >
          <ul className="flex flex-col gap-1 py-2 md:flex-row md:gap-3 md:py-0">
            {NAV.map((key) => (
              <li key={key}>
                <NavLink to={pathFor(key, lang)} className={linkClass}>
                  {s.nav[key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
