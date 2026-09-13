'use client';

import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldAlert, 
  Sparkles, 
  AlertCircle,
  ListOrdered
} from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';
import { WatchlistItem } from '../types/watchlist';
import { Navbar } from '../components/Navbar';
import { ProgressBanner } from '../components/ProgressBanner';
import { FilterBar } from '../components/FilterBar';
import { WatchlistCard } from '../components/WatchlistCard';
import { WatchlistTable } from '../components/WatchlistTable';
import { AddCustomItemModal } from '../components/AddCustomItemModal';
import { StatsSummaryModal } from '../components/StatsSummaryModal';
import { ShareModal } from '../components/ShareModal';
import { NotesModal } from '../components/NotesModal';
import { StructuredData } from '../components/StructuredData';
import { SeoFaqSection } from '../components/SeoFaqSection';

export default function Home() {
  const {
    isClient,
    allItems,
    items,
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
  } = useWatchlist();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeNotesItem, setActiveNotesItem] = useState<WatchlistItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Confetti trigger on completing an item
  const handleToggleCompletedWithCelebration = (id: string) => {
    const isCurrentlyDone = !!userProgress[id]?.completed;
    toggleCompleted(id);

    if (!isCurrentlyDone && typeof window !== 'undefined') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#059669', '#34d399', '#064e3b', '#6ee7b7']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  // Import JSON handler
  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importData(content);
        alert(result.message);
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleResetConfirm = () => {
    if (confirm('Are you sure you want to reset all progress and custom additions? This will return the tracker to its default state.')) {
      resetToDefault();
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 font-mono">
        <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center animate-pulse mb-4">
          <ShieldAlert className="w-6 h-6 text-emerald-400" />
        </div>
        <p className="text-sm">Initiating Watch Order Tracking Database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-grid flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* Schema.org Structured Data for Google Rich Snippets */}
      <StructuredData />

      {/* Hidden File Input for JSON restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Top Sticky Header */}
      <Navbar
        stats={stats}
        filters={filters}
        onUpdateFilter={updateFilter}
        onOpenStatsModal={() => setIsStatsModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onExport={exportData}
        onImportClick={() => fileInputRef.current?.click()}
        onReset={handleResetConfirm}
        onMarkAllDone={markAllCompleted}
        onMarkAllPending={markAllPending}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress HUD Banner */}
        <ProgressBanner
          stats={stats}
          nextUpItem={nextUpItem}
          onToggleNextUp={handleToggleCompletedWithCelebration}
          onSelectNextUp={item => setActiveNotesItem(item)}
        />

        {/* Filters & Order Control Bar */}
        <FilterBar
          filters={filters}
          stats={stats}
          viewMode={viewMode}
          onUpdateFilter={updateFilter}
          onSetViewMode={setViewMode}
        />

        {/* Active List Summary Row */}
        <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span>
              Showing <span className="text-emerald-400 font-bold">{items.length}</span> of {allItems.length} titles
            </span>
            {filters.searchQuery && (
              <span className="text-zinc-300">
                matching <span className="text-emerald-300 italic">&quot;{filters.searchQuery}&quot;</span>
              </span>
            )}
          </div>

          <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5 hidden sm:flex">
            <ListOrdered className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sequential Order #1 to #{items.length}</span>
          </div>
        </div>

        {/* Watchlist Presentation: Grid vs Table */}
        {items.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-12 text-center my-8">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-zinc-200 mb-1">No titles found</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto mb-4">
              No movies or series match your current filter and search criteria.
            </p>
            <button
              onClick={() => {
                updateFilter('status', 'all');
                updateFilter('type', 'all');
                updateFilter('tier', 'all');
                updateFilter('phase', 'all');
                updateFilter('searchQuery', '');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-600/50 text-emerald-400 hover:bg-emerald-900/60 text-xs font-semibold font-mono transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(item => (
              <WatchlistCard
                key={item.id}
                item={item}
                userData={userProgress[item.id]}
                isCustomOrder={filters.sortBy === 'custom'}
                onToggleCompleted={handleToggleCompletedWithCelebration}
                onSetRating={setRating}
                onOpenNotes={item => setActiveNotesItem(item)}
                onReorder={reorderItem}
                onDeleteCustom={deleteCustomItem}
              />
            ))}
          </div>
        ) : (
          <WatchlistTable
            items={items}
            userProgress={userProgress}
            onToggleCompleted={handleToggleCompletedWithCelebration}
            onSetRating={setRating}
            onOpenNotes={item => setActiveNotesItem(item)}
            onReorder={reorderItem}
            onDeleteCustom={deleteCustomItem}
          />
        )}

        {/* SEO FAQ & Lore Breakdown Section */}
        <SeoFaqSection />

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
            <span className="text-zinc-400 font-semibold">Road to Avengers: Doomsday</span>
            <span>•</span>
            <span>1 to N Movie & Series Watch Order Tracker</span>
          </div>
          <p className="text-[11px] text-center sm:text-right">
            Curated sequential viewing guide for Doctor Doom, Robert Downey Jr & The Multiverse Saga
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AddCustomItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addCustomItem}
      />

      <StatsSummaryModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        stats={stats}
        allItems={allItems}
        userProgress={userProgress}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        summaryText={getShareSummaryText()}
      />

      <NotesModal
        isOpen={!!activeNotesItem}
        onClose={() => setActiveNotesItem(null)}
        item={activeNotesItem}
        userData={activeNotesItem ? userProgress[activeNotesItem.id] : undefined}
        onSaveNotes={setNotes}
        onSetRating={setRating}
        onToggleCompleted={handleToggleCompletedWithCelebration}
      />

    </div>
  );
}
