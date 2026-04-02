import type { UnlockCondition } from "@/types/content";
import type { LevelProgress } from "@/types/game";

export function isUnlocked(
  condition: UnlockCondition,
  progress: Record<string, LevelProgress>
): boolean {
  switch (condition.type) {
    case "always":
      return true;

    case "level-complete": {
      const lp = progress[condition.levelId];
      return lp?.completed === true;
    }

    case "stars-in-world": {
      const totalStars = Object.values(progress)
        .filter((p) => p.worldId === condition.worldId)
        .reduce((sum, p) => sum + p.stars, 0);
      return totalStars >= condition.minStars;
    }

    case "levels-across-worlds": {
      return condition.worlds.every(({ worldId, minLevels }) => {
        const completedInWorld = Object.values(progress).filter(
          (p) => p.worldId === worldId && p.completed
        ).length;
        return completedInWorld >= minLevels;
      });
    }

    default:
      return false;
  }
}

export function getNextLevelId(
  currentLevelId: string,
  levelIds: string[]
): string | null {
  const idx = levelIds.indexOf(currentLevelId);
  if (idx === -1 || idx >= levelIds.length - 1) return null;
  return levelIds[idx + 1];
}
