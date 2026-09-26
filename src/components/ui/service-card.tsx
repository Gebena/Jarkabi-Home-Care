import { serviceFallbackImage, serviceImages } from "@/lib/site-images";
import { serviceIcons } from "@/lib/services-config";
import type { ServiceData } from "@/lib/cms";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  locale: string;
  service: ServiceData;
  ctaLabel: string;
};

/**
 * Care Giver service card: a square photograph, a serif title beneath it and a
 * short summary. The category icon sits over the corner of the image.
 */
export function ServiceCard({ locale, service, ctaLabel }: ServiceCardProps) {
  const Icon = serviceIcons[service.slug];
  const image = serviceImages[service.slug] ?? serviceFallbackImage;

  return (
    <article className="group flex h-full flex-col bg-white">
      <Link
        href={`/${locale}/services/${service.slug}`}
        className="relative block aspect-square overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {Icon ? (
          <span className="absolute bottom-0 left-0 grid h-12 w-12 place-items-center bg-tan text-plum">
            <Icon size={20} aria-hidden="true" />
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-lg">
          <Link
            href={`/${locale}/services/${service.slug}`}
            className="transition-colors hover:text-tan-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
          >
            {service.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{service.summary}</p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral">
          {ctaLabel}
          <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
