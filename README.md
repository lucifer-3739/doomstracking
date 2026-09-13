# 🛡️ Road to Doomsday: 1-to-N MCU Movie & Web Series Watch Tracker

A modern, responsive web application designed to **track your sequential viewing progress** through Marvel Cinematic Universe movies and Disney+ web series numbered in proper order from **1 to N** leading directly into **Avengers: Doomsday** and **Secret Wars**.

![Road to Doomsday Tracker](https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **Sequential 1-to-N Viewing Order**: Every title is clearly numbered (#1 to #N) in sequential order leading up to *Avengers: Doomsday*.
- **Watched vs Pending Tracking**: 1-click status checkboxes to easily track what you have completed and what is pending.
- **Progress Dashboard**: Real-time progress bar, percentage completion, completed watch time vs remaining watch time.
- **Next in Sequence Hero Spotlight**: Automatically identifies and highlights the immediate next movie or series to watch.
- **Multiple Order Presets**:
  - 👑 **Recommended Story Order (1 to N)**: Curated narrative arc for Doctor Doom, Multiverse Incursions, and Stark legacy.
  - ⏳ **MCU Chronological Timeline Order**: In-universe chronological timeline.
  - 📅 **Release Date Order**: Release order from 2008 onwards.
  - ⚡ **Essential Speedrun**: Core essential storylines only.
  - 🔀 **Custom Sequential Order**: Reorder titles up/down to customize your personal sequence.
- **Filtering & Search**: Filter by Status (Pending/Completed), Media Type (Movie/Series), Importance Tier (Essential/Recommended/Supplemental), and Saga/Phase.
- **Personal Notes & Star Ratings**: Add personal ratings (1-5 stars) and thoughts/reviews for any title.
- **Custom Additions**: Add custom movies, fan-cuts, series, or comic runs.
- **Local Storage Persistence**: Auto-saves your progress locally in your browser.
- **Export / Import & Share**: Download JSON backups or copy shareable markdown summaries.

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the tracker.

---

## 🛠️ Built With

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
