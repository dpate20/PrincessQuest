"use client";

import { use } from "react";
import { getWorld, getLevelsForWorld } from "@/lib/content-loader";
import { isUnlocked } from "@/lib/progression";
import { useGameStore } from "@/stores/useGameStore";
import TopBar from "@/components/layout/TopBar";
import LevelNode from "@/components/ui/LevelNode";
import NPCGuide, { SpeechBubble, WORLD_NPC_MAP, NPC_GREETINGS } from "@/components/characters/NPCGuide";
import Icon from "@/components/ui/Icon";

const KINGDOM_COLORS: Record<string, string> = {
  "word-fortress": "#4299E1",
  "context-courtyard": "#48BB78",
  "story-tower": "#ED8936",
  "knowledge-keep": "#319795",
  "champions-arena": "#805AD5",
};

const KINGDOM_GRADIENTS: Record<string, string> = {
  "word-fortress": "linear-gradient(180deg, #1A365D 0%, #2B6CB0 40%, #63B3ED 80%, #BEE3F8 100%)",
  "context-courtyard": "linear-gradient(180deg, #1C4532 0%, #276749 40%, #68D391 80%, #C6F6D5 100%)",
  "story-tower": "linear-gradient(180deg, #652B19 0%, #C05621 40%, #F6AD55 80%, #FEEBC8 100%)",
  "knowledge-keep": "linear-gradient(180deg, #1D4044 0%, #285E61 40%, #4FD1C5 80%, #B2F5EA 100%)",
  "champions-arena": "linear-gradient(180deg, #322659 0%, #553C9A 40%, #9F7AEA 80%, #E9D8FD 100%)",
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
  const gradientStyle = KINGDOM_GRADIENTS[worldId] ?? KINGDOM_GRADIENTS["champions-arena"];

  // Find the first incomplete unlocked level
  const firstIncompleteLevelId = levels.find(
    (l) =>
      isUnlocked(l.unlockCondition, levelProgress) &&
      !levelProgress[l.id]?.completed
  )?.id;

  return (
    <div className="min-h-screen w-full relative overflow-hidden pb-8" style={{ background: gradientStyle }}>
      <TopBar backHref="/world" title={world.name} />

      {/* Animated stars background */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="absolute text-yellow-200/60 animate-pulse"
          style={{
            top: `${10 + (i * 41) % 80}%`,
            left: `${3 + (i * 47) % 94}%`,
            animationDelay: `${(i * 0.4) % 2}s`,
          }}
        >
          <Icon name="star" size={4 + (i % 3) * 3} />
        </div>
      ))}

      <div className="relative z-10 flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* NPC guide with speech bubble */}
        <div className="flex items-end gap-3 mb-6 animate-fade-in-up">
          <NPCGuide npc={npcType} />
          <SpeechBubble className="flex-1">
            {NPC_GREETINGS[npcType]}
          </SpeechBubble>
        </div>

        {/* Story intro */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-8 border-2 border-white/30 shadow-lg">
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
                      stroke={progress?.completed ? kingdomColor : "rgba(255,255,255,0.3)"}
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
