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
      className="fixed inset-0 z-50 items-center justify-center bg-night/95 p-4"
    >
      <div className="w-full max-w-md border-[5px] border-double border-gilt/80 bg-night-soft px-6 py-9 text-center sm:px-10">
        <p className="font-display text-[2.6rem] leading-none tracking-[0.03em] text-gilt">{s.title}</p>
        <h2 id={titleId} className="mt-5 font-display text-h3 text-mist">
          {s.question}
        </h2>
        <p id={textId} className="mt-2 text-sm text-haze">
          {s.text}
        </p>
        <p className="mt-2 text-xs text-haze">{s.demo}</p>
        <div className="mt-5 flex justify-center gap-3">
          <button
            ref={yes}
            type="button"
            onClick={accept}
            className="rounded-full bg-gilt px-6 py-2.5 font-medium text-night hover:bg-mist focus-visible:outline-mist"
          >
            {s.yes}
          </button>
          <Link
            ref={no}
            to={pathFor("acces", lang)}
            className="rounded-full px-6 py-2.5 text-mist ring-1 ring-haze hover:ring-mist focus-visible:outline-mist"
          >
            {s.no}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
