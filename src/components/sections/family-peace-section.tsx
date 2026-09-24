import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";

export async function FamilyPeaceSection() {
  const t = await getTranslations("familyPeace");
  const items = [t("item1"), t("item2"), t("item3"), t("item4"), t("item5"), t("item6")];

  return (
    <section className="section family-peace-section">
      <div className="container">
        <ScrollReveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("body")} />
        </ScrollReveal>
        <ul className="family-peace-list">
          {items.map((item, i) => (
            <ScrollReveal key={item} delay={i * 50}>
              <li>
                <Check size={18} aria-hidden="true" />
                {item}
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
