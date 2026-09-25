import { caregiverTaskIcons } from "@/lib/caregiver-assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";

/**
 * Care Giver `services-section-three` / `service-block-three` — white cards with
 * a left tan rule that fills on hover, icon + title turning white.
 */
export function CareTasksSection() {
  const t = useTranslations("features");

  const tasks = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`item${n}Title`),
    icon: caregiverTaskIcons[n - 1],
  }));

  return (
    <section className="bg-demo-sidebar-bg py-16 lg:py-[5.625rem]">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle align="center" title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map(({ title, icon }) => (
            <li
              key={title}
              className="group relative min-h-[9.25rem] overflow-hidden bg-white shadow-[0_0_25px_rgba(0,0,0,0.10)]"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-[3px] bg-demo-tan-line transition-all duration-700 group-hover:w-full"
              />
              <div className="relative flex min-h-[9.25rem] items-center gap-6 px-8 py-8">
                <span className="shrink-0 text-demo-icon-blue transition-colors duration-600 group-hover:text-white">
                  <Image src={icon} alt="" aria-hidden="true" width={56} height={56} className="h-14 w-14" />
                </span>
                <h3 className="font-display text-lg font-bold leading-snug text-demo-navy transition-colors duration-600 group-hover:text-white">
                  {title}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
