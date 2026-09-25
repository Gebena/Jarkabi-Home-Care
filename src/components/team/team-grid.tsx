import type { TeamMemberData } from "@/lib/cms";
import Image from "next/image";

type TeamGridProps = {
  members: TeamMemberData[];
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Care Giver `team.html` — portrait grid with ocean name bar.
 */
export function TeamGrid({ members }: TeamGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <li key={member.name} className="overflow-hidden">
          {member.photo ? (
            <div className="relative aspect-[3/4]">
              <Image
                src={member.photo}
                alt=""
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 18vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="grid aspect-[3/4] place-items-center bg-blush-soft font-display text-5xl text-plum"
            >
              {initials(member.name)}
            </div>
          )}
          <div className="bg-care-ocean px-5 py-4 text-center">
            <p className="font-display text-lg text-white">{member.name}</p>
            <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-white/80">
              {member.role}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
