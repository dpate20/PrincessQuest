"use client";

import { useMemo, useState, useEffect } from "react";

interface ConfettiProps {
  count?: number;
}

const COLORS = [
  "#F6AD55", // gold
  "#6B46C1", // purple
  "#48BB78", // emerald
  "#FC8181", // pink
  "#4299E1", // blue
  "#FBD38D", // light gold
  "#805AD5", // light purple
];

export default function Confetti({ count = 40 }: ConfettiProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        width: Math.random() * 6 + 4,
        height: Math.random() * 4 + 2,
        color: COLORS[i % COLORS.length],
        delay: `${Math.random() * 0.8}s`,
        duration: `${Math.random() * 1.5 + 2}s`,
        rotation: Math.random() * 360,
      })),
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
