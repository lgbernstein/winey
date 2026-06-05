# Grand Reveal Sequence — Design Spec
_2026-06-04_

## Overview

A host-controlled, scene-based reveal sequence that plays on the TV after the tasting ends. The host advances through five acts using large tap targets on their phone. Each act replaces the TV view entirely (scene-based, not overlaid). No per-guest rankings except The Sommelier.

---

## Sequence

| # | Host Button | TV Scene | Notes |
|---|---|---|---|
| 1 | The Sommelier | Spotlight — gold cup, winner name, correct guess count | Guest who identified the most grape varieties correctly |
| 2 | Top 3 Bottles | Podium — 3rd → 2nd → 1st revealed with flip animation | Ranked by average guest rating; others hidden |
| 3 | Reveal All | Full board in bag-number order, all bottles flip simultaneously | Bag-number order intentional — no ranking implied |
| 4 | How Did We Do? | Group grape accuracy — "Together you got X of 14" | Group win, no individual breakdown |
| 5 | The Numbers | Aggregate stats — bottles tasted, tasting notes, average rating | Closing credits feel |

---

## Architecture

### State persistence
Add `reveal_scene TEXT` column to `event_state` table (nullable). Existing `ALTER TABLE … ADD COLUMN` pattern used for backwards compatibility.

Values: `null | "sommelier" | "podium" | "reveal-all" | "group-accuracy" | "the-numbers"`

When `current_state` transitions away from `GRAND_REVEAL`, `reveal_scene` is reset to null.

### Server API
- `GET /api/state` — existing endpoint, add `revealScene` to response
- `POST /api/reveal-scene` — host-authenticated, sets `reveal_scene`. Body: `{ scene: string | null }`
- `GET /api/reveal-data` — returns all data needed for all scenes in one call (computed server-side, cached per request):
  - `sommelier`: `{ name, correctCount, totalBottles }`
  - `podium`: top 3 bottles by avg rating, with `bottleName, producer, grape, photoUrl, averageRating, bagNumber`
  - `revealAll`: all bottles sorted by `bagNumber`, full reveal data
  - `groupAccuracy`: `{ correct, total }` — count of entries where `grape_guess` matches bottle's actual `grape`
  - `theNumbers`: `{ bottleCount, entryCount, averageRating }`

### TV view rendering
When `current_state === "GRAND_REVEAL"`, TV renders `revealScene` instead of the live board:
- `null` → standby screen (trivia banner keeps running, no board)
- `"sommelier"` → `renderSommelierScene(revealData)`
- `"podium"` → `renderPodiumScene(revealData)` — client-side countdown auto-advances 3rd → 2nd → 1st with 2.5s delay between cards
- `"reveal-all"` → render board in bag-number order, trigger `triggerRevealFlip()` after mount
- `"group-accuracy"` → `renderGroupAccuracyScene(revealData)`
- `"the-numbers"` → `renderTheNumbersScene(revealData)`

Decoupling: `triggerRevealFlip()` currently auto-fires on any `GRAND_REVEAL` state change. Change: only fire when `reveal_scene === "reveal-all"` and not already triggered (`revealFlipDone` flag unchanged).

TV polls every 2s (unchanged). `revealData` is fetched once when TV first enters GRAND_REVEAL and cached client-side — no re-fetch per poll (data doesn't change mid-reveal).

### Host panel
New "Reveal Sequence" section appears when `current_state === "GRAND_REVEAL"`. Five large stacked buttons, full-width, minimum 64px tall:

```
[ 🏆 The Sommelier    ]
[ 🥇 Top 3 Bottles    ]
[ 🍷 Reveal All       ]
[ 🎯 How Did We Do?   ]
[ 📊 The Numbers      ]
```

Active scene button highlighted in gold. No confirmation dialog — buttons are large enough, and host can always re-tap to re-send the same scene.

---

## Scene Designs

### 1. The Sommelier
Full dark screen. Centered:
- Gold trophy icon (large, e.g. 80px emoji or SVG)
- Label: "The Sommelier"
- Winner's name (large, 3–4rem)
- Subtext: "Correctly identified X of Y grape varieties"

If tie: list all tied names. If nobody got any right: "The grapes kept their secrets tonight."

### 2. Top 3 Bottles (Podium)
Dark screen. Cards appear sequentially (2.5s between each):
- Card for 3rd place appears → pause → 2nd place → pause → 1st place (larger, more prominent)
- Each card: label photo (or bag number placeholder), bottle name, producer, grape, average rating (stars + number)
- 1st place card gets a gold border/glow

### 3. Reveal All
Full bottle grid, bag-number order (1 through N), same board layout as live view. All bottles flip simultaneously using existing `triggerRevealFlip()`. Bottles show: photo, name, producer, grape, rating.

### 4. How Did We Do?
Full screen, centered:
- Large number: "X / Y"
- Label: "grapes correctly identified"
- Subtext: contextual (≥70%: "Impressive palates in this room." 40–69%: "A respectable showing." <40%: "The wines kept their secrets well.")

### 5. The Numbers
Full screen, 3 stat cards side by side:
- Bottles tasted: N
- Tasting notes submitted: N
- Average rating: N.N / 5

---

## Grape Badge (already implemented)
Shows `count × Label` for the top-voted grape per bottle during LIVE_TASTING. Ties show multiple chips side by side. Implemented 2026-06-04.

---

## Tasting Notes Teaching Moment (Prototype & Decide)

Each revealed bottle card could include a "Your group detected:" section showing the top 2–3 aromas the group collectively noted for that wine, alongside a short line about what's typical for that grape (e.g., "Classic for Nebbiolo: earth, tar, dried roses").

Requires a small grape → typical aromas lookup table baked into the client.

**Decision gate:** Build 3 example cards during implementation, show to host, include or cut based on whether it reads naturally in the room.

---

## What's Not In Scope
- Per-guest ranking of any kind (except The Sommelier winner count)
- "Least favorite" wine callout
- Any stat that could embarrass a guest
- Podium sub-step host control (auto-timed 3rd→2nd→1st is sufficient)
