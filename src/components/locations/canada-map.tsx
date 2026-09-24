import type { ProvinceData } from "@/lib/cms";
import Link from "next/link";

const statusLabel: Record<ProvinceData["status"], string> = {
  active: "Available",
  coming_soon: "Coming Soon",
  paused: "Paused",
  not_served: "Not Served",
};

type CanadaMapProps = {
  provinces: ProvinceData[];
  locale: string;
};

export function CanadaMap({ provinces, locale }: CanadaMapProps) {
  const base = `/${locale}/locations`;

  return (
    <div className="canada-map-interactive" role="list" aria-label="Canadian provinces and territories">
      {provinces.map((province) => (
        <Link
          key={province.slug}
          href={`${base}/${province.slug}`}
          className={`map-province map-province--${province.status}`}
          role="listitem"
        >
          <span className="map-province-name">{province.name}</span>
          <span className="map-province-status">{statusLabel[province.status]}</span>
        </Link>
      ))}
    </div>
  );
}
