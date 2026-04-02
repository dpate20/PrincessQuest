import type { Exercise, MinigameType } from "@/types/content";
import type { ExerciseTypeTracking } from "@/types/game";

export function selectAdaptiveExercises(
  pool: Exercise[],
  stats: ExerciseTypeTracking,
  count: number
): Exercise[] {
  if (pool.length <= count) return pool;

  // Calculate weakness weight per exercise type (inverse of accuracy)
  const weights: Record<string, number> = {};
  const types = Object.keys(stats) as MinigameType[];

  for (const type of types) {
    const s = stats[type];
    if (s.totalAttempted === 0) {
      weights[type] = 1; // Unknown = neutral weight
    } else {
      const accuracy = s.totalCorrect / s.totalAttempted;
      // Lower accuracy = higher weight (more likely to be selected)
      weights[type] = Math.max(0.2, 2 - accuracy * 2);
    }
  }

  // Weighted random selection without replacement
  const selected: Exercise[] = [];
  const remaining = [...pool];

  while (selected.length < count && remaining.length > 0) {
    const totalWeight = remaining.reduce(
      (sum, ex) => sum + (weights[ex.minigameType] ?? 1),
      0
    );

    let rand = Math.random() * totalWeight;
    let idx = 0;

    for (let i = 0; i < remaining.length; i++) {
      rand -= weights[remaining[i].minigameType] ?? 1;
      if (rand <= 0) {
        idx = i;
        break;
      }
    }

    selected.push(remaining[idx]);
    remaining.splice(idx, 1);
  }

  return selected;
}
