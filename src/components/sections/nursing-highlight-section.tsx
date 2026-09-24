import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Stethoscope } from "lucide-react";
import Link from "next/link";

export async function NursingHighlightSection({ locale }: { locale: string }) {
  const t = await getTranslations("nursingHighlight");
  const base = `/${locale}`;

  return (
    <section className="section nursing-highlight-section section--alt">
      <div className="container editorial-split">
        <ScrollReveal>
          <div className="nursing-highlight-icon" aria-hidden="true">
            <Stethoscope size={32} strokeWidth={1.5} />
          </div>
          <SectionHeading
            align="left"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("body")}
          />
          <Link className="button button-primary" href={`${base}/services/registered-nursing`}>
            {t("cta")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
