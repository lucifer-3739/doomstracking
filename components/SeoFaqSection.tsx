'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, ShieldCheck, Film, Sparkles, Layers, ListOrdered } from 'lucide-react';

const FAQS = [
  {
    q: 'What is the optimal 1-to-N watch order to prepare for Avengers: Doomsday?',
    a: 'The optimal Road to Doomsday watch order follows a curated 1-to-N sequence structured into 3 distinct narrative phases: (1) The Foundational Iron Man & Infinity Saga Arc (Iron Man, The Avengers, Age of Ultron, Civil War, Infinity War, Endgame) to understand Tony Stark\'s legacy and Robert Downey Jr.\'s dramatic resonance; (2) The Multiverse & Incursion Arc (Loki Seasons 1 & 2, WandaVision, What If...?, Spider-Man: No Way Home, Doctor Strange in the Multiverse of Madness, Deadpool & Wolverine, Agatha All Along) to grasp how the multiverse is fracturing; and (3) The Direct Phase 5 & 6 Lead-Ins (Captain America: Brave New World, Thunderbolts*, and The Fantastic Four: First Steps) leading straight into Avengers: Doomsday (May 2026).'
  },
  {
    q: 'Why is Robert Downey Jr. playing Doctor Doom instead of Iron Man?',
    a: 'At San Diego Comic-Con 2024, Marvel Studios and the Russo Brothers announced Robert Downey Jr. will portray Victor von Doom (Doctor Doom) in Avengers: Doomsday and Avengers: Secret Wars. Victor von Doom is a sovereign monarch and master of both supreme science and dark sorcery from the nation of Latveria. His character serves as a profound multiversal dark reflection to Tony Stark, testing Earth’s Mightiest Heroes with an antagonist wielding peerless intellect and cosmic ambition.'
  },
  {
    q: 'What are Incursions and how do they lead to Avengers: Doomsday and Secret Wars?',
    a: 'An Incursion is a catastrophic multiversal event where two alternate universes collide, destroying both realities at the point of impact unless one universe is eliminated. Incursions were introduced in Doctor Strange in the Multiverse of Madness (Earth-838 Illuminati) and are the driving catalyst in Jonathan Hickman\'s iconic Marvel comic run. In Avengers: Doomsday, widespread multiversal incursions collapse reality, prompting Doctor Doom to take drastic measures to consolidate existence into Battleworld.'
  },
  {
    q: 'Which Disney+ web series are strictly essential before Avengers: Doomsday?',
    a: 'The most essential Disney+ series is Loki (Season 1 and Season 2). Loki introduces the TVA, timelines, and concludes with Loki sacrificing his freedom to hold the entire multiverse together as the God of Stories atop the Yggdrasil World Tree. Other highly recommended series include WandaVision (Darkhold & Scarlet Witch\'s reality warping) and Agatha All Along (Witches\' Road & Wiccan\'s mystical revival).'
  },
  {
    q: 'Do I need to watch The Fantastic Four: First Steps before Avengers: Doomsday?',
    a: 'Yes, The Fantastic Four: First Steps (July 2025) is the primary thematic and character lead-in to Avengers: Doomsday. It introduces Pedro Pascal as Reed Richards (Mister Fantastic), Vanessa Kirby as Sue Storm, Joseph Quinn as Johnny Storm, and Ebon Moss-Bachrach as Ben Grimm in an alternate 1960s universe, establishing the primary rivalry with Victor von Doom before they collide in Doomsday.'
  },
  {
    q: 'Where can I stream and watch MCU movies and series before Avengers: Doomsday?',
    a: 'The majority of Marvel Cinematic Universe movies and all original Marvel web series (Loki, WandaVision, Agatha All Along) are available to stream on Disney+. Sony\'s Spider-Man: No Way Home is available across Starz, Apple TV, and Amazon Prime Video. Upcoming films including Captain America: Brave New World, Thunderbolts*, and The Fantastic Four: First Steps release in movie theaters first before landing on streaming services.'
  },
  {
    q: 'What is the speedrun or shortest essential watch order for Avengers: Doomsday?',
    a: 'If you want the fastest route, focus on the 14 Essential tier titles: Iron Man, Captain America: Civil War, Avengers: Infinity War, Avengers: Endgame, Loki (Seasons 1 & 2), WandaVision, Spider-Man: No Way Home, Doctor Strange in the Multiverse of Madness, Deadpool & Wolverine, Captain America: Brave New World, Thunderbolts*, The Fantastic Four: First Steps, and Avengers: Doomsday. This cuts your viewing time in half while retaining 100% of the core multiverse and Doom storylines.'
  },
  {
    q: 'What is the release date for Avengers: Doomsday and Avengers: Secret Wars?',
    a: 'Avengers: Doomsday is scheduled for global theatrical release on May 1, 2026. It will be followed one year later by the grand Multiverse Saga finale, Avengers: Secret Wars, on May 7, 2027, both directed by Anthony and Joe Russo.'
  }
];

