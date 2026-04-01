"use client";

import { use, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getLevel } from "@/lib/content-loader";
import { useGameStore } from "@/stores/useGameStore";
import GameHeader from "@/components/layout/GameHeader";
import MinigameShell from "@/components/minigame/MinigameShell";

export default function MinigamePlayPage({
  params,
}: {
  params: Promise<{ worldId: string; levelId: string }>;
}) {
  const { worldId, levelId } = use(params);
  const router = useRouter();
  const completeLevel = useGameStore((s) => s.completeLevel);
  const [completed, setCompleted] = useState(false);

  const level = getLevel(levelId);

  const handleComplete = useCallback(
    (score: number, starCount: number) => {
      if (completed) return;
      setCompleted(true);
      completeLevel(levelId, worldId, score, starCount, level?.exercises.length ?? 0);
      router.push(
        `/world/${worldId}/${levelId}/complete?score=${score}&stars=${starCount}`
      );
    },
    [completed, completeLevel, levelId, worldId, level, router]
  );

  if (!level) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <p>Level not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <GameHeader backHref={`/world/${worldId}`} title={level.title} />

      {/* Story snippet */}
      <div className="px-4 py-3 bg-purple-50/50">
        <p className="text-sm text-gray-500 italic text-center">
          {level.storySnippet}
        </p>
      </div>

      <MinigameShell
        exercises={level.exercises}
        starThresholds={level.starThresholds}
        onComplete={handleComplete}
      />
    </div>
  );
}
