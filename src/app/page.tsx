"use client";

import { useState } from "react";
import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import Princess from "@/components/characters/Princess";
import PrincessNameModal from "@/components/ui/PrincessNameModal";
import Sparkle from "@/components/ui/Sparkle";

export default function HomePage() {
  const displayName = useGameStore((s) => s.displayName);
  const hasSeenNamingModal = useGameStore((s) => s.hasSeenNamingModal);
  const levelProgress = useGameStore((s) => s.levelProgress);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const normalizedName = displayName.trim().toLowerCase();
  const hasCustomName =
    !!normalizedName && normalizedName !== "scholar" && normalizedName !== "dev";
  const shouldShowNamingModal = !hasSeenNamingModal || !hasCustomName;
  const nameModalOpen = shouldShowNamingModal || isRenameModalOpen;

  const progressEntries = Object.values(levelProgress).sort(
    (a, b) =>
      new Date(b.lastPlayedAt).getTime() - new Date(a.lastPlayedAt).getTime()
  );
  const lastPlayed = progressEntries[0];

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-purple-600 via-purple-500 to-pink-400 relative overflow-hidden">
      <TopBar title="Princess Quest" titleSize="large" />

      {/* Naming modal for first-time users */}
      <PrincessNameModal
        open={nameModalOpen}
        canClose={!shouldShowNamingModal}
        initialName={hasCustomName ? displayName : ""}
        onClose={() => setIsRenameModalOpen(false)}
        onComplete={() => setIsRenameModalOpen(false)}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-start max-w-[900px] mx-auto px-6 pb-24 pt-3">
        <p className="text-white/90 text-sm drop-shadow-md mb-4 text-center animate-fade-in-up">
          A magical quest for learning through adventure
        </p>

        <div className="mt-16 flex flex-col items-center w-full">
          {/* Princess centerpiece with sparkles */}
          <div
            className="relative mb-4 animate-fade-in-up flex flex-col items-center"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute inset-0 -m-8 pointer-events-none">
              <Sparkle count={8} />
            </div>
            <Princess animationState="idle" size="hero" showName={hasCustomName} />
            {hasCustomName && (
              <button
                type="button"
                onClick={() => setIsRenameModalOpen(true)}
                className="mt-2 px-4 py-1.5 rounded-full text-xs font-semibold text-purple-800 bg-white/70 border border-white/40 hover:bg-white/85 transition-colors"
              >
                Rename Princess
              </button>
            )}
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
      </div>

      <BottomNav />
    </div>
  );
}
