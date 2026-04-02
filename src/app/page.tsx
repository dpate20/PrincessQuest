"use client";

import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";
import BottomNav from "@/components/layout/BottomNav";
import Sparkle from "@/components/ui/Sparkle";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

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
      <Sparkle count={8} />

      {/* Hero section */}
      <div className="relative mb-8 animate-fade-in-up">
        <div className="w-24 h-24 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center shadow-xl animate-gentle-float">
          <Icon name="fortress" size={48} className="text-[var(--color-accent)]" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold font-[var(--font-heading)] text-[var(--color-primary)] text-center mb-2 animate-fade-in-up">
        English Quest
      </h1>
      <p className="text-gray-500 text-center mb-8 px-8 animate-fade-in-up max-w-sm">
        Master vocabulary, spelling, and reading comprehension across five kingdoms.
      </p>

      {/* Stats row */}
      <div className="flex gap-6 mb-8 animate-fade-in-up">
        {streak.currentStreak > 0 && (
          <div className="flex flex-col items-center">
            <Icon name="flame" size={28} className="text-orange-600" />
            <span className="text-sm font-bold text-orange-600">
              {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""}
            </span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <Icon name="star" size={28} className="text-[var(--color-accent)]" />
          <span className="text-sm font-bold text-[var(--color-accent)]">
            {totalStars} star{totalStars !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Main CTA */}
      <div className="flex flex-col gap-3 animate-fade-in-up">
        <Link href="/world">
          <Button variant="gold" size="lg">
            Begin Your Quest
          </Button>
        </Link>

        {lastPlayed && (
          <Link
            href={`/world/${lastPlayed.worldId}/${lastPlayed.levelId}`}
            className="text-center text-sm text-[var(--color-accent)] hover:underline"
          >
            Continue your adventure
          </Link>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
