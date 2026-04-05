"use client";

import { useState } from "react";
import { useGameStore } from "@/stores/useGameStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

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
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 relative overflow-hidden pb-16">
      <TopBar title="Royal Chambers" />

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

      <div className="relative z-10 flex-1 px-4 py-6 max-w-[900px] mx-auto w-full">
        {/* Princess Name */}
        <Card className="p-5 mb-4 animate-fade-in-up">
          <label className="block text-sm font-semibold text-purple-800 mb-2">
            <Icon name="crown" size={16} className="inline text-yellow-500 mr-1.5" />
            Princess Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="flex-1 rounded-full border-2 border-purple-200 px-4 py-2 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all bg-white"
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
        </Card>

        {/* Sound Effects */}
        <Card className="p-5 mb-4 animate-fade-in-up" style={{ animationDelay: "0.05s" } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-purple-800">
              <Icon name="gem" size={16} className="inline text-purple-500 mr-1.5" />
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
                  transform: soundEffectsEnabled
                    ? "translateX(20px)"
                    : "translateX(0px)",
                  display: "block",
                }}
              />
            </button>
          </div>
        </Card>

        {/* Reset Progress */}
        <Card className="p-5 border-2 border-red-200/50 animate-fade-in-up" style={{ animationDelay: "0.1s" } as React.CSSProperties}>
          <h3 className="text-sm font-semibold text-purple-800 mb-2">
            Reset Progress
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            This will erase all your progress, stars, and streak data. This
            action cannot be undone.
          </p>
          {showResetConfirm ? (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleReset}>
                Confirm Reset
              </Button>
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
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
