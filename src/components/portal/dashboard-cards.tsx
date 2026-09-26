import { cn } from "@/lib/utils";

type StatCard = {
  label: string;
  value: string;
  hint?: string;
};

type DashboardCardsProps = {
  cards: StatCard[];
};

export function DashboardCards({ cards }: DashboardCardsProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <li
          key={card.label}
          className={cn("border border-line bg-white p-5")}
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-body">
            {card.label}
          </p>
          <p className="mt-2 font-display text-2xl text-ink">{card.value}</p>
          {card.hint ? <p className="mt-2 text-sm text-body">{card.hint}</p> : null}
        </li>
      ))}
    </ul>
  );
}
