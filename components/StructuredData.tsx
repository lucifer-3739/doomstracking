import React from 'react';
import { INITIAL_WATCHLIST } from '../data/doomsdayWatchlist';

export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doomstracking.vercel.app';

  // 1. WebApplication Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Road to Doomsday - MCU 1-to-N Watchlist & Tracker',
    url: baseUrl,
    description: 'Track and complete the sequential 1 to N viewing order of Marvel movies and Disney+ series leading to Avengers: Doomsday.',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and HTML5 support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // 2. ItemList Schema (1 to N Roadmap)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Road to Avengers: Doomsday Master Viewing Order (1 to N)',
    description: 'Chronological and narrative sequential viewing order of MCU movies and web series preparing for Doctor Doom in Avengers: Doomsday.',
    numberOfItems: INITIAL_WATCHLIST.length,
    itemListElement: INITIAL_WATCHLIST.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: `${item.title} (${item.releaseYear}) - ${item.tier.toUpperCase()} viewing for Avengers: Doomsday. ${item.doomsdayRelevance}`,
      url: `${baseUrl}#${item.id}`,
    })),
  };

  // 3. FAQPage Schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best order to watch Marvel movies before Avengers: Doomsday?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The optimal Road to Doomsday watch order follows a 1 to N sequence starting with Iron Man (2008), Captain America: Civil War, and Avengers: Endgame to understand Tony Stark\'s legacy, followed by Multiverse and Incursion pillars (Loki Seasons 1 & 2, Spider-Man: No Way Home, Doctor Strange in the Multiverse of Madness, Deadpool & Wolverine), and culminating in Phase 5 & 6 lead-ins including Thunderbolts* and The Fantastic Four: First Steps.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is playing Doctor Doom in Avengers: Doomsday?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Robert Downey Jr. is returning to the Marvel Cinematic Universe to portray Victor von Doom / Doctor Doom in Avengers: Doomsday, directed by Anthony and Joe Russo (the Russo Brothers).',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to watch The Fantastic Four: First Steps before Avengers: Doomsday?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, The Fantastic Four: First Steps (2025) is an essential lead-in. It establishes Mister Fantastic (Reed Richards), Invisible Woman, Human Torch, and The Thing in an alternate 1960s retro-futuristic universe that directly crosses over with Doctor Doom in Avengers: Doomsday.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Loki Season 2 essential for Avengers: Doomsday?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Loki Season 2, Loki transforms into the God of Stories, anchoring and holding all branching multiverse timelines together at the Citadel at the End of Time. This Multiversal World Tree (Yggdrasil) is the core reality structure threatened by Incursions and Doctor Doom in Doomsday and Secret Wars.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is Avengers: Doomsday releasing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Avengers: Doomsday is scheduled for theatrical release on May 1, 2026, followed by Avengers: Secret Wars in May 2027.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
