import CallNote from "@/components/CallNote";
import HoursList from "@/components/HoursList";
import PageHero from "@/components/PageHero";
import RequestForm from "@/components/RequestForm";
import { contact } from "@/content/contact";
import { useLang } from "@/hooks/use-lang";

const Contact = () => {
  const lang = useLang();
  const c = contact[lang];
  return (
    <>
    <PageHero h1={c.h1} lead={c.lead} />
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section aria-labelledby="program">
        <h2 id="program" className="font-display text-h2 text-amethyst">
          {c.hoursHeading}
        </h2>
        <HoursList />
      </section>
      <section aria-labelledby="formular" className="mt-12">
        <h2 id="formular" className="font-display text-h2 text-amethyst">
          {c.formHeading}
        </h2>
        <RequestForm />
      </section>
      <section aria-labelledby="suna" className="mt-12">
        <h2 id="suna" className="font-display text-h3 text-amethyst">
          {c.callHeading}
        </h2>
        <div className="mt-3">
          <CallNote showFormLink={false} />
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;
