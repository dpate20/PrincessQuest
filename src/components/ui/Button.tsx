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
    "bg-[var(--color-primary)] hover:bg-[#6d28d9] text-white shadow-lg shadow-purple-200",
  secondary:
    "bg-white hover:bg-gray-50 text-[var(--color-primary)] border-2 border-[var(--color-primary-light)]",
  ghost: "bg-transparent hover:bg-white/50 text-gray-600",
  gold: "bg-gradient-to-r from-[var(--color-accent-light)] to-[var(--color-accent)] hover:from-[var(--color-accent)] hover:to-amber-600 text-white shadow-lg shadow-amber-200",
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
        rounded-full font-semibold transition-all duration-200
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </button>
  );
}
