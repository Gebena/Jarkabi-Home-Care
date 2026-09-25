import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Frank_Ruhl_Libre, Quicksand } from "next/font/google";
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
  themeColor: "#5B2E42",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Care Giver pairs a geometric rounded sans with a high-contrast transitional serif. */
const sans = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Frank_Ruhl_Libre({
  subsets: ["latin"],
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
