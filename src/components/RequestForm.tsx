import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { formular, type SendError } from "@/content/formular";
import { useLang } from "@/hooks/use-lang";
import { bookingRange } from "@/lib/dates";
import { buildPayload, emptyValues, type FormValues } from "@/lib/payload";
import { parsePrefill } from "@/lib/prefill";
import { EVENT_SIZES, MAX_MESSAGE, MAX_PEOPLE, REQUEST_TYPES, TIMES, requestSchemaAt, type ErrorKey } from "@/lib/request-schema";
import Turnstile from "./Turnstile";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; code: SendError };

const ERROR_CODES: SendError[] = ["turnstile", "invalid", "limit", "send", "config"];

// The same schema the function uses, run on the payload the form would send, so the browser and the server agree.
const makeResolver =
  (lang: "ro" | "en"): Resolver<FormValues> =>
  async (values) => {
    const { "bot-field": _b, "cf-turnstile-response": _t, ...fields } = buildPayload(values, lang, "");
    const parsed = requestSchemaAt(new Date()).safeParse(fields);
    if (parsed.success) return { values, errors: {} };
    const errors: FieldErrors<FormValues> = {};
    for (const issue of parsed.error.issues) {
      const name = String(issue.path[0] ?? "") as keyof FormValues;
      if (!name || errors[name]) continue;
      const key = (issue.message in formular[lang].errors ? issue.message : "required") as ErrorKey;
      errors[name] = { type: "schema", message: key };
    }
    return { values: {}, errors };
  };

const input =
  "mt-1.5 block w-full rounded-xl border border-ink-soft/70 bg-white px-4 py-2.5 text-ink placeholder:text-ink-soft focus:border-amethyst focus:outline-none focus:ring-2 focus:ring-amethyst/40 aria-[invalid=true]:border-amethyst aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-amethyst/30";
const label = "block text-base text-ink";
const hint = "mt-1 text-sm text-ink-soft";
const errorText = "mt-1.5 text-sm font-medium text-amethyst";

