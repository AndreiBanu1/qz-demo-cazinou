import type { ReactNode } from "react";
import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";
import DemoBanner from "./DemoBanner";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const lang = useLang();
  return (
    <>
      <a
        href="#continut"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-gold-300 focus:px-3 focus:py-2 focus:text-gold-900"
      >
        {ui[lang].skip}
      </a>
      <DemoBanner />
      <Header />
      <main id="continut">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
