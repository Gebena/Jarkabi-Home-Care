import type { ServiceData } from "@/lib/cms";
import { caregiverBackgrounds } from "@/lib/caregiver-assets";
import Link from "next/link";

type ServiceSidebarProps = {
  locale: string;
  services: ServiceData[];
  activeSlug: string;
  contactLabel: string;
};

/**
 * Care Giver service detail sidebar: a vertical list of care types plus a plum
 * "Find care today" panel with a background texture.
 */
export function ServiceSidebar({
  locale,
  services,
  activeSlug,
  contactLabel,
}: ServiceSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <nav aria-label="Care services">
        <ul className="border border-line bg-white">
          {services.map((service) => {
            const active = service.slug === activeSlug;
            return (
              <li key={service.slug} className="border-b border-line last:border-b-0">
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`block px-5 py-3.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-plum ${
                    active
                      ? "bg-plum font-semibold text-white"
                      : "text-ink hover:bg-mist hover:text-plum"
                  }`}
                >
                  {service.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className="relative overflow-hidden bg-plum px-6 py-10 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(91,46,66,0.92), rgba(91,46,66,0.92)), url(${caregiverBackgrounds.ctaTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3 className="font-display text-xl text-white">Find care today</h3>
        <Link
          href={`/${locale}/contact`}
          className="mt-6 inline-block border border-white/70 px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {contactLabel}
        </Link>
      </div>
    </aside>
  );
}
