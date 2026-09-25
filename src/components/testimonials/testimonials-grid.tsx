import type { TestimonialData } from "@/lib/cms";
import { Star } from "lucide-react";
import Image from "next/image";

type TestimonialsGridProps = {
  testimonials: TestimonialData[];
};

/**
 * Care Giver `testimonial.html` — full-page two-column testimonial cards.
 */
export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <ul className="grid gap-10 lg:grid-cols-2">
      {testimonials.map((item) => (
        <li key={`${item.attribution}-${item.quote.slice(0, 24)}`}>
          <figure>
            <blockquote className="relative bg-white p-8 text-sm leading-relaxed text-body">
              {item.quote}
              <span
                aria-hidden="true"
                className="absolute -bottom-3 start-10 h-0 w-0 border-s-[14px] border-t-[14px] border-s-transparent border-t-white"
              />
            </blockquote>

            <figcaption className="mt-7 flex items-center gap-4 px-2">
              {item.photo ? (
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image src={item.photo} alt="" fill sizes="48px" className="object-cover" />
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-plum font-display text-lg text-white"
                >
                  {item.attribution.trim().charAt(0).toUpperCase()}
                </span>
              )}
              <span>
                <span className="block font-display text-base text-plum">{item.attribution}</span>
                <span className="block text-xs text-plum/75">{item.relation}</span>
              </span>
              <span className="ms-auto flex gap-0.5" aria-label="Rated 5 out of 5">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    size={13}
                    aria-hidden="true"
                    className="fill-current text-plum"
                  />
                ))}
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
