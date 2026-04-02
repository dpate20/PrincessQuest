export interface World {
  id: string;
  name: string;
  theme: string;
  description: string;
  storyIntro: string;
  icon: string;
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
  data:
    | SpellingPairsData
    | VocabularyInContextData
    | ReadingComprehensionData
    | ShortStoryInferenceData
    | FillInTheBlankData;
}

export type MinigameType =
  | "spelling-pairs"
  | "vocabulary-in-context"
  | "reading-comprehension"
  | "short-story-inference"
  | "fill-in-the-blank";

export interface SpellingPairsData {
  correctSpelling: string;
  incorrectSpelling: string;
  sentenceContext: string;
}

export interface VocabularyInContextData {
  sentence: string;
  choices: [string, string];
  correctChoice: string;
  definition: string;
}

export interface ReadingComprehensionData {
  passage: string;
  passageTitle: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctOption: string;
  }[];
}

export interface ShortStoryInferenceData {
  passage: string;
  passageTitle: string;
  questions: {
    id: string;
    question: string;
    acceptableAnswers: string[];
    sampleAnswer: string;
  }[];
}

export interface FillInTheBlankData {
  sentence: string;
  correctAnswer: string;
  acceptableSpellings?: string[];
  hint?: string;
}

export type UnlockCondition =
  | { type: "always" }
  | { type: "level-complete"; levelId: string }
  | { type: "stars-in-world"; worldId: string; minStars: number }
  | { type: "levels-across-worlds"; worlds: { worldId: string; minLevels: number }[] };
