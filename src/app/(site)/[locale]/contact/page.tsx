import { CareRequestForm } from "@/components/forms/care-request-form";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactSection } from "@/components/home/contact-section";
import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { getBrand } from "@/lib/cms";
import { hasRealAddress, telHref } from "@/lib/brand-nap";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { contactPageImage } from "@/lib/site-images";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    description: t("lead"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const brand = await getBrand(locale as Locale);
  const tCta = await getTranslations({ locale, namespace: "contactCta" });
  const phoneLink = telHref(brand.primaryPhone);
  const officeAddress = hasRealAddress(brand.ottawaOfficeAddress)
    ? brand.ottawaOfficeAddress
    : tCta("locationValue");

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("eyebrow")}
      />

      {/* Care Giver contact-form-section: centred title, form left, office right */}
      <PageSection>
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle align="center" title={t("getInTouchTitle")} subtitle={t("formIntro")} />
          <p className="mt-4 text-sm text-body">{t("requiredNote")}</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ContactForm locale={locale} />
          </div>

          <div className="relative overflow-hidden bg-plum px-6 py-8 text-white sm:px-8 sm:py-10">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={contactPageImage.src}
                alt={contactPageImage.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 45vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-plum/25" />
            </div>

            <h2 className="mt-8 font-display text-xl text-white">{t("officeTitle")}</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-white/85">
              {officeAddress}
            </p>

            <ul className="mt-6 space-y-2 text-base text-white/90">
              <li>
                {t("phoneLabel")}:{" "}
                {phoneLink ? (
                  <a
                    href={phoneLink}
                    className="text-white transition-colors hover:text-tan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {brand.primaryPhone}
                  </a>
                ) : (
                  tCta("phonePlaceholder")
                )}
              </li>
              <li>
                {t("emailLabel")}:{" "}
                <a
                  href={`mailto:${brand.email}`}
                  className="text-white transition-colors hover:text-tan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                {t("hoursLabel")}: {brand.businessHours}
              </li>
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection tone="mist" id="request-care">
        <SectionTitle
          align="center"
          title={t("requestCareTitle")}
          subtitle={t("requestCareLead")}
        />
        <div className="mx-auto mt-10 max-w-4xl border border-line bg-white p-8 lg:p-10">
          <CareRequestForm locale={locale} />
        </div>
      </PageSection>

      <ContactSection locale={locale} brand={brand} />
    </>
  );
}
