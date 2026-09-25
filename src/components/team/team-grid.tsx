import type { TeamMemberData } from "@/lib/cms";
import { TeamMemberCard } from "@/components/ui/team-member-card";

type TeamGridProps = {
  members: TeamMemberData[];
};

/** Full team page — Care Giver `team.html` grid with hover social overlay. */
export function TeamGrid({ members }: TeamGridProps) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <li key={member.name}>
          <TeamMemberCard name={member.name} role={member.role} photo={member.photo!} />
        </li>
      ))}
    </ul>
  );
}
