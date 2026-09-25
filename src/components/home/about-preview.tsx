import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Care Giver Home Page 01 intro band: a light-mist strip with a centred serif
 * heading, an italic serif standfirst and a smaller supporting paragraph.
 */
export function AboutPreview({ locale }: { locale: string }) {
  const t = useTranslations("intro");

  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))] text-center">
        <h2 className="mx-auto max-w-3xl font-display text-2xl sm:text-3xl lg:text-[2.35rem]">
          {t("headline")}
        </h2>

        <p className="mx-auto mt-5 max-w-3xl font-display text-lg italic leading-relaxed text-ink-soft lg:text-xl">
          {t("body")}
        </p>

        <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-body">
          {[t("check1"), t("check2"), t("check3"), t("check4")].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check size={15} aria-hidden="true" className="shrink-0 text-tan-ink" />
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={`/${locale}/about`}
          className="mt-8 inline-block border border-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-tan-ink transition-colors hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
