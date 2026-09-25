import { ContactSidebarWidget } from "@/components/ui/contact-sidebar-widget";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LegalPageSidebarProps = {
  locale: string;
  navTitle: string;
  links: Array<{ label: string; href: string; active?: boolean }>;
  widgetTitle: string;
  widgetButton: string;
};

/** Legal pages sidebar — policy links + contact widget. */
export function LegalPageSidebar({
  locale,
  navTitle,
  links,
  widgetTitle,
  widgetButton,
}: LegalPageSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <nav aria-label={navTitle}>
        <h2 className="font-display text-lg text-demo-navy">{navTitle}</h2>
        <ul className="mt-4">
          {links.map((link) => (
            <li key={link.href} className="mb-px">
              <Link
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={cn(
                  "block border px-5 py-3.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-demo-navy",
                  link.active
                    ? "border-demo-navy bg-demo-navy text-white"
                    : "border-demo-sidebar-border bg-demo-sidebar-bg text-demo-navy hover:border-demo-navy hover:bg-demo-navy hover:text-white",
                )}
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
