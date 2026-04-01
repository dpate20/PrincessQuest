"use client";

import { useCallback } from "react";
import type { Exercise, MinigameType } from "@/types/content";
import type { MinigameProps } from "@/types/minigame";
import { useMinigame } from "@/hooks/useMinigame";
import WordPictureMatch from "./WordPictureMatch";
import ListenAndTap from "./ListenAndTap";
import SentenceBuilder from "./SentenceBuilder";
import CorrectFeedback from "@/components/feedback/CorrectFeedback";
import IncorrectFeedback from "@/components/feedback/IncorrectFeedback";

const MINIGAME_COMPONENTS: Record<
  MinigameType,
  React.ComponentType<MinigameProps>
> = {
  "word-picture-match": WordPictureMatch,
  "listen-and-tap": ListenAndTap,
  "sentence-builder": SentenceBuilder,
};

function getCorrectAnswer(exercise: Exercise): string {
  const data = exercise.data;
  if ("targetWord" in data) return data.targetWord;
  if ("audioWord" in data) return data.audioWord;
  if ("targetSentence" in data) return data.targetSentence;
  return "";
}

interface MinigameShellProps {
  exercises: Exercise[];
  starThresholds: [number, number, number];
  onComplete: (score: number, starCount: number) => void;
}

export default function MinigameShell({
  exercises,
  starThresholds,
  onComplete,
}: MinigameShellProps) {
  const {
    currentIndex,
    currentExercise,
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

  // Trigger completion callback
  if (isComplete) {
    // Use requestAnimationFrame to avoid calling during render
    requestAnimationFrame(() => onComplete(score, starCount));
    return null;
  }

  if (!currentExercise) return null;

  const MinigameComponent = MINIGAME_COMPONENTS[currentExercise.minigameType];

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-6">
      {/* Progress dots */}
      <div className="flex gap-1.5 mb-4">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < currentIndex
                ? "bg-[var(--color-success)]"
                : i === currentIndex
                  ? "bg-[var(--color-primary)]"
                  : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Exercise prompt */}
      <p className="text-lg font-semibold text-gray-700 text-center mb-6">
        {currentExercise.prompt}
      </p>

      {/* Active minigame */}
      <MinigameComponent
        key={currentExercise.id}
        exercise={currentExercise}
        onAnswer={submitAnswer}
      />

      {/* Feedback overlay */}
      {showingFeedback && lastResult && (
        lastResult.correct ? (
          <CorrectFeedback onDone={handleFeedbackDone} />
        ) : (
          <IncorrectFeedback
            correctAnswer={getCorrectAnswer(currentExercise)}
            onDone={handleFeedbackDone}
          />
        )
      )}
    </div>
  );
}
