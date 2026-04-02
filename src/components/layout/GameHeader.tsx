"use client";

import Link from "next/link";
import { useGameStore } from "@/stores/useGameStore";
import Icon from "@/components/ui/Icon";

interface GameHeaderProps {
  backHref?: string;
  title?: string;
}

export default function GameHeader({ backHref, title }: GameHeaderProps) {
  const totalStars = useGameStore((s) => s.totalStars);
  const streak = useGameStore((s) => s.streak);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-700 to-purple-800 border-b border-purple-900">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <Icon name="arrow-left" size={18} />
          </Link>
        )}
        {title && (
          <h1 className="text-lg font-bold font-[var(--font-heading)] text-white">
            {title}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm font-semibold">
        {streak.currentStreak > 0 && (
          <span className="flex items-center gap-1 text-orange-300">
            <span className="animate-fire-flicker"><Icon name="flame" size={16} /></span>
            {streak.currentStreak}
          </span>
        )}
        <span className="flex items-center gap-1 text-yellow-300">
          <Icon name="star" size={16} />
          {totalStars}
        </span>
      </div>
    </header>
  );
}
