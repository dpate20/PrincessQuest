"use client";

import { useState } from "react";
import { useGameStore } from "@/stores/useGameStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import GameHeader from "@/components/layout/GameHeader";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PrincessSara from "@/components/characters/PrincessSara";
import { SpeechBubble } from "@/components/characters/NPCGuide";

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
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 relative overflow-hidden pb-32">
      <GameHeader title="Royal Chambers" />

      {/* Decorative stars */}
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="absolute text-yellow-200 animate-pulse"
          style={{
            top: `${12 + (i * 43) % 80}%`,
            left: `${4 + (i * 51) % 92}%`,
            animationDelay: `${(i * 0.3) % 2}s`,
          }}
        >
          <Icon name="star" size={4 + (i % 3) * 3} />
        </div>
      ))}

      <div className="relative z-10 flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        {/* Princess Sara guide */}
        <div className="flex items-end gap-3 mb-6 animate-fade-in-up">
          <PrincessSara expression="happy" size="sm" />
          <SpeechBubble className="flex-1">
            Customize your quest settings here!
          </SpeechBubble>
        </div>

        {/* Display Name */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 shadow-lg mb-4">
          <label className="block text-sm font-semibold text-purple-800 mb-2">
            Display Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="flex-1 rounded-full border-2 border-purple-200 px-4 py-2 text-sm outline-none focus:border-yellow-400 transition-colors bg-white"
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
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 shadow-lg mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-purple-800">
              Sound Effects
            </span>
            <button
              onClick={toggleSoundEffects}
              style={{
                position: "relative",
                display: "inline-block",
                width: 48,
                height: 28,
                borderRadius: 9999,
                backgroundColor: soundEffectsEnabled ? "#38A169" : "#CBD5E0",
                transition: "background-color 0.2s",
                border: "none",
                borderWidth: 0,
                outline: "none",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                boxSizing: "border-box",
                WebkitAppearance: "none",
                appearance: "none",
              } as React.CSSProperties}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: 2,
                  width: 24,
                  height: 24,
                  borderRadius: 9999,
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s",
                  transform: soundEffectsEnabled ? "translateX(20px)" : "translateX(0px)",
                  display: "block",
                }}
              />
            </button>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-red-200/50 shadow-lg">
          <h3 className="text-sm font-semibold text-purple-800 mb-2">
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
                className="px-4 py-2 text-sm font-semibold rounded-full bg-[var(--color-error)] text-white hover:brightness-110 active:scale-95 transition-all"
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
