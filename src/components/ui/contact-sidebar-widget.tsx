import { caregiverContactWidgetImage } from "@/lib/caregiver-assets";
import Link from "next/link";

type ContactSidebarWidgetProps = {
  locale: string;
  title: string;
  buttonLabel: string;
};

/**
 * Care Giver sidebar contact widget — teal wash over licensed photography,
 * gold CTA button. Used on FAQ, blog, and service detail pages.
 */
export function ContactSidebarWidget({ locale, title, buttonLabel }: ContactSidebarWidgetProps) {
  return (
    <div
      className="relative overflow-hidden px-7 py-12 text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(50,159,130,0.92), rgba(50,159,130,0.92)), url(${caregiverContactWidgetImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3 className="relative font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
        {title}
      </h3>
      <Link
        href={`/${locale}/contact`}
        className="relative mt-6 inline-block bg-demo-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#242424] transition-colors hover:bg-demo-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
