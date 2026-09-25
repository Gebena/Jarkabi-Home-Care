import { BadgeCheck, Clock, MapPin, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Narrow reassurance strip. Care Giver runs a similar accreditation band directly
 * above the footer.
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
    <section className="border-y border-line bg-white py-8">
      <ul className="mx-auto grid w-[min(1240px,calc(100%-2rem))] gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, label }) => (
          <li key={label} className="flex items-center justify-center gap-3 text-center">
            <Icon size={20} aria-hidden="true" className="shrink-0 text-tan-ink" />
            <span className="text-sm font-semibold text-ink">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
