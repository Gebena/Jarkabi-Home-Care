import { getTranslations } from "next-intl/server";
import Link from "next/link";

type HeaderUtilityBarProps = {
  locale: string;
};

/** Master prompt §25 — utility bar with Refer a Client. */
export async function HeaderUtilityBar({ locale }: HeaderUtilityBarProps) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const base = `/${locale}`;

  return (
    <div className="hidden border-b border-line/60 bg-mist text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-body lg:block">
      <div className="mx-auto flex h-9 w-[min(1240px,calc(100%-2rem))] items-center justify-end gap-6">
        <Link href={`${base}/referrals`} className="transition-colors hover:text-tan-ink">
          {t("referrals")}
        </Link>
        <Link href={`${base}/faq`} className="transition-colors hover:text-tan-ink">
          {t("faq")}
        </Link>
        <Link href={`${base}/funding`} className="transition-colors hover:text-tan-ink">
          {t("funding")}
        </Link>
      </div>
    </div>
  );
}
