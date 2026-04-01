"use client";

import { useState, useCallback } from "react";
import type { Exercise } from "@/types/content";
import type { AnswerResult } from "@/types/minigame";
import { calculateScore, calculateStars } from "@/lib/scoring";

export function useMinigame(
  exercises: Exercise[],
  starThresholds: [number, number, number]
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [lastResult, setLastResult] = useState<AnswerResult | null>(null);

  const currentExercise = exercises[currentIndex];
  const isComplete = currentIndex >= exercises.length;
  const score = calculateScore(results);
  const starCount = calculateStars(score, starThresholds);

  const submitAnswer = useCallback(
    (result: AnswerResult) => {
      setResults((prev) => [...prev, result]);
      setLastResult(result);
      setShowingFeedback(true);
    },
    []
  );

  const advance = useCallback(() => {
    setShowingFeedback(false);
    setLastResult(null);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  return {
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
    total: exercises.length,
  };
}
