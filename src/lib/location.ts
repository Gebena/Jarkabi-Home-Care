const provinceFromPostalPrefix: Record<string, string> = {
  A: "NL",
  B: "NS",
  C: "PE",
  E: "NB",
  G: "QC",
  H: "QC",
  J: "QC",
  K: "ON",
  L: "ON",
  M: "ON",
  N: "ON",
  P: "ON",
  R: "MB",
  S: "SK",
  T: "AB",
  V: "BC",
  X: "NT/NU",
  Y: "YT",
};

export function provinceFromPostalCode(postalCode: string): string | null {
  const normalized = postalCode.trim().toUpperCase().replace(/\s+/g, "");
  if (!normalized) return null;
  const letter = normalized[0];
  return provinceFromPostalPrefix[letter] ?? null;
}

export type LocationStatus = "active" | "coming_soon" | "paused" | "not_served";

export function isOttawaAreaServed(city: string, province: string): boolean {
  const servedCities = [
    "ottawa",
    "kanata",
    "nepean",
    "barrhaven",
    "orleans",
    "gloucester",
    "stittsville",
    "rockland",
    "manotick",
  ];
  return (
    province.toUpperCase() === "ON" &&
    servedCities.includes(city.trim().toLowerCase())
  );
}
