"use client";

import { useState } from "react";
import type { MinigameProps } from "@/types/minigame";
import type { ReadingComprehensionData } from "@/types/content";
import ScrollContainer from "@/components/ui/ScrollContainer";

export default function ReadingComprehension({
  exercise,
  onAnswer,
}: MinigameProps) {
  const data = exercise.data as ReadingComprehensionData;
  const questions = data.questions;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [subResults, setSubResults] = useState<
    { correct: boolean; question: string }[]
  >([]);

  const currentQ = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  function handleSelectOption(option: string) {
    if (selectedOption) return;
    setSelectedOption(option);

    const correct = option === currentQ.correctOption;
    const newSubResults = [
      ...subResults,
      { correct, question: currentQ.question },
    ];

    setTimeout(() => {
      if (isLastQuestion) {
        const totalCorrect = newSubResults.filter((r) => r.correct).length;
        onAnswer({
          correct: totalCorrect >= Math.ceil(questions.length / 2),
          selectedAnswer: `${totalCorrect}/${questions.length} correct`,
          timeMs: 0,
          exerciseType: "reading-comprehension",
          subResults: newSubResults,
        });
      } else {
        setSubResults(newSubResults);
        setQuestionIndex((i) => i + 1);
        setSelectedOption(null);
      }
    }, 1000);
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg">
      <ScrollContainer title={data.passageTitle}>
        {data.passage}
      </ScrollContainer>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-xs text-gray-400 mb-2">
          Question {questionIndex + 1} of {questions.length}
        </p>
        <p className="font-semibold text-[var(--color-primary)] mb-4">
          {currentQ.question}
        </p>

        <div className="flex flex-col gap-2">
          {currentQ.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQ.correctOption;
            let cls =
              "text-left rounded-lg px-4 py-3 border-2 transition-all text-sm font-medium cursor-pointer ";

            if (!selectedOption) {
              cls +=
                "bg-white border-gray-200 hover:border-[var(--color-accent)] hover:-translate-y-0.5 active:scale-[0.98]";
            } else if (isSelected && isCorrect) {
              cls += "bg-green-50 border-[var(--color-success)] text-[var(--color-success)]";
            } else if (isSelected && !isCorrect) {
              cls += "bg-red-50 border-[var(--color-error)] text-[var(--color-error)]";
            } else if (!isSelected && isCorrect) {
              cls += "bg-green-50/50 border-[var(--color-success)]/50 text-[var(--color-success)]";
            } else {
              cls += "bg-gray-50 border-gray-200 text-gray-400";
            }

            return (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                disabled={!!selectedOption}
                className={`${cls} quest-answer-btn`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
