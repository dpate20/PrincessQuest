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
    <header className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-3 flex justify-between items-center shadow-xl z-20">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-bold shadow-lg transition-all"
          >
            <Icon name="arrow-left" size={18} />
          </Link>
        )}
        {title && (
          <span className="bg-purple-500 text-white px-5 py-2 rounded-full font-bold shadow-lg text-sm">
            {title}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {streak.currentStreak > 0 && (
          <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full">
            <span className="animate-fire-flicker"><Icon name="flame" size={18} className="text-orange-500" /></span>
            <span className="font-bold text-purple-800">{streak.currentStreak}</span>
          </div>
        )}
        <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full">
          <Icon name="star" size={18} className="text-yellow-400" />
          <span className="font-bold text-purple-800">{totalStars}</span>
        </div>
      </div>
    </header>
  );
}
