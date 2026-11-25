// Server entry used only at build time by scripts/prerender.mjs to write static HTML for each route.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppRoutes from "./AppRoutes";

export const render = (url: string): string =>
  renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );

export { pages, notFoundPage, canonicalUrl, twinOf } from "./config/pages";
export { renderHead, alternates } from "./seo/head";
export { site } from "./config/site";

// For scripts/prerender.mjs: the notification email rendered with sample data, so check-copy reads it too.
export { renderNotification } from "./lib/email-template";
