import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getTranslations } from "next-intl/server";
import {
  Clock,
  HeartPulse,
  Home,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";

const icons = [Home, HeartPulse, Clock, Stethoscope, Shield, Users];

export async function HomeCommunitySection() {
  const t = await getTranslations("home01");

  const items = [
    { title: t("community1Title"), desc: t("community1Desc") },
    { title: t("community2Title"), desc: t("community2Desc") },
    { title: t("community3Title"), desc: t("community3Desc") },
    { title: t("community4Title"), desc: t("community4Desc") },
    { title: t("community5Title"), desc: t("community5Desc") },
    { title: t("community6Title"), desc: t("community6Desc") },
  ];

  return (
    <section className="home-community-section section section--alt">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <h2>{t("communityTitle")}</h2>
          </div>
        </ScrollReveal>
        <div className="home-community-grid">
          {items.map((item, index) => {
            const Icon = icons[index] ?? Home;
            return (
              <ScrollReveal key={item.title} delay={index * 50}>
                <article className="home-community-item">
                  <div className="home-community-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
