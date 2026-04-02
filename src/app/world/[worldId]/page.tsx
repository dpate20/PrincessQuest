"use client";

import { use } from "react";
import Link from "next/link";
import { getWorld, getLevelsForWorld } from "@/lib/content-loader";
import { isUnlocked } from "@/lib/progression";
import { useGameStore } from "@/stores/useGameStore";
import GameHeader from "@/components/layout/GameHeader";
import StarRating from "@/components/ui/StarRating";
import Icon from "@/components/ui/Icon";

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

  return (
    <div className="flex flex-col flex-1">
      <GameHeader backHref="/world" title={world.name} />

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Story intro */}
        <div className="bg-[var(--color-bg-panel)] backdrop-blur-sm rounded-xl p-4 mb-6 border border-amber-200/50">
          <p className="text-sm text-gray-600 italic leading-relaxed font-[var(--font-heading)]">
            &ldquo;{world.storyIntro}&rdquo;
          </p>
        </div>

        {/* Level path */}
        <div className="flex flex-col items-center gap-2">
          {levels.map((level) => {
            const progress = levelProgress[level.id];
            const unlocked = isUnlocked(level.unlockCondition, levelProgress);
            const completed = progress?.completed === true;

            return (
              <div key={level.id} className="flex flex-col items-center">
                {level.order > 1 && (
                  <div className="w-0.5 h-6 bg-amber-200" />
                )}

                {unlocked ? (
                  <Link href={`/world/${worldId}/${level.id}`}>
                    <div
                      className={`
                        w-14 h-14 rounded-xl flex flex-col items-center justify-center
                        transition-all hover:scale-110 active:scale-95
                        ${
                          completed
                            ? "bg-[var(--color-accent)] text-white shadow-lg shadow-amber-200"
                            : "bg-[var(--color-primary)] text-white shadow-lg shadow-slate-300 animate-glow-pulse"
                        }
                      `}
                    >
                      <span className="text-lg font-bold">{level.order}</span>
                    </div>
                    {completed && progress && (
                      <StarRating stars={progress.stars} size="sm" />
                    )}
                    <span className="text-xs text-gray-500 mt-1 text-center max-w-24">
                      {level.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                      <Icon name="lock" size={20} />
                    </div>
                    <span className="text-xs text-gray-400 mt-1">
                      {level.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
