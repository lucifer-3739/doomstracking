'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Layers, 
  Film, 
  Tv, 
  Flame, 
  LayoutGrid, 
  ListOrdered, 
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { 
  FilterState, 
  StatusFilter, 
  TypeFilter, 
  TierFilter, 
  PhaseFilter, 
  OrderPreset, 
  WatchlistStats 
} from '../types/watchlist';

interface FilterBarProps {
  filters: FilterState;
  stats: WatchlistStats;
  viewMode: 'grid' | 'table';
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onSetViewMode: (mode: 'grid' | 'table') => void;
}

export function FilterBar({
  filters,
  stats,
  viewMode,
  onUpdateFilter,
  onSetViewMode
}: FilterBarProps) {
  
  const statusOptions: { id: StatusFilter; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Titles', count: stats.totalItems, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'pending', label: '⏳ Pending / To Watch', count: stats.pendingItems, icon: <Clock className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'completed', label: '✅ Completed / Watched', count: stats.completedItems, icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  const orderOptions: { id: OrderPreset; label: string; desc: string }[] = [
    { id: 'curated', label: '👑 Recommended Story Order (1 to N)', desc: 'Optimized sequence leading directly to Avengers: Doomsday' },
    { id: 'chronological', label: '⏳ MCU Chronological Timeline Order (1 to N)', desc: 'In-universe timeline order (1940s to 2026)' },
    { id: 'release', label: '📅 Release Date Order (1 to N)', desc: 'Order of theatrical & Disney+ release' },
    { id: 'speedrun', label: '⚡ Essential Speedrun Order (1 to N)', desc: 'Must-watch core storylines first' },
    { id: 'custom', label: '🔀 Custom Sequential Order (1 to N)', desc: 'Your personalized sequence' }
  ];

  const typeOptions: { id: TypeFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Media', icon: null },
    { id: 'movie', label: 'Movies Only', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'series', label: 'Web Series Only', icon: <Tv className="w-3.5 h-3.5" /> }
  ];

  const tierOptions: { id: TierFilter; label: string; badge: string }[] = [
    { id: 'all', label: 'All Tiers', badge: '' },
    { id: 'essential', label: '🔥 Essential', badge: 'bg-emerald-950 text-emerald-400' },
    { id: 'recommended', label: '⭐ Recommended', badge: 'bg-blue-950 text-cyan-400' },
    { id: 'supplemental', label: '📘 Supplemental', badge: 'bg-zinc-800 text-zinc-400' }
  ];

  const phaseOptions: { id: PhaseFilter; label: string }[] = [
    { id: 'all', label: 'All Phases / Sagas' },
    { id: 'Infinity Saga (Phase 1-3)', label: 'Infinity Saga (Phase 1-3)' },
    { id: 'Multiverse Saga (Phase 4)', label: 'Multiverse Saga (Phase 4)' },
    { id: 'Multiverse Saga (Phase 5)', label: 'Multiverse Saga (Phase 5)' },
    { id: 'Multiverse Saga (Phase 6)', label: 'Multiverse Saga (Phase 6 / Doomsday)' },
    { id: 'Legacy / Multiverse Adjacent', label: 'Legacy Multiverse (Fox / X-Men)' }
  ];

  return (
    <div className="space-y-4 mb-6">
      
      {/* Top Controls Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm shadow-md">
        
        {/* Status Filter Segmented Control */}
        <div className="flex items-center p-1 bg-zinc-950 rounded-xl border border-zinc-800/80 overflow-x-auto">
          {statusOptions.map(tab => {
            const isActive = filters.status === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onUpdateFilter('status', tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-zinc-950/40 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Viewing Order Selector & Layout Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Order Preset Dropdown */}
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800/80 px-3 py-1.5 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-mono text-zinc-400 uppercase hidden sm:inline">Watch Order:</span>
            <select
              value={filters.sortBy}
              onChange={e => onUpdateFilter('sortBy', e.target.value as OrderPreset)}
              className="bg-transparent text-xs font-medium text-zinc-100 focus:outline-none cursor-pointer pr-2"
            >
              {orderOptions.map(opt => (
                <option key={opt.id} value={opt.id} className="bg-zinc-900 text-zinc-100">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode (Grid vs Table) */}
          <div className="flex items-center p-1 bg-zinc-950 rounded-xl border border-zinc-800/80">
            <button
              onClick={() => onSetViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSetViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table'
                  ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Sequential Checklist Table View"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Secondary Filter Chips Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1 text-zinc-400 font-mono text-[11px] mr-1">
            <Filter className="w-3 h-3 text-emerald-400" />
            <span>Filter:</span>
          </div>

          {/* Media Type Chips */}
          <div className="flex items-center bg-zinc-900/90 rounded-xl p-0.5 border border-zinc-800">
            {typeOptions.map(opt => {
              const active = filters.type === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateFilter('type', opt.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    active ? 'bg-zinc-800 text-emerald-300 font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tier Chips */}
          <div className="flex items-center bg-zinc-900/90 rounded-xl p-0.5 border border-zinc-800">
            {tierOptions.map(opt => {
              const active = filters.tier === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onUpdateFilter('tier', opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    active ? 'bg-zinc-800 text-emerald-300 font-semibold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Phase Filter Dropdown */}
          <select
            value={filters.phase}
            onChange={e => onUpdateFilter('phase', e.target.value as PhaseFilter)}
            className="bg-zinc-900/90 border border-zinc-800 text-zinc-200 text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {phaseOptions.map(p => (
              <option key={p.id} value={p.id} className="bg-zinc-900 text-zinc-200">
                {p.label}
              </option>
            ))}
          </select>

        </div>

        {/* Clear Filter button if filters active */}
        {(filters.type !== 'all' || filters.tier !== 'all' || filters.phase !== 'all' || filters.status !== 'all' || filters.searchQuery) && (
          <button
            onClick={() => {
              onUpdateFilter('type', 'all');
              onUpdateFilter('tier', 'all');
              onUpdateFilter('phase', 'all');
              onUpdateFilter('status', 'all');
              onUpdateFilter('searchQuery', '');
            }}
            className="text-[11px] font-mono text-zinc-400 hover:text-emerald-400 underline underline-offset-2 transition-colors"
          >
            Reset Filters
          </button>
        )}

      </div>

    </div>
  );
}
