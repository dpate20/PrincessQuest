"use client";

type NPCType = "knight" | "merchant" | "storyteller" | "librarian" | "champion";

interface NPCGuideProps {
  npc: NPCType;
  className?: string;
}

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
}

export function SpeechBubble({ children, className = "" }: SpeechBubbleProps) {
  return (
    <div className={`relative bg-white rounded-xl px-4 py-2.5 shadow-md border border-purple-100 ${className}`}>
      <p className="text-sm text-gray-700 italic">{children}</p>
      <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-purple-100 transform rotate-45" />
    </div>
  );
}

const NPC_CONFIG: Record<NPCType, { color: string; accent: string; label: string }> = {
  knight: { color: "#4299E1", accent: "#2B6CB0", label: "Sir Lexicon" },
  merchant: { color: "#48BB78", accent: "#2F855A", label: "Sage Verde" },
  storyteller: { color: "#ED8936", accent: "#C05621", label: "Bard Ember" },
  librarian: { color: "#319795", accent: "#285E61", label: "Keeper Cyan" },
  champion: { color: "#805AD5", accent: "#553C9A", label: "Champion Iris" },
};

export default function NPCGuide({ npc, className = "" }: NPCGuideProps) {
  const config = NPC_CONFIG[npc];

  return (
    <svg
      viewBox="0 0 80 80"
      width={64}
      height={64}
      className={`${className}`}
      aria-label={config.label}
    >
      {/* Shoulders/body */}
      <path
        d="M15 58 Q15 48 30 44 L50 44 Q65 48 65 58 L65 80 L15 80 Z"
        fill={config.color}
      />
      {/* Collar detail */}
      <path d="M30 44 Q40 50 50 44" fill="none" stroke={config.accent} strokeWidth="1.5" />

      {/* Neck */}
      <rect x="35" y="36" width="10" height="10" rx="3" fill="#F4C9A0" />

      {/* Head */}
      <ellipse cx="40" cy="26" rx="14" ry="16" fill="#F4C9A0" />

      {/* Hair base */}
      <path
        d="M26 22 Q26 8 40 6 Q54 8 54 22 L54 28 Q50 18 40 16 Q30 18 26 28 Z"
        fill={npc === "storyteller" ? "#D4D4D4" : npc === "librarian" ? "#4A3520" : "#6B4226"}
      />

      {npc === "knight" && (
        <>
          {/* Helmet */}
          <path d="M24 24 Q24 4 40 2 Q56 4 56 24 L56 20 Q56 6 40 4 Q24 6 24 20 Z" fill="#A0AEC0" />
          <rect x="24" y="20" width="32" height="3" rx="1" fill="#718096" />
          {/* Visor opening */}
          <path d="M30 22 L50 22 L48 26 L32 26 Z" fill="#2D3748" />
          {/* Plume */}
          <path d="M40 2 Q44 -4 48 2" fill={config.color} />
          {/* Shield emblem on chest */}
          <path d="M34 54 L40 50 L46 54 L40 62 Z" fill={config.accent} stroke="white" strokeWidth="0.5" />
        </>
      )}

      {npc === "merchant" && (
        <>
          {/* Friendly hat */}
          <path d="M22 18 Q22 8 40 6 Q58 8 58 18 L60 18 Q60 6 40 3 Q20 6 20 18 Z" fill={config.accent} />
          <ellipse cx="40" cy="18" rx="22" ry="3" fill={config.color} />
          {/* Coin pouch on belt */}
          <ellipse cx="52" cy="65" rx="6" ry="5" fill="#F6AD55" />
          <circle cx="52" cy="64" r="2" fill="#FBD38D" />
        </>
      )}

      {npc === "storyteller" && (
        <>
          {/* Wizard-like hat */}
          <path d="M28 18 L40 -2 L52 18" fill={config.accent} />
          <ellipse cx="40" cy="18" rx="16" ry="3" fill={config.color} />
          <circle cx="40" cy="4" r="2" fill="#FBD38D" />
          {/* Beard */}
          <path d="M32 32 Q34 44 40 46 Q46 44 48 32" fill="#D4D4D4" />
          {/* Quill on chest */}
          <line x1="44" y1="50" x2="56" y2="42" stroke="#FBD38D" strokeWidth="1.5" />
        </>
      )}

      {npc === "librarian" && (
        <>
          {/* Glasses */}
          <circle cx="34" cy="24" r="5" fill="none" stroke="#718096" strokeWidth="1.2" />
          <circle cx="46" cy="24" r="5" fill="none" stroke="#718096" strokeWidth="1.2" />
          <line x1="39" y1="24" x2="41" y2="24" stroke="#718096" strokeWidth="1" />
          {/* Book */}
          <rect x="16" y="52" width="12" height="16" rx="1" fill={config.accent} />
          <rect x="18" y="54" width="8" height="12" rx="0.5" fill="#FFFAF0" />
        </>
      )}

      {npc === "champion" && (
        <>
          {/* Crown/Laurel */}
          <path d="M28 12 L30 4 L34 10 L37 2 L40 10 L43 2 L46 10 L50 4 L52 12" fill="#F6AD55" stroke="#FBD38D" strokeWidth="0.8" />
          <circle cx="40" cy="5" r="1.5" fill="#E53E3E" />
          {/* Medal on chest */}
          <circle cx="40" cy="56" r="5" fill="#F6AD55" stroke="#FBD38D" strokeWidth="1" />
          <text x="40" y="59" textAnchor="middle" fill={config.accent} fontSize="6" fontWeight="bold">★</text>
        </>
      )}

      {/* Eyes (skip for knight — visor covers them) */}
      {npc !== "knight" && (
        <>
          <ellipse cx="34" cy="24" rx="2.5" ry="3" fill="white" />
          <ellipse cx="46" cy="24" rx="2.5" ry="3" fill="white" />
          <circle cx="35" cy="24" r="1.5" fill="#2D3748" />
          <circle cx="47" cy="24" r="1.5" fill="#2D3748" />
          <circle cx="35.3" cy="23.5" r="0.5" fill="white" />
          <circle cx="47.3" cy="23.5" r="0.5" fill="white" />
          {/* Smile */}
          <path d="M34 30 Q40 35 46 30" fill="none" stroke="#C05621" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}

      {/* Nose (skip for knight) */}
      {npc !== "knight" && npc !== "storyteller" && (
        <path d="M39 27 Q40 29 41 27" fill="none" stroke="#D4956B" strokeWidth="0.8" />
      )}
    </svg>
  );
}

export const WORLD_NPC_MAP: Record<string, NPCType> = {
  "word-fortress": "knight",
  "context-courtyard": "merchant",
  "story-tower": "storyteller",
  "knowledge-keep": "librarian",
  "champions-arena": "champion",
};

export const NPC_GREETINGS: Record<NPCType, string> = {
  knight: "Stand ready, scholar. These words won't spell themselves!",
  merchant: "Choose your words wisely — context is everything.",
  storyteller: "Every tale holds a lesson, if you read between the lines.",
  librarian: "The answers lie within the text. Look carefully.",
  champion: "Prove your mastery across all disciplines!",
};
