import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Source_Sans_3 } from "next/font/google";
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
  themeColor: "#1A2B4A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(sans.variable, display.variable, "font-sans")} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
