import CallNote from "@/components/CallNote";
import HoursList from "@/components/HoursList";
import RequestForm from "@/components/RequestForm";
import { contact } from "@/content/contact";
import { useLang } from "@/hooks/use-lang";

const Contact = () => {
  const lang = useLang();
  const c = contact[lang];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 tabIndex={-1} className="font-display text-4xl text-gold-300 focus:outline-none md:text-5xl">
        {c.h1}
      </h1>
      <p className="mt-4 max-w-prose text-xl leading-relaxed">{c.lead}</p>
      <section aria-labelledby="program" className="mt-10">
        <h2 id="program" className="font-display text-3xl text-gold-300">
          {c.hoursHeading}
        </h2>
        <HoursList />
      </section>
      <section aria-labelledby="formular" className="mt-12">
        <h2 id="formular" className="font-display text-3xl text-gold-300">
          {c.formHeading}
        </h2>
        <RequestForm />
      </section>
      <section aria-labelledby="suna" className="mt-12">
        <h2 id="suna" className="font-display text-2xl text-gold-300">
          {c.callHeading}
        </h2>
        <div className="mt-3">
          <CallNote showFormLink={false} />
        </div>
      </section>
    </div>
  );
};

export default Contact;
