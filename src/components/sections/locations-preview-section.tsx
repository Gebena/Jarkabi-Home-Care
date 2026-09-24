import type { ProvinceData } from "@/lib/cms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTranslations } from "next-intl/server";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

type LocationsPreviewSectionProps = {
  locale: string;
  provinces: ProvinceData[];
};

export async function LocationsPreviewSection({
  locale,
  provinces,
}: LocationsPreviewSectionProps) {
  const t = await getTranslations("locationsPreview");
  const base = `/${locale}`;
  const active = provinces.filter((p) => p.status === "active");

  return (
    <section className="section locations-preview-section section--alt">
      <div className="container">
        <ScrollReveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        </ScrollReveal>
        <div className="locations-preview-grid">
          {active.map((province, i) => (
            <ScrollReveal key={province.slug} delay={i * 60}>
              <Link href={`${base}/locations/${province.slug}`} className="location-preview-card">
                <MapPin size={20} aria-hidden="true" />
                <div>
                  <h3>{province.name}</h3>
                  <p>{t("servingNow")}</p>
                </div>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="section-cta-row">
          <Link className="button button-secondary" href={`${base}/locations`}>
            {t("viewAll")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
