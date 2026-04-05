"use client";

import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import Princess from "@/components/characters/Princess";
import PrincessNameModal from "@/components/ui/PrincessNameModal";
import Sparkle from "@/components/ui/Sparkle";

export default function HomePage() {
  const hasSeenNamingModal = useGameStore((s) => s.hasSeenNamingModal);
  const levelProgress = useGameStore((s) => s.levelProgress);

  const progressEntries = Object.values(levelProgress).sort(
    (a, b) =>
      new Date(b.lastPlayedAt).getTime() - new Date(a.lastPlayedAt).getTime()
  );
  const lastPlayed = progressEntries[0];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-600 via-purple-500 to-pink-400 relative overflow-hidden pb-16">
      <TopBar />

      {/* Naming modal for first-time users */}
      <PrincessNameModal open={!hasSeenNamingModal} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-[900px] mx-auto px-6 pt-4">
        {/* Title */}
        <div className="mb-6 text-center animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-yellow-200 to-yellow-400 px-6 py-2 rounded-full shadow-lg mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 drop-shadow-sm font-[var(--font-heading)]">
              Princess English Quest
            </h1>
          </div>
          <p className="text-white/90 text-sm drop-shadow-md">
            A magical quest for learning through adventure
          </p>
        </div>

        {/* Princess centerpiece with sparkles */}
        <div className="relative mt-8 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="absolute inset-0 -m-8 pointer-events-none">
            <Sparkle count={8} />
          </div>
          <Princess animationState="idle" size="lg" showName={hasSeenNamingModal} />
        </div>

        {/* Main CTA button */}
        <div className="animate-fade-in-up w-full max-w-xs" style={{ animationDelay: "0.3s" }}>
          <Link href="/world" className="block">
            <Button variant="gold" size="lg" className="w-full text-xl">
              Begin Your Quest
            </Button>
          </Link>
        </div>

        {lastPlayed && (
          <Link
            href={`/world/${lastPlayed.worldId}/${lastPlayed.levelId}`}
            className="mt-4 text-center text-sm text-white/90 hover:text-yellow-200 hover:underline transition-colors drop-shadow animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Continue your adventure
          </Link>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
