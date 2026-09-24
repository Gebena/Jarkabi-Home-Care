"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

type FaqSectionProps = {
  locale?: string;
};

export function FaqSection({ locale = "en" }: FaqSectionProps) {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const base = `/${locale}`;

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section className="section" id="faq">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("title")}</h2>
            <p className="section-lead">{t("subtitle")}</p>
          </div>
        </ScrollReveal>
        <div className="faq-list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={`faq-item${isOpen ? " faq-item--open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {item.q}
                  <ChevronDown size={18} aria-hidden="true" />
                </button>
                {isOpen ? <p className="faq-answer">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
        <div className="faq-cta-card">
          <h3>{t("stillHaveQuestions")}</h3>
          <p>{t("stillHaveQuestionsBody")}</p>
          <Link className="button button-primary" href={`${base}/contact`}>
            {t("contactTeam")}
          </Link>
        </div>
      </div>
    </section>
  );
}
