import { caregiverTaskIcons } from "@/lib/caregiver-assets";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";

/**
 * Care Giver Home Page 01 "What is Home Care" band: a centred serif heading over
 * outlined boxes with licensed Flaticon line icons describing what care covers.
 */
export function CareTasksSection() {
  const t = useTranslations("features");

  const tasks = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`item${n}Title`),
    body: t(`item${n}Desc`),
    icon: caregiverTaskIcons[n - 1],
  }));

  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle align="center" title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map(({ title, body, icon }) => (
            <li key={title} className="border border-line bg-white p-7">
              <span className="grid h-12 w-12 place-items-center border border-tan text-tan-ink">
                <Image src={icon} alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
