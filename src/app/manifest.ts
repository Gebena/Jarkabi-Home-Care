import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jarkabi Home Care",
    short_name: "Jarkabi",
    description:
      "Compassionate home care and nursing services for Canadian families — request care, find locations, and connect with our team.",
    start_url: "/en",
    display: "standalone",
    background_color: "#F6F1E8",
    theme_color: "#1C2B45",
    orientation: "portrait-primary",
    lang: "en-CA",
    categories: ["health", "medical", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Request Care",
        short_name: "Request",
        url: "/en/request-care",
      },
      {
        name: "Locations",
        short_name: "Locations",
        url: "/en/locations",
      },
    ],
  };
}
