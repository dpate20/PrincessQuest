"use client";

import Link from "next/link";
import { getWorlds } from "@/lib/content-loader";
import { isUnlocked } from "@/lib/progression";
import { useGameStore } from "@/stores/useGameStore";
import GameHeader from "@/components/layout/GameHeader";
import BottomNav from "@/components/layout/BottomNav";
import Icon, { type IconName } from "@/components/ui/Icon";

export default function WorldMapPage() {
  const levelProgress = useGameStore((s) => s.levelProgress);
  const worlds = getWorlds();

  return (
    <div className="flex flex-col flex-1 pb-20">
      <GameHeader title="World Map" />

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <p className="text-center text-gray-500 mb-6">
          Choose a kingdom to explore
        </p>

        <div className="flex flex-col gap-4">
          {worlds.map((world) => {
            const unlocked = isUnlocked(world.unlockCondition, levelProgress);
            const completedLevels = world.levelIds.filter(
              (id) => levelProgress[id]?.completed
            ).length;
            const totalLevels = world.levelIds.length;

            return (
              <div key={world.id} className="animate-fade-in-up">
                {unlocked && totalLevels > 0 ? (
                  <Link href={`/world/${world.id}`}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border-2 border-amber-200/50 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] hover:border-[var(--color-accent)]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                          <Icon
                            name={world.icon as IconName}
                            size={24}
                            className="text-[var(--color-accent)]"
                          />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-lg font-bold font-[var(--font-heading)] text-[var(--color-primary)]">
                            {world.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {world.description}
                          </p>
                          {totalLevels > 0 && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${(completedLevels / totalLevels) * 100}%`,
                                    background: "var(--gradient-gold)",
                                  }}
                                />
                              </div>
                              <span className="text-xs text-gray-400">
                                {completedLevels}/{totalLevels}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="bg-gray-100/60 rounded-xl p-5 border-2 border-gray-200 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center shrink-0">
                        <Icon name="lock" size={20} className="text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-bold font-[var(--font-heading)] text-gray-400">
                          {world.name}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {totalLevels === 0
                            ? "Coming soon..."
                            : "Complete challenges in other kingdoms to unlock"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
