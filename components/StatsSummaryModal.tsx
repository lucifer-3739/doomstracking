'use client';

import React from 'react';
import { 
  X, 
  BarChart3, 
  Trophy, 
  Flame, 
  Film, 
  Tv, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  Layers
} from 'lucide-react';
import { WatchlistItem, WatchlistStats, UserProgress } from '../types/watchlist';

interface StatsSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: WatchlistStats;
  allItems: WatchlistItem[];
  userProgress: UserProgress;
}

export function StatsSummaryModal({
  isOpen,
  onClose,
  stats,
  allItems,
  userProgress
}: StatsSummaryModalProps) {
  if (!isOpen) return null;

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();
  };

  // Phase Breakdown calculation
  const phases = [
    'Infinity Saga (Phase 1-3)',
    'Multiverse Saga (Phase 4)',
    'Multiverse Saga (Phase 5)',
    'Multiverse Saga (Phase 6)',
    'Legacy / Multiverse Adjacent'
  ];

  const phaseStats = phases.map(phaseName => {
    const phaseItems = allItems.filter(i => i.phase === phaseName);
    const completed = phaseItems.filter(i => userProgress[i.id]?.completed).length;
    const total = phaseItems.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { name: phaseName, total, completed, pct };
  }).filter(p => p.total > 0);

  // Doom Readiness Level Calculation
  const getReadinessLevel = () => {
    const pct = stats.percentComplete;
    if (pct === 100) return { title: 'GOD EMPEROR DOOM', desc: 'You have mastered the entire MCU multiverse timeline. Battleworld awaits!', badge: 'bg-emerald-500 text-zinc-950 font-black' };
    if (pct >= 75) return { title: 'TVA Master of Time', desc: 'You have traversed all incursions and hold key multiversal secrets.', badge: 'bg-emerald-700 text-zinc-100 font-bold' };
    if (pct >= 50) return { title: 'Multiverse Incursion Survivor', desc: 'Halfway through the cosmos. Major pillars unlocked!', badge: 'bg-cyan-700 text-zinc-100 font-bold' };
    if (pct >= 25) return { title: 'Sacred Timeline Agent', desc: 'Good progress! Key foundation is setting up.', badge: 'bg-amber-700 text-zinc-100 font-bold' };
    return { title: 'Earth-616 Recruit', desc: 'Begin your journey with Iron Man and the core essentials.', badge: 'bg-zinc-800 text-zinc-300 font-bold' };
  };

  const readiness = getReadinessLevel();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-emerald-900/60 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-800 p-0.5 shadow-lg shadow-emerald-950">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
              Watchlist Analytics & Readiness
            </h2>
            <p className="text-xs text-zinc-400">
              Comprehensive timeline progress heading into Avengers: Doomsday
            </p>
          </div>
        </div>

        {/* Readiness Rank Hero Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/40 border border-emerald-800/50 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider font-mono ${readiness.badge}`}>
                {readiness.title}
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">{readiness.desc}</p>
          </div>
          <div className="text-center bg-zinc-950/90 border border-zinc-800 px-5 py-3 rounded-2xl">
            <div className="text-3xl font-black font-mono text-emerald-400">
              {stats.percentComplete}%
            </div>
            <div className="text-[10px] text-zinc-400 uppercase font-mono">
              Doomsday Readiness
            </div>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400" /> Titles
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {stats.completedItems} / {stats.totalItems}
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              {stats.pendingItems} left
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Watch Time
            </div>
            <div className="text-lg font-bold font-mono text-zinc-100">
              {formatMinutes(stats.completedRuntimeMinutes)}
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              {formatMinutes(stats.remainingRuntimeMinutes)} left
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Film className="w-3.5 h-3.5 text-indigo-400" /> Movies
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {stats.completedMovies} / {stats.totalMovies}
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              {stats.totalMovies > 0 ? Math.round((stats.completedMovies / stats.totalMovies) * 100) : 0}% complete
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1">
              <Tv className="w-3.5 h-3.5 text-purple-400" /> Web Series
            </div>
            <div className="text-xl font-bold font-mono text-zinc-100">
              {stats.completedSeries} / {stats.totalSeries}
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              {stats.totalSeries > 0 ? Math.round((stats.completedSeries / stats.totalSeries) * 100) : 0}% complete
            </div>
          </div>
        </div>

        {/* Phase Breakdown Progress */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            Phase & Saga Completion
          </h3>

          <div className="space-y-2.5">
            {phaseStats.map(phase => (
              <div key={phase.name} className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                  <span className="text-zinc-200 font-medium">{phase.name}</span>
                  <span className="text-emerald-400 font-bold">
                    {phase.completed}/{phase.total} ({phase.pct}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/80">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(phase.pct, 1)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
