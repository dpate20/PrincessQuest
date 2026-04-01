"use client";

import { use } from "react";
import Link from "next/link";
import { getWorld, getLevelsForWorld } from "@/lib/content-loader";
import { isUnlocked } from "@/lib/progression";
import { useGameStore } from "@/stores/useGameStore";
import GameHeader from "@/components/layout/GameHeader";
import StarRating from "@/components/ui/StarRating";

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
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-purple-100">
          <p className="text-sm text-gray-600 italic leading-relaxed">
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
                {/* Connector line */}
                {level.order > 1 && (
                  <div className="w-0.5 h-6 bg-purple-200" />
                )}

                {unlocked ? (
                  <Link href={`/world/${worldId}/${level.id}`}>
                    <div
                      className={`
                        w-16 h-16 rounded-full flex flex-col items-center justify-center
                        transition-all hover:scale-110 active:scale-95
                        ${
                          completed
                            ? "bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-lg shadow-amber-200"
                            : "bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg shadow-purple-200 animate-glow-pulse"
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
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl">
                      🔒
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
