"use client";

interface PrincessSaraProps {
  expression?: "happy" | "thinking" | "celebrating";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: 64, md: 120, lg: 200 };

export default function PrincessSara({
  expression = "happy",
  size = "md",
  className = "",
}: PrincessSaraProps) {
  const px = sizeMap[size];

  return (
    <svg
      viewBox="0 0 120 160"
      width={px}
      height={px * (160 / 120)}
      className={`animate-breathe ${className}`}
      aria-label="Princess Sara"
    >
      {/* Cape */}
      <path
        d="M30 65 L20 140 Q60 150 100 140 L90 65"
        fill="#6B46C1"
        opacity="0.9"
      />
      <path
        d="M32 68 L24 135 Q60 143 96 135 L88 68"
        fill="#805AD5"
        opacity="0.5"
      />

      {/* Body / Tunic */}
      <path
        d="M42 62 Q40 90 38 120 L82 120 Q80 90 78 62 Z"
        fill="#553C9A"
      />
      {/* Tunic detail — belt */}
      <rect x="40" y="90" width="40" height="5" rx="2" fill="#F6AD55" />
      <circle cx="60" cy="92" r="3" fill="#FBD38D" />

      {/* Tunic collar */}
      <path d="M48 62 Q60 70 72 62" fill="none" stroke="#F6AD55" strokeWidth="2" />

      {/* Arms */}
      {expression === "celebrating" ? (
        <>
          {/* Arms raised */}
          <path d="M42 68 L22 40 L26 38" fill="none" stroke="#F4C9A0" strokeWidth="6" strokeLinecap="round" />
          <path d="M78 68 L98 40 L94 38" fill="none" stroke="#F4C9A0" strokeWidth="6" strokeLinecap="round" />
          {/* Sparkles around hands */}
          <circle cx="20" cy="35" r="2" fill="#FBD38D" className="animate-sparkle" />
          <circle cx="100" cy="35" r="2" fill="#FBD38D" className="animate-sparkle" style={{ animationDelay: "0.3s" }} />
          <circle cx="16" cy="30" r="1.5" fill="#F6AD55" className="animate-sparkle" style={{ animationDelay: "0.6s" }} />
          <circle cx="104" cy="30" r="1.5" fill="#F6AD55" className="animate-sparkle" style={{ animationDelay: "0.9s" }} />
        </>
      ) : expression === "thinking" ? (
        <>
          {/* Left arm at side, right hand on chin */}
          <path d="M42 68 L32 100 L35 102" fill="none" stroke="#F4C9A0" strokeWidth="6" strokeLinecap="round" />
          <path d="M78 68 L82 75 L72 48" fill="none" stroke="#F4C9A0" strokeWidth="6" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Relaxed arms, left holding book */}
          <path d="M42 68 L30 100 L34 102" fill="none" stroke="#F4C9A0" strokeWidth="6" strokeLinecap="round" />
          <path d="M78 68 L90 95 L86 98" fill="none" stroke="#F4C9A0" strokeWidth="6" strokeLinecap="round" />
          {/* Book in left hand */}
          <rect x="22" y="95" width="16" height="12" rx="2" fill="#805AD5" />
          <rect x="24" y="97" width="12" height="8" rx="1" fill="#FAF5FF" />
          <line x1="30" y1="98" x2="30" y2="104" stroke="#805AD5" strokeWidth="0.5" />
        </>
      )}

      {/* Neck */}
      <rect x="54" y="50" width="12" height="14" rx="4" fill="#F4C9A0" />

      {/* Head */}
      <ellipse cx="60" cy="36" rx="18" ry="20" fill="#F4C9A0" />

      {/* Hair */}
      <path
        d="M42 30 Q42 12 60 10 Q78 12 78 30 L78 38 Q74 28 60 26 Q46 28 42 38 Z"
        fill="#8B5E3C"
      />
      {/* Side hair */}
      <path d="M42 30 Q38 40 36 55 Q40 50 44 42" fill="#8B5E3C" />
      <path d="M78 30 Q82 40 84 55 Q80 50 76 42" fill="#8B5E3C" />

      {/* Crown / Tiara */}
      <path
        d="M46 18 L48 8 L52 14 L56 4 L60 14 L64 4 L68 14 L72 8 L74 18"
        fill="#F6AD55"
        stroke="#FBD38D"
        strokeWidth="1"
      />
      <circle cx="56" cy="10" r="1.5" fill="#E53E3E" />
      <circle cx="64" cy="10" r="1.5" fill="#4299E1" />
      <circle cx="60" cy="7" r="2" fill="#48BB78" />

      {/* Face — expression-dependent */}
      {expression === "happy" && (
        <>
          {/* Eyes — confident */}
          <ellipse cx="52" cy="34" rx="3" ry="3.5" fill="white" />
          <ellipse cx="68" cy="34" rx="3" ry="3.5" fill="white" />
          <circle cx="53" cy="34" r="2" fill="#2D3748" />
          <circle cx="69" cy="34" r="2" fill="#2D3748" />
          <circle cx="53.5" cy="33.5" r="0.7" fill="white" />
          <circle cx="69.5" cy="33.5" r="0.7" fill="white" />
          {/* Eyebrows */}
          <path d="M48 29 Q52 27 56 29" fill="none" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M64 29 Q68 27 72 29" fill="none" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" />
          {/* Smile */}
          <path d="M52 42 Q60 48 68 42" fill="none" stroke="#C05621" strokeWidth="1.5" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="48" cy="40" rx="3" ry="1.5" fill="#FEB2B2" opacity="0.4" />
          <ellipse cx="72" cy="40" rx="3" ry="1.5" fill="#FEB2B2" opacity="0.4" />
        </>
      )}

      {expression === "thinking" && (
        <>
          {/* Eyes — looking up */}
          <ellipse cx="52" cy="34" rx="3" ry="3.5" fill="white" />
          <ellipse cx="68" cy="34" rx="3" ry="3.5" fill="white" />
          <circle cx="53" cy="32.5" r="2" fill="#2D3748" />
          <circle cx="69" cy="32.5" r="2" fill="#2D3748" />
          <circle cx="53.5" cy="32" r="0.7" fill="white" />
          <circle cx="69.5" cy="32" r="0.7" fill="white" />
          {/* Eyebrows — slightly furrowed */}
          <path d="M48 28 Q52 27 56 28.5" fill="none" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M64 28.5 Q68 27 72 28" fill="none" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" />
          {/* Thoughtful mouth */}
          <path d="M55 43 Q60 44 65 43" fill="none" stroke="#C05621" strokeWidth="1.3" strokeLinecap="round" />
          {/* Thinking dots */}
          <circle cx="85" cy="28" r="2" fill="#805AD5" opacity="0.4" />
          <circle cx="90" cy="22" r="2.5" fill="#805AD5" opacity="0.3" />
          <circle cx="96" cy="15" r="3" fill="#805AD5" opacity="0.2" />
        </>
      )}

      {expression === "celebrating" && (
        <>
          {/* Eyes — joyful, closed crescents */}
          <path d="M49 34 Q52 30 55 34" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
          <path d="M65 34 Q68 30 71 34" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
          {/* Eyebrows — raised */}
          <path d="M48 27 Q52 24 56 27" fill="none" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M64 27 Q68 24 72 27" fill="none" stroke="#6B4226" strokeWidth="1.2" strokeLinecap="round" />
          {/* Big smile */}
          <path d="M50 41 Q60 50 70 41" fill="#C05621" stroke="#C05621" strokeWidth="1" />
          <path d="M52 41 Q60 46 68 41" fill="#FFF5F5" />
          {/* Blush */}
          <ellipse cx="47" cy="39" rx="4" ry="2" fill="#FEB2B2" opacity="0.5" />
          <ellipse cx="73" cy="39" rx="4" ry="2" fill="#FEB2B2" opacity="0.5" />
        </>
      )}

      {/* Nose */}
      <path d="M59 38 Q60 40 61 38" fill="none" stroke="#D4956B" strokeWidth="1" />

      {/* Legs / Skirt bottom */}
      <path d="M38 120 L35 150 L45 150 L50 125" fill="#553C9A" />
      <path d="M82 120 L85 150 L75 150 L70 125" fill="#553C9A" />
      {/* Boots */}
      <path d="M33 148 L47 148 L47 155 L30 155 Z" fill="#6B4226" rx="2" />
      <path d="M73 148 L87 148 L87 155 L70 155 Z" fill="#6B4226" rx="2" />
      <path d="M33 150 L47 150" stroke="#F6AD55" strokeWidth="1.5" />
      <path d="M73 150 L87 150" stroke="#F6AD55" strokeWidth="1.5" />
    </svg>
  );
}
