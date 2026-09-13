export type MediaType = 'movie' | 'series';

export type ImportanceTier = 'essential' | 'recommended' | 'supplemental';

export type Phase = 
  | 'Infinity Saga (Phase 1-3)'
  | 'Multiverse Saga (Phase 4)'
  | 'Multiverse Saga (Phase 5)'
  | 'Multiverse Saga (Phase 6)'
  | 'Legacy / Multiverse Adjacent';

export interface WatchlistItem {
  id: string;
  curatedRank: number;          // Default 1 to N position
  chronologicalRank: number;    // In-universe timeline position
  releaseRank: number;          // Release order position
  title: string;
  type: MediaType;
  releaseYear: number;
  releaseDate?: string;
  phase: Phase;
  tier: ImportanceTier;
  runtimeMinutes: number;       // For movies or total approximate series runtime
  episodeCount?: number;        // For web series
  seasonsCount?: number;        // For web series
  posterUrl: string;
  backdropUrl?: string;
  doomsdayRelevance: string;    // Why this connects to Avengers: Doomsday / Secret Wars
  keyCharacters: string[];      // e.g., ["Doctor Doom", "Tony Stark", "Reed Richards", "Loki"]
  tags: string[];               // e.g., ["Incursions", "TVA", "Multiverse", "Russo Brothers"]
  whereToWatch: string;         // e.g., "Disney+", "Disney+ / Digital", "Theaters"
  isCustom?: boolean;           // User added item
}

export interface UserItemData {
  completed: boolean;
  completedAt?: string;
  rating?: number;              // 1 to 5 stars
  notes?: string;
  customRank?: number;          // User custom 1 to N ranking
}

export type UserProgress = Record<string, UserItemData>;

export type OrderPreset = 'curated' | 'chronological' | 'release' | 'speedrun' | 'custom';

export type StatusFilter = 'all' | 'pending' | 'completed';
export type TypeFilter = 'all' | 'movie' | 'series';
export type TierFilter = 'all' | 'essential' | 'recommended' | 'supplemental';
export type PhaseFilter = 'all' | Phase;

export interface FilterState {
  status: StatusFilter;
  type: TypeFilter;
  tier: TierFilter;
  phase: PhaseFilter;
  searchQuery: string;
  sortBy: OrderPreset;
}

export interface WatchlistStats {
  totalItems: number;
  completedItems: number;
  pendingItems: number;
  percentComplete: number;
  
  totalMovies: number;
  completedMovies: number;
  
  totalSeries: number;
  completedSeries: number;
  
  totalRuntimeMinutes: number;
  completedRuntimeMinutes: number;
  remainingRuntimeMinutes: number;
  
  essentialTotal: number;
  essentialCompleted: number;
}
