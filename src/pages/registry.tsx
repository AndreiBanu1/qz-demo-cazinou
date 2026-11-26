import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import type { PageKey } from "@/config/pages";
import Acces from "./Acces";
import Contact from "./Contact";
import DespreDemo from "./DespreDemo";
import Evenimente from "./Evenimente";
import Home from "./Home";
import Mese from "./Mese";
import Poker from "./Poker";
import { Confidentialitate, JocResponsabil, Locatia, Sloturi } from "./simple";

export const pageComponents: Record<PageKey, ComponentType> = {
  home: Home,
  sloturi: Sloturi,
  poker: Poker,
  mese: Mese,
  evenimente: Evenimente,
  locatia: Locatia,
  contact: Contact,
  "joc-responsabil": JocResponsabil,
  "despre-demo": DespreDemo,
  confidentialitate: Confidentialitate,
  acces: Acces,
};

// Bilingual: Cloudflare Pages serves this one 404.html for every unknown path in either language.
export const NotFound = () => (
  <div className="mx-auto max-w-6xl px-4 py-16">
    <h1 tabIndex={-1} className="font-display text-h1 text-amethyst focus:outline-none">
      Pagina nu există <span lang="en">/ Page not found</span>
    </h1>
    <p className="mt-4 text-lg">Pagina căutată nu există pe acest site demonstrativ.</p>
    <p lang="en" className="mt-2 text-lg">
      The page you were looking for does not exist on this demo site.
    </p>
    <ul className="mt-6 space-y-2">
      <li>
        <Link to="/" className="text-gilt-deep underline underline-offset-2">
          Pagina principală
        </Link>
      </li>
      <li lang="en">
        <Link to="/en" className="text-gilt-deep underline underline-offset-2">
          Home page
        </Link>
      </li>
    </ul>
  </div>
);
