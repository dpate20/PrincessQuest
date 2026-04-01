"use client";

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export default function StarRating({
  stars,
  maxStars = 3,
  size = "md",
  animated = false,
}: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, i) => (
        <span
          key={i}
          className={`${sizeClasses[size]} ${
            animated && i < stars ? "animate-star-fill" : ""
          }`}
          style={animated ? { animationDelay: `${i * 0.2}s` } : undefined}
        >
          {i < stars ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
