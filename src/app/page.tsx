"use client";

import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";
import BottomNav from "@/components/layout/BottomNav";
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
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-600 via-purple-500 to-pink-400 relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-8 left-12 text-yellow-300 animate-pulse">
        <Icon name="star" size={32} />
      </div>
      <div className="absolute top-24 right-20 text-yellow-200 animate-pulse" style={{ animationDelay: "0.2s" }}>
        <Icon name="star" size={24} />
      </div>
      <div className="absolute top-16 right-40 text-yellow-300 animate-pulse" style={{ animationDelay: "0.4s" }}>
        <Icon name="star" size={20} />
      </div>

      {/* Clouds */}
      <div className="absolute top-12 left-32 w-24 h-12 bg-white/30 rounded-full blur-sm" />
      <div className="absolute top-20 left-40 w-32 h-10 bg-white/20 rounded-full blur-sm" />
      <div className="absolute top-16 right-24 w-28 h-12 bg-white/25 rounded-full blur-sm" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-12">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-200 to-yellow-400 px-8 py-3 rounded-full shadow-lg mb-4">
            <h1 className="text-4xl font-bold text-purple-800 drop-shadow-sm font-[var(--font-heading)]">
              Princess English Quest
            </h1>
          </div>
          <p className="text-white text-lg mt-4 drop-shadow-md">
            Join Princess Sara on a magical quest for learning
          </p>
          <p className="text-white text-lg drop-shadow-md">
            vocabulary, spelling and reading comprehension!
          </p>
        </div>

        {/* Character */}
        <div className="mb-8 animate-fade-in-up">
          <PrincessSara expression="celebrating" size="lg" />
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-8">
          {streak.currentStreak > 0 && (
            <div className="flex items-center gap-2 bg-white/90 px-6 py-3 rounded-full shadow-lg">
              <span className="animate-fire-flicker">
                <Icon name="flame" size={24} className="text-orange-500" />
              </span>
              <span className="text-2xl font-bold text-purple-800">
                {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-white/90 px-6 py-3 rounded-full shadow-lg">
            <Icon name="star" size={24} className="text-yellow-400" />
            <span className="text-2xl font-bold text-purple-800">
              {totalStars} star{totalStars !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Main CTA button */}
        <Link href="/world" className="mb-4">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-12 py-5 rounded-full shadow-xl text-2xl font-bold transform transition-all hover:scale-105 active:scale-95">
            Begin Your Quest
          </button>
        </Link>

        {lastPlayed && (
          <Link
            href={`/world/${lastPlayed.worldId}/${lastPlayed.levelId}`}
            className="text-center text-sm text-white/90 hover:text-yellow-200 hover:underline transition-colors drop-shadow"
          >
            Continue your adventure
          </Link>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
