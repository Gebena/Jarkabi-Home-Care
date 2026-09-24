import type { BrandData, ProvinceData } from "@/lib/cms";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

type SiteFooterProps = {
  locale: string;
  brand: BrandData;
  provinces: ProvinceData[];
};

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PinterestIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.599-.299-1.484c0-1.391.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.805 1.481 1.805 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 01-.069.288l-.295 1.129c-.047.183-.157.223-.362.134-1.353-.629-2.198-2.601-2.198-4.214 0-3.428 2.492-6.574 7.177-6.574 3.769 0 6.697 2.686 6.697 6.275 0 3.743-2.36 6.752-5.641 6.752-1.101 0-2.135-.573-2.488-1.252l-.677 2.581c-.245.945-.907 2.128-1.35 2.848.999.308 2.058.474 3.158.474 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

export async function SiteFooter({ locale, brand, provinces }: SiteFooterProps) {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const base = `/${locale}`;
  const activeProvinces = provinces.filter((p) => p.status === "active");
  const phoneDigits = brand.primaryPhone.replace(/\D/g, "");

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{brand.agencyName}</p>
          <p className="footer-copy">{t("brandStatement")}</p>
          <div className="footer-social" aria-label={t("followUs")}>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <XIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <PinterestIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
          <Link className="button button-primary" href={`${base}/contact`} style={{ marginTop: "1.25rem" }}>
            {t("appointment")}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div>
          <p className="footer-label">{t("quickLinks")}</p>
          <ul className="footer-links">
            <li><Link href={`${base}/about`}>{nav("about")}</Link></li>
            <li><Link href={`${base}/services`}>{nav("services")}</Link></li>
            <li><Link href={`${base}/how-care-works`}>{nav("howCareWorks")}</Link></li>
            <li><Link href={`${base}/why-jarkabi`}>{nav("whyJarkabi")}</Link></li>
            <li><Link href={`${base}/referrals`}>{t("referrals")}</Link></li>
            <li><Link href={`${base}/careers`}>{nav("careers")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="footer-label">{nav("locations")}</p>
          <ul className="footer-links">
            {activeProvinces.map((province) => (
              <li key={province.slug}>
                <Link href={`${base}/locations/${province.slug}`}>
                  {province.name}
                </Link>
              </li>
            ))}
            <li><Link href={`${base}/locations`}>{nav("locations")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="footer-label">{t("contact")}</p>
          <ul className="footer-links">
            {phoneDigits.length > 3 ? (
              <li>
                <a href={`tel:${phoneDigits}`}>
                  <Phone size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.35rem" }} aria-hidden="true" />
                  {brand.primaryPhone}
                </a>
              </li>
            ) : null}
            <li>
              <a href={`mailto:${brand.email}`}>
                <Mail size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.35rem" }} aria-hidden="true" />
                {brand.email}
              </a>
            </li>
            <li>
              <span>
                <MapPin size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.35rem" }} aria-hidden="true" />
                {t("coverageNote")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <p className="footer-hours">{t("hours")}</p>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {brand.agencyName}. {t("rights")}</p>
        <ul className="footer-legal-links">
          <li><Link href={`${base}/legal/terms`}>{t("terms")}</Link></li>
          <li><Link href={`${base}/legal/privacy`}>{t("privacy")}</Link></li>
          <li><Link href={`${base}/contact`}>{nav("contact")}</Link></li>
        </ul>
      </div>
    </footer>
  );
}
