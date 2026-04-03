"use client";

import { useGameStore } from "@/stores/useGameStore";
import { getWorlds } from "@/lib/content-loader";
import GameHeader from "@/components/layout/GameHeader";
import BottomNav from "@/components/layout/BottomNav";
import ProgressBar from "@/components/ui/ProgressBar";
import Icon, { type IconName } from "@/components/ui/Icon";
import type { MinigameType } from "@/types/content";

const EXERCISE_TYPE_LABELS: Record<MinigameType, string> = {
  "spelling-pairs": "Spelling",
  "vocabulary-in-context": "Vocabulary",
  "reading-comprehension": "Reading Comprehension",
  "short-story-inference": "Story Inference",
  "fill-in-the-blank": "Fill in the Blank",
};

const KINGDOM_ACCENT: Record<string, string> = {
  "word-fortress": "#4299E1",
  "context-courtyard": "#48BB78",
  "story-tower": "#ED8936",
  "knowledge-keep": "#319795",
  "champions-arena": "#805AD5",
};

export default function ProgressPage() {
  const totalStars = useGameStore((s) => s.totalStars);
  const streak = useGameStore((s) => s.streak);
  const totalExercises = useGameStore((s) => s.totalExercisesCompleted);
  const levelProgress = useGameStore((s) => s.levelProgress);
  const exerciseTypeStats = useGameStore((s) => s.exerciseTypeStats);
  const worlds = getWorlds();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 relative overflow-hidden pb-32">
      <GameHeader title="Your Journey" />

      <div className="relative z-10 flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border-2 border-yellow-200">
            <Icon name="star" size={28} className="text-yellow-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-purple-800">{totalStars}</div>
            <div className="text-xs text-gray-500 font-medium">Stars</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border-2 border-orange-200">
            <Icon name="flame" size={28} className="text-orange-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-purple-800">
              {streak.currentStreak}
            </div>
            <div className="text-xs text-gray-500 font-medium">Day Streak</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border-2 border-purple-200">
            <Icon name="quill" size={28} className="text-purple-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-purple-800">
              {totalExercises}
            </div>
            <div className="text-xs text-gray-500 font-medium">Exercises</div>
          </div>
        </div>

        {streak.longestStreak > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 mb-6 text-center shadow-md">
            <span className="text-sm text-purple-800 font-medium">
              Longest streak: <strong>{streak.longestStreak} days</strong>
            </span>
          </div>
        )}

        {/* Skills Breakdown */}
        <h2 className="text-lg font-bold font-[var(--font-heading)] text-white drop-shadow mb-4">
          Skills Breakdown
        </h2>
        <div className="flex flex-col gap-3 mb-8">
          {(Object.entries(EXERCISE_TYPE_LABELS) as [MinigameType, string][]).map(
            ([type, label]) => {
              const stats = exerciseTypeStats[type];
              const accuracy =
                stats.totalAttempted > 0
                  ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100)
                  : 0;
              return (
                <div
                  key={type}
                  className="bg-white/85 backdrop-blur-sm rounded-xl p-3 shadow-md border border-white/30"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-semibold text-purple-800">
                      {label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {stats.totalAttempted > 0
                        ? `${accuracy}% (${stats.totalCorrect}/${stats.totalAttempted})`
                        : "No data yet"}
                    </span>
                  </div>
                  <ProgressBar value={accuracy} max={100} />
                </div>
              );
            }
          )}
        </div>

        {/* Per-world progress */}
        <h2 className="text-lg font-bold font-[var(--font-heading)] text-white drop-shadow mb-4">
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
            const accentColor = KINGDOM_ACCENT[world.id] ?? "#805AD5";

            return (
              <div
                key={world.id}
                className="bg-white/85 backdrop-blur-sm rounded-xl p-4 shadow-md overflow-hidden"
                style={{ borderLeft: `4px solid ${accentColor}` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: accentColor }}
                  >
                    <Icon
                      name={world.icon as IconName}
                      size={16}
                      className="text-white"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-purple-800">
                        {world.name}
                      </span>
                      {total > 0 && (
                        <span className="text-xs text-gray-500">
                          {completed}/{total} levels &middot;{" "}
                          <Icon name="star" size={10} className="inline text-yellow-500" />{" "}
                          {worldStars}
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
