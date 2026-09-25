import { ContactSidebarWidget } from "@/components/ui/contact-sidebar-widget";
import Link from "next/link";

type ReferralsSidebarProps = {
  locale: string;
  quickLinksTitle: string;
  links: Array<{ label: string; href: string }>;
  partnersTitle: string;
  partnersBody: string;
  responseTitle: string;
  responseBody: string;
  privacyTitle: string;
  privacyBody: string;
  privacyLinkLabel: string;
  privacyHref: string;
  widgetTitle: string;
  widgetButton: string;
};

/** Care Giver referrals sidebar — partner info + quick links + contact widget. */
export function ReferralsSidebar({
  locale,
  quickLinksTitle,
  links,
  partnersTitle,
  partnersBody,
  responseTitle,
  responseBody,
  privacyTitle,
  privacyBody,
  privacyLinkLabel,
  privacyHref,
  widgetTitle,
  widgetButton,
}: ReferralsSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <div className="border border-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">{partnersTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-body">{partnersBody}</p>
      </div>

      <div className="border border-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">{responseTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-body">{responseBody}</p>
      </div>

      <div className="border border-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">{privacyTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-body">{privacyBody}</p>
        <Link
          href={privacyHref}
          className="mt-4 inline-block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
        >
          {privacyLinkLabel}
        </Link>
      </div>

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
