"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const variants = {
  primary:
    "bg-gradient-to-b from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-300 ring-1 ring-inset ring-white/20 hover:from-purple-500 hover:to-purple-600",
  secondary:
    "bg-[var(--color-bg-panel)] hover:bg-purple-50 text-[var(--color-primary)] border-2 border-purple-300",
  ghost: "bg-transparent hover:bg-purple-50 text-[var(--color-primary)]",
  gold: "bg-gradient-to-b from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-200 ring-1 ring-inset ring-white/30 hover:from-yellow-300 hover:to-amber-400",
};

const sizes = {
  sm: "px-4 py-2 text-sm min-h-10",
  md: "px-6 py-3 text-base min-h-12",
  lg: "px-8 py-4 text-lg min-h-14",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl font-semibold transition-all duration-200
        hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </button>
  );
}
