"use client";

import { useEffect } from "react";

interface CorrectFeedbackProps {
  onDone: () => void;
}

export default function CorrectFeedback({ onDone }: CorrectFeedbackProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-400/20 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
        <div className="text-5xl mb-3">✨</div>
        <p className="text-xl font-bold text-[var(--color-success)]">
          Wonderful!
        </p>
      </div>
    </div>
  );
}
