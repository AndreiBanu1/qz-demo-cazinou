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
  `block rounded px-2 py-2 text-base tracking-wide hover:text-gilt md:py-1 md:text-[0.95rem] ${
    isActive ? "text-gilt underline decoration-1 underline-offset-[0.45em]" : "text-mist"
  }`;

const Header = () => {
  const lang = useLang();
  const s = ui[lang];
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="border-b border-gilt/25 bg-night">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link
          to={pathFor("home", lang)}
          className="rounded font-display text-[1.9rem] leading-none tracking-[0.04em] text-gilt"
        >
          Ametist
        </Link>
        <div className="flex items-center gap-2 md:order-3">
          <LanguageSwitch />
          <span
            data-badge="18plus"
            role="img"
            aria-label={s.badge.label}
            className="rounded-full px-2.5 py-0.5 text-sm text-gilt ring-1 ring-gilt"
          >
            {s.badge.text}
          </span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
            className="rounded-full px-3.5 py-1.5 text-sm text-mist ring-1 ring-haze md:hidden"
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
