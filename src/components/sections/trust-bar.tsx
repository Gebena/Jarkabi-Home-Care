import { getTranslations } from "next-intl/server";
import {
  Calendar,
  Globe,
  HeartHandshake,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";

/** Trust indicators — spec §26 */
export async function TrustBar() {
  const t = await getTranslations("trust");

  const items = [
    { icon: HeartHandshake, label: t("personalizedPlans") },
    { icon: Users, label: t("selectedCaregivers") },
    { icon: Calendar, label: t("flexibleScheduling") },
    { icon: Users, label: t("familyCentred") },
    { icon: Stethoscope, label: t("clinicalOversight") },
    { icon: Globe, label: t("culturallyResponsive") },
    { icon: Shield, label: t("responsiveSupport") },
  ];

  return (
    <section className="trust-bar" aria-label="Why families trust Jarkabi">
      <div className="container trust-grid trust-grid--wrap">
        {items.map((item) => (
          <div key={item.label} className="trust-item">
            <item.icon size={18} aria-hidden="true" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
