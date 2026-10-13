export function getWatchUrl(title: string, whereToWatch?: string, customUrl?: string): string {
  if (customUrl && customUrl.trim()) {
    return customUrl;
  }

  const cleanTitle = encodeURIComponent(title.trim());
  const platform = (whereToWatch || '').toLowerCase();

  // If theatrical upcoming release
  if (platform.includes('theater')) {
    return `https://www.google.com/search?q=${cleanTitle}+movie+release+date+tickets`;
  }

  // If Sony Spider-Man title
  if (title.toLowerCase().includes('spider-man: no way home') || title.toLowerCase().includes('no way home')) {
    return `https://www.google.com/search?q=${cleanTitle}+where+to+stream+online`;
  }

  // If Starz
  if (platform.includes('starz')) {
    return `https://www.starz.com/search?q=${cleanTitle}`;
  }

  // If exclusively on Netflix
  if (platform.includes('netflix')) {
    return `https://www.netflix.com/search?q=${cleanTitle}`;
  }

  // If Prime Video
  if (platform.includes('prime')) {
    return `https://www.amazon.com/s?k=${cleanTitle}&i=instant-video`;
  }

  // If Disney+ is primary
  if (platform.includes('disney')) {
    return `https://www.google.com/search?q=${cleanTitle}+Disney+Plus+watch+online`;
  }

  // Fallback to universal Google search for streaming providers
  return `https://www.google.com/search?q=where+to+watch+${cleanTitle}+online`;
}
