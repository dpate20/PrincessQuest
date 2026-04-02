"use client";

import Link from "next/link";
import type { World } from "@/types/content";
import Icon, { type IconName } from "./Icon";
import ProgressBar from "./ProgressBar";

interface KingdomCardProps {
  world: World;
  completedLevels: number;
  totalLevels: number;
  unlocked: boolean;
}

const KINGDOM_COLORS: Record<string, { bg: string; border: string; glow: string }> = {
  "word-fortress": {
    bg: "linear-gradient(135deg, #EBF4FF 0%, #BEE3F8 100%)",
    border: "#4299E1",
    glow: "rgba(66, 153, 225, 0.3)",
  },
  "context-courtyard": {
    bg: "linear-gradient(135deg, #F0FFF4 0%, #C6F6D5 100%)",
    border: "#48BB78",
    glow: "rgba(72, 187, 120, 0.3)",
  },
  "story-tower": {
    bg: "linear-gradient(135deg, #FFFAF0 0%, #FEEBC8 100%)",
    border: "#ED8936",
    glow: "rgba(237, 137, 54, 0.3)",
  },
  "knowledge-keep": {
    bg: "linear-gradient(135deg, #E6FFFA 0%, #B2F5EA 100%)",
    border: "#319795",
    glow: "rgba(49, 151, 149, 0.3)",
  },
  "champions-arena": {
    bg: "linear-gradient(135deg, #FAF5FF 0%, #E9D8FD 100%)",
    border: "#805AD5",
    glow: "rgba(128, 90, 213, 0.3)",
  },
};

const KINGDOM_BANNERS: Record<string, React.ReactNode> = {
  "word-fortress": (
    <div className="relative h-20 overflow-hidden rounded-t-lg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #2B6CB0 0%, #4299E1 60%, #63B3ED 100%)" }} />
      {/* Fortress silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-14"
        style={{ background: "#2C5282", clipPath: "polygon(0% 100%, 0% 40%, 5% 40%, 5% 30%, 10% 30%, 10% 40%, 20% 40%, 20% 20%, 25% 20%, 25% 40%, 35% 40%, 35% 10%, 40% 10%, 40% 0%, 45% 0%, 45% 10%, 50% 10%, 50% 0%, 55% 0%, 55% 10%, 60% 10%, 60% 0%, 65% 10%, 65% 40%, 75% 40%, 75% 20%, 80% 20%, 80% 40%, 90% 40%, 90% 30%, 95% 30%, 95% 40%, 100% 40%, 100% 100%)" }} />
      {/* Stars */}
      <circle className="absolute" style={{ top: 6, left: 20, width: 3, height: 3, borderRadius: "50%", background: "white", opacity: 0.6 } as React.CSSProperties} />
    </div>
  ),
  "context-courtyard": (
    <div className="relative h-20 overflow-hidden rounded-t-lg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #68D391 0%, #48BB78 60%, #38A169 100%)" }} />
      {/* Arch columns */}
      <div className="absolute bottom-0 left-4 w-6 h-12 bg-[#276749] rounded-t-full" />
      <div className="absolute bottom-0 left-14 w-6 h-12 bg-[#276749] rounded-t-full" />
      <div className="absolute bottom-0 right-4 w-6 h-12 bg-[#276749] rounded-t-full" />
      <div className="absolute bottom-0 right-14 w-6 h-12 bg-[#276749] rounded-t-full" />
      {/* Center arch */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-16 border-t-[3px] border-l-[3px] border-r-[3px] border-[#276749] rounded-t-full" />
    </div>
  ),
  "story-tower": (
    <div className="relative h-20 overflow-hidden rounded-t-lg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #F6AD55 0%, #ED8936 60%, #DD6B20 100%)" }} />
      {/* Tower silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16"
        style={{ background: "#C05621", clipPath: "polygon(30% 100%, 25% 30%, 35% 10%, 50% 0%, 65% 10%, 75% 30%, 70% 100%)" }} />
      {/* Tower windows */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-4 bg-[#FEEBC8] rounded-t-full" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-2 h-3 bg-[#FEEBC8] rounded-t-full" />
    </div>
  ),
  "knowledge-keep": (
    <div className="relative h-20 overflow-hidden rounded-t-lg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #4FD1C5 0%, #319795 60%, #285E61 100%)" }} />
      {/* Columns */}
      <div className="absolute bottom-0 left-6 w-4 h-14 bg-[#234E52]" />
      <div className="absolute bottom-0 left-[40%] w-4 h-14 bg-[#234E52]" />
      <div className="absolute bottom-0 right-[40%] w-4 h-14 bg-[#234E52]" />
      <div className="absolute bottom-0 right-6 w-4 h-14 bg-[#234E52]" />
      {/* Roof beam */}
      <div className="absolute bottom-[52px] left-4 right-4 h-2 bg-[#234E52]" />
    </div>
  ),
  "champions-arena": (
    <div className="relative h-20 overflow-hidden rounded-t-lg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #B794F4 0%, #805AD5 60%, #553C9A 100%)" }} />
      {/* Arena arch */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-14"
        style={{ background: "#44337A", clipPath: "polygon(0% 100%, 10% 40%, 30% 10%, 50% 0%, 70% 10%, 90% 40%, 100% 100%, 85% 100%, 75% 50%, 60% 25%, 50% 18%, 40% 25%, 25% 50%, 15% 100%)" }} />
      {/* Crown */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2">
        <svg width="20" height="14" viewBox="0 0 20 14">
          <path d="M2 12 L4 4 L7 8 L10 2 L13 8 L16 4 L18 12 Z" fill="#F6AD55" />
        </svg>
      </div>
    </div>
  ),
};

export default function KingdomCard({
  world,
  completedLevels,
  totalLevels,
  unlocked,
}: KingdomCardProps) {
  const colors = KINGDOM_COLORS[world.id] ?? KINGDOM_COLORS["word-fortress"];

  if (!unlocked || totalLevels === 0) {
    return (
      <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 opacity-60">
        <div className="h-20 bg-gray-200 flex items-center justify-center">
          <Icon name="chain-lock" size={32} className="text-gray-400" />
        </div>
        <div className="p-4 bg-gray-50">
          <h2 className="text-lg font-bold font-[var(--font-heading)] text-gray-400">
            {world.name}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {totalLevels === 0
              ? "Coming soon..."
              : "Complete challenges in other kingdoms to unlock"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/world/${world.id}`}>
      <div
        className="rounded-xl overflow-hidden border-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl cursor-pointer"
        style={{
          borderColor: colors.border,
          boxShadow: `0 4px 14px ${colors.glow}`,
        }}
      >
        {/* Banner illustration */}
        {KINGDOM_BANNERS[world.id]}

        {/* Card body */}
        <div className="p-4" style={{ background: colors.bg }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: colors.border }}
            >
              <Icon
                name={world.icon as IconName}
                size={20}
                className="text-white"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold font-[var(--font-heading)] text-[var(--color-primary)]">
                {world.name}
              </h2>
              <p className="text-sm text-gray-600">{world.description}</p>
            </div>
          </div>

          {totalLevels > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1">
                <ProgressBar value={completedLevels} max={totalLevels} />
              </div>
              <span className="text-xs font-semibold text-gray-500">
                {completedLevels}/{totalLevels}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
