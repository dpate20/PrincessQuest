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
    <header className="flex items-center justify-between px-4 py-3 bg-[var(--color-bg-panel)]/90 backdrop-blur-sm border-b border-amber-200/50">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="w-10 h-10 rounded-lg bg-[var(--color-bg-parchment)] flex items-center justify-center text-[var(--color-primary)] hover:bg-amber-100 transition-colors"
          >
            <Icon name="arrow-left" size={18} />
          </Link>
        )}
        {title && (
          <h1 className="text-lg font-bold font-[var(--font-heading)] text-[var(--color-primary)]">
            {title}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm font-semibold">
        {streak.currentStreak > 0 && (
          <span className="flex items-center gap-1 text-orange-600">
            <Icon name="flame" size={16} />
            {streak.currentStreak}
          </span>
        )}
        <span className="flex items-center gap-1 text-[var(--color-accent)]">
          <Icon name="star" size={16} />
          {totalStars}
        </span>
      </div>
    </header>
  );
}
