type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import { isBrandPlaceholder } from "@/lib/brand";

/** Placeholders are dropped from structured data rather than published as real NAP. */
const real = (value: string) => (isBrandPlaceholder(value) ? undefined : value);

function postalAddress(streetAddress: string) {
  return {
    "@type": "PostalAddress",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    addressCountry: "CA",
    ...(real(streetAddress) ? { streetAddress } : {}),
  };
}

export function organizationJsonLd(brand: {
  agencyName: string;
  websiteUrl: string;
  email: string;
  primaryPhone: string;
  ottawaOfficeAddress: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.agencyName,
    url: brand.websiteUrl,
    email: brand.email,
    ...(real(brand.primaryPhone) ? { telephone: brand.primaryPhone } : {}),
    address: postalAddress(brand.ottawaOfficeAddress),
  };
}

export function localBusinessJsonLd(brand: {
  agencyName: string;
  websiteUrl: string;
  email: string;
  primaryPhone: string;
  ottawaOfficeAddress: string;
  businessHours: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.agencyName,
    url: brand.websiteUrl,
    email: brand.email,
    ...(real(brand.primaryPhone) ? { telephone: brand.primaryPhone } : {}),
    address: postalAddress(brand.ottawaOfficeAddress),
    ...(real(brand.businessHours) ? { openingHours: brand.businessHours } : {}),
    areaServed: {
      "@type": "City",
      name: "Ottawa",
    },
  };
}

export function serviceJsonLd(service: {
  title: string;
  summary: string;
  slug: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: "Jarkabi Home Care",
    },
    areaServed: "Ottawa, Ontario, Canada",
    url: `https://jarkabi.ca/${service.locale}/services/${service.slug}`,
  };
}

export function jobPostingJsonLd(job: {
  title: string;
  summary: string;
  slug: string;
  locale: string;
  employmentType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "Jarkabi Home Care",
      sameAs: "https://jarkabi.ca",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ottawa",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    },
    url: `https://jarkabi.ca/${job.locale}/careers/${job.slug}`,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `https://jarkabi.ca${item.href}`,
    })),
  };
}
