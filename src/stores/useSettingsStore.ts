"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  ttsSpeed: number;
  ttsEnabled: boolean;
  soundEffectsEnabled: boolean;
  setTtsSpeed: (speed: number) => void;
  toggleTts: () => void;
  toggleSoundEffects: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ttsSpeed: 0.8,
      ttsEnabled: true,
      soundEffectsEnabled: true,
      setTtsSpeed: (speed) => set({ ttsSpeed: speed }),
      toggleTts: () => set((s) => ({ ttsEnabled: !s.ttsEnabled })),
      toggleSoundEffects: () =>
        set((s) => ({ soundEffectsEnabled: !s.soundEffectsEnabled })),
    }),
    {
      name: "princess-quest-settings",
    }
  )
);
