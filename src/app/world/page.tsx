"use client";

import { getWorlds } from "@/lib/content-loader";
import { isUnlocked } from "@/lib/progression";
import { useGameStore } from "@/stores/useGameStore";
import GameHeader from "@/components/layout/GameHeader";
import BottomNav from "@/components/layout/BottomNav";
import KingdomCard from "@/components/ui/KingdomCard";
import PrincessSara from "@/components/characters/PrincessSara";
import { SpeechBubble } from "@/components/characters/NPCGuide";
import Icon from "@/components/ui/Icon";

export default function WorldMapPage() {
  const levelProgress = useGameStore((s) => s.levelProgress);
  const worlds = getWorlds();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 relative overflow-hidden pb-32">
      <GameHeader title="World Map" />

      {/* Animated stars background */}
      {Array.from({ length: 18 }, (_, i) => (
        <div
          key={i}
          className="absolute text-yellow-200 animate-pulse"
          style={{
            top: `${8 + (i * 37) % 85}%`,
            left: `${5 + (i * 53) % 90}%`,
            animationDelay: `${(i * 0.3) % 2}s`,
          }}
        >
          <Icon name="star" size={6 + (i % 4) * 2} />
        </div>
      ))}

      <div className="relative z-10 flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-4 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg font-[var(--font-heading)]">
            Choose Your Kingdom
          </h2>
          <p className="text-yellow-200 text-sm drop-shadow mt-1">
            Explore the enchanted kingdoms!
          </p>
        </div>

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
