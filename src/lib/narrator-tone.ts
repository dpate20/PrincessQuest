import type { MinigameType } from "@/types/content";

type NarratorNpc = "knight" | "merchant" | "storyteller" | "librarian" | "champion";

interface NarratorAccent {
  bubbleBg: string;
  bubbleBorder: string;
  speakerText: string;
  toneText: string;
  challengeText: string;
}

interface WorldNarratorTone {
  npc: NarratorNpc;
  speaker: string;
  toneLine: string;
  successLine: string;
  retryLine: string;
  accent: NarratorAccent;
}

const WORLD_TONE: Record<string, WorldNarratorTone> = {
  "word-fortress": {
    npc: "knight",
    speaker: "Sir Lexicon",
    toneLine: "The fortress runes fade without true spellcraft. Restore each word with precision.",
    successLine: "A rune reignites on the wall.",
    retryLine: "That rune stays dim. Steady your spelling.",
    accent: {
      bubbleBg: "rgba(239,246,255,0.96)",
      bubbleBorder: "#93C5FD",
      speakerText: "#1D4ED8",
      toneText: "#1E40AF",
      challengeText: "#1E3A8A",
    },
  },
  "context-courtyard": {
    npc: "merchant",
    speaker: "Sage Verde",
    toneLine: "In this courtyard, a single word can open hidden paths or close them.",
    successLine: "A hidden path shimmers open.",
    retryLine: "The gate resists. Try a sharper context clue.",
    accent: {
      bubbleBg: "rgba(240,253,244,0.96)",
      bubbleBorder: "#86EFAC",
      speakerText: "#15803D",
      toneText: "#166534",
      challengeText: "#14532D",
    },
  },
  "story-tower": {
    npc: "storyteller",
    speaker: "Bard Ember",
    toneLine: "Tower tales whisper clues to those who read between every line.",
    successLine: "Another stair of the tower lights up.",
    retryLine: "The tale still guards its secret. Read the clues again.",
    accent: {
      bubbleBg: "rgba(255,247,237,0.96)",
      bubbleBorder: "#FDBA74",
      speakerText: "#C2410C",
      toneText: "#9A3412",
      challengeText: "#7C2D12",
    },
  },
  "knowledge-keep": {
    npc: "librarian",
    speaker: "Keeper Cyan",
    toneLine: "The keep rewards careful readers who can uncover truth from detail.",
    successLine: "The archive seal glows brighter.",
    retryLine: "The records disagree. Check the evidence once more.",
    accent: {
      bubbleBg: "rgba(240,253,250,0.96)",
      bubbleBorder: "#5EEAD4",
      speakerText: "#0F766E",
      toneText: "#115E59",
      challengeText: "#134E4A",
    },
  },
  "champions-arena": {
    npc: "champion",
    speaker: "Champion Iris",
    toneLine: "The arena blends every kingdom's challenge. Adapt and master each trial.",
    successLine: "The crowd roars for your mastery.",
    retryLine: "The arena shifts. Regain your stance and strike true.",
    accent: {
      bubbleBg: "rgba(250,245,255,0.96)",
      bubbleBorder: "#D8B4FE",
      speakerText: "#7E22CE",
      toneText: "#6B21A8",
      challengeText: "#581C87",
    },
  },
};

const CHALLENGE_PREFIX: Record<MinigameType, string> = {
  "spelling-pairs": "Rune Check:",
  "vocabulary-in-context": "Context Trial:",
  "reading-comprehension": "Reading Trial:",
  "short-story-inference": "Inference Trial:",
  "fill-in-the-blank": "Restoration Phrase:",
};

const DEFAULT_TONE: WorldNarratorTone = {
  npc: "champion",
  speaker: "Royal Narrator",
  toneLine: "Your quest continues. Every challenge brings new strength.",
  successLine: "Your legend grows.",
  retryLine: "Gather focus and try again.",
  accent: {
    bubbleBg: "rgba(250,245,255,0.96)",
    bubbleBorder: "#D8B4FE",
    speakerText: "#7E22CE",
    toneText: "#6B21A8",
    challengeText: "#581C87",
  },
};

export interface NarratorScene {
  npc: NarratorNpc;
  speaker: string;
  toneLine: string;
  challengeLine: string;
  successLine: string;
  retryLine: string;
  accent: NarratorAccent;
}

export function getNarratorScene(
  worldId: string,
  minigameType: MinigameType,
  prompt: string,
  levelStorySnippet?: string
): NarratorScene {
  const worldTone = WORLD_TONE[worldId] ?? DEFAULT_TONE;
  const trimmedSnippet = levelStorySnippet?.trim();

  return {
    npc: worldTone.npc,
    speaker: worldTone.speaker,
    toneLine: trimmedSnippet || worldTone.toneLine,
    challengeLine: `${CHALLENGE_PREFIX[minigameType]} ${prompt}`,
    successLine: worldTone.successLine,
    retryLine: worldTone.retryLine,
    accent: worldTone.accent,
  };
}
