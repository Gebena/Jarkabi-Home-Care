import { defaultBrand } from "@/lib/brand";
import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import Link from "next/link";

export async function CtaSection({ locale }: { locale: string }) {
  const t = await getTranslations("cta");
  const phoneDigits = defaultBrand.primaryPhone.replace(/\D/g, "");
  const hasPhone = phoneDigits.length > 3;

  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <h2>{t("title")}</h2>
          <p>{t("body")}</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light button-lg" href={`/${locale}/contact`}>
            {t("button")}
          </Link>
          {hasPhone ? (
            <a className="button button-outline-light button-lg" href={`tel:${phoneDigits}`}>
              <Phone size={16} aria-hidden="true" />
              {t("callButton")}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
