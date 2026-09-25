import type { ServiceData } from "@/lib/cms";
import { ServiceCard } from "@/components/ui/service-card";
import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/utils";

type ServicesCategoryBandProps = {
  locale: string;
  title: string;
  subtitle: string;
  services: ServiceData[];
  ctaLabel: string;
  tone?: "white" | "mist";
};

/**
 * Care Giver services listing band — left-aligned serif heading, tan rule,
 * and a row of square service cards.
 */
export function ServicesCategoryBand({
  locale,
  title,
  subtitle,
  services,
  ctaLabel,
  tone = "white",
}: ServicesCategoryBandProps) {
  if (services.length === 0) return null;

  return (
    <section className={cn("py-14 lg:py-16", tone === "mist" ? "bg-mist" : "bg-white")}>
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle title={title} subtitle={subtitle} />

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard locale={locale} service={service} ctaLabel={ctaLabel} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
