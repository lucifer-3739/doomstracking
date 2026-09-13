'use client';

import React, { useState } from 'react';
import { X, PlusCircle, Film, Tv, Sparkles } from 'lucide-react';
import { ImportanceTier, MediaType, Phase, WatchlistItem } from '../types/watchlist';

interface AddCustomItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<WatchlistItem, 'id' | 'curatedRank' | 'chronologicalRank' | 'releaseRank' | 'isCustom'>) => void;
}

export function AddCustomItemModal({ isOpen, onClose, onAdd }: AddCustomItemModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MediaType>('movie');
  const [releaseYear, setReleaseYear] = useState<number>(2025);
  const [phase, setPhase] = useState<Phase>('Multiverse Saga (Phase 5)');
  const [tier, setTier] = useState<ImportanceTier>('recommended');
  const [runtimeMinutes, setRuntimeMinutes] = useState<number>(120);
  const [episodeCount, setEpisodeCount] = useState<number>(6);
  const [doomsdayRelevance, setDoomsdayRelevance] = useState('');
  const [charactersInput, setCharactersInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [whereToWatch, setWhereToWatch] = useState('Disney+');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      type,
      releaseYear: Number(releaseYear) || new Date().getFullYear(),
      phase,
      tier,
      runtimeMinutes: Number(runtimeMinutes) || (type === 'movie' ? 120 : 240),
      episodeCount: type === 'series' ? Number(episodeCount) || 6 : undefined,
      posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      doomsdayRelevance: doomsdayRelevance.trim() || 'Custom tracked title for the Road to Doomsday.',
      keyCharacters: charactersInput.split(',').map(s => s.trim()).filter(Boolean),
      tags: tagsInput.split(',').map(s => s.trim()).filter(Boolean),
      whereToWatch: whereToWatch.trim() || 'Disney+'
    });

    // Reset & close
    setTitle('');
    setDoomsdayRelevance('');
    setCharactersInput('');
    setTagsInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-emerald-900/60 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Add Custom Title</h2>
            <p className="text-xs text-zinc-400">Add a custom movie, web series, fan-cut, or comic run to your 1-to-N tracker</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Title */}
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Ironheart / Fantastic Four 1994 / Avengers: Secret Wars"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          {/* Type & Year */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Media Type</label>
              <div className="grid grid-cols-2 gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setType('movie')}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1 font-medium transition-colors ${
                    type === 'movie' ? 'bg-zinc-800 text-emerald-300 font-bold shadow-sm' : 'text-zinc-400'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" /> Movie
                </button>
                <button
                  type="button"
                  onClick={() => setType('series')}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1 font-medium transition-colors ${
                    type === 'series' ? 'bg-zinc-800 text-purple-300 font-bold shadow-sm' : 'text-zinc-400'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" /> Series
                </button>
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Release Year</label>
              <input
                type="number"
                value={releaseYear}
                onChange={e => setReleaseYear(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Tier & Phase */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Importance Tier</label>
              <select
                value={tier}
                onChange={e => setTier(e.target.value as ImportanceTier)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="essential">🔥 Essential (Must Watch)</option>
                <option value="recommended">⭐ Recommended (Context)</option>
                <option value="supplemental">📘 Supplemental (Bonus)</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Phase / Saga</label>
              <select
                value={phase}
                onChange={e => setPhase(e.target.value as Phase)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Infinity Saga (Phase 1-3)">Infinity Saga (Phase 1-3)</option>
                <option value="Multiverse Saga (Phase 4)">Multiverse Saga (Phase 4)</option>
                <option value="Multiverse Saga (Phase 5)">Multiverse Saga (Phase 5)</option>
                <option value="Multiverse Saga (Phase 6)">Multiverse Saga (Phase 6)</option>
                <option value="Legacy / Multiverse Adjacent">Legacy / Multiverse Adjacent</option>
              </select>
            </div>
          </div>

          {/* Runtime & Episodes */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Total Runtime (Minutes)</label>
              <input
                type="number"
                value={runtimeMinutes}
                onChange={e => setRuntimeMinutes(Number(e.target.value))}
                placeholder="120"
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {type === 'series' ? (
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Episode Count</label>
                <input
                  type="number"
                  value={episodeCount}
                  onChange={e => setEpisodeCount(Number(e.target.value))}
                  placeholder="6"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Streaming Platform</label>
                <input
                  type="text"
                  value={whereToWatch}
                  onChange={e => setWhereToWatch(e.target.value)}
                  placeholder="Disney+ / Theaters"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Doomsday Connection */}
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Doomsday / Multiverse Relevance</label>
            <textarea
              rows={3}
              value={doomsdayRelevance}
              onChange={e => setDoomsdayRelevance(e.target.value)}
              placeholder="Why does this title matter for Avengers: Doomsday or Secret Wars?"
              className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          {/* Key Characters & Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Key Characters (comma separated)</label>
              <input
                type="text"
                value={charactersInput}
                onChange={e => setCharactersInput(e.target.value)}
                placeholder="Doctor Doom, Kang, Reed Richards"
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="Incursions, TVA, Battleworld"
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-zinc-950 font-bold transition-all shadow-lg shadow-emerald-950/80 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-zinc-950" />
              Add to Watchlist
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
