import { caregiverBackgrounds } from "@/lib/caregiver-assets";
import { careGiverServiceMenu } from "@/lib/service-menu";
import Link from "next/link";

type ServiceSidebarProps = {
  locale: string;
  activeSlug: string;
  contactLabel: string;
  /** Care Giver demo labels keyed by slug. */
  itemLabels: Record<string, string>;
};

/**
 * Care Giver service detail sidebar — always lists all 11 demo care types in
 * menu order, each linking to its own dedicated slug.
 */
export function ServiceSidebar({
  locale,
  activeSlug,
  contactLabel,
  itemLabels,
}: ServiceSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <nav aria-label="Care services">
        <ul className="border border-line bg-white">
          {careGiverServiceMenu.map((item) => {
            const active = item.slug === activeSlug;
            const label = itemLabels[item.slug] ?? item.key;
            return (
              <li key={item.slug} className="border-b border-line last:border-b-0">
                <Link
                  href={`/${locale}/services/${item.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`block px-5 py-3.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-plum ${
                    active
                      ? "bg-plum font-semibold text-white"
                      : "text-ink hover:bg-mist hover:text-plum"
                  }`}
                >
                  {label}
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