const RequestForm = () => {
  const lang = useLang();
  const s = formular[lang];
  const { search } = useLocation();
  const ids = useId();
  const id = (name: string) => `${ids}-${name}`;
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [token, setToken] = useState("");
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [range, setRange] = useState<{ min: string; max: string } | null>(null);
  const sending = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, watch, setValue, reset, formState } = useForm<FormValues>({
    defaultValues: emptyValues("masa"),
    resolver: makeResolver(lang),
    shouldFocusError: true,
  });
  const { errors } = formState;
  const tip = watch("tip");

  // After hydration only (prerender rule): the prefilled type and the date limits depend on the URL and the clock.
  useEffect(() => {
    setHydrated(true);
    setRange(bookingRange(new Date()));
    const { tip: pre } = parsePrefill(search);
    if (pre) setValue("tip", pre);
  }, [search, setValue]);

  useEffect(() => {
    if (status.kind === "sent" || status.kind === "error") statusRef.current?.focus();
  }, [status]);

  const onToken = useCallback((t: string) => {
    setToken(t);
    setWaiting(false);
    setTurnstileFailed(false);
  }, []);
  const onExpire = useCallback(() => setToken(""), []);
  const onLoadError = useCallback(() => setTurnstileFailed(true), []);

  const onSubmit = handleSubmit(async (values) => {
    // One request at a time (Review Focus 5): a second tap while sending does nothing.
    if (sending.current) return;
    if (!token) {
      setWaiting(true);
      return;
    }
    sending.current = true;
    setStatus({ kind: "sending" });
    let code: SendError | null = null;
    try {
      const res = await fetch("/api/cerere", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(values, lang, token)),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        code = ERROR_CODES.includes(body.error as SendError) ? (body.error as SendError) : "send";
      }
    } catch {
      code = "network";
    }
    sending.current = false;
    if (code === null) {
      setStatus({ kind: "sent" });
      reset(emptyValues(values.tip));
    } else {
      setStatus({ kind: "error", code });
    }
    // Every token is single-use: ask Turnstile for a fresh one after each attempt.
    setToken("");
    setResetKey((k) => k + 1);
  });

  const err = (name: keyof FormValues) => {
    const e = errors[name];
    return e?.message ? (
      <p id={id(`${name}-error`)} className={errorText}>
        {s.errors[e.message as ErrorKey]}
      </p>
    ) : null;
  };
  const described = (name: keyof FormValues, withHint = false) => {
    const parts = [withHint ? id(`${name}-hint`) : "", errors[name] ? id(`${name}-error`) : ""].filter(Boolean);
    return parts.length ? parts.join(" ") : undefined;
  };
  const invalid = (name: keyof FormValues) => (errors[name] ? true : undefined);

  if (status.kind === "sent")
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="mt-6 rounded-xl border border-gilt-deep bg-quartz-deep p-6">
        <p className="font-display text-h3 text-amethyst">{s.success}</p>
        <p className="mt-2 max-w-prose">{s.successNext}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-4 rounded-full px-5 py-2 text-amethyst ring-1 ring-amethyst hover:bg-quartz-deep"
        >
          {s.again}
        </button>
      </div>
    );

  return (
    <div className="mt-6 max-w-2xl">
      <p className="rounded-2xl bg-banner p-5 text-ink">{s.notice}</p>
      <noscript>
        <p className="mt-4 rounded-2xl border border-gilt-deep p-4">{s.noscript}</p>
      </noscript>
      <form noValidate onSubmit={onSubmit} className="mt-6 space-y-6">
        <fieldset>
          <legend className={label}>{s.tipLegend}</legend>
          <div className="mt-2 space-y-2">
            {REQUEST_TYPES.map((t) => (
              <label key={t} className="flex items-center gap-3 text-ink">
                <input type="radio" value={t} {...register("tip")} className="h-5 w-5 accent-amethyst" />
                {s.types[t]}
              </label>
            ))}
          </div>
        </fieldset>

        {tip !== "intrebare" && (
          <div>
            <label htmlFor={id("data")} className={label}>
              {s.data}
            </label>
            <input
              id={id("data")}
              type="date"
              min={range?.min}
              max={range?.max}
              aria-invalid={invalid("data")}
              aria-describedby={described("data", true)}
              {...register("data")}
              className={input}
            />
            <p id={id("data-hint")} className={hint}>
              {s.dataHint}
            </p>
            {err("data")}
          </div>
        )}

        {tip === "masa" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor={id("ora")} className={label}>
                {s.ora}
              </label>
              <select id={id("ora")} aria-invalid={invalid("ora")} aria-describedby={described("ora")} {...register("ora")} className={input}>
                <option value="">{s.oraPlaceholder}</option>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {err("ora")}
            </div>
            <div>
              <label htmlFor={id("persoane")} className={label}>
                {s.persoane}
              </label>
              <input
                id={id("persoane")}
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_PEOPLE}
                aria-invalid={invalid("persoane")}
                aria-describedby={described("persoane", true)}
                {...register("persoane")}
                className={input}
              />
              <p id={id("persoane-hint")} className={hint}>
                {s.persoaneHint}
              </p>
              {err("persoane")}
            </div>
          </div>
        )}

        {tip === "eveniment" && (
          <div>
            <label htmlFor={id("marime")} className={label}>
              {s.marime}
            </label>
            <select id={id("marime")} aria-invalid={invalid("marime")} aria-describedby={described("marime")} {...register("marime")} className={input}>
              <option value="">{s.marimePlaceholder}</option>
              {EVENT_SIZES.map((z) => (
                <option key={z} value={z}>
                  {s.sizes[z]}
                </option>
              ))}
            </select>
            {err("marime")}
          </div>
        )}

        <div>
          <label htmlFor={id("mesaj")} className={label}>
            {s.mesaj} {tip !== "intrebare" && <span className="text-ink-soft">{s.mesajOptional}</span>}
          </label>
          <textarea
            id={id("mesaj")}
            rows={4}
            maxLength={MAX_MESSAGE}
            aria-invalid={invalid("mesaj")}
            aria-describedby={described("mesaj")}
            {...register("mesaj")}
            className={input}
          />
          {err("mesaj")}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={id("nume")} className={label}>
              {s.nume}
            </label>
            <input id={id("nume")} autoComplete="name" aria-invalid={invalid("nume")} aria-describedby={described("nume")} {...register("nume")} className={input} />
            {err("nume")}
          </div>
          <div>
            <label htmlFor={id("contact")} className={label}>
              {s.contact}
            </label>
            <input
              id={id("contact")}
              autoComplete="email"
              aria-invalid={invalid("contact")}
              aria-describedby={described("contact", true)}
              {...register("contact")}
              className={input}
            />
            <p id={id("contact-hint")} className={hint}>
              {s.contactHint}
            </p>
            {err("contact")}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="flex items-start gap-3 text-ink">
              <input type="checkbox" aria-invalid={invalid("varsta")} aria-describedby={described("varsta")} {...register("varsta")} className="mt-1 h-5 w-5 accent-amethyst" />
              {s.varsta}
            </label>
            {err("varsta")}
          </div>
          <div>
            <label className="flex items-start gap-3 text-ink">
              <input type="checkbox" aria-invalid={invalid("acord")} aria-describedby={described("acord")} {...register("acord")} className="mt-1 h-5 w-5 accent-amethyst" />
              <span>
                {s.acordBefore}{" "}
                <Link to={pathFor("confidentialitate", lang)} className="text-gilt-deep underline underline-offset-2">
                  {s.acordLink}
                </Link>{" "}
                {s.acordAfter}
              </span>
            </label>
            {err("acord")}
          </div>
        </div>

        {/* Honeypot: hidden from people and assistive technology; a bot that fills it is answered "ok" and nothing is sent. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            {s.honeypot}
            <input type="text" tabIndex={-1} autoComplete="off" {...register("bot-field")} />
          </label>
        </div>
        <input type="hidden" name="limba" value={lang} />

        {hydrated && <Turnstile onToken={onToken} onExpire={onExpire} onLoadError={onLoadError} resetKey={resetKey} language={lang} />}

        {turnstileFailed && (
          <p role="alert" className="rounded-2xl border border-amethyst bg-white p-4">
            {s.turnstileError}
          </p>
        )}
        {waiting && !token && <p role="status">{s.waiting}</p>}
        {status.kind === "error" && (
          <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-2xl border border-amethyst bg-white p-4">
            {s.sendErrors[status.code]}
          </div>
        )}

        <button
          type="submit"
          disabled={!hydrated || status.kind === "sending"}
          className="rounded-full bg-amethyst px-8 py-3 text-base font-medium text-mist hover:bg-ink focus-visible:outline-amethyst disabled:opacity-60"
        >
          {status.kind === "sending" ? s.sending : status.kind === "error" ? s.retry : s.submit}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
