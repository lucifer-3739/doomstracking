'use client';

import React, { useState } from 'react';
import { X, Share2, Copy, Check, Sparkles } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryText: string;
}

export function ShareModal({ isOpen, onClose, summaryText }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-emerald-900/60 p-6 sm:p-8 shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Share Your Watchlist</h2>
            <p className="text-xs text-zinc-400">Copy your 1-to-N progress summary to share with friends</p>
          </div>
        </div>

        {/* Text Preview Box */}
        <div className="mb-5">
          <textarea
            readOnly
            rows={10}
            value={summaryText}
            className="w-full p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-zinc-200 text-xs font-mono leading-relaxed focus:outline-none select-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-950/80"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-zinc-950" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-950" />
                Copy Summary Text
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
