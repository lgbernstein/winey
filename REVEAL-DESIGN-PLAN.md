# Grand Reveal — Design Plan

*Designer pass on the six TV reveal scenes. Plan only — no code yet.*
*Constraint honored throughout: only the Grape Genius (Vine Whisperer) gets a personal spotlight. No scene ranks guests against each other or singles anyone out for a bad guess. All "how did we do" framing is about the **room**, never an individual.*

---

## 1. Why it falls flat right now

The bones are good — but every scene reads as a *slide*, not a *moment*. Five specific reasons:

1. **Emoji are doing the heavy lifting.** 🍷 🏆 🎯 at 8–14rem are the visual hero of three scenes. On a 55"+ TV across a candlelit room they look like placeholders, not production design. They also render differently on every device/OS.
2. **Every background is the same flat `stone-950`.** No depth, no atmosphere, no sense of occasion. A reveal should feel like the lights dimmed.
3. **The two celebration moments don't celebrate.** The Vine Whisperer (the single sanctioned "winner" of the night) and the #1 Crowd Favorite both just *appear*. No build, no glow, no payoff.
4. **No transitions between scenes.** The host clicks, the screen hard-cuts. The sequence feels like clicking through a folder, not watching a show.
5. **The type scale is inconsistent.** Heroes range 5xl→8xl→7rem→5.5rem with no shared rhythm; kickers and subs vary; two scenes (The Numbers, the consensus grid) fall back to inline styles and a different look entirely.

The fix is **one cohesive cinematic system** applied to all six, with two scenes promoted to genuine "moments."

---

## 2. Aesthetic direction

**"The cellar, after hours — a private screening."**

Warm, low-key, editorial wine-cellar lighting meets a tasteful awards-show finale. Refined, not loud. The room is dark; the screen is the candle. Every scene shares a vocabulary so the whole reveal feels authored.

Three words to hold the line against generic output: **cinematic, warm, deliberate.**

---

## 3. Shared design system (build this first — it carries every scene)

