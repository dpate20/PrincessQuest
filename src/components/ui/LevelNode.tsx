"use client";

import Link from "next/link";
import type { Level } from "@/types/content";
import type { LevelProgress } from "@/types/game";
import StarRating from "./StarRating";
import Icon from "./Icon";

interface LevelNodeProps {
  level: Level;
  worldId: string;
  progress?: LevelProgress;
  unlocked: boolean;
  isCurrent: boolean;
  kingdomColor: string;
  index: number;
}

export default function LevelNode({
  level,
  worldId,
  progress,
  unlocked,
  isCurrent,
  kingdomColor,
  index,
}: LevelNodeProps) {
  const completed = progress?.completed === true;

  // Serpentine offset: alternate left/right
  const offset = index % 2 === 0 ? "ml-8" : "mr-8";

  if (!unlocked) {
    return (
      <div className={`flex flex-col items-center ${offset}`}>
        <div className="w-14 h-14 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center shadow-inner">
          <Icon name="lock" size={18} className="text-gray-400" />
        </div>
        <span className="text-xs text-white/60 mt-1.5 text-center max-w-20 line-clamp-1 drop-shadow">
          {level.title}
        </span>
      </div>
    );
  }

  return (
    <Link href={`/world/${worldId}/${level.id}`} className={`flex flex-col items-center ${offset}`}>
      <div
        className={`
          relative rounded-full flex items-center justify-center transition-all duration-200 ease-out
          hover:scale-110 hover:-translate-y-0.5 active:scale-95 active:translate-y-0
          ${completed
            ? "w-14 h-14 shadow-lg animate-breathe"
            : isCurrent
              ? "w-16 h-16 shadow-xl animate-glow-pulse"
              : "w-14 h-14 shadow-lg"
          }
        `}
        style={{
          background: completed
            ? `linear-gradient(135deg, ${kingdomColor}, ${kingdomColor}dd)`
            : isCurrent
              ? `linear-gradient(135deg, var(--color-primary), var(--color-primary-light))`
              : `linear-gradient(135deg, var(--color-primary), var(--color-primary-light))`,
          boxShadow: completed
            ? `0 4px 14px ${kingdomColor}60`
            : isCurrent
              ? `0 0 20px ${kingdomColor}40, 0 4px 14px rgba(107,70,193,0.3)`
              : `0 4px 10px rgba(107,70,193,0.2)`,
        }}
      >
        {completed && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
            <Icon name="check" size={10} className="text-white" />
          </div>
        )}
        <span className="text-lg font-bold text-white">{level.order}</span>
      </div>

      {completed && progress && (
        <div className="mt-1">
          <StarRating stars={progress.stars} size="sm" />
        </div>
      )}

      <span className="text-xs text-white/80 mt-1 text-center max-w-20 line-clamp-1 font-medium drop-shadow">
        {level.title}
      </span>
    </Link>
  );
}
