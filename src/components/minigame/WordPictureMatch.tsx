"use client";

import { useRef } from "react";
import type { MinigameProps } from "@/types/minigame";
import type { WordPictureData } from "@/types/content";
import SpeakButton from "@/components/audio/SpeakButton";

export default function WordPictureMatch({
  exercise,
  onAnswer,
}: MinigameProps) {
  const startTime = useRef(Date.now());
  const data = exercise.data as WordPictureData;

  const handleTap = (option: WordPictureData["options"][number]) => {
    onAnswer({
      correct: option.isCorrect,
      selectedAnswer: option.label,
      timeMs: Date.now() - startTime.current,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Target word with speaker */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-[var(--color-primary)]">
          {data.targetWord}
        </span>
        <SpeakButton text={data.targetWord} size="sm" />
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {data.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleTap(option)}
            className="bg-white rounded-2xl p-6 border-2 border-purple-100 shadow-sm
              hover:border-purple-300 hover:shadow-md transition-all active:scale-95
              flex flex-col items-center gap-2 min-h-28"
          >
            <span className="text-5xl">{option.imageEmoji}</span>
            <span className="text-xs text-gray-400">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
