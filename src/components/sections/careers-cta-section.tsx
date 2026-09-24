import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function CareersCtaSection({ locale }: { locale: string }) {
  const t = await getTranslations("careersCta");
  const base = `/${locale}`;

  return (
    <section className="careers-cta-section section">
      <div className="container careers-cta-inner">
        <ScrollReveal>
          <h2>{t("title")}</h2>
          <p>{t("body")}</p>
          <Link className="button button-light button-lg" href={`${base}/careers`}>
            {t("cta")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
