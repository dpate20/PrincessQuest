"use client";

import { use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getWorld } from "@/lib/content-loader";
import { getNextLevelId } from "@/lib/progression";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import Sparkle from "@/components/ui/Sparkle";
import Confetti from "@/components/ui/Confetti";
import PrincessSara from "@/components/characters/PrincessSara";
import { playSound } from "@/lib/sounds";

const encouragingMessages = [
  "Brilliant work, scholar! Princess Sara is proud of you.",
  "The kingdom celebrates your achievement! Onward!",
  "Another challenge conquered. Your quest continues!",
  "Your skills grow stronger with every victory!",
  "Excellent! You are ready for the next trial.",
  "The royal scholars speak highly of your progress!",
];

export default function LevelCompletePage({
  params,
}: {
  params: Promise<{ worldId: string; levelId: string }>;
}) {
  const { worldId, levelId } = use(params);
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") ?? "0", 10);
  const stars = parseInt(searchParams.get("stars") ?? "0", 10);
  const passed = score >= 70;

  const world = getWorld(worldId);
  const nextLevelId = world
    ? getNextLevelId(levelId, world.levelIds)
    : null;

  const message =
    encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];

  useEffect(() => {
    playSound("levelComplete");
    // Staggered star sounds
    for (let i = 0; i < stars; i++) {
      setTimeout(() => playSound("starEarned"), 400 + i * 250);
    }
  }, [stars]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-600 via-purple-500 to-pink-400 relative overflow-hidden flex flex-col items-center justify-center px-4">
      <Confetti count={50} />
      <Sparkle count={16} />

      {/* Princess Sara celebrating */}
      <div className="mb-4 animate-fade-in-up">
        <PrincessSara
          expression={passed ? "celebrating" : "thinking"}
          size="md"
        />
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-sm w-full text-center animate-fade-in-up border-4 border-white/30">
        <div className="mb-4 flex justify-center">
          <StarRating stars={stars} size="lg" animated />
        </div>

        <div
          className="text-5xl font-extrabold font-[var(--font-heading)] text-[var(--color-primary)] mb-2"
          style={{ textShadow: "0 2px 8px rgba(107, 70, 193, 0.15)" }}
        >
          {score}%
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

        <div className="flex flex-col gap-3">
          {passed && nextLevelId && (
            <Link href={`/world/${worldId}/${nextLevelId}`}>
              <Button variant="gold" size="lg" className="w-full">
                Next Level
              </Button>
            </Link>
          )}

          <Link href={`/world/${worldId}/${levelId}`}>
            <Button
              variant={passed ? "secondary" : "primary"}
              size="md"
              className="w-full"
            >
              {passed ? "Replay" : "Try Again"}
            </Button>
          </Link>

          <Link href={`/world/${worldId}`}>
            <Button variant="ghost" size="sm" className="w-full">
              Back to Map
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
