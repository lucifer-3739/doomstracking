import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doomstracking.vercel.app';

export const viewport: Viewport = {
  themeColor: '#090d10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Road to Doomsday: MCU 1-to-N Movie & Series Watch Tracker",
    template: "%s | Road to Doomsday Watchlist"
  },
  description: "The ultimate 1 to N sequential viewing checklist for Marvel movies and Disney+ series leading to Avengers: Doomsday (2026). Track completed vs pending titles, watch time, and Doctor Doom lore.",
  applicationName: "Road to Doomsday",
  authors: [{ name: "Road to Doomsday Team" }],
  generator: "Next.js",
  keywords: [
    "Avengers Doomsday watch order",
    "MCU movies in order for Doomsday",
    "Road to Doomsday watchlist",
    "Marvel movie tracker",
    "Doctor Doom MCU order",
    "Robert Downey Jr Doctor Doom movies to watch",
    "MCU chronological order 1 to n",
    "Fantastic Four First Steps watch order",
    "Loki Season 2 Doomsday connection",
    "Avengers Secret Wars roadmap",
    "Multiverse Saga viewing checklist"
  ],
  referrer: "origin-when-cross-origin",
  creator: "Road to Doomsday",
  publisher: "Road to Doomsday",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Road to Doomsday: MCU 1-to-N Movie & Series Watch Tracker",
    description: "Complete sequential watch order (1 to N) for movies and series leading into Avengers: Doomsday. Track what you've watched, pending hours, and Doctor Doom lore.",
    url: siteUrl,
    siteName: "Road to Doomsday",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Road to Avengers: Doomsday 1-to-N Watch Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Road to Doomsday: MCU 1-to-N Movie & Series Watch Tracker",
    description: "Track your progress through the 1 to N MCU viewing order leading to Avengers: Doomsday & Secret Wars.",
    images: ["https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googleb3c5ff019a78c86a",
  },
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
