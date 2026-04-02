"use client";

import { useMemo } from "react";

interface SparkleProps {
  count?: number;
}

export default function Sparkle({ count = 12 }: SparkleProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        delay: `${Math.random() * 4}s`,
      })),
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
            ...(p.id % 3 === 0 ? { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' } : {}),
          }}
        />
      ))}
    </div>
  );
}
