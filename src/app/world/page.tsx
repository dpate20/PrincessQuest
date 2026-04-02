"use client";

import { getWorlds } from "@/lib/content-loader";
import { isUnlocked } from "@/lib/progression";
import { useGameStore } from "@/stores/useGameStore";
import GameHeader from "@/components/layout/GameHeader";
import BottomNav from "@/components/layout/BottomNav";
import KingdomCard from "@/components/ui/KingdomCard";
import PrincessSara from "@/components/characters/PrincessSara";
import { SpeechBubble } from "@/components/characters/NPCGuide";

export default function WorldMapPage() {
  const levelProgress = useGameStore((s) => s.levelProgress);
  const worlds = getWorlds();

  return (
    <div className="flex flex-col flex-1 pb-20">
      <GameHeader title="World Map" />

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Princess Sara guide */}
        <div className="flex items-end gap-3 mb-6 animate-fade-in-up">
          <PrincessSara expression="thinking" size="sm" />
          <SpeechBubble className="flex-1">
            Choose a kingdom to explore!
          </SpeechBubble>
        </div>

        <div className="flex flex-col gap-4">
          {worlds.map((world) => {
            const unlocked = isUnlocked(world.unlockCondition, levelProgress);
            const completedLevels = world.levelIds.filter(
              (id) => levelProgress[id]?.completed
            ).length;
            const totalLevels = world.levelIds.length;

            return (
              <div key={world.id} className="animate-fade-in-up">
                <KingdomCard
                  world={world}
                  completedLevels={completedLevels}
                  totalLevels={totalLevels}
                  unlocked={unlocked}
                />
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
