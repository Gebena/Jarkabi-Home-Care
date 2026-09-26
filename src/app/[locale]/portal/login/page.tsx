import { PortalLoginForm } from "@/components/portal/portal-login-form";
import { isPortalDemoEnabled } from "@/lib/supabase/config";
import { getPortalSession, portalHomePath } from "@/lib/portal/session";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portal" });
  return { title: t("loginTitle") };
}

export default async function PortalLoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getPortalSession();
  if (session) {
    redirect(portalHomePath(locale, session.role));
  }

  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <div className="min-h-screen bg-mist py-16">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <h1 className="mb-2 text-center font-display text-3xl text-ink">{t("loginTitle")}</h1>
        <p className="mb-10 text-center text-body">{t("loginLead")}</p>
        <PortalLoginForm locale={locale} demoEnabled={isPortalDemoEnabled()} />
      </div>
    </div>
  );
}
