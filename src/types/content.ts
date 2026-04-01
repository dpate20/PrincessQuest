export interface World {
  id: string;
  name: string;
  theme: string;
  description: string;
  storyIntro: string;
  iconEmoji: string;
  levelIds: string[];
  unlockCondition: UnlockCondition;
}

export interface Level {
  id: string;
  worldId: string;
  title: string;
  order: number;
  storySnippet: string;
  exercises: Exercise[];
  unlockCondition: UnlockCondition;
  passingScore: number;
  starThresholds: [number, number, number];
}

export interface Exercise {
  id: string;
  minigameType: MinigameType;
  prompt: string;
  data: WordPictureData | ListenTapData | SentenceBuilderData;
}

export type MinigameType =
  | "word-picture-match"
  | "listen-and-tap"
  | "sentence-builder";

export interface WordPictureData {
  targetWord: string;
  options: {
    imageEmoji: string;
    label: string;
    isCorrect: boolean;
  }[];
}

export interface ListenTapData {
  audioWord: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

export interface SentenceBuilderData {
  targetSentence: string;
  scrambledWords: string[];
  hint?: string;
}

export type UnlockCondition =
  | { type: "always" }
  | { type: "level-complete"; levelId: string }
  | { type: "stars-in-world"; worldId: string; minStars: number };
