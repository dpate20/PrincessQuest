"use client";

import { useState } from "react";
import type { MinigameProps } from "@/types/minigame";
import type { VocabularyInContextData } from "@/types/content";

export default function VocabularyInContext({
  exercise,
  onAnswer,
}: MinigameProps) {
  const data = exercise.data as VocabularyInContextData;
  const [selected, setSelected] = useState<string | null>(null);
  const [showDefinition, setShowDefinition] = useState(false);

  const sentenceParts = data.sentence.split("___");

  function handleSelect(choice: string) {
    if (selected) return;
    setSelected(choice);
    setShowDefinition(true);

    setTimeout(() => {
      onAnswer({
        correct: choice === data.correctChoice,
        selectedAnswer: choice,
        timeMs: 0,
        exerciseType: "vocabulary-in-context",
      });
    }, 2500);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="bg-[var(--color-bg-panel)] rounded-xl p-5 w-full border border-purple-200/50">
        <p className="text-lg text-[var(--color-primary)] leading-relaxed text-center">
          {sentenceParts[0]}
          <span className="inline-block min-w-[80px] border-b-2 border-[var(--color-accent)] mx-1 text-center font-bold">
            {selected || "\u00A0\u00A0\u00A0\u00A0\u00A0"}
          </span>
          {sentenceParts[1]}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {data.choices.map((choice) => {
          const isSelected = selected === choice;
          const isCorrect = choice === data.correctChoice;
          let btnClass =
            "rounded-xl p-4 text-center font-semibold border-2 transition-all cursor-pointer ";

          if (!selected) {
            btnClass +=
              "bg-gradient-to-b from-[#FFFAF0] to-[#F7EEDD] border-amber-300/60 shadow-md shadow-amber-100/30 hover:border-[var(--color-accent)] hover:shadow-lg hover:-translate-y-0.5 active:scale-95";
          } else if (isSelected && isCorrect) {
            btnClass +=
              "bg-green-50 border-[var(--color-success)] text-[var(--color-success)]";
          } else if (isSelected && !isCorrect) {
            btnClass +=
              "bg-red-50 border-[var(--color-error)] text-[var(--color-error)]";
          } else if (!isSelected && isCorrect) {
            btnClass +=
              "bg-green-50/50 border-[var(--color-success)]/50 text-[var(--color-success)]";
          } else {
            btnClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
          }

          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              disabled={!!selected}
              className={`${btnClass} quest-answer-btn`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {showDefinition && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 w-full animate-fade-in-up">
          <p className="text-sm text-gray-500 font-medium mb-1">Definition:</p>
          <p className="text-[var(--color-primary)] font-[var(--font-heading)]">
            <strong>{data.correctChoice}</strong> &mdash; {data.definition}
          </p>
        </div>
      )}
    </div>
  );
}
