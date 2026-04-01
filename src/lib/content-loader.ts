import type { World, Level } from "@/types/content";
import worldsData from "@/content/worlds.json";

// Level JSON imports — static imports for build-time bundling
import level01 from "@/content/worlds/castle-basics/levels/level-01.json";
import level02 from "@/content/worlds/castle-basics/levels/level-02.json";
import level03 from "@/content/worlds/castle-basics/levels/level-03.json";
import level04 from "@/content/worlds/castle-basics/levels/level-04.json";
import level05 from "@/content/worlds/castle-basics/levels/level-05.json";
import level06 from "@/content/worlds/castle-basics/levels/level-06.json";
import level07 from "@/content/worlds/castle-basics/levels/level-07.json";
import level08 from "@/content/worlds/castle-basics/levels/level-08.json";

const LEVEL_MAP: Record<string, Level> = {
  "cb-level-01": level01 as unknown as Level,
  "cb-level-02": level02 as unknown as Level,
  "cb-level-03": level03 as unknown as Level,
  "cb-level-04": level04 as unknown as Level,
  "cb-level-05": level05 as unknown as Level,
  "cb-level-06": level06 as unknown as Level,
  "cb-level-07": level07 as unknown as Level,
  "cb-level-08": level08 as unknown as Level,
};

export function getWorlds(): World[] {
  return worldsData as unknown as World[];
}

export function getWorld(worldId: string): World | undefined {
  return getWorlds().find((w) => w.id === worldId);
}

export function getLevel(levelId: string): Level | undefined {
  return LEVEL_MAP[levelId];
}

export function getLevelsForWorld(worldId: string): Level[] {
  const world = getWorld(worldId);
  if (!world) return [];
  return world.levelIds
    .map((id) => LEVEL_MAP[id])
    .filter((l): l is Level => l !== undefined)
    .sort((a, b) => a.order - b.order);
}
