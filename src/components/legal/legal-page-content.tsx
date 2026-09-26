import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
import { defaultBrand } from "@/lib/brand";
import { getLegalPage } from "@/lib/cms";
import { LEGAL_PAGES, type LegalPageSlug } from "@/lib/legal-pages";
import { lexicalToParagraphs } from "@/lib/rich-text";
import { Check, CircleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";

type LegalPageContentProps = {
  locale: string;
  slug: LegalPageSlug;
};

export async function LegalPageContent({ locale, slug }: LegalPageContentProps) {
  const config = LEGAL_PAGES[slug];
  const t = await getTranslations({ locale, namespace: "legalPages" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const legal = await getLegalPage(config.cmsSlug, locale as Locale);

  const footerTitle = tFooter(config.footerKey);
  const title = legal?.title ? String(legal.title) : footerTitle;
  const cmsParagraphs = legal?.body ? lexicalToParagraphs(legal.body) : [];

  if (config.variant === "accessibility") {
    const done = t.raw("accessibilityDone") as string[];
    const gaps = t.raw("accessibilityGaps") as string[];

    return (
      <>
        <PageHero
          locale={locale}
          title={title}
          lead={t("accessibilityLead")}
          crumbLabel={footerTitle}
        />

        <PageSection>
          <div className="mx-auto max-w-3xl">
            {cmsParagraphs.length > 0 ? (
              cmsParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-body">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-base leading-relaxed text-body">{t("accessibilityIntro")}</p>
            )}

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

  const lead = t(`${config.i18nKey}Lead` as "privacyLead");
  const fallbackBody = t(`${config.i18nKey}Body` as "privacyBody");
  const paragraphs = cmsParagraphs.length > 0 ? cmsParagraphs : [fallbackBody];

  return (
    <>
      <PageHero locale={locale} title={title} lead={lead} crumbLabel={footerTitle} />

      <PageSection>
        <div className="mx-auto max-w-3xl space-y-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </PageSection>
    </>
  );
}
