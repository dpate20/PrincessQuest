import type { World, Level } from "@/types/content";
import worldsData from "@/content/worlds.json";
import { ALL_LEVELS } from "@/content/level-index";

export function getWorlds(): World[] {
  return worldsData as unknown as World[];
}

export function getWorld(worldId: string): World | undefined {
  return getWorlds().find((w) => w.id === worldId);
}

export function getLevel(levelId: string): Level | undefined {
  return ALL_LEVELS[levelId];
}

export function getLevelsForWorld(worldId: string): Level[] {
  const world = getWorld(worldId);
  if (!world) return [];
  return world.levelIds
    .map((id) => ALL_LEVELS[id])
    .filter((l): l is Level => l !== undefined)
    .sort((a, b) => a.order - b.order);
}
