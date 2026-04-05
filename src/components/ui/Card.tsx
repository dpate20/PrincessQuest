"use client";

interface CardProps {
  children: React.ReactNode;
  variant?: "glass" | "solid" | "outlined";
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  glass:
    "bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-white/30",
  solid:
    "bg-white rounded-2xl shadow-lg border-2 border-purple-100",
  outlined:
    "bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200",
};

export default function Card({
  children,
  variant = "glass",
  className = "",
  style,
}: CardProps) {
  return (
    <div className={`${variantStyles[variant]} ${className}`} style={style}>
      {children}
    </div>
  );
}
