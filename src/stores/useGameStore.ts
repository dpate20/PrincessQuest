"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LevelProgress, StreakData, ExerciseTypeTracking } from "@/types/game";
import type { AnswerResult } from "@/types/minigame";

function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
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
  totalExercisesCompleted: number;
  exerciseTypeStats: ExerciseTypeTracking;

  completeLevel: (
    levelId: string,
    worldId: string,
    score: number,
    starCount: number,
    results: AnswerResult[]
  ) => void;
  recordExerciseResults: (results: AnswerResult[]) => void;
  recordActivity: () => void;
  setDisplayName: (name: string) => void;
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
      totalExercisesCompleted: 0,
      exerciseTypeStats: { ...EMPTY_EXERCISE_STATS },

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

      setDisplayName: (name) => set({ displayName: name }),

      resetProgress: () =>
        set({
          levelProgress: {},
          streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: "" },
          totalStars: 0,
          totalExercisesCompleted: 0,
          exerciseTypeStats: { ...EMPTY_EXERCISE_STATS },
        }),
    }),
    {
      name: "princess-quest-game",
      version: 2,
      migrate: () => {
        // V2: Complete content overhaul — wipe old progress
        return {
          playerId: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
          displayName: "Scholar",
          levelProgress: {},
          streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: "" },
          totalStars: 0,
          totalExercisesCompleted: 0,
          exerciseTypeStats: { ...EMPTY_EXERCISE_STATS },
        };
      },
    }
  )
);
