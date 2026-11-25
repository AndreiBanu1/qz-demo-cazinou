// The venue's notification email (spec §7.4), in Romanian. Its text is checked by check-copy like the pages:
// scripts/prerender.mjs writes rendered samples into dist-email/.
import { bucharestDateTime } from "./dates";
import type { RequestFields } from "./request-schema";

const TYPE_LABEL = { masa: "Masă la restaurant sau bar", eveniment: "Eveniment privat", intrebare: "Întrebare" } as const;
const SIZE_LABEL = { "10-30": "10–30 de persoane", "30-60": "30–60 de persoane", "60+": "peste 60 de persoane" } as const;
const LANG_LABEL = { ro: "română", en: "engleză" } as const;

export const DEMO_FOOTER =
  "Mesaj trimis de formularul demonstrativ al site-ului Salon Ametist. Salon Ametist este un local inventat, iar site-ul a fost realizat de Quality Zone. Nu este o rezervare reală.";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** The label and value of every field the request has, in order. */
export const notificationLines = (f: RequestFields, receivedAt: Date): [string, string][] => {
  const lines: [string, string][] = [["Tip", TYPE_LABEL[f.tip]]];
  if (f.tip !== "intrebare") lines.push(["Data", f.data]);
  if (f.tip === "masa") lines.push(["Ora", f.ora], ["Persoane", String(f.persoane)]);
  if (f.tip === "eveniment") lines.push(["Mărimea grupului", SIZE_LABEL[f.marime]]);
  if (f.mesaj) lines.push(["Mesaj", f.mesaj]);
  lines.push(
    ["Nume", f.nume],
    ["Contact", f.contact],
    ["Limba paginii", LANG_LABEL[f.limba]],
    ["Primit la", `${bucharestDateTime(receivedAt)} (ora României)`],
  );
  return lines;
};

export const renderNotification = (f: RequestFields, receivedAt: Date): { subject: string; text: string; html: string } => {
  const lines = notificationLines(f, receivedAt);
  const subject = `[Demo] Cerere nouă: ${TYPE_LABEL[f.tip]}, ${f.nume}`;
  const text = [`Cerere nouă de pe site-ul Salon Ametist (demo).`, "", ...lines.map(([k, v]) => `${k}: ${v}`), "", "—", DEMO_FOOTER, ""].join("\n");
  const rows = lines
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${escape(k)}</th><td style="padding:4px 0;white-space:pre-wrap">${escape(v)}</td></tr>`)
    .join("");
  const html = `<!DOCTYPE html><html lang="ro"><head><meta charset="utf-8"><title>${escape(subject)}</title></head><body style="font-family:Arial,sans-serif;color:#1a1433"><p>Cerere nouă de pe site-ul Salon Ametist (demo).</p><table>${rows}</table><hr><p style="font-size:13px;color:#555">${escape(DEMO_FOOTER)}</p></body></html>`;
  return { subject, text, html };
};
