"use client";

import { useMemo } from "react";

interface SparkleProps {
  count?: number;
}

function seededFloat(seed: number): number {
  const value = Math.sin(seed * 7919.431) * 21562.119;
  return value - Math.floor(value);
}

export default function Sparkle({ count = 12 }: SparkleProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const leftSeed = seededFloat(i + 1);
        const topSeed = seededFloat((i + 1) * 2);
        const sizeSeed = seededFloat((i + 1) * 3);
        const delaySeed = seededFloat((i + 1) * 4);

        return {
          id: i,
          left: `${leftSeed * 100}%`,
          top: `${topSeed * 100}%`,
          size: sizeSeed * 4 + 2,
          delay: `${delaySeed * 4}s`,
        };
      }),
    [count]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full animate-sparkle ${p.id % 2 === 0 ? "bg-yellow-300" : "bg-purple-300"}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            opacity: 0,
            ...(p.id % 3 === 0
              ? {
                  clipPath:
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                }
              : {}),
          }}
        />
      ))}
    </div>
  );
}
