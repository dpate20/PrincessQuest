"use client";

import { useState } from "react";
import { useGameStore } from "@/stores/useGameStore";
import Modal from "./Modal";
import Button from "./Button";
import Icon from "./Icon";

interface PrincessNameModalProps {
  open: boolean;
  canClose?: boolean;
  initialName?: string;
  onClose?: () => void;
  onComplete?: (name: string) => void;
}

export default function PrincessNameModal({
  open,
  canClose = false,
  initialName = "",
  onClose,
  onComplete,
}: PrincessNameModalProps) {
  const setDisplayName = useGameStore((s) => s.setDisplayName);
  const setHasSeenNamingModal = useGameStore((s) => s.setHasSeenNamingModal);
  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const inputValue = nameDraft ?? initialName;

  function resetDraft() {
    setNameDraft(null);
  }

  function handleConfirm() {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setDisplayName(trimmed);
      setHasSeenNamingModal();
      onComplete?.(trimmed);
      resetDraft();
      if (canClose) onClose?.();
    }
  }

  return (
    <Modal
      open={open}
      onClose={
        canClose
          ? () => {
              resetDraft();
              onClose?.();
            }
          : () => {}
      }
      title=""
    >
      <div className="flex flex-col items-center gap-5 py-2">
        {/* Crown icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg animate-bounce-in">
          <Icon name="crown" size={32} className="text-purple-700" />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-800 font-[var(--font-heading)] mb-1">
            Welcome, Brave One!
          </h2>
          <p className="text-gray-500 text-sm">
            What shall we call your Princess?
          </p>
        </div>

        {/* Name input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setNameDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          placeholder="Enter your name..."
          maxLength={20}
          autoFocus
          className="w-full text-xl text-center rounded-xl border-2 border-purple-200 px-6 py-4 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all bg-purple-50/50 text-purple-800 placeholder:text-purple-300 font-medium"
        />

        {/* Confirm button */}
        <Button
          variant="gold"
          size="lg"
          onClick={handleConfirm}
          disabled={!inputValue.trim()}
          className="w-full"
        >
          <span className="flex items-center justify-center gap-2">
            <Icon name="sparkle" size={20} />
            {initialName.trim() ? "Save My Name" : "Begin My Quest"}
            <Icon name="sparkle" size={20} />
          </span>
        </Button>
      </div>
    </Modal>
  );
}
