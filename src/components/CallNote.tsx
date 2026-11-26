import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { pathFor } from "@/config/pages";
import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";

// Where a real site would have a call button. It opens a note and never links to a phone number (spec §4).
const CallNote = ({ showFormLink = true }: { showFormLink?: boolean }) => {
  const lang = useLang();
  const s = ui[lang].callNote;
  const [open, setOpen] = useState(false);
  const noteId = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={noteId}
        onClick={() => setOpen((o) => !o)}
        className="rounded-full px-6 py-2.5 text-base text-amethyst ring-1 ring-amethyst hover:bg-quartz-deep"
      >
        {s.button}
      </button>
      <div id={noteId} hidden={!open} className="mt-3 max-w-md rounded-2xl bg-quartz-deep p-5 text-base text-ink">
        <p>{s.text}</p>
        {showFormLink && (
          <p className="mt-2">
            <Link to={pathFor("contact", lang)} className="text-gilt-deep underline underline-offset-2">
              {s.link}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default CallNote;
