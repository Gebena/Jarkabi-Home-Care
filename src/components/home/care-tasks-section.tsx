import {
  CalendarClock,
  ClipboardCheck,
  HeartHandshake,
  Languages,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/components/ui/section-title";

const taskIcons = [
  HeartHandshake,
  ClipboardCheck,
  Languages,
  CalendarClock,
  Stethoscope,
  ShieldCheck,
];

/**
 * Care Giver Home Page 01 "What is Home Care" band: a centred serif heading over
 * outlined boxes with line icons describing what care actually covers.
 */
export function CareTasksSection() {
  const t = useTranslations("features");

  const tasks = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`item${n}Title`),
    body: t(`item${n}Desc`),
    Icon: taskIcons[n - 1],
  }));

  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle align="center" title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map(({ title, body, Icon }) => (
            <li key={title} className="border border-line bg-white p-7">
              <span className="grid h-12 w-12 place-items-center border border-tan text-tan-ink">
                <Icon size={22} aria-hidden="true" />
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
