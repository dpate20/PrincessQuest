"use client";

import { useCallback } from "react";
import type { Exercise, MinigameType } from "@/types/content";
import type { MinigameProps, AnswerResult } from "@/types/minigame";
import { useMinigame } from "@/hooks/useMinigame";
import SpellingPairs from "./SpellingPairs";
import VocabularyInContext from "./VocabularyInContext";
import ReadingComprehension from "./ReadingComprehension";
import ShortStoryInference from "./ShortStoryInference";
import FillInTheBlank from "./FillInTheBlank";
import CorrectFeedback from "@/components/feedback/CorrectFeedback";
import IncorrectFeedback from "@/components/feedback/IncorrectFeedback";

const MINIGAME_COMPONENTS: Record<
  MinigameType,
  React.ComponentType<MinigameProps>
> = {
  "spelling-pairs": SpellingPairs,
  "vocabulary-in-context": VocabularyInContext,
  "reading-comprehension": ReadingComprehension,
  "short-story-inference": ShortStoryInference,
  "fill-in-the-blank": FillInTheBlank,
};

function getCorrectAnswer(exercise: Exercise): string {
  const data = exercise.data;
  if ("correctSpelling" in data) return data.correctSpelling;
  if ("correctChoice" in data) return data.correctChoice;
  if ("correctAnswer" in data) return data.correctAnswer;
  if ("questions" in data) {
    const q = data.questions[0];
    if ("correctOption" in q) return q.correctOption;
    if ("sampleAnswer" in q) return q.sampleAnswer;
  }
  return "";
}

interface MinigameShellProps {
  exercises: Exercise[];
  starThresholds: [number, number, number];
  onComplete: (score: number, starCount: number, results: AnswerResult[]) => void;
}

export default function MinigameShell({
  exercises,
  starThresholds,
  onComplete,
}: MinigameShellProps) {
  const {
    currentIndex,
    currentExercise,
    results,
    submitAnswer,
    advance,
    isComplete,
    score,
    starCount,
    showingFeedback,
    lastResult,
    total,
  } = useMinigame(exercises, starThresholds);

  const handleFeedbackDone = useCallback(() => {
    advance();
  }, [advance]);

  if (isComplete) {
    requestAnimationFrame(() => onComplete(score, starCount, results));
    return null;
  }

  if (!currentExercise) return null;

  const MinigameComponent = MINIGAME_COMPONENTS[currentExercise.minigameType];

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-6">
      {/* Progress dots */}
      <div className="flex gap-1.5 mb-4 flex-wrap justify-center">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentIndex
                ? "bg-[var(--color-success)]"
                : i === currentIndex
                  ? "bg-[var(--color-accent)]"
                  : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Exercise prompt */}
      <p className="text-lg font-semibold text-[var(--color-primary)] text-center mb-6">
        {currentExercise.prompt}
      </p>

      {/* Active minigame */}
      <MinigameComponent
        key={currentExercise.id}
        exercise={currentExercise}
        onAnswer={submitAnswer}
      />

      {/* Feedback overlay */}
      {showingFeedback &&
        lastResult &&
        (lastResult.correct ? (
          <CorrectFeedback onDone={handleFeedbackDone} />
        ) : (
          <IncorrectFeedback
            correctAnswer={getCorrectAnswer(currentExercise)}
            onDone={handleFeedbackDone}
          />
        ))}
    </div>
  );
}
