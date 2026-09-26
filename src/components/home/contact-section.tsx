import { isBrandPlaceholder, isDisplayablePhone } from "@/lib/brand";
import type { BrandData } from "@/lib/cms";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type ContactSectionProps = {
  locale: string;
  brand: BrandData;
};

/**
 * Sits where Care Giver Home Page 01 embeds a Google map above the footer. A
 * static service-area and contact band avoids a third-party script and an API
 * key while serving the same "where are you, how do I reach you" purpose.
 */
export function ContactSection({ locale, brand }: ContactSectionProps) {
  const t = useTranslations("contactCta");
  const tFooter = useTranslations("footer");
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");
  const showPhone = isDisplayablePhone(brand.primaryPhone);
  const showAddress = !isBrandPlaceholder(brand.ottawaOfficeAddress);

  const rows = [
    ...(showAddress
      ? [{ Icon: MapPin, label: t("locationLabel"), value: brand.ottawaOfficeAddress }]
      : []),
    ...(showPhone
      ? [
          {
            Icon: Phone,
            label: t("phoneLabel"),
            value: brand.primaryPhone,
            href: `tel:${phoneDigits}`,
          },
        ]
      : []),
    { Icon: Mail, label: t("emailLabel"), value: brand.email, href: `mailto:${brand.email}` },
    { Icon: Clock, label: tFooter("hoursLabel"), value: brand.businessHours },
  ];

  return (
    <section className="bg-plum py-16 lg:py-20">
      <div className="mx-auto grid w-[min(1240px,calc(100%-2rem))] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 className="font-display text-2xl text-white sm:text-3xl lg:text-[2.35rem]">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
            {t("formSubtitle")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-block bg-tan px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t("submit")}
          </Link>
        </div>

        <dl className="grid gap-px overflow-hidden bg-white/15 sm:grid-cols-2">
          {rows.map(({ Icon, label, value, href }) => (
            <div key={label} className="bg-plum p-6">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-tan">
                <Icon size={15} aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/85">
                {href ? (
                  <a href={href} className="transition-colors hover:text-tan">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
