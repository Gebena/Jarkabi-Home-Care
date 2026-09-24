"use client";

import type { ProvinceData } from "@/lib/cms";
import { useRouter } from "next/navigation";

const provincesGeo: Array<{ slug: string; name: string; d: string; labelX: number; labelY: number }> = [
  { slug: "british-columbia", name: "BC", d: "M40,180 L20,200 L30,260 L80,250 L90,200 Z", labelX: 55, labelY: 225 },
  { slug: "alberta", name: "AB", d: "M90,200 L130,195 L140,260 L80,250 Z", labelX: 110, labelY: 230 },
  { slug: "saskatchewan", name: "SK", d: "M130,195 L175,190 L180,260 L140,260 Z", labelX: 155, labelY: 230 },
  { slug: "manitoba", name: "MB", d: "M175,190 L210,185 L215,260 L180,260 Z", labelX: 195, labelY: 230 },
  { slug: "ontario", name: "ON", d: "M210,185 L280,175 L290,250 L215,260 Z", labelX: 250, labelY: 220 },
  { slug: "quebec", name: "QC", d: "M280,175 L340,160 L350,240 L290,250 Z", labelX: 315, labelY: 210 },
  { slug: "newfoundland-and-labrador", name: "NL", d: "M360,120 L420,100 L430,150 L370,170 Z", labelX: 395, labelY: 135 },
  { slug: "new-brunswick", name: "NB", d: "M330,250 L360,245 L365,275 L335,280 Z", labelX: 348, labelY: 265 },
  { slug: "nova-scotia", name: "NS", d: "M370,270 L395,265 L400,290 L375,295 Z", labelX: 385, labelY: 282 },
  { slug: "prince-edward-island", name: "PE", d: "M355,255 L365,253 L366,262 L356,264 Z", labelX: 360, labelY: 258 },
];

type CanadaSvgMapProps = {
  provinces: ProvinceData[];
  locale: string;
};

export function CanadaSvgMap({ provinces, locale }: CanadaSvgMapProps) {
  const router = useRouter();
  const statusBySlug = new Map(provinces.map((p) => [p.slug, p.status]));

  return (
    <div className="canada-svg-wrap">
      <svg viewBox="0 0 450 320" className="canada-svg" role="img" aria-label="Map of Canada">
        <rect width="450" height="320" fill="#f1ece4" rx="12" />
        {provincesGeo.map((region) => {
          const status = statusBySlug.get(region.slug) ?? "not_served";
          return (
            <g
              key={region.slug}
              className="canada-region-group"
              onClick={() => router.push(`/${locale}/locations/${region.slug}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  router.push(`/${locale}/locations/${region.slug}`);
                }
              }}
              role="link"
              tabIndex={0}
              aria-label={`${region.name} — ${status}`}
            >
              <path d={region.d} className={`canada-region canada-region--${status}`} />
              <text x={region.labelX} y={region.labelY} className="canada-region-label">
                {region.name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="map-legend">Tap a province to view service status.</p>
    </div>
  );
}
