import { LocaleDocument } from "@/components/layout/locale-document";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeaderUtilityBar } from "@/components/layout/header-utility-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { JsonLd, localBusinessJsonLd, organizationJsonLd } from "@/components/seo/json-ld";
import { PartialLocaleBanner } from "@/components/layout/partial-locale-banner";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { isPartialLocale } from "@/lib/locale-strategy";
import { getBrand, getProvinces } from "@/lib/cms";
import { defaultBrand } from "@/lib/brand";
import { buildLanguageAlternates, siteUrl } from "@/lib/seo";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: {
      default: "Jarkabi Home Care | Home Care & Nursing in Ottawa",
      template: `%s | ${defaultBrand.agencyName}`,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      languages: buildLanguageAlternates(""),
    },
    openGraph: {
      locale,
      siteName: defaultBrand.agencyName,
    },
    ...(isPartialLocale(locale)
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const lang = locale as Locale;
  const [brand, provinces] = await Promise.all([
    getBrand(lang),
    getProvinces(lang),
  ]);

  const isRtl = rtlLocales.includes(lang);

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleDocument locale={lang} />
      <JsonLd data={[organizationJsonLd(brand), localBusinessJsonLd(brand)]} />
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "rtl-layout" : undefined}>
        <HeaderUtilityBar locale={locale} />
        <SiteHeader locale={locale} brand={brand} />
        <PartialLocaleBanner locale={locale} />
        <main id="main-content">{children}</main>
        <SiteFooter locale={locale} brand={brand} provinces={provinces} />
        <MobileBottomBar locale={locale} brand={brand} />
        <InstallPrompt />
      </div>
    </NextIntlClientProvider>
  );
}
