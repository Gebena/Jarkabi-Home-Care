import type { TeamMemberData } from "@/lib/cms";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

type TeamSectionProps = {
  locale: string;
  members: TeamMemberData[];
};

/**
 * Care Giver Home Page 01 team grid: portrait photographs each capped by a solid
 * blue name bar.
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
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {members.slice(0, 4).map((member) => (
              <li key={member.name} className="overflow-hidden">
                {/* A stock face over a real colleague's name would misrepresent
                    them, so unphotographed members get a monogram instead. */}
                <div
                  aria-hidden="true"
                  className="grid aspect-[3/4] place-items-center bg-blush-soft font-display text-5xl text-plum"
                >
                  {initials(member.name)}
                </div>
                <div className="bg-care-ocean px-5 py-4 text-center">
                  <p className="font-display text-lg text-white">{member.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-white/80">
                    {member.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/about`}
            className="inline-block border border-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-tan-ink transition-colors hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
