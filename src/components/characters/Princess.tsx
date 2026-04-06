"use client";

import { useMemo } from "react";
import PrincessSara from "./PrincessSara";
import { useGameStore } from "@/stores/useGameStore";
import {
  getAccessoryStyle,
  getCrownStyle,
  getDressStyle,
} from "@/data/princess-customization";

export type PrincessAnimationState = "idle" | "correct" | "wrong";
export type PrincessSize = "sm" | "md" | "lg" | "xl" | "hero";

interface PrincessProps {
  animationState?: PrincessAnimationState;
  size?: PrincessSize;
  showName?: boolean;
  animateIdle?: boolean;
  dressId?: string;
  crownId?: string;
  accessoryId?: string;
  nameOverride?: string;
  className?: string;
}

const sizeToSaraSize: Record<PrincessSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "lg",
  hero: "md",
};

const outerScale: Record<PrincessSize, number> = {
  sm: 1,
  md: 1,
  lg: 1.2,
  xl: 1.32,
  hero: 1.33,
};

export default function Princess({
  animationState = "idle",
  size = "md",
  showName = false,
  animateIdle = true,
  dressId,
  crownId,
  accessoryId,
  nameOverride,
  className = "",
}: PrincessProps) {
  const displayName = useGameStore((s) => s.displayName);
  const equippedDress = useGameStore((s) => s.equippedDress);
  const equippedCrown = useGameStore((s) => s.equippedCrown);
  const equippedAccessory = useGameStore((s) => s.equippedAccessory);

  const activeDress = dressId ?? equippedDress;
  const activeCrown = crownId ?? equippedCrown;
  const activeAccessory = accessoryId ?? equippedAccessory;
  const activeName = nameOverride ?? displayName;

  const dressStyle = useMemo(
    () => getDressStyle(activeDress),
    [activeDress]
  );
  const crownStyle = useMemo(
    () => getCrownStyle(activeCrown),
    [activeCrown]
  );
  const accessoryStyle = useMemo(
    () => getAccessoryStyle(activeAccessory),
    [activeAccessory]
  );

  const shouldAnimateIdle = animationState === "idle" && animateIdle;
  const expression =
    animationState === "correct"
      ? "celebrating"
      : animationState === "wrong"
        ? "thinking"
        : "happy";

  const animationClass =
    animationState === "correct"
      ? "animate-princess-celebrate"
      : animationState === "wrong"
        ? "animate-princess-wrong"
        : shouldAnimateIdle
          ? "animate-gentle-float"
          : "";

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className="relative"
        style={{
          transform: `scale(${outerScale[size]})`,
          transformOrigin: "center bottom",
        }}
      >
        {animationState === "correct" && (
          <div className="absolute -inset-4 pointer-events-none">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className="absolute text-yellow-300 animate-coin-sparkle"
                style={{
                  top: `${18 + i * 11}%`,
                  left: `${12 + (i % 3) * 28}%`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                +
              </span>
            ))}
          </div>
        )}

        <div className={animationClass}>
          <PrincessSara
            expression={expression}
            size={sizeToSaraSize[size]}
            dressStyle={dressStyle}
            crownStyle={crownStyle}
            accessoryStyle={accessoryStyle}
            breathe={shouldAnimateIdle}
          />
        </div>
      </div>

      {showName && (
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 px-5 py-1.5 rounded-full shadow-md border-2 border-white/40">
          <span className="text-sm font-bold text-purple-800 font-[var(--font-heading)]">
            {activeName}
          </span>
        </div>
      )}
    </div>
  );
}
