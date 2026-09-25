import { ServiceDetailContactPanel } from "@/components/services/service-detail-contact-panel";
import { caregiverServiceDetailImages } from "@/lib/caregiver-assets";
import { getDemoServiceDetail } from "@/lib/caregiver-demo-fallbacks";
import Image from "next/image";

type ServiceDetailBodyProps = {
  locale: string;
  slug: string;
  title: string;
  contactLabel: string;
  contactPanelTitle: string;
};

/**
 * Care Giver service detail main column — hero image, tagline, two-column block,
 * bullet list, and contact panel matching `personal-care.html` and siblings.
 */
export function ServiceDetailBody({
  locale,
  slug,
  title,
  contactLabel,
  contactPanelTitle,
}: ServiceDetailBodyProps) {
  const demo = getDemoServiceDetail(slug);
  if (!demo) return null;

  const images = caregiverServiceDetailImages[slug];

  return (
    <article className="space-y-8 border-b border-line pb-10">
      {images?.hero ? (
        <div className="group relative aspect-[16/7] overflow-hidden">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 65vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-plum/35 via-transparent to-transparent"
          />
        </div>
      ) : null}

      <header>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
        <p className="mt-3 text-base font-medium text-tan-ink">{demo.tagline}</p>
      </header>

      {demo.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-body">
          {paragraph}
        </p>
      ))}

      {images?.inline ? (
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-start">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={images.inline}
              alt=""
              fill
              sizes="(max-width: 768px) 92vw, 28vw"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-display text-xl text-ink">{demo.inlineTitle}</h3>
            <p className="mt-4 text-base leading-relaxed text-body">{demo.inlineBody}</p>
          </div>
        </div>
      ) : null}

      <div>
        <h3 className="font-display text-xl text-ink">{demo.bulletsTitle}</h3>
        <ul className="mt-5 space-y-2.5 border-s-2 border-tan ps-5">
          {demo.bullets.map((bullet) => (
            <li key={bullet} className="text-sm leading-relaxed text-body">
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-xl text-ink">{demo.closingTitle}</h3>
        <p className="mt-4 text-base leading-relaxed text-body">{demo.closingBody}</p>
      </div>

      <ServiceDetailContactPanel
        locale={locale}
        prompt={demo.contactPrompt}
        title={contactPanelTitle}
        buttonLabel={contactLabel}
      />
    </article>
  );
}
