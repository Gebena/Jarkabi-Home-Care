import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { PortalNav } from "@/components/portal/portal-nav";
import type { PortalSession } from "@/lib/portal/session";
import { listAccessibleAreas } from "@/lib/portal/permissions";
import Link from "next/link";

type PortalShellProps = {
  locale: string;
  session: PortalSession;
  title: string;
  children: React.ReactNode;
};

export function PortalShell({ locale, session, title, children }: PortalShellProps) {
  const areas = listAccessibleAreas(session.role);

  return (
    <div className="min-h-screen bg-mist">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex w-[min(1240px,calc(100%-2rem))] items-center justify-between gap-4 py-4">
          <Link href={`/${locale}`} className="shrink-0">
            <BrandWordmark layout="horizontal" />
          </Link>
          <div className="text-right text-sm">
            <p className="font-medium text-ink">{session.fullName ?? session.email}</p>
            <p className="text-body capitalize">{session.role.replace(/_/g, " ")}</p>
          </div>
        </div>
        <PortalNav locale={locale} areas={areas} />
      </header>

      <main className="mx-auto w-[min(1240px,calc(100%-2rem))] py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-3xl text-ink">{title}</h1>
          {session.demo ? (
            <p className="border border-tan bg-tan/10 px-3 py-1 text-xs text-tan-ink">
              Demo portal — configure Supabase Auth for production
            </p>
          ) : null}
        </div>
        {children}
      </main>
    </div>
  );
}
