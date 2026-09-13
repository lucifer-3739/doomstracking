'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Film, 
  Tv, 
  Star, 
  MessageSquare, 
  ArrowUp, 
  ArrowDown, 
  Trash2,
  Flame
} from 'lucide-react';
import { WatchlistItem, UserItemData } from '../types/watchlist';

interface WatchlistTableProps {
  items: (WatchlistItem & { displayNumber: number })[];
  userProgress: Record<string, UserItemData>;
  onToggleCompleted: (id: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onOpenNotes: (item: WatchlistItem) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  onDeleteCustom?: (id: string) => void;
}

export function WatchlistTable({
  items,
  userProgress,
  onToggleCompleted,
  onSetRating,
  onOpenNotes,
  onReorder,
  onDeleteCustom
}: WatchlistTableProps) {
  const formatRuntime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m > 0 ? `${m}m` : ''}`.trim();
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl">
      <table className="w-full text-left text-xs border-collapse">
        
        {/* Table Header */}
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/90 text-zinc-400 font-mono uppercase text-[11px] tracking-wider">
            <th className="py-3.5 px-4 w-24 text-center">Watch Order</th>
            <th className="py-3.5 px-3 w-32 text-center">Watch Status</th>
            <th className="py-3.5 px-4">Movie / Series Title</th>
            <th className="py-3.5 px-3">Year</th>
            <th className="py-3.5 px-3">Tier</th>
            <th className="py-3.5 px-3">Runtime</th>
            <th className="py-3.5 px-4">Story & Doomsday Connection</th>
            <th className="py-3.5 px-3 text-center">Rating</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-zinc-850">
          {items.map(item => {
            const userData = userProgress[item.id];
            const isCompleted = !!userData?.completed;
            const rating = userData?.rating || 0;
            const hasNotes = !!userData?.notes?.trim();

            return (
              <tr
                key={item.id}
                className={`transition-colors hover:bg-zinc-900/60 ${
                  isCompleted ? 'bg-zinc-950/40 text-zinc-400' : 'text-zinc-200'
                }`}
              >
                
                {/* 1 to N Watch Order Number */}
                <td className="py-3.5 px-4 text-center font-mono font-bold">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs border ${
                    isCompleted
                      ? 'bg-emerald-950 border-emerald-800/60 text-emerald-400'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-100'
                  }`}>
                    #{item.displayNumber}
                  </span>
                </td>

                {/* Watched / Pending Status Toggle */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    onClick={() => onToggleCompleted(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all ${
                      isCompleted
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-emerald-400'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Watched</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Pending</span>
                      </>
                    )}
                  </button>
                </td>

                {/* Title & Media Type */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-zinc-100 flex items-center gap-2 text-sm">
                    <span>{item.title}</span>
                    {item.isCustom && (
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 font-mono">
                        Custom
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 mt-0.5">
                    {item.type === 'movie' ? (
                      <span className="flex items-center gap-1">
                        <Film className="w-3 h-3 text-zinc-400" /> Movie
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-purple-400">
                        <Tv className="w-3 h-3" /> Series ({item.episodeCount} eps)
                      </span>
                    )}
                    <span>•</span>
                    <span className="text-zinc-500">{item.whereToWatch}</span>
                  </div>
                </td>

                {/* Year */}
                <td className="py-3.5 px-3 font-mono text-zinc-400">
                  {item.releaseYear}
                </td>

                {/* Tier */}
                <td className="py-3.5 px-3">
                  {item.tier === 'essential' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-400 font-mono text-[10px] font-bold">
                      <Flame className="w-2.5 h-2.5 text-emerald-400" /> Essential
                    </span>
                  ) : item.tier === 'recommended' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-950 border border-cyan-500/50 text-cyan-400 font-mono text-[10px]">
                      Recommended
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 font-mono text-[10px]">
                      Supplemental
                    </span>
                  )}
                </td>

                {/* Runtime */}
                <td className="py-3.5 px-3 font-mono text-zinc-400 whitespace-nowrap">
                  {formatRuntime(item.runtimeMinutes)}
                </td>

                {/* Doomsday Connection */}
                <td className="py-3.5 px-4 max-w-xs">
                  <p className="line-clamp-2 text-zinc-400 text-[11px] leading-relaxed">
                    {item.doomsdayRelevance}
                  </p>
                </td>

                {/* Star Rating */}
                <td className="py-3.5 px-3 text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        onClick={() => onSetRating(item.id, s)}
                        className="focus:outline-none hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-3 h-3 ${
                            s <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-700 hover:text-zinc-500'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </td>

                {/* Actions: Notes, Reorder, Delete */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    
                    {/* Notes Button */}
                    <button
                      onClick={() => onOpenNotes(item)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        hasNotes
                          ? 'bg-zinc-800 border-emerald-500/50 text-emerald-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                      title={hasNotes ? 'View/Edit Notes' : 'Add Notes'}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>

                    {/* Reorder */}
                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg">
                      <button
                        onClick={() => onReorder(item.id, 'up')}
                        className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-l"
                        title="Move Up in Order"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onReorder(item.id, 'down')}
                        className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-r"
                        title="Move Down in Order"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete custom item */}
                    {item.isCustom && onDeleteCustom && (
                      <button
                        onClick={() => onDeleteCustom(item.id)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/60 border border-zinc-800 hover:border-red-800 text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete custom title"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                  </div>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}
