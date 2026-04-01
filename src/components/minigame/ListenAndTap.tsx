"use client";

import { useRef, useEffect } from "react";
import type { MinigameProps } from "@/types/minigame";
import type { ListenTapData } from "@/types/content";
import SpeakButton from "@/components/audio/SpeakButton";
import { useTTS } from "@/hooks/useTTS";

export default function ListenAndTap({ exercise, onAnswer }: MinigameProps) {
  const startTime = useRef(Date.now());
  const data = exercise.data as ListenTapData;
  const { speakText } = useTTS();

  // Auto-play audio on mount
  useEffect(() => {
    const timer = setTimeout(() => speakText(data.audioWord), 300);
    return () => clearTimeout(timer);
  }, [data.audioWord, speakText]);

  const handleTap = (option: ListenTapData["options"][number]) => {
    onAnswer({
      correct: option.isCorrect,
      selectedAnswer: option.text,
      timeMs: Date.now() - startTime.current,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Listen prompt */}
      <div className="flex flex-col items-center gap-3">
        <SpeakButton text={data.audioWord} size="lg" />
        <span className="text-sm text-gray-400">Tap to listen again</span>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {data.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleTap(option)}
            className="bg-white rounded-xl px-6 py-4 border-2 border-purple-100 shadow-sm
              hover:border-purple-300 hover:shadow-md transition-all active:scale-[0.98]
              text-left text-lg font-medium text-gray-700 min-h-14"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
