"use client";

import { useTTS } from "@/hooks/useTTS";

interface SpeakButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-base",
  md: "w-12 h-12 text-xl",
  lg: "w-14 h-14 text-2xl",
};

export default function SpeakButton({
  text,
  size = "md",
  className = "",
}: SpeakButtonProps) {
  const { speakText, isSupported } = useTTS();

  if (!isSupported) return null;

  return (
    <button
      onClick={() => speakText(text)}
      className={`
        rounded-full bg-white/80 hover:bg-white border-2 border-purple-200
        flex items-center justify-center transition-all active:scale-90
        shadow-sm hover:shadow-md ${sizeClasses[size]} ${className}
      `}
      aria-label={`Listen to "${text}"`}
    >
      🔊
    </button>
  );
}
