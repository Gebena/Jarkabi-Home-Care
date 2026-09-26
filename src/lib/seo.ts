import { type Locale } from "@/i18n/routing";
import { indexableLocales } from "@/lib/locale-strategy";
import { defaultBrand } from "@/lib/brand";

export const siteUrl = defaultBrand.websiteUrl.replace(/\/$/, "");

/** Default social preview image — hero care conversation photograph. */
export const defaultOgImage = "/images/photography/jarkabi-hero-care-conversation.webp";

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
    indexableLocales().map((locale) => [locale, absoluteUrl(localePath(locale, normalized))]),
  );
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = defaultOgImage,
}: {
  locale: Locale | string;
  path: string;
  title: string;
  description?: string;
  image?: string;
}) {
  const canonical = absoluteUrl(localePath(locale, path));
  const ogTitle = title.includes(defaultBrand.agencyName)
    ? title
    : `${title} | ${defaultBrand.agencyName}`;
  const ogImageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: defaultBrand.agencyName,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website" as const,
      images: [{ url: ogImageUrl, alt: defaultBrand.agencyName }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: ogTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
