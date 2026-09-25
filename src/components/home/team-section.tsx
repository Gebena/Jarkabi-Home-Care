import type { TeamMemberData } from "@/lib/cms";
import { TeamMemberCard } from "@/components/ui/team-member-card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";

type TeamSectionProps = {
  locale: string;
  members: TeamMemberData[];
};

/**
 * Care Giver Home Page 01 team grid with licensed portraits and social hover overlay.
 */
export function TeamSection({ locale, members }: TeamSectionProps) {
  const t = useTranslations("team");

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle align="center" title={t("title")} subtitle={t("subtitle")} />

        {members.length === 0 ? (
          <p className="mx-auto mt-10 max-w-xl border border-line bg-mist p-6 text-center text-sm leading-relaxed text-body">
            {t("placeholder")}
          </p>
        ) : (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.slice(0, 4).map((member) => (
              <li key={member.name}>
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  photo={member.photo!}
                  profileHref={`/${locale}/team`}
                />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/team`}
            className="inline-block border border-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-tan-ink transition-colors hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
