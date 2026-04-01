"use client";

import { useGameStore } from "@/stores/useGameStore";
import { getWorlds } from "@/lib/content-loader";
import GameHeader from "@/components/layout/GameHeader";
import BottomNav from "@/components/layout/BottomNav";
import ProgressBar from "@/components/ui/ProgressBar";

export default function ProgressPage() {
  const totalStars = useGameStore((s) => s.totalStars);
  const streak = useGameStore((s) => s.streak);
  const totalExercises = useGameStore((s) => s.totalExercisesCompleted);
  const levelProgress = useGameStore((s) => s.levelProgress);
  const worlds = getWorlds();

  return (
    <div className="flex flex-col flex-1 pb-20">
      <GameHeader title="Your Journey" />

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white/70 rounded-2xl p-4 text-center border border-amber-100">
            <div className="text-3xl mb-1">⭐</div>
            <div className="text-2xl font-bold text-amber-500">{totalStars}</div>
            <div className="text-xs text-gray-400">Stars</div>
          </div>
          <div className="bg-white/70 rounded-2xl p-4 text-center border border-orange-100">
            <div className="text-3xl mb-1">🔥</div>
            <div className="text-2xl font-bold text-orange-500">
              {streak.currentStreak}
            </div>
            <div className="text-xs text-gray-400">Day Streak</div>
          </div>
          <div className="bg-white/70 rounded-2xl p-4 text-center border border-purple-100">
            <div className="text-3xl mb-1">📝</div>
            <div className="text-2xl font-bold text-[var(--color-primary)]">
              {totalExercises}
            </div>
            <div className="text-xs text-gray-400">Exercises</div>
          </div>
        </div>

        {/* Longest streak */}
        {streak.longestStreak > 0 && (
          <div className="bg-white/50 rounded-xl p-3 mb-6 text-center">
            <span className="text-sm text-gray-500">
              Longest streak: <strong>{streak.longestStreak} days</strong>
            </span>
          </div>
        )}

        {/* Per-world progress */}
        <h2 className="text-lg font-bold text-[var(--color-primary)] mb-4">
          Kingdom Progress
        </h2>
        <div className="flex flex-col gap-4">
          {worlds.map((world) => {
            const completed = world.levelIds.filter(
              (id) => levelProgress[id]?.completed
            ).length;
            const total = world.levelIds.length;
            const worldStars = world.levelIds.reduce(
              (sum, id) => sum + (levelProgress[id]?.stars ?? 0),
              0
            );

            return (
              <div
                key={world.id}
                className="bg-white/60 rounded-xl p-4 border border-purple-50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{world.iconEmoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        {world.name}
                      </span>
                      {total > 0 && (
                        <span className="text-xs text-gray-400">
                          {completed}/{total} levels · ⭐ {worldStars}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {total > 0 ? (
                  <ProgressBar value={completed} max={total} />
                ) : (
                  <p className="text-xs text-gray-400 italic">Coming soon...</p>
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
