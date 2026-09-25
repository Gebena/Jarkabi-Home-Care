import { ContactSidebarWidget } from "@/components/ui/contact-sidebar-widget";
import Link from "next/link";

type CareersSidebarProps = {
  locale: string;
  quickLinksTitle: string;
  links: Array<{ label: string; href: string }>;
  widgetTitle: string;
  widgetButton: string;
};

/** Care Giver careers sidebar — quick links + join-team widget. */
export function CareersSidebar({
  locale,
  quickLinksTitle,
  links,
  widgetTitle,
  widgetButton,
}: CareersSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <nav aria-label={quickLinksTitle}>
        <h2 className="font-display text-lg text-demo-navy">{quickLinksTitle}</h2>
        <ul className="mt-4">
          {links.map((link) => (
            <li key={link.href} className="mb-px">
              <Link
                href={link.href}
                className="block border border-demo-sidebar-border bg-demo-sidebar-bg px-5 py-3.5 text-sm font-medium text-demo-navy transition-colors hover:border-demo-navy hover:bg-demo-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-demo-navy"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ContactSidebarWidget locale={locale} title={widgetTitle} buttonLabel={widgetButton} />
    </aside>
  );
}
