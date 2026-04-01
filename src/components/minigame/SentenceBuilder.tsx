"use client";

import { useState, useRef } from "react";
import type { MinigameProps } from "@/types/minigame";
import type { SentenceBuilderData } from "@/types/content";
import Button from "@/components/ui/Button";

export default function SentenceBuilder({
  exercise,
  onAnswer,
}: MinigameProps) {
  const startTime = useRef(Date.now());
  const data = exercise.data as SentenceBuilderData;
  const [placed, setPlaced] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const remaining = data.scrambledWords.filter(
    (word, idx) => {
      // Count how many times this word appears in scrambled vs placed
      const placedCount = placed.filter((p) => p === word).length;
      const scrambledBefore = data.scrambledWords.slice(0, idx + 1).filter((w) => w === word).length;
      return scrambledBefore > placedCount;
    }
  );

  const handlePlaceWord = (word: string) => {
    setPlaced([...placed, word]);
  };

  const handleRemoveWord = (index: number) => {
    setPlaced(placed.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const sentence = placed.join(" ");
    onAnswer({
      correct: sentence === data.targetSentence,
      selectedAnswer: sentence,
      timeMs: Date.now() - startTime.current,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Sentence building area */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-4 border-2 border-purple-100 min-h-20 flex flex-wrap gap-2 items-start">
        {placed.length === 0 ? (
          <span className="text-gray-300 italic text-sm">
            Tap words below to build your sentence...
          </span>
        ) : (
          placed.map((word, i) => (
            <button
              key={i}
              onClick={() => handleRemoveWord(i)}
              className="bg-purple-100 text-[var(--color-primary)] px-3 py-1.5 rounded-lg
                font-medium text-base hover:bg-purple-200 transition-colors active:scale-95"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Hint */}
      {data.hint && showHint && (
        <p className="text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
          💡 {data.hint}
        </p>
      )}

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 justify-center w-full max-w-sm">
        {remaining.map((word, i) => (
          <button
            key={`${word}-${i}`}
            onClick={() => handlePlaceWord(word)}
            className="bg-white border-2 border-purple-200 px-4 py-2 rounded-xl
              font-medium text-gray-700 text-base hover:border-purple-400
              hover:bg-purple-50 transition-all active:scale-95 min-h-12"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {data.hint && !showHint && (
          <Button variant="ghost" size="sm" onClick={() => setShowHint(true)}>
            💡 Hint
          </Button>
        )}
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={placed.length === 0}
        >
          Check Answer
        </Button>
      </div>
    </div>
  );
}
