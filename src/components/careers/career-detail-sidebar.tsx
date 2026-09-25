import { ContactSidebarWidget } from "@/components/ui/contact-sidebar-widget";

type CareerDetailSidebarProps = {
  locale: string;
  professionLabel: string;
  profession: string;
  employmentTypeLabel: string;
  employmentType: string;
  privacyNote: string;
  widgetTitle: string;
  widgetButton: string;
};

/** Career posting sidebar — role metadata + join-team widget. */
export function CareerDetailSidebar({
  locale,
  professionLabel,
  profession,
  employmentTypeLabel,
  employmentType,
  privacyNote,
  widgetTitle,
  widgetButton,
}: CareerDetailSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <div className="border border-line bg-white p-6">
        <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-tan-ink">
          {professionLabel}
        </h2>
        <p className="mt-2 text-base text-ink">{profession}</p>

        <h2 className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-tan-ink">
          {employmentTypeLabel}
        </h2>
        <p className="mt-2 text-base text-ink">{employmentType}</p>

        <p className="mt-6 text-sm leading-relaxed text-body">{privacyNote}</p>
      </div>

      <ContactSidebarWidget locale={locale} title={widgetTitle} buttonLabel={widgetButton} />
    </aside>
  );
}
