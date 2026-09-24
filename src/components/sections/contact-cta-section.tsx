import type { BrandData } from "@/lib/cms";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { HomeContactForm } from "./home-contact-form";

type ContactCtaSectionProps = {
  locale: string;
  brand: BrandData;
};

export async function ContactCtaSection({ locale, brand }: ContactCtaSectionProps) {
  const t = await getTranslations("contactCta");
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");

  return (
    <section className="contact-cta-section" id="consultation">
      <div className="container">
        <ScrollReveal>
          <div className="contact-cta-grid">
            <div className="contact-info-card">
              <p className="eyebrow eyebrow--light">{t("eyebrow")}</p>
              <h2>{t("title")}</h2>
              <div className="contact-detail">
                <div className="contact-detail-icon" aria-hidden="true">
                  <Phone size={18} />
                </div>
                <div>
                  <strong>{t("phoneLabel")}</strong>
                  {phoneDigits.length > 3 ? (
                    <>
                      <a href={`tel:${phoneDigits}`}>{brand.primaryPhone}</a>
                      {brand.tollFreePhone && brand.tollFreePhone !== "[TOLL-FREE PHONE]" ? (
                        <a href={`tel:${brand.tollFreePhone.replace(/\D/g, "")}`}>{brand.tollFreePhone}</a>
                      ) : null}
                    </>
                  ) : (
                    <span>{t("phonePlaceholder")}</span>
                  )}
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon" aria-hidden="true">
                  <Mail size={18} />
                </div>
                <div>
                  <strong>{t("emailLabel")}</strong>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                  <a href={`mailto:info@jarkabi.ca`}>info@jarkabi.ca</a>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon" aria-hidden="true">
                  <MapPin size={18} />
                </div>
                <div>
                  <strong>{t("locationLabel")}</strong>
                  <span>{t("locationValue")}</span>
                </div>
              </div>
            </div>
            <div className="contact-form-card">
              <h3>{t("formTitle")}</h3>
              <p>{t("formSubtitle")}</p>
              <HomeContactForm locale={locale} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
