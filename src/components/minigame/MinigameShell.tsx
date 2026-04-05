"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Exercise, MinigameType } from "@/types/content";
import type { MinigameProps, AnswerResult } from "@/types/minigame";
import { useMinigame } from "@/hooks/useMinigame";
import { playSound } from "@/lib/sounds";
import { getNarratorScene } from "@/lib/narrator-tone";
import { useGameStore } from "@/stores/useGameStore";
import SpellingPairs from "./SpellingPairs";
import VocabularyInContext from "./VocabularyInContext";
import ReadingComprehension from "./ReadingComprehension";
import ShortStoryInference from "./ShortStoryInference";
import FillInTheBlank from "./FillInTheBlank";
import ProgressBar from "@/components/ui/ProgressBar";
import NPCGuide, { SpeechBubble } from "@/components/characters/NPCGuide";
import Princess, { type PrincessAnimationState } from "@/components/characters/Princess";
import Icon from "@/components/ui/Icon";

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

interface MinigameShellProps {
  worldId: string;
  levelStorySnippet?: string;
  exercises: Exercise[];
  starThresholds: [number, number, number];
  onComplete: (score: number, starCount: number, results: AnswerResult[]) => void;
}

export default function MinigameShell({
  worldId,
  levelStorySnippet,
  exercises,
  starThresholds,
  onComplete,
}: MinigameShellProps) {
  const addCoins = useGameStore((s) => s.addCoins);
  // Prevent duplicate +10 rewards while the same feedback card is visible.
  const rewardIndexRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (!showingFeedback || !lastResult) return;

    const soundType = lastResult.correct ? "correct" : "incorrect";
    playSound(soundType);

    const timeout = window.setTimeout(
      () => {
        handleFeedbackDone();
      },
      lastResult.correct ? 1200 : 1800
    );

    return () => window.clearTimeout(timeout);
  }, [showingFeedback, lastResult, handleFeedbackDone]);

  useEffect(() => {
    if (!showingFeedback || !lastResult?.correct) return;
    if (rewardIndexRef.current === currentIndex) return;

    addCoins(10);
    rewardIndexRef.current = currentIndex;
  }, [addCoins, currentIndex, lastResult, showingFeedback]);

  if (isComplete) {
    requestAnimationFrame(() => onComplete(score, starCount, results));
    return null;
  }

  if (!currentExercise) return null;

  const MinigameComponent = MINIGAME_COMPONENTS[currentExercise.minigameType];
  const narratorScene = getNarratorScene(
    worldId,
    currentExercise.minigameType,
    currentExercise.prompt,
    levelStorySnippet
  );

  const princessAnimationState: PrincessAnimationState =
    showingFeedback && lastResult
      ? lastResult.correct
        ? "correct"
        : "wrong"
      : "idle";

  const progressValue = !showingFeedback
    ? currentIndex
    : Math.min(currentIndex + 1, total);

  return (
    <div className="flex flex-col flex-1 px-4 py-5 gap-4 max-w-[980px] mx-auto w-full">
      <div className="bg-white/85 backdrop-blur-sm rounded-2xl border-2 border-white/40 shadow-lg p-4 animate-fade-in-up">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-bold text-purple-800 font-[var(--font-heading)]">
            Quest Progress
          </p>
          <p className="text-xs font-semibold text-purple-700">
            Challenge {Math.min(currentIndex + 1, total)} / {total}
          </p>
        </div>
        <ProgressBar value={progressValue} max={total} className="mb-2" />
        <div className="flex gap-1.5 justify-center">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i < progressValue
                  ? "w-2.5 h-2.5 bg-yellow-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : i === currentIndex
                    ? "w-3.5 h-3.5 bg-[var(--color-accent)]"
                    : "w-2.5 h-2.5 bg-purple-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[260px_1fr] items-start">
        <div className="bg-gradient-to-b from-purple-100/90 to-pink-100/90 rounded-2xl border-2 border-white/40 p-4 shadow-lg">
          <Princess
            animationState={princessAnimationState}
            size="lg"
            showName
            animateIdle={false}
          />

          <div className="mt-3 min-h-10 flex items-center justify-center">
            {showingFeedback && lastResult?.correct && (
              <div className="bg-emerald-100 text-emerald-700 font-bold text-sm px-3 py-1.5 rounded-full border border-emerald-300 animate-bounce-in text-center">
                +10 coins
                <span className="block text-[10px] font-semibold text-emerald-600 mt-0.5">
                  {narratorScene.successLine}
                </span>
              </div>
            )}
            {showingFeedback && lastResult && !lastResult.correct && (
              <div className="bg-rose-100 text-rose-700 font-semibold text-sm px-3 py-1.5 rounded-full border border-rose-300 animate-fade-in-up">
                {narratorScene.retryLine}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-white/40 shadow-lg p-4 sm:p-5 animate-fade-in-up">
          <div className="flex items-end gap-3 mb-4">
            <NPCGuide npc={narratorScene.npc} />
            <SpeechBubble
              className="flex-1"
              bubbleBg={narratorScene.accent.bubbleBg}
              bubbleBorder={narratorScene.accent.bubbleBorder}
            >
              <span
                className="block text-xs font-bold not-italic mb-0.5"
                style={{ color: narratorScene.accent.speakerText }}
              >
                {narratorScene.speaker}
              </span>
              <span
                className="block text-[11px] not-italic mb-1.5 leading-snug"
                style={{ color: narratorScene.accent.toneText }}
              >
                {narratorScene.toneLine}
              </span>
              <span
                className="not-italic text-sm leading-relaxed font-semibold"
                style={{ color: narratorScene.accent.challengeText }}
              >
                {narratorScene.challengeLine}
              </span>
            </SpeechBubble>
          </div>

          <MinigameComponent
            key={currentExercise.id}
            exercise={currentExercise}
            onAnswer={submitAnswer}
          />
        </div>
      </div>

      {showingFeedback && lastResult?.correct && (
        <div className="pointer-events-none fixed top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-yellow-300/95 text-purple-900 font-bold px-5 py-2 rounded-full border-2 border-white/60 shadow-xl animate-coin-pop">
          <Icon name="star" size={16} className="text-yellow-700" />
          +10 coins earned - {narratorScene.successLine}
        </div>
      )}
    </div>
  );
}
