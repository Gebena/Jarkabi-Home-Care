import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import { defaultBrand } from "@/lib/brand";
import { Check, CircleAlert } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Accessibility" };

export default async function AccessibilityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legalPages" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const done = t.raw("accessibilityDone") as string[];
  const gaps = t.raw("accessibilityGaps") as string[];

  return (
    <>
      <PageHero
        locale={locale}
        title={tFooter("accessibility")}
        lead={t("accessibilityLead")}
        crumbLabel={tFooter("accessibility")}
      />

      <PageSection>
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-body">{t("accessibilityIntro")}</p>

          <h2 className="mt-12 font-display text-xl text-ink">{t("accessibilityDoneTitle")}</h2>
          <ul className="mt-5 space-y-3">
            {done.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-body">
                <Check
                  size={18}
                  aria-hidden="true"
                  strokeWidth={2.5}
                  className="mt-0.5 shrink-0 text-care-teal"
                />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-xl text-ink">{t("accessibilityGapsTitle")}</h2>
          <ul className="mt-5 space-y-3">
            {gaps.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-body">
                <CircleAlert
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-tan-ink"
                />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-xl text-ink">
            {t("accessibilityContactTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body">
            {t("accessibilityContactBody")}
          </p>
          <a
            href={`mailto:${defaultBrand.email}`}
            className="mt-4 inline-block font-semibold text-coral underline underline-offset-4 transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
          >
            {defaultBrand.email}
          </a>
        </div>
      </PageSection>
    </>
  );
}
