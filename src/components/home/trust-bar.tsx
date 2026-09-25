import { BadgeCheck, Clock, MapPin, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Care Giver accreditation strip above the footer — mist band with icon badges.
 */
export function TrustBar() {
  const t = useTranslations("trust");

  const items = [
    { Icon: BadgeCheck, label: t("licensed") },
    { Icon: ShieldCheck, label: t("insured") },
    { Icon: MapPin, label: t("local") },
    { Icon: Clock, label: t("support") },
  ];

  return (
    <section className="border-y border-line bg-mist py-10 lg:py-12">
      <ul className="mx-auto grid w-[min(1240px,calc(100%-2rem))] gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, label }) => (
          <li key={label} className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center border border-line bg-white text-tan-ink">
              <Icon size={22} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold leading-snug text-ink">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
