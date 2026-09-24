import { PageHero } from "@/components/layout/page-hero";
import type { Locale } from "@/i18n/routing";
import { getServices } from "@/lib/cms";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const services = await getServices(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Home care that adapts to your family"
        lead="Each service can be activated, edited and restricted by province and city from the admin dashboard."
      />
      <section className="section">
        <div className="container card-grid">
          {services.map((service) => (
            <article key={service.slug} className="service-card service-card--large">
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <Link href={`/${locale}/services/${service.slug}`} className="text-link">
                View service details
              </Link>
            </article>
          ))}
        </div>
        <div className="container specialty-links">
          <h2>Specialty care</h2>
          <ul className="city-list">
            <li><Link href={`/${locale}/services/nursing`}>Nursing</Link></li>
            <li><Link href={`/${locale}/services/dementia-care`}>Dementia Care</Link></li>
            <li><Link href={`/${locale}/services/post-hospital-care`}>Post-Hospital Care</Link></li>
            <li><Link href={`/${locale}/services/respite-care`}>Respite Care</Link></li>
            <li><Link href={`/${locale}/services/palliative-care`}>Palliative & Comfort Support</Link></li>
            <li><Link href={`/${locale}/caregivers`}>Our Caregivers</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
