# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server (http://localhost:3000)
npm run build    # Production build (use to verify no TypeScript/build errors)
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

Princess English Quest is a Next.js 16 gamified English-learning app targeting grades 6-8 Common Core ELA. It uses React 19, Tailwind CSS 4, and Zustand for state management. Deployed on Vercel.

### Content Pipeline

```
src/content/worlds/<kingdom>/levels/*.json   (48 level files with exercises)
        ↓
src/content/level-index.ts                   (imports all JSON → ALL_LEVELS record)
        ↓
src/lib/content-loader.ts                    (getLevel, getWorld, getLevelsForWorld)
        ↓
Page components consume via content-loader
```

Content is imported at build-time — no runtime fetching. `worlds.json` defines the 5 kingdoms and their level ID lists. Each level JSON contains an `exercises[]` array with a `minigameType` discriminator that determines which component renders it.

### Exercise System

Five exercise types share a common interface (`MinigameProps: { exercise, onAnswer }`). `MinigameShell` maps `exercise.minigameType` → component via a `Record<MinigameType, ComponentType>` registry. Adding a new exercise type requires:
1. New component in `src/components/minigame/`
2. Add the type to `MinigameType` union in `src/types/content.ts`
3. Add the type's data interface in `src/types/content.ts`
4. Register in `MINIGAME_COMPONENTS` map in `MinigameShell.tsx`
5. Add to `EMPTY_EXERCISE_STATS` in `useGameStore.ts`

Exercise components are stateless renderers — they call `onAnswer(result)` and the shell handles sequencing, scoring, and feedback.

### State Management

Two Zustand stores with `persist` middleware (localStorage):
- **useGameStore** (`princess-quest-game`, version 2): level progress, stars, streaks, per-exercise-type accuracy stats. `completeLevel()` is the main mutation — it updates progress, stars, exercise stats, and streak in one call.
- **useSettingsStore** (`princess-quest-settings`): sound effects toggle.

State is structured for future backend migration — `LevelProgress` records include timestamps and attempt counts.

### Progression System

Unlock conditions are declarative data (`UnlockCondition` type with 4 variants). `isUnlocked()` in `src/lib/progression.ts` evaluates them against current `levelProgress`. Champion's Arena requires `levels-across-worlds` — at least 4 completed levels in each of the other 4 kingdoms.

### Visual Theme

Fantasy RPG aesthetic using CSS custom properties in `globals.css`. Kingdom-specific colors are defined as `--color-kingdom-*` variables. The `@theme inline` block bridges CSS vars into Tailwind. Fonts: Cinzel (headings), Nunito (body).

SVG character illustrations (PrincessSara, NPCGuide) are inline React components with expression props — they swap face path groups while sharing body paths.

Sound effects use Web Audio API synthesis (no audio files) via `src/lib/sounds.ts`, gated by the settings store.

### Key Patterns

- **Path aliases**: `@/*` maps to `src/*`
- **Polymorphic exercise data**: `Exercise.data` type varies by `minigameType` — cast to the specific data interface in each minigame component
- **Scoring**: `calculateScore()` → percentage, `calculateStars(score, thresholds)` → 0-3, passing threshold is 70%
- **Adaptive selection**: `selectAdaptiveExercises()` weights exercise types inversely to accuracy — weaker areas get more practice
