import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { pageFor, pages } from "@/config/pages";
import { usePageMeta } from "@/hooks/use-page-meta";
import { NotFound, pageComponents } from "@/pages/registry";

// Router-agnostic: the browser wraps this in BrowserRouter (entry-client.tsx), the prerender step in StaticRouter.
// Every route comes from src/config/pages.ts, in both languages.
const AppRoutes = () => {
  const { pathname, hash } = useLocation();
  usePageMeta(pageFor(pathname));

  // Set after hydration, on <html> outside the React root (so no mismatch). End-to-end tests wait for it.
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);

  // After a client-side navigation, go to the #hash target if there is one, otherwise to the top.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <Layout>
      <Routes>
        {pages.map((p) => {
          const Page = pageComponents[p.key as keyof typeof pageComponents];
          // The key remounts the page on a language switch, so per-page state (the form, Turnstile) starts fresh.
          return <Route key={p.path} path={p.path} element={<Page key={p.path} />} />;
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
