import { LegalPageSidebar } from "@/components/legal/legal-page-sidebar";
import { PageSection } from "@/components/ui/page-section";
import type { ReactNode } from "react";

type LegalPageLayoutProps = {
  locale: string;
  navTitle: string;
  links: Array<{ label: string; href: string; active?: boolean }>;
  widgetTitle: string;
  widgetButton: string;
  children: ReactNode;
};

/** Shared two-column layout for legal policy pages. */
export function LegalPageLayout({
  locale,
  navTitle,
  links,
  widgetTitle,
  widgetButton,
  children,
}: LegalPageLayoutProps) {
  return (
    <PageSection>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
        <div className="min-w-0 max-w-3xl">{children}</div>
        <LegalPageSidebar
          locale={locale}
          navTitle={navTitle}
          links={links}
          widgetTitle={widgetTitle}
          widgetButton={widgetButton}
        />
      </div>
    </PageSection>
  );
}
