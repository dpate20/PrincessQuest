import type { Exercise } from "./content";

export interface MinigameProps {
  exercise: Exercise;
  onAnswer: (result: AnswerResult) => void;
}

export interface AnswerResult {
  correct: boolean;
  selectedAnswer: string;
  timeMs: number;
}
