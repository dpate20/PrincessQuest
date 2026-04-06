"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LevelProgress, StreakData, ExerciseTypeTracking } from "@/types/game";
import type { AnswerResult } from "@/types/minigame";
import {
  DEFAULT_OWNED_ITEMS,
  STARTER_LOADOUT,
  getItemCategory,
} from "@/data/princess-customization";

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function isCustomDisplayName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return false;
  return normalized !== "scholar" && normalized !== "dev";
}

const EMPTY_EXERCISE_STATS: ExerciseTypeTracking = {
  "spelling-pairs": { totalAttempted: 0, totalCorrect: 0 },
  "vocabulary-in-context": { totalAttempted: 0, totalCorrect: 0 },
  "reading-comprehension": { totalAttempted: 0, totalCorrect: 0 },
  "short-story-inference": { totalAttempted: 0, totalCorrect: 0 },
  "fill-in-the-blank": { totalAttempted: 0, totalCorrect: 0 },
};

interface GameState {
  playerId: string;
  displayName: string;
  levelProgress: Record<string, LevelProgress>;
  streak: StreakData;
  totalStars: number;
  coins: number;
  totalExercisesCompleted: number;
  exerciseTypeStats: ExerciseTypeTracking;
  hasSeenNamingModal: boolean;
  equippedDress: string;
  equippedCrown: string;
  equippedAccessory: string;
  ownedItems: string[];

