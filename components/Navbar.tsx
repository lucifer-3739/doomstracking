'use client';

import React from 'react';
import { 
  ShieldAlert, 
  BarChart3, 
  Share2, 
  PlusCircle, 
  Download, 
  Upload, 
  RotateCcw, 
  Search,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { FilterState, WatchlistStats } from '../types/watchlist';

interface NavbarProps {
  stats: WatchlistStats;
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onOpenStatsModal: () => void;
  onOpenShareModal: () => void;
  onOpenAddModal: () => void;
  onExport: () => void;
  onImportClick: () => void;
  onReset: () => void;
  onMarkAllDone: () => void;
  onMarkAllPending: () => void;
}

export function Navbar({
  stats,
  filters,
  onUpdateFilter,
  onOpenStatsModal,
  onOpenShareModal,
  onOpenAddModal,
  onExport,
  onImportClick,
  onReset,
  onMarkAllDone,
  onMarkAllPending
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/40 bg-zinc-950/90 backdrop-blur-md shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5">
            <div className="relative group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-700 to-zinc-950 p-0.5 shadow-lg shadow-emerald-900/40 flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75 pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-zinc-100">
                  ROAD TO DOOMSDAY
                </span>
                <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 uppercase font-semibold">
                  1 to N Watch Tracker
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Sequential Movie & Series Viewing Order • Track Completed vs Pending
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={e => onUpdateFilter('searchQuery', e.target.value)}
                placeholder="Search movies, series, characters, Doom lore..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onUpdateFilter('searchQuery', '')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Stats Pill */}
            <button
              onClick={onOpenStatsModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-800/60 text-zinc-200 text-xs font-medium transition-all group shadow-sm"
              title="View Watch Progress & Time Analytics"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Progress</span>
              <span className="font-mono text-emerald-400 font-bold ml-0.5">
                {stats.percentComplete}%
              </span>
            </button>

            {/* Share Watchlist */}
            <button
              onClick={onOpenShareModal}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-800/60 text-zinc-200 text-xs font-medium transition-all group"
              title="Share or Copy Watchlist Progress"
            >
              <Share2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline">Share</span>
            </button>

            {/* Add Custom Title */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-zinc-950 font-semibold text-xs transition-all shadow-md shadow-emerald-950/60 hover:shadow-emerald-900/40"
              title="Add Custom Movie or Web Series to Watchlist"
            >
              <PlusCircle className="w-4 h-4 text-zinc-950" />
              <span className="hidden sm:inline">Add Title</span>
            </button>

            {/* Settings / Batch Dropdown Menu */}
            <div className="relative group/menu">
              <button
                className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-100 transition-colors"
                title="Tracking Options & Backups"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl invisible group-hover/menu:visible opacity-0 group-hover/menu:opacity-100 transition-all z-50 flex flex-col gap-1 text-xs">
                <div className="px-3 py-1.5 font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800/80">
                  Batch Watch Status
                </div>
                <button
                  onClick={onMarkAllDone}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-200 hover:text-emerald-300 transition-colors text-left"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Mark All as Completed</span>
                </button>
                <button
                  onClick={onMarkAllPending}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-200 hover:text-amber-300 transition-colors text-left"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Mark All as Pending</span>
                </button>
                <div className="px-3 py-1.5 font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800/80 mt-1">
                  Backup & Restore
                </div>
                <button
                  onClick={onExport}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-200 hover:text-cyan-300 transition-colors text-left"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Export JSON Backup</span>
                </button>
                <button
                  onClick={onImportClick}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-200 hover:text-indigo-300 transition-colors text-left"
                >
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Import JSON Backup</span>
                </button>
                <div className="border-t border-zinc-800/80 my-1" />
                <button
                  onClick={onReset}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-950/50 text-red-400 hover:text-red-300 transition-colors text-left"
                >
                  <RotateCcw className="w-4 h-4 text-red-400" />
                  <span>Reset All Progress</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
