"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  soundEffectsEnabled: boolean;
  toggleSoundEffects: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEffectsEnabled: true,
      toggleSoundEffects: () =>
        set((s) => ({ soundEffectsEnabled: !s.soundEffectsEnabled })),
    }),
    {
      name: "princess-quest-settings",
    }
  )
);
