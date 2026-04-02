"use client";

interface ScrollContainerProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScrollContainer({
  title,
  children,
  className = "",
}: ScrollContainerProps) {
  return (
    <div
      className={`bg-[var(--color-bg-panel)] border-2 border-amber-300/60 rounded-xl shadow-inner overflow-y-auto max-h-[50vh] ${className}`}
    >
      {title && (
        <div className="sticky top-0 bg-[var(--color-bg-panel)] border-b border-purple-100 px-5 py-3">
          <h3 className="font-[var(--font-heading)] font-bold text-[var(--color-primary)] text-lg">
            {title}
          </h3>
        </div>
      )}
      <div className="px-5 py-4 font-[var(--font-body)] text-[var(--color-primary)] leading-relaxed text-[15px]">
        {children}
      </div>
    </div>
  );
}
