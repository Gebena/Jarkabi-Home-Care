import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getTranslations } from "next-intl/server";

export async function HomeProcessSection() {
  const t = await getTranslations("home01");

  const steps = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
  ];

  return (
    <section className="home-process-section section">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <p className="script-text home-process-tagline">{t("processTagline")}</p>
          </div>
        </ScrollReveal>
        <div className="home-process-grid">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 80}>
              <article className="home-process-card">
                <span className="home-process-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
