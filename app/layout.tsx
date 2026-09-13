import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Road to Doomsday - Avengers: Doomsday 1-to-N Watchlist & Tracker",
  description: "Master 1 to N viewing order for MCU movies and Disney+ web series leading directly to Avengers: Doomsday. Track completed and pending titles, watch time, and Doctor Doom lore.",
  keywords: ["Avengers Doomsday", "MCU viewing order", "Doctor Doom", "Robert Downey Jr", "Marvel Watchlist", "Secret Wars", "Multiverse Saga"],
  verification: {
    google: "googleb3c5ff019a78c86a"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
