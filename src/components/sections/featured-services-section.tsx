import type { ServiceData } from "@/lib/cms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { serviceImages } from "@/lib/service-images";
import { getTranslations } from "next-intl/server";
import { Heart, Home, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";

const featuredIcons: Record<string, LucideIcon> = {
  "personal-care": Heart,
  "senior-home-care": Home,
  "companion-care": Users,
};

type FeaturedServicesSectionProps = {
  locale: string;
  services: ServiceData[];
};

export async function FeaturedServicesSection({
  locale,
  services,
}: FeaturedServicesSectionProps) {
  const base = `/${locale}`;
  const featured = services.slice(0, 3);

  return (
    <section className="featured-services" aria-label="Featured services">
      <div className="container featured-grid">
        {featured.map((service, index) => {
          const Icon = featuredIcons[service.slug] ?? Heart;
          const image = serviceImages[service.slug];
          return (
            <ScrollReveal key={service.slug} delay={index * 80}>
              <Link href={`${base}/services/${service.slug}`} className="featured-card-wrap">
                <article className="featured-card">
                  <div className="featured-card-image">
                    <img src={image} alt="" loading="lazy" />
                    <div className="featured-card-icon" aria-hidden="true">
                      <Icon size={22} />
                    </div>
                  </div>
                  <h3>{service.title}</h3>
                </article>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
