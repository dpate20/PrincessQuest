"use client";

import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";
import BottomNav from "@/components/layout/BottomNav";
import Sparkle from "@/components/ui/Sparkle";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PrincessSara from "@/components/characters/PrincessSara";

export default function HomePage() {
  const totalStars = useGameStore((s) => s.totalStars);
  const streak = useGameStore((s) => s.streak);
  const levelProgress = useGameStore((s) => s.levelProgress);

  const progressEntries = Object.values(levelProgress).sort(
    (a, b) =>
      new Date(b.lastPlayedAt).getTime() - new Date(a.lastPlayedAt).getTime()
  );
  const lastPlayed = progressEntries[0];

  return (
    <div className="flex flex-col flex-1 items-center justify-center relative overflow-hidden pb-20">
      <Sparkle count={12} />

      {/* Hero section — Princess Sara */}
      <div className="relative mb-6 animate-fade-in-up">
        <PrincessSara expression="celebrating" size="lg" />
      </div>

      {/* Title */}
      <h1
        className="text-3xl font-bold font-[var(--font-heading)] text-[var(--color-primary)] text-center mb-2 animate-fade-in-up"
        style={{ textShadow: "0 2px 8px rgba(107, 70, 193, 0.15)" }}
      >
        Princess English Quest
      </h1>
      <p className="text-gray-500 text-center mb-8 px-8 animate-fade-in-up max-w-sm">
        Join Princess Sara on a quest to master vocabulary, spelling, and reading comprehension across five enchanted kingdoms.
      </p>

      {/* Stats row */}
      <div className="flex gap-6 mb-8 animate-fade-in-up">
        {streak.currentStreak > 0 && (
          <div className="flex flex-col items-center">
            <span className="animate-fire-flicker">
              <Icon name="flame" size={28} className="text-orange-500" />
            </span>
            <span className="text-sm font-bold text-orange-500">
              {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""}
            </span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <Icon name="treasure-chest" size={28} className="text-yellow-500" />
          <span className="text-sm font-bold text-yellow-600">
            {totalStars} star{totalStars !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Main CTA */}
      <div className="flex flex-col gap-3 animate-fade-in-up">
        <Link href="/world">
          <Button variant="gold" size="lg" className="animate-glow-pulse">
            Begin Your Quest
          </Button>
        </Link>

        {lastPlayed && (
          <Link
            href={`/world/${lastPlayed.worldId}/${lastPlayed.levelId}`}
            className="text-center text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)] hover:underline transition-colors"
          >
            Continue your adventure
          </Link>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
