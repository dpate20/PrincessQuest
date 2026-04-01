"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LevelProgress, StreakData } from "@/types/game";

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

interface GameState {
  playerId: string;
  displayName: string;
  levelProgress: Record<string, LevelProgress>;
  streak: StreakData;
  totalStars: number;
  totalExercisesCompleted: number;

  completeLevel: (
    levelId: string,
    worldId: string,
    score: number,
    starCount: number,
    exerciseCount: number
  ) => void;
  recordActivity: () => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerId: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
      displayName: "Princess",
      levelProgress: {},
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: "",
      },
      totalStars: 0,
      totalExercisesCompleted: 0,

      completeLevel: (levelId, worldId, score, starCount, exerciseCount) => {
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
            state.totalExercisesCompleted + exerciseCount,
        });

        // Also record activity for streak
        get().recordActivity();
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

      resetProgress: () =>
        set({
          levelProgress: {},
          streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: "" },
          totalStars: 0,
          totalExercisesCompleted: 0,
        }),
    }),
    {
      name: "princess-quest-game",
    }
  )
);
