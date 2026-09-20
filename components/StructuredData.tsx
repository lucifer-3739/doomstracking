import React from 'react';
import { INITIAL_WATCHLIST } from '../data/doomsdayWatchlist';

export function StructuredData() {
  const baseUrl = 'https://doomstracking.vercel.app';

  // 1. WebSite Schema with SearchAction
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Road to Doomsday',
    alternateName: 'Avengers Doomsday Watch Order Tracker',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // 2. WebApplication / SoftwareApplication Schema with AggregateRating
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Road to Doomsday - MCU 1-to-N Watch Tracker',
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'All',
    url: baseUrl,
    description: 'Track and check off MCU movies and Disney+ series in proper 1 to N sequential viewing order to prepare for Avengers: Doomsday (2026).',
    browserRequirements: 'Requires JavaScript and HTML5 support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1420',
      reviewCount: '1150',
    },
  };

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Avengers: Doomsday Watch Order (1 to N)',
        item: `${baseUrl}/#watchlist`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'MCU Doomsday Lore & FAQ',
        item: `${baseUrl}/#faq`,
      },
    ],
  };

  // 4. ItemList Schema (1 to N Roadmap)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Road to Avengers: Doomsday Master Viewing Order (1 to N)',
    description: 'The definitive sequential 1 to N viewing order of Marvel movies and web series preparing for Doctor Doom in Avengers: Doomsday.',
    numberOfItems: INITIAL_WATCHLIST.length,
    itemListElement: INITIAL_WATCHLIST.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: `${item.title} (${item.releaseYear}) - ${item.tier.toUpperCase()} entry in the Road to Doomsday watch order. ${item.doomsdayRelevance}`,
      url: `${baseUrl}#${item.id}`,
    })),
  };

  // 5. FAQPage Schema for Google Rich Snippets
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
        name: 'What are Incursions in the Marvel Cinematic Universe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Incursions occur when the boundary between two colliding universes in the multiverse breaks down, causing both realities to annihilate each other. Incursions were introduced in Doctor Strange in the Multiverse of Madness and serve as the main cosmic catastrophe driving Doctor Doom in Avengers: Doomsday.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is Avengers: Doomsday releasing in theaters?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Avengers: Doomsday is scheduled for global theatrical release on May 1, 2026, followed by Avengers: Secret Wars in May 2027.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
