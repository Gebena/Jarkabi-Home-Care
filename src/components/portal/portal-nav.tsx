"use client";

import type { PortalArea } from "@/lib/portal/roles";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const areaLabels: Record<PortalArea, string> = {
  client: "Client / Family",
  caregiver: "Caregiver",
  clinical: "Clinical",
  ops: "Operations",
};

const areaLinks: Record<PortalArea, { href: string; label: string }[]> = {
  client: [
    { href: "", label: "Dashboard" },
    { href: "/schedule", label: "Schedule" },
    { href: "/care-plan", label: "Care plan" },
    { href: "/messages", label: "Messages" },
  ],
  caregiver: [
    { href: "", label: "Today" },
    { href: "/schedule", label: "Schedule" },
    { href: "/timesheets", label: "Timesheets" },
  ],
  clinical: [
    { href: "", label: "Overview" },
    { href: "/care-plans", label: "Care plans" },
    { href: "/assessments", label: "Assessments" },
  ],
  ops: [
    { href: "", label: "Dashboard" },
    { href: "/clients", label: "Clients" },
    { href: "/scheduling", label: "Scheduling" },
    { href: "/audit", label: "Audit log" },
  ],
};

type PortalNavProps = {
  locale: string;
  areas: PortalArea[];
};

export function PortalNav({ locale, areas }: PortalNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Portal navigation"
      className="border-t border-line bg-plum text-white"
    >
      <div className="mx-auto flex w-[min(1240px,calc(100%-2rem))] flex-wrap gap-1 py-2">
        {areas.map((area) => {
          const base = `/${locale}/portal/${area}`;
          const links = areaLinks[area];

          return (
            <div key={area} className="flex flex-wrap items-center gap-1 pe-4">
              <span className="px-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/70">
                {areaLabels[area]}
              </span>
              {links.map((link) => {
                const href = `${base}${link.href}`;
                const active = pathname === href || (link.href !== "" && pathname.startsWith(href));

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      active ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          );
        })}
        <form action={`/api/auth/signout?locale=${locale}`} method="post" className="ms-auto">
          <button
            type="submit"
            className="px-3 py-1.5 text-sm text-white/85 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Sign out
          </button>
        </form>
      </div>
    </nav>
  );
}
