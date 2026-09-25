import { caregiverServiceDetailImages } from "@/lib/caregiver-assets";
import { getDemoServiceDetail } from "@/lib/caregiver-demo-fallbacks";
import Image from "next/image";
import Link from "next/link";

type ServiceDetailBodyProps = {
  locale: string;
  slug: string;
  title: string;
  contactLabel: string;
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
}: ServiceDetailBodyProps) {
  const demo = getDemoServiceDetail(slug);
  if (!demo) return null;

  const images = caregiverServiceDetailImages[slug];

  return (
    <article className="space-y-8 border-b border-line pb-10">
      {images?.hero ? (
        <div className="relative aspect-[16/7] overflow-hidden">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 65vw"
            className="object-cover"
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

      <div className="border border-line bg-mist px-6 py-8 text-center">
        <p className="text-base leading-relaxed text-ink">
          {demo.contactPrompt}
          <br />
          <Link
            href={`/${locale}/contact`}
            className="mt-3 inline-block font-display text-lg text-plum underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
          >
            {contactLabel}
          </Link>
        </p>
      </div>
    </article>
  );
}
