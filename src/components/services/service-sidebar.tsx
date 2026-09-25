import { caregiverContactWidgetImage } from "@/lib/caregiver-assets";
import { careGiverServiceMenu } from "@/lib/service-menu";
import Link from "next/link";

type ServiceSidebarProps = {
  locale: string;
  activeSlug: string;
  contactLabel: string;
  itemLabels: Record<string, string>;
};

/**
 * Care Giver service detail sidebar — lined navy list + teal contact widget.
 */
export function ServiceSidebar({
  locale,
  activeSlug,
  contactLabel,
  itemLabels,
}: ServiceSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <nav aria-label="Care services">
        <ul>
          {careGiverServiceMenu.map((item) => {
            const active = item.slug === activeSlug;
            const label = itemLabels[item.slug] ?? item.key;
            return (
              <li key={item.slug} className="mb-px">
                <Link
                  href={`/${locale}/services/${item.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`block border border-demo-sidebar-border px-8 py-5 font-display text-[1.3125rem] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-demo-navy ${
                    active
                      ? "border-demo-navy bg-demo-navy text-white"
                      : "bg-demo-sidebar-bg text-demo-navy hover:border-demo-navy hover:bg-demo-navy hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className="relative overflow-hidden px-7 py-12 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(50,159,130,0.90), rgba(50,159,130,0.90)), url(${caregiverContactWidgetImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3 className="relative font-display text-4xl font-bold text-white">Find Care Today</h3>
        <Link
          href={`/${locale}/contact`}
          className="relative mt-6 inline-block bg-demo-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#242424] transition-colors hover:bg-demo-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {contactLabel}
        </Link>
      </div>
    </aside>
  );
}
