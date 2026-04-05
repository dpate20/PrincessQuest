"use client";

import { useMemo, useState, useEffect } from "react";

interface ConfettiProps {
  count?: number;
}

const COLORS = [
  "#F6AD55",
  "#6B46C1",
  "#48BB78",
  "#FC8181",
  "#4299E1",
  "#FBD38D",
  "#805AD5",
];

function seededFloat(seed: number): number {
  const value = Math.sin(seed * 9999.713) * 43758.5453123;
  return value - Math.floor(value);
}

export default function Confetti({ count = 40 }: ConfettiProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const leftSeed = seededFloat(i + 1);
        const widthSeed = seededFloat((i + 1) * 2);
        const heightSeed = seededFloat((i + 1) * 3);
        const delaySeed = seededFloat((i + 1) * 4);
        const durationSeed = seededFloat((i + 1) * 5);
        const rotateSeed = seededFloat((i + 1) * 6);

        return {
          id: i,
          left: `${leftSeed * 100}%`,
          width: widthSeed * 6 + 4,
          height: heightSeed * 4 + 2,
          color: COLORS[i % COLORS.length],
          delay: `${delaySeed * 0.8}s`,
          duration: `${durationSeed * 1.5 + 2}s`,
          rotation: rotateSeed * 360,
        };
      }),
    [count]
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration} ease-in forwards`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
