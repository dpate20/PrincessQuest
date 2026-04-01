"use client";

import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";
import BottomNav from "@/components/layout/BottomNav";
import Sparkle from "@/components/ui/Sparkle";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const totalStars = useGameStore((s) => s.totalStars);
  const streak = useGameStore((s) => s.streak);
  const levelProgress = useGameStore((s) => s.levelProgress);

  // Find the last played or next unlocked level for quick resume
  const progressEntries = Object.values(levelProgress).sort(
    (a, b) =>
      new Date(b.lastPlayedAt).getTime() - new Date(a.lastPlayedAt).getTime()
  );
  const lastPlayed = progressEntries[0];

  return (
    <div className="flex flex-col flex-1 items-center justify-center relative overflow-hidden pb-20">
      <Sparkle count={8} />

      {/* Princess castle illustration */}
      <div className="relative mb-6 animate-fade-in-up">
        <div className="text-8xl animate-gentle-bounce">🏰</div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-5xl">
          👸
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-[var(--color-primary)] text-center mb-2 animate-fade-in-up">
        Princess English Quest
      </h1>
      <p className="text-gray-500 text-center mb-8 px-8 animate-fade-in-up max-w-sm">
        Learn English on a magical adventure through enchanted kingdoms!
      </p>

      {/* Stats row */}
      <div className="flex gap-6 mb-8 animate-fade-in-up">
        {streak.currentStreak > 0 && (
          <div className="flex flex-col items-center">
            <span className="text-2xl">🔥</span>
            <span className="text-sm font-bold text-orange-500">
              {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""}
            </span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <span className="text-2xl">⭐</span>
          <span className="text-sm font-bold text-amber-500">
            {totalStars} star{totalStars !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Main CTA */}
      <div className="flex flex-col gap-3 animate-fade-in-up">
        <Link href="/world">
          <Button variant="gold" size="lg">
            ✨ Begin Your Quest
          </Button>
        </Link>

        {lastPlayed && (
          <Link
            href={`/world/${lastPlayed.worldId}/${lastPlayed.levelId}`}
            className="text-center text-sm text-[var(--color-primary)] hover:underline"
          >
            Continue your adventure →
          </Link>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