export function SeoFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mt-16 pt-12 border-t border-zinc-900 scroll-mt-24">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Heading with Semantic Keywords */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Complete MCU Watch Order Guide & FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-100 tracking-tight">
            How to Watch Marvel Movies & Web Series for Avengers: Doomsday
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The definitive 1-to-N sequential roadmap covering essential Marvel Cinematic Universe movies, Disney+ series, Doctor Doom lore, and multiverse incursion storylines.
          </p>
        </div>

        {/* Phase Breakdown Summary Cards for Rich Semantic Google Crawling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 uppercase">
              <span className="w-5 h-5 rounded-md bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-[11px]">1</span>
              <span>Pillar I: Stark & Russo Roots</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-200">The Foundational Legacy</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <em>Iron Man</em>, <em>Civil War</em>, <em>Infinity War</em>, and <em>Endgame</em> establish the heroic framework and technological brilliance that Victor von Doom directly mirrors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase">
              <span className="w-5 h-5 rounded-md bg-blue-950 border border-cyan-700/60 flex items-center justify-center text-[11px]">2</span>
              <span>Pillar II: Multiverse & Incursions</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-200">Fractured Timelines & The TVA</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <em>Loki S1-S2</em>, <em>No Way Home</em>, <em>Multiverse of Madness</em>, and <em>Deadpool & Wolverine</em> introduce timeline branching, anchor beings, and universal collisions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
              <span className="w-5 h-5 rounded-md bg-amber-950 border border-amber-700/60 flex items-center justify-center text-[11px]">3</span>
              <span>Pillar III: The Road to Doom</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-200">Phase 5 & 6 Climax</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              <em>Captain America: Brave New World</em>, <em>Thunderbolts*</em>, and <em>The Fantastic Four: First Steps</em> lead straight into the epic clash of <em>Avengers: Doomsday (2026)</em>.
            </p>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 pt-2">
          <h3 className="text-base font-bold text-zinc-200 font-mono flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            Frequently Asked Questions About Avengers: Doomsday
          </h3>

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
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-3.5 space-y-2">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SEO Lore Summary Card */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 border border-emerald-800/50 text-xs text-zinc-300 space-y-3.5">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-emerald-400">
            <Sparkles className="w-4 h-4" />
            About the Road to Doomsday 1-to-N MCU Watch Tracker
          </div>
          <p className="leading-relaxed">
            The <strong>Road to Doomsday MCU Watch Order Tracker</strong> (<a href="https://doomstracking.vercel.app" className="text-emerald-400 underline hover:text-emerald-300">doomstracking.vercel.app</a>) gives Marvel fans a complete, interactive viewing checklist numbered from <strong>1 to N</strong>. It calculates your exact completed watch time vs hours remaining, tracks watched vs pending titles, saves your progress in your browser, and explains the critical Doctor Doom and Secret Wars lore behind each release.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-zinc-400">
            <span className="px-2 py-1 rounded bg-zinc-800/80">#AvengersDoomsday</span>
            <span className="px-2 py-1 rounded bg-zinc-800/80">#DoctorDoom</span>
            <span className="px-2 py-1 rounded bg-zinc-800/80">#MCUWatchOrder</span>
            <span className="px-2 py-1 rounded bg-zinc-800/80">#RobertDowneyJr</span>
            <span className="px-2 py-1 rounded bg-zinc-800/80">#FantasticFourFirstSteps</span>
            <span className="px-2 py-1 rounded bg-zinc-800/80">#SecretWars</span>
          </div>
        </div>

      </div>
    </section>
  );
}
