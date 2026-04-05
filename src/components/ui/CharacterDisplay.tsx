"use client";

import Princess, {
  type PrincessAnimationState,
  type PrincessSize,
} from "@/components/characters/Princess";

interface CharacterDisplayProps {
  expression?: "happy" | "thinking" | "celebrating";
  size?: PrincessSize;
  showName?: boolean;
  className?: string;
}

export default function CharacterDisplay({
  expression = "happy",
  size = "md",
  showName = false,
  className = "",
}: CharacterDisplayProps) {
  const animationState: PrincessAnimationState =
    expression === "celebrating"
      ? "correct"
      : expression === "thinking"
        ? "wrong"
        : "idle";

  return (
    <Princess
      animationState={animationState}
      size={size}
      showName={showName}
      className={className}
    />
  );
}
