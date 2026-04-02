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
    "bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white shadow-lg shadow-slate-300",
  secondary:
    "bg-[var(--color-bg-parchment)] hover:bg-amber-50 text-[var(--color-primary)] border-2 border-[var(--color-primary)]/20",
  ghost: "bg-transparent hover:bg-[var(--color-primary)]/5 text-[var(--color-primary)]",
  gold: "bg-[var(--color-accent)] hover:brightness-110 text-white shadow-lg shadow-amber-200",
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
        rounded-lg font-semibold transition-all duration-200
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </button>
  );
}
