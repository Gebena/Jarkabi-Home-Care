import { SpecialtyPage } from "@/components/pages/specialty-page";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Our Caregivers" };

export default async function CaregiversPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SpecialtyPage
      locale={locale}
      eyebrow="Caregivers"
      title="People who bring skill, respect and warmth into the home"
      lead="Recruitment, screening, orientation and supervision content is fully editable. [REVIEW REQUIRED]"
      sections={[
        {
          title: "Who our caregivers are",
          body: "Personal Support Workers, Health Care Aides, companions and nurses — matched with care, culture and language where feasible. [PLACEHOLDER]",
        },
        {
          title: "Screening & training",
          body: "Background screening, references, orientation and ongoing education. Do not publish specific claims until verified. [PLACEHOLDER]",
        },
        {
          title: "Caregiver matching",
          body: "Continuity, personality fit, cultural sensitivity and language preferences inform matching decisions. [PLACEHOLDER]",
        },
      ]}
    />
  );
}
