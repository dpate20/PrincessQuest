"use client";

import { useState, useMemo } from "react";
import type { MinigameProps } from "@/types/minigame";
import type { SpellingPairsData } from "@/types/content";

export default function SpellingPairs({ exercise, onAnswer }: MinigameProps) {
  const data = exercise.data as SpellingPairsData;
  const [selected, setSelected] = useState<string | null>(null);

  const options = useMemo(() => {
    const pair = [data.correctSpelling, data.incorrectSpelling];
    const shouldFlip = (exercise.id.length + data.correctSpelling.length) % 2 === 0;
    return shouldFlip ? [pair[1], pair[0]] : pair;
  }, [data.correctSpelling, data.incorrectSpelling, exercise.id]);

  function handleSelect(word: string) {
    if (selected) return;
    setSelected(word);
    const correct = word === data.correctSpelling;

    setTimeout(() => {
      onAnswer({
        correct,
        selectedAnswer: word,
        timeMs: 0,
        exerciseType: "spelling-pairs",
      });
    }, 600);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="bg-[var(--color-bg-panel)] rounded-xl p-4 w-full text-center border border-purple-200/50">
        <p className="text-[var(--color-primary)] italic font-[var(--font-heading)]">
          &ldquo;{data.sentenceContext}&rdquo;
        </p>
      </div>

      <p className="text-sm text-gray-500 font-medium">
        Which spelling is correct?
      </p>

      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((word) => {
          const isSelected = selected === word;
          const isCorrect = word === data.correctSpelling;
          let cardClass =
            "rounded-xl p-6 text-center text-lg font-semibold border-2 transition-all cursor-pointer select-none ";

          if (!selected) {
            cardClass +=
              "bg-gradient-to-b from-[#FFFAF0] to-[#F7EEDD] border-amber-300/60 shadow-md shadow-amber-100/30 hover:border-[var(--color-accent)] hover:shadow-lg hover:-translate-y-0.5 active:scale-95";
          } else if (isSelected && isCorrect) {
            cardClass +=
              "bg-green-50 border-[var(--color-success)] text-[var(--color-success)] scale-105";
          } else if (isSelected && !isCorrect) {
            cardClass +=
              "bg-red-50 border-[var(--color-error)] text-[var(--color-error)] scale-95";
          } else if (!isSelected && isCorrect) {
            cardClass +=
              "bg-green-50/50 border-[var(--color-success)]/50 text-[var(--color-success)]";
          } else {
            cardClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
          }

          return (
            <button
              key={word}
              onClick={() => handleSelect(word)}
              disabled={!!selected}
              className={`${cardClass} quest-answer-btn`}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}
