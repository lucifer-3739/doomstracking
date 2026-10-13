'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Film, 
  Tv, 
  Flame, 
  Sparkles, 
  PlayCircle, 
  ArrowRight, 
  Trophy,
  Crown,
  ListOrdered,
  Play,
  ExternalLink
} from 'lucide-react';
import { WatchlistItem, WatchlistStats } from '../types/watchlist';

interface ProgressBannerProps {
  stats: WatchlistStats;
  nextUpItem: (WatchlistItem & { displayNumber?: number }) | null;
  onToggleNextUp: (id: string) => void;
  onSelectNextUp: (item: WatchlistItem) => void;
}

export function ProgressBanner({
  stats,
  nextUpItem,
  onToggleNextUp,
  onSelectNextUp
}: ProgressBannerProps) {
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`.trim();
  };

  const isAllComplete = stats.totalItems > 0 && stats.completedItems === stats.totalItems;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-emerald-900/50 shadow-2xl p-6 sm:p-8 mb-8">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-8">
        
        {/* Left Column: Progress Statistics */}
        <div className="flex-1 flex flex-col justify-between space-y-6">
          
          {/* Header Title & Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 border border-emerald-600/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5 text-emerald-400" />
                  Sequential Viewing Tracker (1 to {stats.totalItems})
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-100 flex items-center gap-3">
                Avengers: Doomsday Prep Tracker
                {isAllComplete && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold animate-bounce">
                    <Trophy className="w-3.5 h-3.5" /> All Caught Up!
                  </span>
                )}
              </h1>
            </div>

            {/* Completion Percentage Badge */}
            <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-4 py-2.5 rounded-2xl shadow-inner">
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                  {stats.percentComplete}%
                </div>
                <div className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                  Watch Progress
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-800/60 flex items-center justify-center p-2">
                <CheckCircle2 className={`w-7 h-7 ${isAllComplete ? 'text-emerald-400' : 'text-emerald-500'}`} />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-bold">{stats.completedItems} Completed</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">{stats.totalItems} Total</span>
              </span>
              <span className="text-amber-400 font-mono font-semibold">
                {stats.pendingItems} Remaining to Watch
              </span>
            </div>
            
            <div className="h-3.5 w-full bg-zinc-900 rounded-full p-0.5 border border-zinc-800/80 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 rounded-full transition-all duration-700 ease-out relative shadow-lg shadow-emerald-500/30"
                style={{ width: `${Math.max(stats.percentComplete, 2)}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/40 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            
            {/* Watch Time Completed vs Remaining */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1 font-sans">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Watch Time</span>
              </div>
              <div className="text-lg font-bold font-mono text-zinc-100">
                {formatMinutes(stats.completedRuntimeMinutes)}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                {formatMinutes(stats.remainingRuntimeMinutes)} pending
              </div>
            </div>

            {/* Movies Progress */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1 font-sans">
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                <span>Movies</span>
              </div>
              <div className="text-lg font-bold font-mono text-zinc-100">
                {stats.completedMovies} / {stats.totalMovies}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                {stats.totalMovies - stats.completedMovies} pending
              </div>
            </div>

            {/* Web Series Progress */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1 font-sans">
                <Tv className="w-3.5 h-3.5 text-purple-400" />
                <span>Web Series</span>
              </div>
              <div className="text-lg font-bold font-mono text-zinc-100">
                {stats.completedSeries} / {stats.totalSeries}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                {stats.totalSeries - stats.completedSeries} pending
              </div>
            </div>

            {/* Essential Arc */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1 font-sans">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Essential Titles</span>
              </div>
              <div className="text-lg font-bold font-mono text-amber-300">
                {stats.essentialCompleted} / {stats.essentialTotal}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                Core Doom Story
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Next In Sequence Hero Card Spotlight */}
        <div className="lg:w-80 flex flex-col justify-between rounded-2xl bg-zinc-950/80 border border-emerald-900/70 p-5 shadow-xl relative group">
          
          {nextUpItem ? (
            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-600/60 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-emerald-400 animate-spin" />
                    Next in Watch Order #{nextUpItem.curatedRank}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {nextUpItem.type === 'movie' ? '🎬 Movie' : `📺 Series (${nextUpItem.episodeCount} eps)`}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-zinc-100 line-clamp-1 group-hover:text-emerald-300 transition-colors">
                  {nextUpItem.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mt-1">
                  <span>{nextUpItem.releaseYear}</span>
                  <span>•</span>
                  <span>{formatMinutes(nextUpItem.runtimeMinutes)}</span>
                </div>

                {/* Where to Watch Pill */}
                <div className="mt-2.5 p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400 shrink-0" />
                    <span className="text-[11px] font-mono text-emerald-300 font-bold truncate">
                      {nextUpItem.whereToWatch}
                    </span>
                  </div>
                  <a
                    href={
                      nextUpItem.whereToWatch.toLowerCase().includes('theaters')
                        ? `https://www.google.com/search?q=${encodeURIComponent(nextUpItem.title + ' showtimes tickets')}`
                        : nextUpItem.whereToWatch.toLowerCase().includes('disney')
                        ? `https://www.disneyplus.com/search?q=${encodeURIComponent(nextUpItem.title)}`
                        : `https://www.google.com/search?q=${encodeURIComponent('where to watch ' + nextUpItem.title)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-600/40 text-[10px] font-mono font-medium text-emerald-300 hover:text-emerald-100 transition-colors"
                  >
                    <span>{nextUpItem.whereToWatch.toLowerCase().includes('theaters') ? 'Tickets' : 'Watch'}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed border-l-2 border-emerald-600/50 pl-2.5">
                  {nextUpItem.doomsdayRelevance}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                <button
                  onClick={() => onToggleNextUp(nextUpItem.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-950/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                  Mark as Watched
                </button>
                <button
                  onClick={() => onSelectNextUp(nextUpItem)}
                  className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-100 transition-colors"
                  title="View Lore & Details"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-zinc-100">
                All 1 to {stats.totalItems} Completed!
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                You have watched every single movie and series in the series order. You are 100% ready for Avengers: Doomsday!
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
