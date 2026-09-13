'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  Circle, 
  Film, 
  Tv, 
  Clock, 
  ShieldAlert,
  Flame,
  Save
} from 'lucide-react';
import { WatchlistItem, UserItemData } from '../types/watchlist';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: (WatchlistItem & { displayNumber?: number }) | null;
  userData?: UserItemData;
  onSaveNotes: (id: string, notes: string) => void;
  onSetRating: (id: string, rating: number) => void;
  onToggleCompleted: (id: string) => void;
}

export function NotesModal({
  isOpen,
  onClose,
  item,
  userData,
  onSaveNotes,
  onSetRating,
  onToggleCompleted
}: NotesModalProps) {
  const [localNotes, setLocalNotes] = useState('');

  useEffect(() => {
    if (userData) {
      setLocalNotes(userData.notes || '');
    } else {
      setLocalNotes('');
    }
  }, [userData, item]);

  if (!isOpen || !item) return null;

  const isCompleted = !!userData?.completed;
  const rating = userData?.rating || 0;

  const handleSave = () => {
    onSaveNotes(item.id, localNotes);
    onClose();
  };

  const formatRuntime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m > 0 ? `${m}m` : ''}`.trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative w-full max-w-xl rounded-3xl bg-zinc-950 border border-emerald-900/60 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Item Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-emerald-800/60 flex items-center justify-center font-mono font-black text-emerald-400 text-base shrink-0 shadow-md">
            #{item.displayNumber || item.curatedRank}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-400 font-mono mb-1">
              <span>{item.type === 'movie' ? '🎬 Movie' : `📺 Series (${item.episodeCount} eps)`}</span>
              <span>•</span>
              <span>{item.releaseYear}</span>
              <span>•</span>
              <span>{formatRuntime(item.runtimeMinutes)}</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-100 leading-snug">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Quick Status & Rating Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 mb-6">
          
          {/* Status Toggle */}
          <button
            onClick={() => onToggleCompleted(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-md'
                : 'bg-zinc-950 border border-zinc-700 text-zinc-300 hover:border-emerald-500'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Status: Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-zinc-500" />
                <span>Status: Pending</span>
              </>
            )}
          </button>

          {/* 1-5 Star Rating */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-zinc-400 mr-1">Your Rating:</span>
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onClick={() => onSetRating(item.id, s)}
                className="focus:outline-none hover:scale-125 transition-transform p-0.5"
              >
                <Star
                  className={`w-5 h-5 ${
                    s <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700 hover:text-zinc-500'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Doomsday Connection Recap */}
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 mb-6 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
            <ShieldAlert className="w-4 h-4" />
            Doomsday Relevance & Lore
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {item.doomsdayRelevance}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.keyCharacters.map(char => (
              <span key={char} className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] text-zinc-300">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Notes & Thoughts Input Area */}
        <div className="space-y-2 mb-6">
          <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-300">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            Personal Notes / Watch Thoughts
          </label>
          <textarea
            rows={4}
            value={localNotes}
            onChange={e => setLocalNotes(e.target.value)}
            placeholder="Write your favorite scenes, multiverse theories, connections noticed, or review thoughts here..."
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-950/80"
          >
            <Save className="w-4 h-4 text-zinc-950" />
            Save Notes
          </button>
        </div>

      </div>
    </div>
  );
}
