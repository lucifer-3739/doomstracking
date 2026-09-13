'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  WatchlistItem,
  UserProgress,
  FilterState,
  WatchlistStats,
  OrderPreset,
  UserItemData
} from '../types/watchlist';
import { INITIAL_WATCHLIST } from '../data/doomsdayWatchlist';

const STORAGE_KEY_PROGRESS = 'doomstracking_user_progress_v1';
const STORAGE_KEY_CUSTOM_ITEMS = 'doomstracking_custom_items_v1';
const STORAGE_KEY_ORDER = 'doomstracking_custom_order_v1';
const STORAGE_KEY_FILTERS = 'doomstracking_filters_v1';

export function useWatchlist() {
  const [isClient, setIsClient] = useState(false);
  const [customItems, setCustomItems] = useState<WatchlistItem[]>([]);
  const [customOrderIds, setCustomOrderIds] = useState<string[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    type: 'all',
    tier: 'all',
    phase: 'all',
    searchQuery: '',
    sortBy: 'curated'
  });

  // Load from LocalStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }

      const savedCustomItems = localStorage.getItem(STORAGE_KEY_CUSTOM_ITEMS);
      if (savedCustomItems) {
        setCustomItems(JSON.parse(savedCustomItems));
      }

      const savedOrder = localStorage.getItem(STORAGE_KEY_ORDER);
      if (savedOrder) {
        setCustomOrderIds(JSON.parse(savedOrder));
      }

      const savedFilters = localStorage.getItem(STORAGE_KEY_FILTERS);
      if (savedFilters) {
        const parsed = JSON.parse(savedFilters);
        setFilters(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Failed to load watchlist state from localStorage', e);
    }
  }, []);

  // Sync userProgress to localStorage
  const saveProgress = useCallback((newProgress: UserProgress) => {
    setUserProgress(newProgress);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(newProgress));
      } catch (e) {
        console.error('Failed to save user progress', e);
      }
    }
  }, []);

  // Sync custom items to localStorage
  const saveCustomItems = useCallback((items: WatchlistItem[]) => {
    setCustomItems(items);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_CUSTOM_ITEMS, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save custom items', e);
      }
    }
  }, []);

  // Sync custom order to localStorage
  const saveCustomOrder = useCallback((order: string[]) => {
    setCustomOrderIds(order);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(order));
      } catch (e) {
        console.error('Failed to save custom order', e);
      }
    }
  }, []);

  // Combine initial items + custom items
  const allItems = useMemo<WatchlistItem[]>(() => {
    return [...INITIAL_WATCHLIST, ...customItems];
  }, [customItems]);

  // Handle Toggle Completed
  const toggleCompleted = useCallback((id: string) => {
    setUserProgress(prev => {
      const current = prev[id] || { completed: false };
      const nextCompleted = !current.completed;
      const updated: UserProgress = {
        ...prev,
        [id]: {
          ...current,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : undefined
        }
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  // Set Rating
  const setRating = useCallback((id: string, rating: number) => {
    setUserProgress(prev => {
      const current = prev[id] || { completed: false };
      const updated: UserProgress = {
        ...prev,
        [id]: {
          ...current,
          rating: rating === current.rating ? undefined : rating
        }
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  // Set Notes
  const setNotes = useCallback((id: string, notes: string) => {
    setUserProgress(prev => {
      const current = prev[id] || { completed: false };
      const updated: UserProgress = {
        ...prev,
        [id]: {
          ...current,
          notes
        }
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  // Move item position in custom ranking
  const reorderItem = useCallback((id: string, direction: 'up' | 'down') => {
    const currentOrder = customOrderIds.length === allItems.length
      ? [...customOrderIds]
      : allItems.map(item => item.id);

    const index = currentOrder.indexOf(id);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      const temp = currentOrder[index - 1];
      currentOrder[index - 1] = currentOrder[index];
      currentOrder[index] = temp;
      saveCustomOrder(currentOrder);
      setFilters(prev => ({ ...prev, sortBy: 'custom' }));
    } else if (direction === 'down' && index < currentOrder.length - 1) {
      const temp = currentOrder[index + 1];
      currentOrder[index + 1] = currentOrder[index];
      currentOrder[index] = temp;
      saveCustomOrder(currentOrder);
      setFilters(prev => ({ ...prev, sortBy: 'custom' }));
    }
  }, [allItems, customOrderIds, saveCustomOrder]);

  // Add Custom Movie/Series
  const addCustomItem = useCallback((
    newItemData: Omit<WatchlistItem, 'id' | 'curatedRank' | 'chronologicalRank' | 'releaseRank' | 'isCustom'>
  ) => {
    const newId = `custom-${Date.now()}`;
    const nextRank = allItems.length + 1;
    const newItem: WatchlistItem = {
      ...newItemData,
      id: newId,
      curatedRank: nextRank,
      chronologicalRank: nextRank,
      releaseRank: nextRank,
      isCustom: true
    };
    const updated = [...customItems, newItem];
    saveCustomItems(updated);

    const updatedOrder = customOrderIds.length > 0 
      ? [...customOrderIds, newId] 
      : allItems.map(i => i.id).concat(newId);
    saveCustomOrder(updatedOrder);

    return newId;
  }, [allItems, customItems, customOrderIds, saveCustomItems, saveCustomOrder]);

  // Delete Custom Item
  const deleteCustomItem = useCallback((id: string) => {
    const updated = customItems.filter(item => item.id !== id);
    saveCustomItems(updated);
    const updatedOrder = customOrderIds.filter(itemId => itemId !== id);
    saveCustomOrder(updatedOrder);
    
    // Also remove from progress
    setUserProgress(prev => {
      const copy = { ...prev };
      delete copy[id];
      saveProgress(copy);
      return copy;
    });
  }, [customItems, customOrderIds, saveCustomItems, saveCustomOrder, saveProgress]);

  // Mark all completed
  const markAllCompleted = useCallback(() => {
    const updated: UserProgress = {};
    allItems.forEach(item => {
      updated[item.id] = {
        ...(userProgress[item.id] || {}),
        completed: true,
        completedAt: userProgress[item.id]?.completedAt || new Date().toISOString()
      };
    });
    saveProgress(updated);
  }, [allItems, userProgress, saveProgress]);

  // Mark all pending
  const markAllPending = useCallback(() => {
    const updated: UserProgress = {};
    allItems.forEach(item => {
      updated[item.id] = {
        ...(userProgress[item.id] || {}),
        completed: false,
        completedAt: undefined
      };
    });
    saveProgress(updated);
  }, [allItems, userProgress, saveProgress]);

  // Reset watchlist
  const resetToDefault = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
      localStorage.removeItem(STORAGE_KEY_CUSTOM_ITEMS);
      localStorage.removeItem(STORAGE_KEY_ORDER);
      localStorage.removeItem(STORAGE_KEY_FILTERS);
    }
    setUserProgress({});
    setCustomItems([]);
    setCustomOrderIds([]);
    setFilters({
      status: 'all',
      type: 'all',
      tier: 'all',
      phase: 'all',
      searchQuery: '',
      sortBy: 'curated'
    });
  }, []);

  // Update Filters
  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => {
      const updated = { ...prev, [key]: value };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY_FILTERS, JSON.stringify(updated));
        } catch (e) {
          console.error('Failed to save filters', e);
        }
      }
      return updated;
    });
  }, []);

  // Export JSON
  const exportData = useCallback(() => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      userProgress,
      customItems,
      customOrderIds,
      filters
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doomsday-watchlist-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [userProgress, customItems, customOrderIds, filters]);

  // Import JSON
  const importData = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.userProgress) saveProgress(parsed.userProgress);
      if (parsed.customItems) saveCustomItems(parsed.customItems);
      if (parsed.customOrderIds) saveCustomOrder(parsed.customOrderIds);
      if (parsed.filters) setFilters(parsed.filters);
      return { success: true, message: 'Watchlist data imported successfully!' };
    } catch (e) {
      return { success: false, message: 'Invalid JSON file format.' };
    }
  }, [saveProgress, saveCustomItems, saveCustomOrder]);

  // Generate shareable text
  const getShareSummaryText = useCallback(() => {
    const completedCount = allItems.filter(i => userProgress[i.id]?.completed).length;
    const total = allItems.length;
    const pct = Math.round((completedCount / total) * 100);
    
    let text = `🛡️ ROAD TO AVENGERS: DOOMSDAY WATCHLIST 🛡️\n`;
    text += `Progress: ${completedCount}/${total} Completed (${pct}%)\n\n`;
    
    allItems.forEach((item, index) => {
      const isDone = userProgress[item.id]?.completed;
      const statusIcon = isDone ? '✅' : '⏳';
      const rating = userProgress[item.id]?.rating ? ` [⭐ ${userProgress[item.id]?.rating}/5]` : '';
      text += `${index + 1}. ${statusIcon} ${item.title} (${item.releaseYear}) - ${item.tier.toUpperCase()}${rating}\n`;
    });
    
    text += `\nTrack your journey to Avengers: Doomsday!`;
    return text;
  }, [allItems, userProgress]);

  // Calculate Sorted Items
  const sortedItems = useMemo<WatchlistItem[]>(() => {
    const items = [...allItems];
    
    switch (filters.sortBy) {
      case 'curated':
        return items.sort((a, b) => a.curatedRank - b.curatedRank);
      case 'chronological':
        return items.sort((a, b) => a.chronologicalRank - b.chronologicalRank);
      case 'release':
        return items.sort((a, b) => {
          if (a.releaseYear !== b.releaseYear) return a.releaseYear - b.releaseYear;
          return a.releaseRank - b.releaseRank;
        });
      case 'speedrun':
        // Essentials first, then by curated
        return items.sort((a, b) => {
          const tierWeight = { essential: 0, recommended: 1, supplemental: 2 };
          if (tierWeight[a.tier] !== tierWeight[b.tier]) {
            return tierWeight[a.tier] - tierWeight[b.tier];
          }
          return a.curatedRank - b.curatedRank;
        });
      case 'custom':
        if (customOrderIds.length > 0) {
          const idToIndex = new Map(customOrderIds.map((id, index) => [id, index]));
          return items.sort((a, b) => {
            const indexA = idToIndex.has(a.id) ? idToIndex.get(a.id)! : 9999;
            const indexB = idToIndex.has(b.id) ? idToIndex.get(b.id)! : 9999;
            return indexA - indexB;
          });
        }
        return items.sort((a, b) => a.curatedRank - b.curatedRank);
      default:
        return items;
    }
  }, [allItems, filters.sortBy, customOrderIds]);

  // Filter items
  const filteredAndRankedItems = useMemo(() => {
    return sortedItems.filter(item => {
      const isCompleted = !!userProgress[item.id]?.completed;
      
      // Status Filter
      if (filters.status === 'completed' && !isCompleted) return false;
      if (filters.status === 'pending' && isCompleted) return false;

      // Type Filter
      if (filters.type !== 'all' && item.type !== filters.type) return false;

      // Tier Filter
      if (filters.tier !== 'all' && item.tier !== filters.tier) return false;

      // Phase Filter
      if (filters.phase !== 'all' && item.phase !== filters.phase) return false;

      // Search Filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesRelevance = item.doomsdayRelevance.toLowerCase().includes(query);
        const matchesCharacters = item.keyCharacters.some(c => c.toLowerCase().includes(query));
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        const matchesYear = item.releaseYear.toString().includes(query);
        if (!matchesTitle && !matchesRelevance && !matchesCharacters && !matchesTags && !matchesYear) {
          return false;
        }
      }

      return true;
    }).map((item, index) => ({
      ...item,
      displayNumber: index + 1 // Dynamic 1 to N number!
    }));
  }, [sortedItems, userProgress, filters]);

  // Watchlist Statistics
  const stats = useMemo<WatchlistStats>(() => {
    const totalItems = allItems.length;
    const completedItems = allItems.filter(i => userProgress[i.id]?.completed).length;
    const pendingItems = totalItems - completedItems;
    const percentComplete = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const movies = allItems.filter(i => i.type === 'movie');
    const completedMovies = movies.filter(i => userProgress[i.id]?.completed).length;

    const series = allItems.filter(i => i.type === 'series');
    const completedSeries = series.filter(i => userProgress[i.id]?.completed).length;

    const totalRuntimeMinutes = allItems.reduce((sum, item) => sum + (item.runtimeMinutes || 0), 0);
    const completedRuntimeMinutes = allItems
      .filter(i => userProgress[i.id]?.completed)
      .reduce((sum, item) => sum + (item.runtimeMinutes || 0), 0);
    const remainingRuntimeMinutes = totalRuntimeMinutes - completedRuntimeMinutes;

    const essentials = allItems.filter(i => i.tier === 'essential');
    const essentialCompleted = essentials.filter(i => userProgress[i.id]?.completed).length;

    return {
      totalItems,
      completedItems,
      pendingItems,
      percentComplete,
      totalMovies: movies.length,
      completedMovies,
      totalSeries: series.length,
      completedSeries,
      totalRuntimeMinutes,
      completedRuntimeMinutes,
      remainingRuntimeMinutes,
      essentialTotal: essentials.length,
      essentialCompleted
    };
  }, [allItems, userProgress]);

  // Next up pending item
  const nextUpItem = useMemo(() => {
    // Look in curated order first for the first incomplete item
    const curatedSorted = [...allItems].sort((a, b) => a.curatedRank - b.curatedRank);
    return curatedSorted.find(item => !userProgress[item.id]?.completed) || null;
  }, [allItems, userProgress]);

  return {
    isClient,
    allItems,
    items: filteredAndRankedItems,
    userProgress,
    filters,
    stats,
    nextUpItem,
    toggleCompleted,
    setRating,
    setNotes,
    reorderItem,
    addCustomItem,
    deleteCustomItem,
    markAllCompleted,
    markAllPending,
    resetToDefault,
    updateFilter,
    exportData,
    importData,
    getShareSummaryText
  };
}
