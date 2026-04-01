import type { AnswerResult } from "@/types/minigame";

export function calculateScore(results: AnswerResult[]): number {
  if (results.length === 0) return 0;
  const correct = results.filter((r) => r.correct).length;
  return Math.round((correct / results.length) * 100);
}

export function calculateStars(
  score: number,
  thresholds: [number, number, number]
): number {
  if (score >= thresholds[2]) return 3;
  if (score >= thresholds[1]) return 2;
  if (score >= thresholds[0]) return 1;
  return 0;
}

export function didPass(score: number, passingScore: number): boolean {
  return score >= passingScore;
}
