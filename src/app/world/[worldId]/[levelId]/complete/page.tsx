"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getWorld } from "@/lib/content-loader";
import { getNextLevelId } from "@/lib/progression";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import Sparkle from "@/components/ui/Sparkle";

const encouragingMessages = [
  "You did it! Your words are getting stronger.",
  "Wonderful! The kingdom grows with every lesson.",
  "Amazing work! You are a true princess of words.",
  "Your voice matters. Keep going!",
  "Brilliant! You are ready for the next gate.",
  "The stars shine brighter because of you!",
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

  return (
    <div className="flex flex-col flex-1 items-center justify-center relative overflow-hidden px-4">
      <Sparkle count={16} />

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-sm w-full text-center animate-fade-in-up">
        {/* Stars */}
        <div className="mb-4 flex justify-center">
          <StarRating stars={stars} size="lg" animated />
        </div>

        {/* Score */}
        <div className="text-5xl font-extrabold text-[var(--color-primary)] mb-2">
          {score}%
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {passed && nextLevelId && (
            <Link href={`/world/${worldId}/${nextLevelId}`}>
              <Button variant="gold" size="lg" className="w-full">
                ✨ Next Level
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
