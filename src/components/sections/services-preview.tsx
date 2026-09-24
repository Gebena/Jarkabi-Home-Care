import type { ServiceData } from "@/lib/cms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { serviceImages } from "@/lib/service-images";
import { getTranslations } from "next-intl/server";
import {
  Heart,
  Home,
  Users,
  Stethoscope,
  Brain,
  Clock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const serviceIcons: Record<string, LucideIcon> = {
  "personal-care": Heart,
  "senior-home-care": Home,
  "companion-care": Users,
  "registered-nursing": Stethoscope,
  "dementia-support": Brain,
  "respite-care": Clock,
};

type ServicesPreviewProps = {
  locale: string;
  services: ServiceData[];
};

export async function ServicesPreview({ locale, services }: ServicesPreviewProps) {
  const t = await getTranslations("services");
  const base = `/${locale}`;

  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("title")}</h2>
            <p className="section-lead">{t("subtitle")}</p>
          </div>
        </ScrollReveal>
        <div className="card-grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug] ?? Heart;
            const image = serviceImages[service.slug];
            return (
              <ScrollReveal key={service.slug} delay={index * 70}>
                <article className="service-card">
                  <div className="service-card-top">
                    <div className="service-card-icon" aria-hidden="true">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <Link href={`${base}/services/${service.slug}`} className="text-link">
                      {t("learnMore")}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="service-card-image">
                    <img src={image} alt="" loading="lazy" />
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link className="button button-purple" href={`${base}/services`}>
            {t("viewAll")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
