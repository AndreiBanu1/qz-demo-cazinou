import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

// Built pages arrive prerendered (scripts/prerender.mjs), so attach to that HTML; the dev server serves an empty root.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