  completeLevel: (
    levelId: string,
    worldId: string,
    score: number,
    starCount: number,
    results: AnswerResult[]
  ) => void;
  recordExerciseResults: (results: AnswerResult[]) => void;
  recordActivity: () => void;
  addCoins: (amount: number) => void;
  purchaseItem: (
    itemId: string,
    cost: number
  ) => { success: boolean; reason?: "not-enough-coins" | "already-owned" };
  equipItem: (itemId: string) => void;
  setDisplayName: (name: string) => void;
  setHasSeenNamingModal: () => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerId: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
      displayName: "Scholar",
      levelProgress: {},
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: "",
      },
      totalStars: 0,
      coins: 0,
      totalExercisesCompleted: 0,
      exerciseTypeStats: { ...EMPTY_EXERCISE_STATS },
      hasSeenNamingModal: false,
      // Starter loadout is always available so the avatar is never blank.
      equippedDress: STARTER_LOADOUT.dress,
      equippedCrown: STARTER_LOADOUT.crown,
      equippedAccessory: STARTER_LOADOUT.accessory,
      ownedItems: [...DEFAULT_OWNED_ITEMS],

      completeLevel: (levelId, worldId, score, starCount, results) => {
        const state = get();
        const existing = state.levelProgress[levelId];

        const newBestScore = Math.max(score, existing?.bestScore ?? 0);
        const newBestStars = Math.max(starCount, existing?.stars ?? 0);
        const starsDelta = newBestStars - (existing?.stars ?? 0);

        set({
          levelProgress: {
            ...state.levelProgress,
            [levelId]: {
              levelId,
              worldId,
              completed: score >= 70 || existing?.completed === true,
              bestScore: newBestScore,
              stars: newBestStars,
              attempts: (existing?.attempts ?? 0) + 1,
              lastPlayedAt: new Date().toISOString(),
            },
          },
          totalStars: state.totalStars + starsDelta,
          totalExercisesCompleted:
            state.totalExercisesCompleted + results.length,
        });

        get().recordExerciseResults(results);
        get().recordActivity();
      },

      recordExerciseResults: (results) => {
        const state = get();
        const updated = { ...state.exerciseTypeStats };

        for (const r of results) {
          const stats = updated[r.exerciseType];
          if (stats) {
            updated[r.exerciseType] = {
              totalAttempted: stats.totalAttempted + 1,
              totalCorrect: stats.totalCorrect + (r.correct ? 1 : 0),
            };
          }
        }

        set({ exerciseTypeStats: updated });
      },

      recordActivity: () => {
        const state = get();
        const today = getTodayStr();
        const yesterday = getYesterdayStr();

        if (state.streak.lastActiveDate === today) return;

        let newStreak: number;
        if (state.streak.lastActiveDate === yesterday) {
          newStreak = state.streak.currentStreak + 1;
        } else {
          newStreak = 1;
        }

        set({
          streak: {
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, state.streak.longestStreak),
            lastActiveDate: today,
          },
        });
      },

      addCoins: (amount) => {
        const safeAmount = Math.max(0, amount);
        if (safeAmount === 0) return;

        set((state) => ({
          // Coins are the shop currency used for cosmetic unlocks.
          coins: state.coins + safeAmount,
        }));
      },

      purchaseItem: (itemId, cost) => {
        const state = get();
        if (state.ownedItems.includes(itemId)) {
          return { success: false, reason: "already-owned" as const };
        }

        if (state.coins < cost) {
          return { success: false, reason: "not-enough-coins" as const };
        }

        set({
          coins: state.coins - cost,
          ownedItems: [...state.ownedItems, itemId],
        });

        return { success: true };
      },

      equipItem: (itemId) => {
        const state = get();
        if (!state.ownedItems.includes(itemId)) return;

        const category = getItemCategory(itemId);
        if (!category) return;

        if (category === "dresses") {
          set({ equippedDress: itemId });
          return;
        }

        if (category === "crowns") {
          set({ equippedCrown: itemId });
          return;
        }

        set({ equippedAccessory: itemId });
      },

      setDisplayName: (name) => {
        const trimmed = name.trim();
        set({ displayName: trimmed || "Scholar" });
      },

      setHasSeenNamingModal: () => set({ hasSeenNamingModal: true }),

      resetProgress: () =>
        set({
          levelProgress: {},
          streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: "" },
          totalStars: 0,
          coins: 0,
          totalExercisesCompleted: 0,
          exerciseTypeStats: { ...EMPTY_EXERCISE_STATS },
          equippedDress: STARTER_LOADOUT.dress,
          equippedCrown: STARTER_LOADOUT.crown,
          equippedAccessory: STARTER_LOADOUT.accessory,
          ownedItems: [...DEFAULT_OWNED_ITEMS],
        }),
    }),
    {
      name: "princess-quest-game",
      version: 4,
      migrate: (persistedState) => {
        const state = (persistedState ?? {}) as Partial<GameState>;
        const earnedStars = state.totalStars ?? 0;
        const ownedItems = Array.from(
          new Set([...(state.ownedItems ?? []), ...DEFAULT_OWNED_ITEMS])
        );
        const rawDisplayName = (state.displayName ?? "Scholar").trim();
        const displayName = rawDisplayName || "Scholar";
        const hasCustomName = isCustomDisplayName(displayName);

        return {
          playerId:
            state.playerId ??
            crypto.randomUUID?.() ??
            Math.random().toString(36).slice(2),
          displayName,
          levelProgress: state.levelProgress ?? {},
          streak: state.streak ?? {
            currentStreak: 0,
            longestStreak: 0,
            lastActiveDate: "",
          },
          totalStars: earnedStars,
          coins: state.coins ?? earnedStars * 10,
          totalExercisesCompleted: state.totalExercisesCompleted ?? 0,
          exerciseTypeStats: state.exerciseTypeStats ?? {
            ...EMPTY_EXERCISE_STATS,
          },
          // Placeholder names should re-open naming until the player picks a real one.
          hasSeenNamingModal: hasCustomName
            ? (state.hasSeenNamingModal ?? false)
            : false,
          equippedDress: state.equippedDress ?? STARTER_LOADOUT.dress,
          equippedCrown: state.equippedCrown ?? STARTER_LOADOUT.crown,
          equippedAccessory:
            state.equippedAccessory ?? STARTER_LOADOUT.accessory,
          ownedItems,
        };
      },
    }
  )
);
