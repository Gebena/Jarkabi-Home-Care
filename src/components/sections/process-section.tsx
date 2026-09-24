import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getTranslations } from "next-intl/server";

export async function ProcessSection() {
  const t = await getTranslations("process");
  const steps = [
    t("step1"),
    t("step2"),
    t("step3"),
    t("step4"),
    t("step5"),
    t("step6"),
  ];

  return (
    <section className="section process-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("title")}</h2>
          </div>
        </ScrollReveal>
        <ol className="process-timeline">
          {steps.map((step, index) => (
            <ScrollReveal key={step} delay={index * 70}>
              <li>
                <span className="step-index">{index + 1}</span>
                <span className="step-title">{step}</span>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
