import { useTranslations } from "next-intl";
import Link from "next/link";

/** Short homepage band linking to the full funding page. */
export function FundingTeaser({ locale }: { locale: string }) {
  const t = useTranslations("homeFundingTeaser");

  return (
    <section className="border-y border-line bg-mist py-14 lg:py-16">
      <div className="mx-auto grid w-[min(1240px,calc(100%-2rem))] gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-tan-ink">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl">{t("title")}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">{t("body")}</p>
        </div>
        <Link
          href={`/${locale}/funding`}
          className="justify-self-start border border-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-tan-ink transition-colors hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink lg:justify-self-end"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
