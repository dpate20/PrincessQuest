"use client";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export default function ProgressBar({
  value,
  max,
  className = "",
}: ProgressBarProps) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={`w-full h-2.5 bg-amber-100 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${pct}%`,
          background: "var(--gradient-gold)",
        }}
      />
    </div>
  );
}
