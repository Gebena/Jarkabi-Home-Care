import { aboutImages } from "@/lib/service-images";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";

type IntroSectionProps = {
  locale: string;
};

export async function IntroSection({ locale }: IntroSectionProps) {
  const t = await getTranslations("intro");
  const base = `/${locale}`;
  const checks = [t("check1"), t("check2"), t("check3"), t("check4")];

  return (
    <section className="about-section">
      <div className="container about-split">
        <ScrollReveal>
          <div className="about-collage">
            <div className="about-collage-main">
              <img src={aboutImages.main} alt="" loading="lazy" />
            </div>
            <div className="about-collage-small">
              <img src={aboutImages.small1} alt="" loading="lazy" />
            </div>
            <div className="about-collage-small">
              <img src={aboutImages.small2} alt="" loading="lazy" />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="display-heading">{t("headline")}</h2>
            <p className="lead">{t("body")}</p>
            <div className="about-badges">
              <div className="about-badge">
                <div className="about-badge-icon" aria-hidden="true">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <strong>{t("badge1Title")}</strong>
                  <span>{t("badge1Desc")}</span>
                </div>
              </div>
              <div className="about-badge">
                <div className="about-badge-icon" aria-hidden="true">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <strong>{t("badge2Title")}</strong>
                  <span>{t("badge2Desc")}</span>
                </div>
              </div>
            </div>
            <ul className="check-list">
              {checks.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "2rem" }}>
              <Link className="button button-primary" href={`${base}/about`}>
                {t("cta")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
