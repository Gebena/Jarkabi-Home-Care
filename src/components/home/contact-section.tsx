import type { BrandData } from "@/lib/cms";
import { hasRealAddress, telHref } from "@/lib/brand-nap";
import { caregiverBackgrounds } from "@/lib/caregiver-assets";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type ContactSectionProps = {
  locale: string;
  brand: BrandData;
};

/**
 * Care Giver footer contact band — plum panel with pattern texture and contact grid.
 */
export function ContactSection({ locale, brand }: ContactSectionProps) {
  const t = useTranslations("contactCta");
  const tFooter = useTranslations("footer");
  const phoneLink = telHref(brand.primaryPhone);
  const locationValue = hasRealAddress(brand.ottawaOfficeAddress)
    ? brand.ottawaOfficeAddress
    : t("locationValue");

  const rows = [
    { Icon: MapPin, label: t("locationLabel"), value: locationValue },
    {
      Icon: Phone,
      label: t("phoneLabel"),
      value: phoneLink ? brand.primaryPhone : t("phonePlaceholder"),
      href: phoneLink ?? undefined,
    },
    { Icon: Mail, label: t("emailLabel"), value: brand.email, href: `mailto:${brand.email}` },
    { Icon: Clock, label: tFooter("hoursLabel"), value: brand.businessHours },
  ];

  return (
    <section className="relative overflow-hidden bg-plum py-16 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url(${caregiverBackgrounds.panelPattern})`,
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative mx-auto grid w-[min(1240px,calc(100%-2rem))] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
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

        <dl className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-2">
          {rows.map(({ Icon, label, value, href }) => (
            <div key={label} className="bg-plum/80 p-6 backdrop-blur-[1px]">
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
