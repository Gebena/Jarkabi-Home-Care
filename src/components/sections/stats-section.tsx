"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");

  useEffect(() => {
    const node = ref.current;
    if (!node || Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1800;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(numeric * eased);
          setDisplay(`${current}${hasPlus ? "+" : ""}${hasPercent ? "%" : ""}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [numeric, hasPlus, hasPercent, suffix, value]);

  return <span ref={ref}>{display}</span>;
}

export function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <section className="stats-section" aria-label="Key statistics">
      <div className="container">
        <ScrollReveal>
          <div className="stats-intro">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("title")}</h2>
            <p className="section-lead">{t("subtitle")}</p>
          </div>
        </ScrollReveal>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className="stat-item">
                <p className="stat-value">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
