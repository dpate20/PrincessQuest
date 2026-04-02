"use client";

import Icon from "./Icon";

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeMap = { sm: 16, md: 24, lg: 36 };

export default function StarRating({
  stars,
  maxStars = 3,
  size = "md",
  animated = false,
}: StarRatingProps) {
  const iconSize = sizeMap[size];

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < stars;
        return (
          <span
            key={i}
            className={`${animated && filled ? "animate-star-fill" : ""}`}
            style={animated && filled ? { animationDelay: `${i * 0.2}s` } : undefined}
          >
            <Icon
              name={filled ? "star" : "star-outline"}
              size={iconSize}
              className={filled ? "text-yellow-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" : "text-purple-200"}
            />
          </span>
        );
      })}
    </div>
  );
}
