import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { ServiceCard } from "@/components/ui/service-card";
import type { ServiceAvailabilityData, ServiceData } from "@/lib/cms";
import { HeartHandshake, MapPin, Route, Users } from "lucide-react";
import Link from "next/link";

type ServiceDetailSectionsProps = {
  locale: string;
  service: ServiceData;
  availability: ServiceAvailabilityData[];
  relatedServices: ServiceData[];
  labels: {
    whoFor: string;
    whoForBody: string;
    howWeHelp: string;
    howWeHelpBody: string;
    howCareBegins: string;
    howCareBeginsBody: string;
    locations: string;
    locationsEmpty: string;
    related: string;
    learnMore: string;
  };
};

function titleCase(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function ServiceDetailSections({
  locale,
  service,
  availability,
  relatedServices,
  labels,
}: ServiceDetailSectionsProps) {
  const activeLocations = availability.filter(
    (row) => row.serviceSlug === service.slug && row.status === "active",
  );

  const panels = [
    { icon: Users, title: labels.whoFor, body: labels.whoForBody },
    { icon: HeartHandshake, title: labels.howWeHelp, body: labels.howWeHelpBody },
    { icon: Route, title: labels.howCareBegins, body: labels.howCareBeginsBody },
  ];

  return (
    <>
      <PageSection>
        <div className="grid gap-8 md:grid-cols-3">
          {panels.map(({ icon: Icon, title, body }) => (
            <article key={title}>
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center bg-blush-soft text-tan-ink"
              >
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <h2 className="mt-5 font-display text-lg text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">{body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="flex items-center gap-2.5 font-display text-lg text-ink">
            <MapPin size={20} aria-hidden="true" className="text-tan-ink" />
            {labels.locations}
          </h2>

          {activeLocations.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {activeLocations.map((row) => (
                <li key={`${row.provinceSlug}-${row.citySlug ?? "province"}`}>
                  <Link
                    href={`/${locale}/locations/${row.provinceSlug}/${row.citySlug ?? "ottawa"}`}
                    className="inline-block border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-tan hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                  >
                    {row.citySlug
                      ? `${titleCase(row.citySlug)}, ${titleCase(row.provinceSlug)}`
                      : titleCase(row.provinceSlug)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-body">{labels.locationsEmpty}</p>
          )}
        </div>
      </PageSection>

      {relatedServices.length > 0 ? (
        <PageSection tone="mist">
          <SectionTitle align="center" title={labels.related} />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((related) => (
              <li key={related.slug}>
                <ServiceCard service={related} locale={locale} ctaLabel={labels.learnMore} />
              </li>
            ))}
          </ul>
        </PageSection>
      ) : null}
    </>
  );
}
