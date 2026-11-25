import type { ComponentType } from "react";
import type { PageKey } from "@/config/pages";
import { usePage } from "@/hooks/use-lang";
import Acces from "./Acces";

// Placeholder until Task 5 adds the real page components.
const Placeholder = () => {
  const page = usePage();
  return <h1 tabIndex={-1}>{page.title}</h1>;
};

export const pageComponents: Record<PageKey, ComponentType> = {
  home: Placeholder,
  sloturi: Placeholder,
  poker: Placeholder,
  mese: Placeholder,
  evenimente: Placeholder,
  locatia: Placeholder,
  contact: Placeholder,
  "joc-responsabil": Placeholder,
  "despre-demo": Placeholder,
  confidentialitate: Placeholder,
  acces: Acces,
};

export const NotFound = () => <h1 tabIndex={-1}>Pagina nu există / Page not found</h1>;
