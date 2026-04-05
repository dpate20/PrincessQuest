"use client";

import { useEffect } from "react";
import Icon from "@/components/ui/Icon";
import { playSound } from "@/lib/sounds";

interface IncorrectFeedbackProps {
  correctAnswer: string;
  onDone: () => void;
}

export default function IncorrectFeedback({
  correctAnswer,
  onDone,
}: IncorrectFeedbackProps) {
  useEffect(() => {
    playSound("incorrect");
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FC8181]/10 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-xs animate-shake border border-[#FC8181]/40 animate-glow-red">
        <div className="w-14 h-14 rounded-full bg-[var(--color-error)] flex items-center justify-center mx-auto mb-3">
          <Icon name="x-mark" size={28} className="text-white" />
        </div>
        <p className="text-lg font-bold font-[var(--font-heading)] text-[var(--color-primary)] mb-2">
          Not quite...
        </p>
        <p className="text-sm text-gray-500">
          The answer was: <strong className="text-[var(--color-primary)]">{correctAnswer}</strong>
        </p>
      </div>
    </div>
  );
}
