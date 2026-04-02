"use client";

import { useState, useRef } from "react";
import type { MinigameProps } from "@/types/minigame";
import type { FillInTheBlankData } from "@/types/content";
import { validateSpelling } from "@/lib/answer-validation";

export default function FillInTheBlank({ exercise, onAnswer }: MinigameProps) {
  const data = exercise.data as FillInTheBlankData;
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const startTime = useRef(Date.now());

  const sentenceParts = data.sentence.split("___");

  function handleSubmit() {
    if (submitted || !input.trim()) return;
    const correct = validateSpelling(
      input,
      data.correctAnswer,
      data.acceptableSpellings
    );
    setIsCorrect(correct);
    setSubmitted(true);

    setTimeout(() => {
      onAnswer({
        correct,
        selectedAnswer: input.trim(),
        timeMs: Date.now() - startTime.current,
        exerciseType: "fill-in-the-blank",
      });
    }, 800);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div className="bg-[var(--color-bg-panel)] rounded-xl p-5 w-full border border-amber-200/50">
        <p className="text-lg text-[var(--color-primary)] leading-relaxed text-center">
          {sentenceParts[0]}
          <span className="inline-block mx-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={submitted}
              placeholder="type here"
              autoFocus
              className={`border-b-2 bg-transparent text-center font-bold outline-none w-32 transition-colors ${
                submitted
                  ? isCorrect
                    ? "border-[var(--color-success)] text-[var(--color-success)]"
                    : "border-[var(--color-error)] text-[var(--color-error)]"
                  : "border-[var(--color-accent)] text-[var(--color-primary)]"
              }`}
            />
          </span>
          {sentenceParts[1]}
        </p>
      </div>

      {data.hint && !submitted && !input && (
        <p className="text-sm text-gray-400 italic">Hint: {data.hint}</p>
      )}

      {submitted && !isCorrect && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 w-full text-center animate-fade-in-up">
          <p className="text-sm text-gray-600">
            Correct answer: <strong>{data.correctAnswer}</strong>
          </p>
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="bg-[var(--color-accent)] text-white font-semibold rounded-lg px-8 py-3 transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check Answer
        </button>
      )}
    </div>
  );
}
