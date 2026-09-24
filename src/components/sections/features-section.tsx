import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getTranslations } from "next-intl/server";
import {
  Calendar,
  Globe,
  Heart,
  Shield,
  Users,
  Clock,
} from "lucide-react";

const featureIcons = [Heart, Users, Globe, Calendar, Shield, Clock];

export async function FeaturesSection() {
  const t = await getTranslations("features");

  const items = [
    { title: t("item1Title"), desc: t("item1Desc") },
    { title: t("item2Title"), desc: t("item2Desc") },
    { title: t("item3Title"), desc: t("item3Desc") },
    { title: t("item4Title"), desc: t("item4Desc") },
    { title: t("item5Title"), desc: t("item5Desc") },
    { title: t("item6Title"), desc: t("item6Desc") },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("title")}</h2>
            <p className="section-lead">{t("subtitle")}</p>
          </div>
        </ScrollReveal>
        <div className="features-grid">
          {items.map((item, index) => {
            const Icon = featureIcons[index] ?? Heart;
            return (
              <ScrollReveal key={item.title} delay={index * 60}>
                <article className="feature-card">
                  <span className="feature-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="feature-card-icon" aria-hidden="true">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
