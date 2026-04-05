"use client";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: "sm" | "md";
  className?: string;
}

const heightStyles = {
  sm: "h-2",
  md: "h-3",
};

export default function ProgressBar({
  value,
  max,
  color,
  height = "md",
  className = "",
}: ProgressBarProps) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={`w-full ${heightStyles[height]} bg-purple-100 border border-purple-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${pct}%`,
          background: color ?? "var(--gradient-gold)",
        }}
      />
    </div>
  );
}
