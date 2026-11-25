import { ui } from "@/content/ui";
import { useLang } from "@/hooks/use-lang";

// Where a licensed operator must show its licence series and number and the ONJN logo (Norme HG 111/2016 art. 6(1)).
// The demo has no licence and never uses the real logo (spec §3.1).
const LicencePlaceholder = () => {
  const lang = useLang();
  return (
    <div data-licence-placeholder className="rounded-md border border-dashed border-lavender-200 p-3 text-sm text-lavender-200">
      {ui[lang].footer.licence}
    </div>
  );
};

export default LicencePlaceholder;
