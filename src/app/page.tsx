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
import HomeBackdrop from "@/components/ui/HomeBackdrop";

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
    <div className="h-[100dvh] w-full bg-gradient-to-b from-purple-600 via-purple-500 to-pink-400 relative overflow-hidden flex flex-col">
      <HomeBackdrop />
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
      <div className="relative z-10 flex-1 min-h-0 max-w-[900px] mx-auto w-full px-6 pt-3 pb-24">
        <div className="flex flex-col items-center text-center">
          <p className="text-white/90 text-sm drop-shadow-md mb-3 animate-fade-in-up">
            A magical quest for learning through adventure
          </p>

          <div
            className="animate-fade-in-up flex flex-col items-center gap-2 w-full max-w-xs"
            style={{ animationDelay: "0.1s" }}
          >
            {hasCustomName && (
              <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 px-5 py-1.5 rounded-full shadow-md border-2 border-white/40">
                <span className="text-sm font-bold text-purple-800 font-[var(--font-heading)]">
                  {displayName}
                </span>
              </div>
            )}

            {hasCustomName && (
              <button
                type="button"
                onClick={() => setIsRenameModalOpen(true)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-purple-800 bg-white/70 border border-white/40 hover:bg-white/85 transition-colors"
              >
                Rename Princess
              </button>
            )}

            <Link href="/world" className="block w-full">
              <Button variant="gold" size="lg" className="w-full text-xl">
                Begin Your Quest
              </Button>
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
        </div>

        {/* Princess at castle entrance */}
        <div
          className="absolute bottom-[132px] left-1/2 -translate-x-1/2 animate-fade-in-up"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="relative flex flex-col items-center">
            <div className="absolute inset-0 -m-10 pointer-events-none">
              <Sparkle count={9} />
            </div>
            <Princess animationState="idle" size="hero" showName={false} />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
