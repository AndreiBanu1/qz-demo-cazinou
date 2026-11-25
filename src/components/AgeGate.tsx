import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";

export const AGE_KEY = "ametist-age-ok";
const AGE_OK_CLASS = "age-ok";

const siblingsOf = (el: HTMLElement) =>
  Array.from(el.parentElement?.children ?? []).filter((c): c is HTMLElement => c !== el && c instanceof HTMLElement);

/**
 * The first-visit age question (spec §3.3). Its markup is in every prerendered gated page, hidden by CSS unless
 * <html> has `js` and not `age-ok` (set by the inline script in index.html), so returning visitors never see it flash,
 * nothing depends on storage at render time, and visitors without JavaScript see the page.
 */
const AgeGate = () => {
  const lang = useLang();
  const s = ui[lang].gate;
  const titleId = useId();
  const textId = useId();
  const box = useRef<HTMLDivElement>(null);
  const yes = useRef<HTMLButtonElement>(null);
  const no = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || document.documentElement.classList.contains(AGE_OK_CLASS)) return;
    const others = siblingsOf(el);
    for (const o of others) o.inert = true;
    yes.current?.focus();
    return () => {
      for (const o of others) o.inert = false;
    };
  }, []);

  const accept = () => {
    try {
      sessionStorage.setItem(AGE_KEY, "1");
    } catch {
      // Storage blocked: the answer lasts for this page only, and the gate asks again on the next full load.
    }
    document.documentElement.classList.add(AGE_OK_CLASS);
    if (box.current) for (const o of siblingsOf(box.current)) o.inert = false;
    document.querySelector<HTMLElement>("main h1")?.focus();
  };

  // The visitor must answer: Tab stays on the two answers and Escape does nothing.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") e.preventDefault();
    if (e.key !== "Tab") return;
    e.preventDefault();
    const next = document.activeElement === yes.current ? no.current : yes.current;
    next?.focus();
  };

  return (
    <div
      ref={box}
      data-age-gate
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={textId}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-50 items-center justify-center bg-violet-950/95 p-4"
    >
      <div className="w-full max-w-sm rounded-xl border border-gold-300 bg-violet-700 p-6 text-center">
        <p className="font-display text-3xl text-gold-300">{s.title}</p>
        <h2 id={titleId} className="mt-2 text-xl text-lavender">
          {s.question}
        </h2>
        <p id={textId} className="mt-2 text-sm text-lavender-200">
          {s.text}
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <button
            ref={yes}
            type="button"
            onClick={accept}
            className="rounded-md bg-gold-300 px-5 py-2.5 text-gold-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender"
          >
            {s.yes}
          </button>
          <Link
            ref={no}
            to={pathFor("acces", lang)}
            className="rounded-md border border-lavender-200 px-5 py-2.5 text-lavender focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender"
          >
            {s.no}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
