"use client";

import { use } from "react";
import { getWorld, getLevelsForWorld } from "@/lib/content-loader";
import { isUnlocked } from "@/lib/progression";
import { useGameStore } from "@/stores/useGameStore";
import GameHeader from "@/components/layout/GameHeader";
import LevelNode from "@/components/ui/LevelNode";
import NPCGuide, { SpeechBubble, WORLD_NPC_MAP, NPC_GREETINGS } from "@/components/characters/NPCGuide";

const KINGDOM_COLORS: Record<string, string> = {
  "word-fortress": "#4299E1",
  "context-courtyard": "#48BB78",
  "story-tower": "#ED8936",
  "knowledge-keep": "#319795",
  "champions-arena": "#805AD5",
};

export default function LevelSelectPage({
  params,
}: {
  params: Promise<{ worldId: string }>;
}) {
  const { worldId } = use(params);
  const levelProgress = useGameStore((s) => s.levelProgress);
  const world = getWorld(worldId);
  const levels = getLevelsForWorld(worldId);

  if (!world) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <p>World not found</p>
      </div>
    );
  }

  const npcType = WORLD_NPC_MAP[worldId] ?? "champion";
  const kingdomColor = KINGDOM_COLORS[worldId] ?? "#805AD5";

  // Find the first incomplete unlocked level
  const firstIncompleteLevelId = levels.find(
    (l) =>
      isUnlocked(l.unlockCondition, levelProgress) &&
      !levelProgress[l.id]?.completed
  )?.id;

  return (
    <div className="flex flex-col flex-1">
      <GameHeader backHref="/world" title={world.name} />

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* NPC guide with speech bubble */}
        <div className="flex items-end gap-3 mb-6 animate-fade-in-up">
          <NPCGuide npc={npcType} />
          <SpeechBubble className="flex-1">
            {NPC_GREETINGS[npcType]}
          </SpeechBubble>
        </div>

        {/* Story intro */}
        <div className="bg-[var(--color-bg-panel)] rounded-xl p-4 mb-8 border-2 border-purple-200/40 shadow-inner">
          <p className="text-sm text-gray-600 italic leading-relaxed font-[var(--font-heading)]">
            &ldquo;{world.storyIntro}&rdquo;
          </p>
        </div>

        {/* Serpentine level path */}
        <div className="flex flex-col items-center gap-1">
          {levels.map((level, index) => {
            const progress = levelProgress[level.id];
            const unlocked = isUnlocked(level.unlockCondition, levelProgress);
            const isCurrent = level.id === firstIncompleteLevelId;

            return (
              <div key={level.id} className="flex flex-col items-center">
                {index > 0 && (
                  <svg width="40" height="24" className="my-1">
                    <path
                      d={index % 2 === 0
                        ? "M 30 0 Q 20 12, 10 24"
                        : "M 10 0 Q 20 12, 30 24"
                      }
                      fill="none"
                      stroke={progress?.completed ? kingdomColor : "#E2E8F0"}
                      strokeWidth="2"
                      strokeDasharray={progress?.completed ? "none" : "4 4"}
                    />
                  </svg>
                )}

                <LevelNode
                  level={level}
                  worldId={worldId}
                  progress={progress}
                  unlocked={unlocked}
                  isCurrent={isCurrent}
                  kingdomColor={kingdomColor}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
