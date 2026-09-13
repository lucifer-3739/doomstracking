'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, ShieldCheck, Film, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: 'What is the optimal watch order to prepare for Avengers: Doomsday?',
    a: 'To fully understand Avengers: Doomsday, you need a 1-to-N sequential roadmap covering 3 key pillars: (1) Foundational Stark Arc (Iron Man, Civil War, Endgame) to understand Robert Downey Jr.’s emotional legacy; (2) Multiverse & Incursion Arc (Loki Seasons 1 & 2, Spider-Man: No Way Home, Doctor Strange in the Multiverse of Madness, Deadpool & Wolverine) to understand the collapse of timelines; and (3) Phase 5 & 6 Direct Lead-ins (Captain America: Brave New World, Thunderbolts*, and The Fantastic Four: First Steps).'
  },
  {
    q: 'How does Robert Downey Jr. return as Doctor Doom in Avengers: Doomsday?',
    a: 'At San Diego Comic-Con 2024, Marvel Studios announced that Robert Downey Jr. is returning to the MCU to portray Victor von Doom (Doctor Doom), directed by Anthony and Joe Russo (the Russo Brothers). Rather than Tony Stark, Doom is a distinct, formidable multiversal sovereign and sorcerer-scientist from Latveria who serves as the central antagonist leading into Avengers: Secret Wars.'
  },
  {
    q: 'What are Incursions and why are they central to Avengers: Doomsday?',
    a: 'Introduced in Doctor Strange in the Multiverse of Madness and Jonathan Hickman’s comic Secret Wars run, an Incursion occurs when the boundary between two colliding universes collapses, obliterating both realities unless one is destroyed. In Avengers: Doomsday, multiple universe incursions converge to threaten all existence, driving Doctor Doom to forge a new reality (Battleworld).'
  },
  {
    q: 'Which Disney+ web series are required viewing before Avengers: Doomsday?',
    a: 'The most essential Disney+ series is Loki (Season 1 & Season 2), which introduces the TVA, timeline branching, and concludes with Loki holding the Multiverse together as the God of Stories. Other recommended series include WandaVision (Chaos Magic & Darkhold), Agatha All Along (Witches’ Road & Billy Maximoff / Wiccan), and What If...? (alternate reality variants).'
  },
  {
    q: 'Do I need to watch Fox Marvel / X-Men movies before Doomsday?',
    a: 'While not mandatory, legacy titles like Fantastic Four (2005), X-Men: Days of Future Past, and Deadpool & Wolverine provide rich context for how legacy multiverse timelines collide with the main MCU Sacred Timeline ahead of Secret Wars.'
  }
];

export function SeoFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-16 pt-12 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Official Viewing Guide & FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
            Frequently Asked Questions • Road to Avengers: Doomsday
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about the 1-to-N viewing sequence, Doctor Doom lore, and multiverse timeline connections.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-zinc-100 hover:text-emerald-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SEO Lore Summary Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 border border-emerald-800/50 text-xs text-zinc-300 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-emerald-400">
            <Sparkles className="w-4 h-4" />
            About This 1-to-N Watch Tracker
          </div>
          <p className="leading-relaxed">
            The <strong>Road to Doomsday MCU Watch Order</strong> is specifically curated for fans and newcomers seeking the most coherent, story-rich pathway to <em>Avengers: Doomsday (2026)</em> and <em>Avengers: Secret Wars (2027)</em>. Track your completion progress in real-time, view total remaining watch time, and discover why each movie and series matters for the rise of Victor von Doom.
          </p>
        </div>

      </div>
    </section>
  );
}
