"use client";

import { useState, useRef } from "react";
import type { MinigameProps } from "@/types/minigame";
import type { ShortStoryInferenceData } from "@/types/content";
import { validateFreeResponse } from "@/lib/answer-validation";
import ScrollContainer from "@/components/ui/ScrollContainer";

export default function ShortStoryInference({
  exercise,
  onAnswer,
}: MinigameProps) {
  const data = exercise.data as ShortStoryInferenceData;
  const questions = data.questions;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [subResults, setSubResults] = useState<
    { correct: boolean; question: string }[]
  >([]);
  const startTime = useRef(Date.now());

  const currentQ = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  function handleSubmit() {
    if (showSample || !input.trim()) return;

    const correct = validateFreeResponse(input, currentQ.acceptableAnswers);
    const newSubResults = [
      ...subResults,
      { correct, question: currentQ.question },
    ];

    setShowSample(true);

    setTimeout(() => {
      if (isLastQuestion) {
        const totalCorrect = newSubResults.filter((r) => r.correct).length;
        onAnswer({
          correct: totalCorrect >= Math.ceil(questions.length / 2),
          selectedAnswer: `${totalCorrect}/${questions.length} correct`,
          timeMs: Date.now() - startTime.current,
          exerciseType: "short-story-inference",
          subResults: newSubResults,
        });
      } else {
        setSubResults(newSubResults);
        setQuestionIndex((i) => i + 1);
        setInput("");
        setShowSample(false);
      }
    }, 3000);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
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

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={showSample}
          placeholder="Type your answer here..."
          rows={3}
          className="w-full rounded-lg border-2 border-gray-200 p-3 text-sm resize-none outline-none focus:border-[var(--color-accent)] transition-colors disabled:bg-gray-50"
        />

        {showSample && (
          <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-3 animate-fade-in-up">
            <p className="text-xs text-gray-500 mb-1">Sample answer:</p>
            <p className="text-sm text-[var(--color-primary)]">
              {currentQ.sampleAnswer}
            </p>
          </div>
        )}

        {!showSample && (
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="mt-3 w-full bg-[var(--color-accent)] text-white font-semibold rounded-lg px-6 py-3 transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}
