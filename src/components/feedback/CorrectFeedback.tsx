"use client";

import { useEffect } from "react";
import Icon from "@/components/ui/Icon";
import { playSound } from "@/lib/sounds";

interface CorrectFeedbackProps {
  onDone: () => void;
}

export default function CorrectFeedback({ onDone }: CorrectFeedbackProps) {
  useEffect(() => {
    playSound("correct");
    const timer = setTimeout(onDone, 1200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-600/15 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center border border-emerald-300">
        <div className="w-14 h-14 rounded-full bg-[var(--color-success)] flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(56,161,105,0.4)]">
          <Icon name="check" size={28} className="text-white" />
        </div>
        <p className="text-xl font-bold font-[var(--font-heading)] text-[var(--color-success)]">
          Correct!
        </p>
      </div>
    </div>
  );
}
