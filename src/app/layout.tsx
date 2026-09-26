import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  applicationName: "Jarkabi Home Care",
  appleWebApp: {
    capable: true,
    title: "Jarkabi Home Care",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#1C2B45",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Master prompt §10 — Jost (UI/body) + Cormorant Garamond (editorial headings). */
const sans = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(sans.variable, display.variable, "font-sans")} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
