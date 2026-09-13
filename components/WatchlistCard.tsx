'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Film, 
  Tv, 
  Star, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  ArrowUp, 
  ArrowDown, 
  Trash2,
  Clock,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { WatchlistItem, UserItemData } from '../types/watchlist';

interface WatchlistCardProps {
  item: WatchlistItem & { displayNumber: number };
  userData?: UserItemData;
  isCustomOrder: boolean;
  onToggleCompleted: (id: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onOpenNotes: (item: WatchlistItem) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  onDeleteCustom?: (id: string) => void;
}

export function WatchlistCard({
  item,
  userData,
  isCustomOrder,
  onToggleCompleted,
  onSetRating,
  onOpenNotes,
  onReorder,
  onDeleteCustom
}: WatchlistCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = !!userData?.completed;
  const userRating = userData?.rating || 0;
  const userNotes = userData?.notes || '';

  const formatRuntime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m > 0 ? `${m}m` : ''}`.trim();
  };

  const getTierBadge = () => {
    switch (item.tier) {
      case 'essential':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-emerald-400 font-mono text-[11px] font-bold shadow-sm shadow-emerald-950">
            <Flame className="w-3 h-3 text-emerald-400" />
            Essential
          </span>
        );
      case 'recommended':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/90 border border-cyan-500/50 text-cyan-400 font-mono text-[11px] font-bold">
            <Star className="w-3 h-3 text-cyan-400" />
            Recommended
          </span>
        );
      case 'supplemental':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700/60 text-zinc-400 font-mono text-[11px]">
            Supplemental
          </span>
        );
    }
  };

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isCompleted
          ? 'bg-zinc-950/80 border-emerald-900/60 shadow-lg shadow-black/60'
          : 'bg-zinc-900/90 border-zinc-800/90 hover:border-emerald-700/60 shadow-xl shadow-black/80 hover:shadow-emerald-950/30'
      }`}
    >
      {/* Background Accent glow */}
      {isCompleted && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Main Content Body */}
      <div className="p-5 flex flex-col gap-4">
        
        {/* Top Header: 1 to N Sequence Badge, Type, Year & Watched Checkbox */}
        <div className="flex items-start justify-between gap-3">
          
          <div className="flex items-center gap-3">
            {/* 1 to N Sequential Watch Order Badge */}
            <div className={`px-2.5 py-1.5 rounded-xl flex flex-col items-center justify-center font-mono border shadow-md transition-all shrink-0 ${
              isCompleted
                ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100 group-hover:border-emerald-500 group-hover:text-emerald-300'
            }`}>
              <span className="text-[9px] uppercase tracking-wider font-bold opacity-75">Order</span>
              <span className="text-base font-black leading-none">#{item.displayNumber}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-medium text-zinc-400 flex items-center gap-1">
                  {item.type === 'movie' ? (
                    <>
                      <Film className="w-3.5 h-3.5 text-zinc-400" /> Movie
                    </>
                  ) : (
                    <>
                      <Tv className="w-3.5 h-3.5 text-purple-400" /> Series ({item.episodeCount} eps)
                    </>
                  )}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-mono text-zinc-400">{item.releaseYear}</span>
              </div>
              <h3 className={`font-bold text-base sm:text-lg leading-snug transition-colors ${
                isCompleted ? 'text-zinc-300' : 'text-zinc-100 group-hover:text-emerald-300'
              }`}>
                {item.title}
              </h3>
            </div>
          </div>

          {/* Quick Checkbox Button */}
          <button
            onClick={() => onToggleCompleted(item.id)}
            className={`shrink-0 px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 font-mono text-xs font-bold ${
              isCompleted
                ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300 hover:bg-emerald-900/60 shadow-md shadow-emerald-950'
                : 'bg-zinc-950/80 border border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-emerald-400 hover:bg-zinc-900'
            }`}
            title={isCompleted ? 'Click to mark as Pending' : 'Click to mark as Watched'}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-in zoom-in-50" />
                <span>COMPLETED</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-zinc-500" />
                <span>PENDING</span>
              </>
            )}
          </button>
        </div>

        {/* Phase, Tier & Watch Time Row */}
        <div className="flex flex-wrap items-center gap-2">
          {getTierBadge()}
          <span className="px-2 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            {item.phase}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-400 ml-auto">
            <Clock className="w-3 h-3 text-zinc-400" />
            {formatRuntime(item.runtimeMinutes)}
          </span>
        </div>

        {/* Doomsday Relevance Synopsis */}
        <div className="rounded-xl bg-zinc-950/60 border border-zinc-800/80 p-3.5 text-xs text-zinc-300 leading-relaxed">
          <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-[10px] uppercase font-bold text-emerald-400">
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-emerald-400" />
              Doomsday & Story Connection
            </span>
            <span className="text-zinc-500 font-normal">{item.whereToWatch}</span>
          </div>
          <p className={isExpanded ? 'text-zinc-300' : 'line-clamp-2 text-zinc-400'}>
            {item.doomsdayRelevance}
          </p>
          {item.doomsdayRelevance.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1.5 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" /> Read Full Lore Connection
                </>
              )}
            </button>
          )}
        </div>

        {/* Key Characters & Tags (Visible when expanded or teaser) */}
        {isExpanded && (
          <div className="space-y-2 pt-1 animate-in fade-in-50 duration-200">
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Key Characters</span>
              <div className="flex flex-wrap gap-1.5">
                {item.keyCharacters.map(char => (
                  <span key={char} className="px-2 py-0.5 rounded bg-zinc-800/80 text-[11px] text-zinc-300 font-medium">
                    {char}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Lore Elements</span>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-[10px] font-mono text-emerald-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Controls: Star Rating, Notes, Reorder, Custom actions */}
      <div className="px-5 py-3 bg-zinc-950/90 border-t border-zinc-800/80 flex items-center justify-between gap-3 text-xs">
        
        {/* Star Rating Control */}
        <div className="flex items-center gap-1" title="Rate this title (1 to 5 stars)">
          {[1, 2, 3, 4, 5].map(starValue => (
            <button
              key={starValue}
              onClick={() => onSetRating(item.id, starValue)}
              className="p-0.5 transition-transform hover:scale-125 focus:outline-none"
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  starValue <= userRating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-zinc-700 hover:text-zinc-500'
                }`}
              />
            </button>
          ))}
          {userRating > 0 && (
            <span className="font-mono text-[10px] text-amber-400 font-bold ml-1">
              {userRating}/5
            </span>
          )}
        </div>

        {/* Right Action Icons: Notes, Move Up/Down, Delete if custom */}
        <div className="flex items-center gap-2">
          
          {/* Notes Trigger */}
          <button
            onClick={() => onOpenNotes(item)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-colors ${
              userNotes.trim()
                ? 'bg-zinc-800 border-emerald-500/50 text-emerald-300'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title={userNotes ? 'View/Edit Notes' : 'Add Personal Notes'}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">
              {userNotes.trim() ? 'Notes' : 'Add Note'}
            </span>
          </button>

          {/* Reorder Buttons (Custom Sequence) */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => onReorder(item.id, 'up')}
              className="p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded"
              title="Move Up in Sequence"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => onReorder(item.id, 'down')}
              className="p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded"
              title="Move Down in Sequence"
            >
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>

          {/* Delete Button (for user-added custom items) */}
          {item.isCustom && onDeleteCustom && (
            <button
              onClick={() => onDeleteCustom(item.id)}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/60 border border-zinc-800 hover:border-red-800 text-zinc-400 hover:text-red-400 transition-colors"
              title="Delete Custom Item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
