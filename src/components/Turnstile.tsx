import { useEffect, useRef } from "react";
import { site } from "@/config/site";

// Cloudflare's robot check. The script loads once, after mount, and only where this component is used (the contact pages),
// so prerendered HTML never references it and the first paint doesn't wait for it.
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      "refresh-expired": "auto" | "manual" | "never";
      appearance?: "always" | "execute" | "interaction-only";
      language?: string;
    },
  ): string | undefined;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!loading) {
    loading = new Promise<TurnstileApi>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile did not load")));
      script.onerror = () => {
        loading = null; // let a later mount try again
        script.remove();
        reject(new Error("Turnstile script failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}

interface Props {
  onToken: (token: string) => void;
  onExpire: () => void;
  /** The script could not be loaded (blocked or offline): no token will ever come. */
  onLoadError?: () => void;
  /** Changing this resets the widget, for a fresh token after every failed send. */
  resetKey: number;
  language: "ro" | "en";
}

const Turnstile = ({ onToken, onExpire, onLoadError, resetKey, language }: Props) => {
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // The latest callbacks, so the widget (rendered once) never calls stale ones.
  const callbacks = useRef({ onToken, onExpire, onLoadError });
  useEffect(() => {
    callbacks.current = { onToken, onExpire, onLoadError };
  }, [onToken, onExpire, onLoadError]);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !box.current) return;
        widgetId.current =
          turnstile.render(box.current, {
            sitekey: site.turnstileSiteKey,
            callback: (token) => callbacks.current.onToken(token),
            // A token lasts a few minutes; on a slow phone it can expire before „Trimite”. Turnstile then fetches a new one.
            "expired-callback": () => callbacks.current.onExpire(),
            "error-callback": () => callbacks.current.onExpire(),
            "refresh-expired": "auto",
            // Usually invisible: the widget only shows itself when it needs the visitor to interact.
            appearance: "interaction-only",
            language,
          }) ?? null;
      })
      .catch((err: unknown) => {
        console.error(err);
        if (!cancelled) callbacks.current.onLoadError?.();
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
    // The language is fixed per page; a language switch navigates to another page and remounts the widget.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstReset = useRef(true);
  useEffect(() => {
    if (firstReset.current) {
      firstReset.current = false;
      return;
    }
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [resetKey]);

  // No reserved height: with interaction-only the widget is usually not shown at all.
  return <div ref={box} />;
};

export default Turnstile;
