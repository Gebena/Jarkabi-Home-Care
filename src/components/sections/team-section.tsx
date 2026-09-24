"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { serviceImages } from "@/lib/service-images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useState } from "react";

const teamImages = [
  serviceImages["registered-nursing"],
  serviceImages["personal-care"],
  serviceImages["companion-care"],
  serviceImages["dementia-support"],
];

export function TeamSection({ locale }: { locale: string }) {
  const t = useTranslations("team");
  const base = `/${locale}`;
  const [index, setIndex] = useState(0);

  const members = [
    { name: t("member1Name"), role: t("member1Role"), image: teamImages[0] },
    { name: t("member2Name"), role: t("member2Role"), image: teamImages[1] },
    { name: t("member3Name"), role: t("member3Role"), image: teamImages[2] },
    { name: t("member4Name"), role: t("member4Role"), image: teamImages[3] },
  ];

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + members.length) % members.length);
  }, [members.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % members.length);
  }, [members.length]);

  const visible = [
    members[index % members.length],
    members[(index + 1) % members.length],
    members[(index + 2) % members.length],
    members[(index + 3) % members.length],
  ];

  return (
    <section className="team-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("title")}</h2>
            <p className="section-lead">{t("subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="team-carousel">
          <button type="button" className="team-arrow team-arrow--prev" onClick={prev} aria-label="Previous team members">
            <ChevronLeft size={20} />
          </button>
          <div className="team-grid">
            {visible.map((member) => (
              <article key={member.name} className="team-card">
                <div className="team-card-image">
                  <img src={member.image} alt="" loading="lazy" />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
          <button type="button" className="team-arrow team-arrow--next" onClick={next} aria-label="Next team members">
            <ChevronRight size={20} />
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link className="button button-secondary" href={`${base}/caregivers`}>
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
