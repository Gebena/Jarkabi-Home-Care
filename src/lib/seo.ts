import { locales, type Locale } from "@/i18n/routing";
import { defaultBrand } from "@/lib/brand";
import { defaultOpenGraphImages } from "@/lib/og-image";

export const siteUrl = defaultBrand.websiteUrl.replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function localePath(locale: string, path = ""): string {
  const suffix = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${suffix}`;
}

export function buildLanguageAlternates(pathWithoutLocale: string): Record<string, string> {
  const normalized = pathWithoutLocale.startsWith("/")
    ? pathWithoutLocale
    : `/${pathWithoutLocale}`;

  return Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localePath(locale, normalized))]),
  );
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale | string;
  path: string;
  title: string;
  description?: string;
}) {
  const canonical = absoluteUrl(localePath(locale, path));
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title: `${title} | ${defaultBrand.agencyName}`,
      description,
      url: canonical,
      siteName: defaultBrand.agencyName,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website" as const,
      images: defaultOpenGraphImages(),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | ${defaultBrand.agencyName}`,
      description,
      images: defaultOpenGraphImages().map((image) => image.url),
    },
  };
}
