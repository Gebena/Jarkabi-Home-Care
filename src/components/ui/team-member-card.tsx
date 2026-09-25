"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type TeamMemberCardProps = {
  name: string;
  role: string;
  photo: string;
  profileHref?: string;
  className?: string;
};

function SocialIcon({ name }: { name: "facebook" | "linkedin" | "twitter" | "skype" }) {
  const paths: Record<typeof name, string> = {
    facebook:
      "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-12h4v2M2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
    twitter: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    skype:
      "M16.5 8.5a4.5 4.5 0 00-7.9-2.7 3.5 3.5 0 00-5 3.2 4.5 4.5 0 002.7 7.9 3.5 3.5 0 005-3.2 4.5 4.5 0 00-2.7-5.2z",
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.75]">
      <path d={paths[name]} />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", name: "facebook" as const, href: "#" },
  { label: "LinkedIn", name: "linkedin" as const, href: "#" },
  { label: "Twitter", name: "twitter" as const, href: "#" },
  { label: "Skype", name: "skype" as const, href: "#" },
];

/**
 * Care Giver `team-block` — portrait with a plum overlay and social icons that
 * rise on hover, plus a white name card beneath the photo.
 */
export function TeamMemberCard({ name, role, photo, profileHref, className }: TeamMemberCardProps) {
  const nameEl = profileHref ? (
    <Link
      href={profileHref}
      className="font-display text-[1.375rem] font-bold text-demo-navy transition-colors hover:text-demo-tan-line"
    >
      {name}
    </Link>
  ) : (
    <p className="font-display text-[1.375rem] font-bold text-demo-navy">{name}</p>
  );

  return (
    <article className={cn("group", className)}>
      <div className="relative overflow-hidden">
        <div className="relative aspect-[3/4]">
          <Image
            src={photo}
            alt=""
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 18vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[var(--cg-demo-team-overlay)] opacity-0 transition-opacity duration-600 group-hover:opacity-100"
        />

        <ul className="absolute inset-x-0 bottom-0 z-10 flex translate-y-14 justify-center gap-4 pb-12 opacity-0 transition-all duration-600 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
          {socialLinks.map(({ label, name: iconName, href }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={`${name} on ${label}`}
                className="grid h-9 w-9 place-items-center text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <SocialIcon name={iconName} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white px-4 py-4 text-center shadow-[0_0_20px_rgba(0,0,0,0.10)]">
        {nameEl}
        <p className="mt-1 text-base text-demo-muted">{role}</p>
      </div>
    </article>
  );
}
