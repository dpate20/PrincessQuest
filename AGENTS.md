# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server (http://localhost:3000)
npm run build    # Production build (use to verify no TypeScript/build errors)
npm run lint     # ESLint
```

## Validation Reality

- There is no formal test framework configured in `package.json`.
- The expected quality gate is:
  1. `npm run lint`
  2. `npm run build`
  3. targeted browser verification for UI-heavy changes.
- Screenshot and flow-verification artifacts should stay in `.codex-artifacts/` and should not be committed.

## Architecture Overview

Princess English Quest is a Next.js 16 gamified English-learning app targeting grades 6-8 Common Core ELA.

- Framework: Next.js App Router (`src/app`)
- UI: React 19 + Tailwind CSS 4
- State: Zustand + `persist` middleware (localStorage)
- Deployment: Vercel via GitHub (`dpate20/PrincessQuest`)

## Content Pipeline

All learning content is build-time imported JSON.

```
src/content/worlds/<kingdom>/levels/*.json
  -> src/content/level-index.ts (ALL_LEVELS)
  -> src/lib/content-loader.ts (getLevel/getWorld/getLevelsForWorld)
  -> consumed by route pages/components
```

Key content metadata:

- `src/content/worlds.json` defines the 5 kingdoms and level IDs.
- Each level JSON has `exercises[]` and each exercise has `minigameType`.

## Exercise System

`MinigameShell` is the runtime orchestrator.

- Component registry lives in `src/components/minigame/MinigameShell.tsx`:
  - `spelling-pairs`
  - `vocabulary-in-context`
  - `reading-comprehension`
  - `short-story-inference`
  - `fill-in-the-blank`
- Exercise components are stateless renderers that call `onAnswer(result)`.
- Sequencing, scoring progression, rewards, and feedback timing happen in shell/hooks.

When adding a new minigame type, update all of:

1. `src/components/minigame/<NewComponent>.tsx`
2. `MinigameType` in `src/types/content.ts`
3. corresponding exercise data interface in `src/types/content.ts`
4. `MINIGAME_COMPONENTS` map in `MinigameShell.tsx`
5. `EMPTY_EXERCISE_STATS` in `src/stores/useGameStore.ts`

## State Management (Current)

### `useGameStore` (`src/stores/useGameStore.ts`)

Persistent key/version:

- key: `princess-quest-game`
- version: `4`

Core state:

- identity/profile: `playerId`, `displayName`, `hasSeenNamingModal`
- progression: `levelProgress`, `streak`, `totalStars`, `totalExercisesCompleted`, `exerciseTypeStats`
- economy/customization: `coins`, `ownedItems`, `equippedDress`, `equippedCrown`, `equippedAccessory`

Important mutations:

- `completeLevel(...)`: updates best score/stars, attempt count, completion status, totals
- `recordExerciseResults(...)`: updates per-exercise accuracy stats
- `recordActivity()`: maintains daily streak progression
- `addCoins(amount)`: guarded positive currency mutation
- `purchaseItem(itemId, cost)`: returns `{ success, reason? }`
- `equipItem(itemId)`: applies owned item by category
- `setDisplayName(name)`, `setHasSeenNamingModal()`

Migration behavior (critical):

- Backfills `coins` to `totalStars * 10` for older persisted states.
- Enforces starter ownership via `DEFAULT_OWNED_ITEMS`.
- Re-opens naming modal for placeholder names (`Scholar` / `Dev`) by forcing `hasSeenNamingModal = false` when appropriate.

### `useSettingsStore` (`src/stores/useSettingsStore.ts`)

- key: `princess-quest-settings`
- state: `soundEffectsEnabled`
- mutation: `toggleSoundEffects()`

## Scoring, Validation, and Progression

- `src/lib/scoring.ts`
  - `calculateScore()` returns percentage
  - `calculateStars(score, thresholds)` returns 0-3
  - pass threshold: `70%`
- `src/lib/answer-validation.ts`: answer normalization and matching
- `src/lib/adaptive.ts`: weak-skill weighting for practice selection
- `src/lib/progression.ts`: declarative unlock-condition evaluation (`isUnlocked`)

## Narrator and Story Tone Layer

`src/lib/narrator-tone.ts` maps each kingdom to:

- narrator NPC + speaker name
- kingdom-specific tone line
- success/retry feedback lines
- speech bubble accent colors

`MinigameShell` calls `getNarratorScene(...)` per exercise to keep narration context-aware by world and activity type.

## Home Screen (Current Design)

Home route: `src/app/page.tsx`

Current structure:

- fixed-height page (`h-[100dvh]`) to avoid landing-page scroll
- `TopBar` with centered title pill (`Princess Quest`, `titleSize="large"`)
- first-time naming modal or rename modal entrypoint
- action stack above hero:
  - subtitle
  - name pill
  - rename button
  - primary CTA (`Begin Your Quest`)
  - optional continue link
- princess anchored near castle gate entrance (hero scene composition)
- fixed `BottomNav`

Decorative background scene:

- `src/components/ui/HomeBackdrop.tsx`
- full-screen stylized castle composition (SVG + layered gradients)
- moon, stars, cloud wisps, atmospheric mist, horizon depth
- this is decorative-only and pointer-events disabled

## Princess System and Customization

### Visual style maps

- `src/data/princess-customization.ts`
  - dress, crown, accessory style catalogs
  - starter loadout + default owned item IDs

### Reusable princess renderer

- `src/components/characters/Princess.tsx`
- supports global equipped state and explicit preview overrides:
  - `dressId`, `crownId`, `accessoryId`, `nameOverride`
- animation states: `idle | correct | wrong`
- size options include `hero` for home-scene composition
- `animateIdle` can be disabled for static preview contexts

## Shop System (UI + Economy Behavior)

### Data

- `src/data/shop-items.ts`
- categories: `dresses`, `crowns`, `accessories`
- each item has `id`, `name`, `price`, `description`

### Shop page

- route: `src/app/shop/page.tsx`
- category tabs, coin badge, equipped-state awareness
- modal-driven purchase UX:
  - confirm purchase
  - insufficient funds
  - success confirmation
- successful purchase auto-equips item

### Item card rendering

- `src/components/ui/ShopItemCard.tsx`
- cards show live princess outfit previews (not generic placeholders)
- locked items use grayscale + lock overlay
- buy button remains gold (`Buy` or `Need More` label)

## Naming UX (Current Behavior)

Primary component: `src/components/ui/PrincessNameModal.tsx`

Dual-mode behavior:

- onboarding mode: non-dismissible until valid name entered
- rename mode: dismissible and prefilled with current name

Important props:

- `open`
- `canClose`
- `initialName`
- `onClose`
- `onComplete`

Home page logic:

- first-time prompt opens when `!hasSeenNamingModal || !hasCustomName`
- returning users can always rename via `Rename Princess` button

## Gameplay Feedback Layer (MinigameShell)

`src/components/minigame/MinigameShell.tsx` includes a high-feedback loop:

- streak tracking (`currentStreak`, `bestStreak`)
- dynamic pacing text beneath progress
- narrator tone + accent-aware speech bubble
- correct/incorrect full-screen wash overlays
- wrong-answer panel shake
- challenge-card transition animation
- reward banner and chips
- coin reward guard (`rewardIndexRef`) to prevent duplicate +10 grants per challenge feedback cycle

## UI Primitives and Navigation

- `TopBar` (`src/components/layout/TopBar.tsx`)
  - dropdown hamburger nav
  - optional title with size variants (`default`, `large`)
  - coin/star badge on right
- `BottomNav` (`src/components/layout/BottomNav.tsx`)
  - fixed bottom, icon-only tabs
- `Modal` (`src/components/ui/Modal.tsx`)
  - portal + SSR-safe mounted behavior

## Global Animation Utility Classes

Animation keyframes and utility classes are centralized in `src/app/globals.css`.

Recent utility classes used heavily by gameplay/home scenes include:

- `animate-correct-feedback-wash`
- `animate-wrong-feedback-wash`
- `animate-pulse-dot`
- `animate-quest-panel-shake`
- `animate-quest-card-in`
- `animate-home-cloud-drift`
- `animate-home-twinkle`
- `animate-home-haze-pulse`
- `animate-home-moon-breath`
- `animate-home-mist-drift`

When introducing new animation classes, define both keyframes and the utility class in `globals.css`.

## Key Implementation Rules

- Preserve learning logic and question evaluation behavior when doing UI work.
- Keep bottom-nav clearance on long pages (`pb-16` baseline pattern).
- Prefer `@/*` path aliases.
- Keep home scene decorative layers non-interactive (`pointer-events-none`).
- Do not commit `.codex-artifacts`, local logs, or scratch verification scripts.
