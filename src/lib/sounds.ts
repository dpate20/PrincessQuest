"use client";

import { useSettingsStore } from "@/stores/useSettingsStore";

type SoundId = "correct" | "incorrect" | "levelComplete" | "buttonTap" | "starEarned";

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  volume: number = 0.15,
  type: OscillatorType = "sine",
  delay: number = 0
) {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = volume;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
}

const SOUNDS: Record<SoundId, () => void> = {
  correct: () => {
    // Two-note ascending chime: C5 → E5
    playTone(523.25, 0.12, 0.12, "sine", 0);
    playTone(659.25, 0.15, 0.12, "sine", 0.1);
  },

  incorrect: () => {
    // Single soft low tone: A3
    playTone(220, 0.25, 0.08, "triangle");
  },

  levelComplete: () => {
    // Three-note ascending fanfare: C5 → E5 → G5
    playTone(523.25, 0.15, 0.12, "sine", 0);
    playTone(659.25, 0.15, 0.12, "sine", 0.15);
    playTone(783.99, 0.25, 0.15, "sine", 0.3);
  },

  buttonTap: () => {
    // Very short click
    playTone(800, 0.03, 0.06, "square");
  },

  starEarned: () => {
    // High sparkle tone: C6
    playTone(1046.5, 0.12, 0.1, "sine");
  },
};

export function playSound(id: SoundId): void {
  if (typeof window === "undefined") return;

  const enabled = useSettingsStore.getState().soundEffectsEnabled;
  if (!enabled) return;

  try {
    SOUNDS[id]();
  } catch {
    // AudioContext may fail in some environments — silently ignore
  }
}
