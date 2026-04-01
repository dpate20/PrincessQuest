"use client";

import { useCallback } from "react";
import { speak, isTTSSupported } from "@/lib/tts";
import { useSettingsStore } from "@/stores/useSettingsStore";

export function useTTS() {
  const ttsEnabled = useSettingsStore((s) => s.ttsEnabled);
  const ttsSpeed = useSettingsStore((s) => s.ttsSpeed);

  const speakText = useCallback(
    (text: string) => {
      if (ttsEnabled && isTTSSupported()) {
        speak(text, ttsSpeed);
      }
    },
    [ttsEnabled, ttsSpeed]
  );

  return { speakText, isSupported: isTTSSupported(), ttsEnabled };
}
