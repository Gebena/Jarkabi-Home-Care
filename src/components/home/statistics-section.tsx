import { useTranslations } from "next-intl";

/**
 * Counter strip on deep plum — Care Giver uses a flat dark band between the
 * photographic sections to reset the eye.
 *
 * Care Giver fills it with achievement counts (families served, satisfaction
 * rate). Jarkabi has not launched, so these are commitments the business can
 * actually stand behind rather than numbers nobody can verify.
 */
export function StatisticsSection() {
  const t = useTranslations("stats");

  const stats = [
    { value: t("commitment1Value"), label: t("commitment1Label") },
    { value: t("commitment2Value"), label: t("commitment2Label") },
    { value: t("commitment3Value"), label: t("commitment3Label") },
    { value: t("commitment4Value"), label: t("commitment4Label") },
  ];

  return (
    <section className="bg-plum-deep py-14">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <h2 className="mx-auto max-w-3xl text-center font-display text-xl text-white lg:text-2xl">
          {t("title")}
        </h2>

        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl text-tan">{stat.value}</span>
                <span className="mt-2 block text-sm text-white/75">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
