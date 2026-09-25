import { ContactSidebarWidget } from "@/components/ui/contact-sidebar-widget";
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

      <ContactSidebarWidget
        locale={locale}
        title="Find Care Today"
        buttonLabel={contactLabel}
      />
    </aside>
  );
}
