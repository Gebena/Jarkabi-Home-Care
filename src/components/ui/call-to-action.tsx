import { isRtlLocale, mirrorObjectPosition } from "@/lib/direction";
import { caregiverBackgrounds } from "@/lib/caregiver-assets";
import { ctaImage } from "@/lib/site-images";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

/**
 * Care Giver Home Page 01 mid-page banner ("Share Your Cares. Inspire Others."):
 * a full-bleed photograph under a dark wash with a serif headline and a solid
 * white button.
 */
export function CallToAction({ locale }: { locale: string }) {
  const t = useTranslations("cta");
  const rtl = isRtlLocale(locale);

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={ctaImage.src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        style={{
          objectPosition: rtl ? mirrorObjectPosition(ctaImage.position) : ctaImage.position,
        }}
        className={cn(
          "absolute inset-0 -z-20 object-cover",
          Boolean(ctaImage.flip) !== rtl && "scale-x-[-1]",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 bg-left bg-no-repeat opacity-40",
          rtl ? "bg-right" : "bg-left",
        )}
        style={{ backgroundImage: `url(${caregiverBackgrounds.ctaTexture})` }}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 from-plum from-25% via-plum/90 to-plum/20 to-85%",
          rtl ? "bg-gradient-to-l" : "bg-gradient-to-r",
        )}
      />

      <div className="mx-auto w-[min(1240px,calc(100%-2rem))] py-20 lg:py-24">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl text-white sm:text-3xl lg:text-[2.35rem]">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85">{t("body")}</p>

          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-block bg-white px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t("button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
