"use client";

import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";

interface GameHeaderProps {
  backHref?: string;
  title?: string;
}

export default function GameHeader({ backHref, title }: GameHeaderProps) {
  const totalStars = useGameStore((s) => s.totalStars);
  const streak = useGameStore((s) => s.streak);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-sm border-b border-purple-100">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[var(--color-primary)] hover:bg-purple-100 transition-colors"
          >
            ←
          </Link>
        )}
        {title && (
          <h1 className="text-lg font-bold text-[var(--color-primary)]">
            {title}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm font-semibold">
        {streak.currentStreak > 0 && (
          <span className="flex items-center gap-1 text-orange-500">
            🔥 {streak.currentStreak}
          </span>
        )}
        <span className="flex items-center gap-1 text-amber-500">
          ⭐ {totalStars}
        </span>
      </div>
    </header>
  );
}
