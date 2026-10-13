import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Road to Doomsday: MCU 1-to-N Watch Tracker',
    short_name: 'Doomsday Tracker',
    description: 'The #1 sequential 1-to-N viewing checklist and progress tracker for MCU movies & Disney+ web series leading to Avengers: Doomsday (2026).',
    start_url: '/',
    display: 'standalone',
    background_color: '#090d10',
    theme_color: '#090d10',
    categories: ['entertainment', 'utilities'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
