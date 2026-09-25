import { CareRequestForm } from "@/components/forms/care-request-form";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { getBrand } from "@/lib/cms";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const details = [
    { icon: Mail, label: t("emailLabel"), value: brand.email, href: `mailto:${brand.email}` },
    { icon: Phone, label: t("phoneLabel"), value: brand.primaryPhone },
    { icon: MapPin, label: t("officeLabel"), value: brand.ottawaOfficeAddress },
    { icon: Clock, label: t("hoursLabel"), value: brand.businessHours },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("eyebrow")}
      />

      <PageSection>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="border border-line p-7">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center bg-blush-soft text-tan-ink"
              >
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <h2 className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-tan-ink">
                {label}
              </h2>
              {href ? (
                <a
                  href={href}
                  className="mt-2 block text-base break-words text-ink transition-colors hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-2 text-base break-words text-ink">{value}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionTitle title={t("sidebarTitle")} />
            <ol className="mt-8 space-y-6">
              {(t.raw("expectations") as string[]).map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-xl text-tan-ink"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-body">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 id="general-contact" className="font-display text-xl text-ink">
              {t("contactFormTitle")}
            </h2>
            <div className="mt-6">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection tone="mist" id="request-care">
        <SectionTitle
          align="center"
          title={t("requestCareTitle")}
          subtitle={t("requestCareLead")}
        />
        <div className="mx-auto mt-10 max-w-4xl bg-white p-8 lg:p-10">
          <CareRequestForm locale={locale} />
        </div>
      </PageSection>
    </>
  );
}
