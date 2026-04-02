import type { MinigameType } from "./content";

export interface LevelProgress {
  levelId: string;
  worldId: string;
  completed: boolean;
  bestScore: number;
  stars: number;
  attempts: number;
  lastPlayedAt: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface ExerciseTypeStats {
  totalAttempted: number;
  totalCorrect: number;
}

export type ExerciseTypeTracking = Record<MinigameType, ExerciseTypeStats>;
