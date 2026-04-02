"use client";

import { useState } from "react";
import { useGameStore } from "@/stores/useGameStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import GameHeader from "@/components/layout/GameHeader";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  const displayName = useGameStore((s) => s.displayName);
  const setDisplayName = useGameStore((s) => s.setDisplayName);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const soundEffectsEnabled = useSettingsStore((s) => s.soundEffectsEnabled);
  const toggleSoundEffects = useSettingsStore((s) => s.toggleSoundEffects);

  const [nameInput, setNameInput] = useState(displayName);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  function handleNameSave() {
    if (nameInput.trim()) {
      setDisplayName(nameInput.trim());
    }
  }

  function handleReset() {
    resetProgress();
    setShowResetConfirm(false);
  }

  return (
    <div className="flex flex-col flex-1 pb-20">
      <GameHeader title="Royal Chambers" />

      <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Display Name */}
        <div className="bg-white/70 rounded-xl p-5 border border-purple-100 mb-4">
          <label className="block text-sm font-semibold text-[var(--color-primary)] mb-2">
            Display Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="flex-1 rounded-lg border-2 border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            <Button
              variant="gold"
              size="sm"
              onClick={handleNameSave}
              disabled={!nameInput.trim() || nameInput.trim() === displayName}
            >
              Save
            </Button>
          </div>
        </div>

        {/* Sound Effects */}
        <div className="bg-white/70 rounded-xl p-5 border border-purple-100 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--color-primary)]">
              Sound Effects
            </span>
            <button
              onClick={toggleSoundEffects}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                soundEffectsEnabled
                  ? "bg-[var(--color-success)]"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  soundEffectsEnabled ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="bg-white/70 rounded-xl p-5 border border-red-100">
          <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
            Reset Progress
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            This will erase all your progress, stars, and streak data. This
            action cannot be undone.
          </p>
          {showResetConfirm ? (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-[var(--color-error)] text-white hover:brightness-110 active:scale-95 transition-all"
              >
                Confirm Reset
              </button>
            </div>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowResetConfirm(true)}
            >
              Reset All Progress
            </Button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
