import type { ServiceData } from "@/lib/cms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { serviceImages } from "@/lib/service-images";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, Heart, Home, Stethoscope, type LucideIcon } from "lucide-react";
import Link from "next/link";

const serviceIcons: Record<string, LucideIcon> = {
  "personal-care": Heart,
  "senior-home-care": Home,
  "companion-care": Heart,
  "registered-nursing": Stethoscope,
};

type HomeDifferenceSectionProps = {
  locale: string;
  services: ServiceData[];
};

export async function HomeDifferenceSection({
  locale,
  services,
}: HomeDifferenceSectionProps) {
  const t = await getTranslations("home01");
  const base = `/${locale}`;
  const specialties = [t("specialty1"), t("specialty2"), t("specialty3")];
  const featured = services.slice(0, 4);

  return (
    <section className="home-difference-section section">
      <div className="container home-difference-grid">
        <ScrollReveal>
          <div className="home-difference-copy">
            <h2 className="display-heading">{t("differenceTitle")}</h2>
            <p className="lead">{t("differenceBody")}</p>
            <div className="home-specialty-box">
              <h3>{t("specialtyTitle")}</h3>
              <ul className="check-list">
                {specialties.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link className="button button-primary" href={`${base}/about`}>
              {t("differenceCta")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="home-service-strip" aria-label={t("servicesLabel")}>
          {featured.map((service, index) => {
            const Icon = serviceIcons[service.slug] ?? Heart;
            const image = serviceImages[service.slug];
            return (
              <ScrollReveal key={service.slug} delay={index * 80}>
                <Link href={`${base}/services/${service.slug}`} className="home-service-card">
                  <div className="home-service-card-image">
                    <img src={image} alt="" loading="lazy" />
                  </div>
                  <div className="home-service-card-body">
                    <div className="home-service-card-icon" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