**A. Atmospheric background (replaces flat `stone-950` everywhere)**
- A near-black base with a slow, barely-perceptible warm radial glow drifting behind the content (like the kiosk's existing radial, but slower and deeper). Deep wine-burgundy bleeding into black at the edges — a vignette that frames the content and hides TV-edge glare.
- Optional fine film-grain/noise overlay at very low opacity for texture (kills the "flat digital" feel). One shared layer behind all scenes.
- This single change does the most work. It makes the screen feel *lit* instead of *off*.

**B. Type scale (one rhythm for all six scenes)**
- Pick a **distinctive display face** for heroes and kickers — something with character and editorial weight (a high-contrast serif reads as "wine/luxury"; a confident condensed sans reads as "broadcast"). NOT the system stack the scenes use now.
- Define four roles, used identically everywhere: `kicker` (small, uppercase, tracked, amber) → `hero` (the one big thing) → `support` (name/meta) → `cue` (quiet footer line).
- Lock one hero size so a winner name, a podium name, and a big stat all feel like they belong to the same show.

**C. Color tokens**
- Keep amber as the accent — it's right for wine — but introduce one deeper gold for "winner/celebration" states and a muted parchment for body text so it's not all the same amber. Dominant dark + warm metallic accent. Define as CSS variables so all scenes share them.

**D. Iconography — retire the emoji**
- Replace 🍷/🏆/🎯 with a small set of consistent line/metallic marks (a wine mark, a laurel/wreath for the winner, a target). Even a single elegant SVG wreath used for the winner moments would lift the whole thing. If we keep any emoji, contain it in a styled "medallion" so it reads as intentional.

**E. Scene transitions (the thing that makes it a "show")**
- A shared crossfade + slight scale on scene change (old scene fades/contracts, new scene fades/rises). ~500–700ms, eased. One mechanism, applied globally to the reveal container, so *every* host click feels directed.

**F. Motion primitives (reused, not per-scene one-offs)**
- `rise-in` (content lifts + fades on enter), `count-up` (numbers tick to value), `glow-pulse` (for winner emphasis), `shimmer` (a one-time light sweep across a hero). Define once; apply per scene.

---

## 4. Per-scene plan

### Scene 1 — Grand Standby (holding screen)
*Current: bobbing 🍷 (14rem), "The Grand Reveal" 7rem, rotating quip, cue line.*

- **Keep:** the rotating quips — they're genuinely funny and set the tone. The "gather round" cue.
- **Fix:** the bobbing emoji is the weakest hero in the deck. Replace with the atmospheric background doing the work + a refined wordmark treatment of "The Grand Reveal." If we keep a glass, make it a single elegant SVG/silhouette with a slow light glint, not a bouncing emoji.
- **Elevate:** slow, living background (drifting glow) so even the *waiting* screen feels alive. Quip crossfades (it already transitions opacity — extend that to a true fade-swap). This screen will be up the longest while people wander in — it should feel like a title card, not a loading screen.

### Scene 2 — The Vine Whisperer (THE moment — grape genius winner)
*Current: 🏆 (8xl), kicker, winner name 6xl, one sub line. Fully static.*

This is the single most important frame of the night and right now it has zero ceremony. Make it the centerpiece.

- **Build-up:** when the host triggers it, don't show the name immediately. Beat 1: kicker "The Vine Whisperer" + wreath fades in. Beat 2 (after ~1s): the winner's name scales in with a glow-pulse and a one-time shimmer sweep. Beat 3: the sub ("Correctly identified X of Y") fades up beneath.
- **Hero treatment:** the name is the biggest, warmest thing in the entire reveal — deeper "winner gold," subtle glow, maybe a thin laurel framing it. This is the only personal spotlight of the night (per the rule), so it should clearly feel like *the* award.
- **Tie case:** two names ("A & B") already supported — make sure the hero scale handles two gracefully (stack or balance, don't shrink to nothing).
- **No-winner case:** "The grapes kept their secrets tonight" — lean into it as a charming, intentional frame, not an error state.

### Scene 3 — Crowd Favorites (top-3 podium)
*Current: three identical rows rise 1→2→3; every row uses the same 🏆; equal visual weight; flat list.*

- **Differentiate the ranks.** Right now 1st/2nd/3rd are indistinguishable (same gold medal). Give them real hierarchy: distinct medal treatment (gold/silver/bronze), and make **#1 physically bigger** — larger card, larger photo, "winner gold" border — so the eye lands on it. A podium should not be an even list.
- **Reverse the reveal order to 3 → 2 → 1.** Building *down* to the winner is the entire dramatic logic of a countdown; revealing 1 first deflates it. (The spring-rise animation is great — keep it, just reverse the sequence and let #1 land last with a bit more weight/glow.)
- **Keep:** photos, producer/region/vintage meta, the critic score + commentary (lovely touch). 
- **Polish:** the rank column is currently emoji + number; consider elegant numerals or the medal medallion. Tighten so a 3-row podium fills the frame intentionally (it can feel top-weighted now).

### Scene 4 — The Wines (one bottle at a time) — *strongest scene already*
*Current: big photo + name/meta/grape, slide-in from right, "X of N".*

- **Keep the structure** — it's clean and works. Light touches only:
- **Add the payoff data** this scene is missing: did the room guess this grape right? Show the actual grape prominently and, optionally, the crowd's average score for the bottle — this is where "blind tasting" pays off bottle by bottle. (Room-level only — no per-guest callouts.)
- **Progress affordance:** replace/supplement "3 of 14" with a row of dots or a thin progress bar so guests feel the arc toward the end.
- **No-photo bottles:** the plain `#n` box is a letdown next to photographed bottles — give it a branded label-style placeholder (cellar texture + sleeve number set like a wine label).

### Scene 5 — Group Accuracy ("How Did We Do?")
*Current: 🎯, "X of Y" big number, comment, consensus grid (inline-styled % per attribute).*

- **Animate the number.** "X of Y correct" should count up on entry — instant drama from a static stat.
- **Fix the consensus grid.** It's currently inline-styled and visually off-system. Rebuild it on the shared tokens, and express the percentages *visually* (radial rings or short bars), not as plain numbers. "Where the room agreed" is a great concept — make it look considered.
- **Keep the tone:** the tiered comment ("Impressive palates" / "respectable" / "kept their secrets") is good, room-level, and safe. Keep it.

### Scene 6 — The Numbers (aggregate stats) — *currently the plainest*
*Current: three static numbers in a row (bottles, notes, avg rating), smaller hero than other scenes.*

- **Count-up all three** on entry, staggered (bottles → notes → rating). Numbers that tick feel alive; numbers that sit feel like a spreadsheet.
- **Give each stat an identity:** a small consistent mark + the value at the shared hero scale (it's under-sized now) + label. Consider a large faint background numeral or a thin divider rhythm so three facts feel like a designed panel, not a CSV.
- **Position in the show:** this is a great *cool-down/closer* after the emotional peak — see run-of-show.

---

## 5. Run-of-show (recommended reveal order)

Sequence matters as much as styling. Suggested arc — rising action → peak → warm close:

1. **Grand Standby** — title card while everyone gathers and pours.
2. **The Wines** — walk through the bottles one at a time (the "what were we actually drinking" payoff).
3. **Group Accuracy** — "how did *we* do" as a collective.
4. **Crowd Favorites** — top 3, revealed 3 → 2 → 1, building to the room's favorite bottle.
5. **The Vine Whisperer** — the peak. The one personal award of the night, with full ceremony.
6. **The Numbers** — warm cool-down / "what a night" closer.

(Host can still jump anywhere — this is just the intended spine.)

---

## 6. What this explicitly will NOT do (guardrails)

- No per-guest leaderboard, no "worst guesser," no rankings that compare guests. The only individual spotlight is the Vine Whisperer winner.
- No real wine prices or anything that could embarrass a contributor.
- Keep critic/professional commentary about the *wines*, never about the *guests*.

---

## 7. Build sequence (when we code — phased, each shippable)

1. **Shared system foundation** — atmospheric background layer, type scale + display font, color tokens, scene-transition crossfade, motion primitives. (Biggest visual ROI; everything else rides on it.)
2. **The two moments** — Vine Whisperer ceremony + Crowd Favorites hierarchy & 3→2→1 reversal.
3. **Number scenes** — count-up + redesigned Group Accuracy consensus + The Numbers panel.
4. **The Wines polish** — guess-vs-actual + progress dots + branded no-photo placeholder.
5. **Standby refinement** — wordmark hero, retire bobbing emoji, quip crossfade.
6. **Emoji retirement pass** — swap remaining emoji for the icon set across all scenes.

Each phase is independently deployable and testable on the actual TV — we should screenshot each on the real 1080p display before moving on, since that's the only viewport that matters here.
```
