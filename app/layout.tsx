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

const siteUrl = 'https://doomstracking.vercel.app';

export const viewport: Viewport = {
  themeColor: '#090d10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Road to Doomsday: MCU 1-to-N Movie & Series Watch Tracker | Avengers Doomsday Order",
    template: "%s | Road to Doomsday Watchlist"
  },
  description: "The #1 sequential 1-to-N viewing checklist and progress tracker for MCU movies & Disney+ web series leading to Avengers: Doomsday (2026). Track completed vs pending titles, runtime, incursion lore, and Doctor Doom connections.",
  applicationName: "Road to Doomsday",
  authors: [{ name: "Road to Doomsday Team", url: siteUrl }],
  generator: "Next.js",
  category: "entertainment",
  classification: "Marvel Cinematic Universe Watch Order & Tracker",
  keywords: [
    // Core Target Queries
    "Avengers Doomsday watch order",
    "MCU movies in order for Doomsday",
    "Road to Doomsday watchlist",
    "Avengers Doomsday movie list",
    "Marvel movie tracker",
    "Marvel series in order for Doomsday",
    "What to watch before Avengers Doomsday",
    "Doctor Doom MCU watch order",
    "Robert Downey Jr Doctor Doom movies to watch",
    "MCU 1 to N watching guide",
    "Doomsday movie tracking",
    "MCU chronological order 1 to n",
    "Road to Doomsday MCU 1 to N tracker",
    
    // Character & Lore Queries
    "Doctor Doom MCU movies",
    "Robert Downey Jr Victor von Doom timeline",
    "Fantastic Four First Steps watch order",
    "Thunderbolts MCU movie watch order",
    "Captain America Brave New World Doomsday connection",
    "Deadpool and Wolverine Doomsday connection",
    "Loki Season 2 God of Stories Doomsday",
    "MCU Incursions movie list",
    "Marvel Multiverse Saga viewing checklist",
    "Avengers Secret Wars roadmap 1 to n",
    
    // Sequence & Checklist Queries
    "Marvel Cinematic Universe complete watch list",
    "MCU Phase 4 Phase 5 Phase 6 watch order",
    "Avengers 5 viewing order",
    "Disney Plus Marvel series order for Doomsday",
    "Iron Man to Avengers Doomsday sequence",
    "MCU timeline watch tracker"
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
    canonical: siteUrl,
  },
  openGraph: {
    title: "Road to Doomsday: MCU 1-to-N Movie & Series Watch Tracker",
    description: "Complete sequential watch order (1 to N) for Marvel movies and series leading into Avengers: Doomsday. Track what you've watched, pending hours, and Doctor Doom lore.",
    url: siteUrl,
    siteName: "Road to Doomsday Tracker",
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
    description: "Track completed vs pending Marvel movies and series in 1 to N sequential order for Avengers: Doomsday & Secret Wars.",
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
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
