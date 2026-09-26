import { Briefcase, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

/** Dual entry band for professional referrals and careers. */
export function ReferralCareersBand({ locale }: { locale: string }) {
  const tReferrals = useTranslations("homeReferralsTeaser");
  const tCareers = useTranslations("careersCta");

  const cards = [
    {
      Icon: UserPlus,
      title: tReferrals("title"),
      body: tReferrals("body"),
      href: `/${locale}/referrals`,
      cta: tReferrals("cta"),
    },
    {
      Icon: Briefcase,
      title: tCareers("title"),
      body: tCareers("body"),
      href: `/${locale}/careers`,
      cta: tCareers("cta"),
    },
  ];

  return (
    <section className="bg-plum py-16 lg:py-20">
      <div className="mx-auto grid w-[min(1240px,calc(100%-2rem))] gap-8 md:grid-cols-2">
        {cards.map(({ Icon, title, body, href, cta }) => (
          <article key={href} className="border border-white/15 p-8 lg:p-10">
            <span
              aria-hidden="true"
              className="grid h-11 w-11 place-items-center bg-white/10 text-tan"
            >
              <Icon size={22} strokeWidth={1.5} />
            </span>
            <h2 className="mt-6 font-display text-xl text-white sm:text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{body}</p>
            <Link
              href={href}
              className="mt-6 inline-block bg-tan px-7 py-3.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
