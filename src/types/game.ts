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
