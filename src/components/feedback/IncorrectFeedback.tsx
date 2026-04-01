"use client";

import { useEffect } from "react";

interface IncorrectFeedbackProps {
  correctAnswer: string;
  onDone: () => void;
}

export default function IncorrectFeedback({
  correctAnswer,
  onDone,
}: IncorrectFeedbackProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-300/20 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-xs">
        <div className="text-4xl mb-3">💫</div>
        <p className="text-lg font-bold text-[var(--color-primary)] mb-2">
          Almost there!
        </p>
        <p className="text-sm text-gray-500">
          The answer was: <strong className="text-gray-700">{correctAnswer}</strong>
        </p>
      </div>
    </div>
  );
}
