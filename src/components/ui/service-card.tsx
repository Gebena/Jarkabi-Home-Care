import { serviceFallbackImage, serviceImages } from "@/lib/site-images";
import type { ServiceData } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  locale: string;
  service: ServiceData;
  ctaLabel: string;
};

/**
 * Care Giver `service-block-two` — square photo, tan sweep on hover, navy title.
 */
export function ServiceCard({ locale, service, ctaLabel: _ctaLabel }: ServiceCardProps) {
  const image = serviceImages[service.slug] ?? serviceFallbackImage;

  return (
    <article className="group flex h-full flex-col bg-white">
      <Link
        href={`/${locale}/services/${service.slug}`}
        className="relative block aspect-square overflow-hidden bg-demo-plum-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-demo-navy"
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
          className="object-cover transition-all duration-300 group-hover:opacity-40"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-100%] top-1/2 h-5 w-full -translate-y-1/2 bg-demo-tan-line transition-all duration-600 group-hover:left-full group-hover:delay-300"
        />
      </Link>

      <div className="pt-6">
        <h3 className="font-display text-[1.4375rem] font-bold leading-snug">
          <Link
            href={`/${locale}/services/${service.slug}`}
            className="text-demo-navy transition-colors hover:text-demo-plum-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-demo-navy"
          >
            {service.title}
          </Link>
        </h3>
        <p className="mt-2.5 text-base leading-relaxed text-demo-muted">{service.summary}</p>
      </div>
    </article>
  );
}
