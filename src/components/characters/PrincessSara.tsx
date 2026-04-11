"use client";

import { useId } from "react";
import type {
  AccessoryStyle,
  CrownStyle,
  DressStyle,
} from "@/data/princess-customization";

interface PrincessSaraProps {
  expression?: "happy" | "thinking" | "celebrating";
  size?: "sm" | "md" | "lg";
  className?: string;
  dressStyle?: DressStyle;
  crownStyle?: CrownStyle;
  accessoryStyle?: AccessoryStyle;
  breathe?: boolean;
}

const sizeMap = { sm: 78, md: 140, lg: 238 };
const OUTLINE = "#3A2138";

const DEFAULT_DRESS: DressStyle = {
  primary: "#553C9A",
  secondary: "#805AD5",
  belt: "#F6AD55",
  trim: "#FBD38D",
};

const DEFAULT_CROWN: CrownStyle = {
  metal: "#F6AD55",
  trim: "#FBD38D",
  leftGem: "#E53E3E",
  rightGem: "#4299E1",
  centerGem: "#48BB78",
};

function shiftHex(hex: string, amount: number) {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return hex;
  const num = Number.parseInt(clean, 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function AccessoryDetail({
  accessory,
  expression,
  dress,
  wandStarFill,
  skinFill,
}: {
  accessory: AccessoryStyle;
  expression: "happy" | "thinking" | "celebrating";
  dress: DressStyle;
  wandStarFill: string;
  skinFill: string;
}) {
  if (accessory === "pendant") {
    return (
      <>
        <path
          d="M75 128 Q90 142 105 128"
          fill="none"
          stroke={dress.trim}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M90 139 L95 145 L90 151 L85 145 Z"
          fill={dress.belt}
          stroke={dress.trim}
          strokeWidth="1.7"
        />
        <circle cx="90" cy="145" r="2.1" fill={dress.trim} />
      </>
    );
  }

  if (accessory === "wand") {
    const wandPath =
      expression === "celebrating"
        ? "M134 122 L150 90"
        : expression === "thinking"
          ? "M126 172 L143 146"
          : "M130 171 L145 145";
    const starX = expression === "celebrating" ? 151 : expression === "thinking" ? 144 : 146;
    const starY = expression === "celebrating" ? 89 : expression === "thinking" ? 145 : 144;

    return (
      <>
        <path
          d={wandPath}
          fill="none"
          stroke="#8C5A34"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d={`M${starX} ${starY - 6} L${starX + 2.5} ${starY - 1.3} L${starX + 7.5} ${starY - 0.9} L${starX + 3.5} ${starY + 2.4} L${starX + 4.8} ${starY + 7.2} L${starX} ${starY + 4.4} L${starX - 4.8} ${starY + 7.2} L${starX - 3.5} ${starY + 2.4} L${starX - 7.5} ${starY - 0.9} L${starX - 2.5} ${starY - 1.3} Z`}
          fill={wandStarFill}
          stroke={dress.trim}
          strokeWidth="1.1"
        />
      </>
    );
  }

  if (accessory === "book") {
    return (
      <>
        <rect
          x="27"
          y="158"
          width="26"
          height="18"
          rx="4"
          fill={shiftHex(dress.secondary, -18)}
          stroke={dress.trim}
          strokeWidth="1.8"
        />
        <rect x="30" y="161" width="20" height="12" rx="2.5" fill="#F8F5FF" />
        <line x1="40" y1="161" x2="40" y2="173" stroke={shiftHex(dress.secondary, -14)} strokeWidth="1" />
        <circle cx="33.5" cy="167" r="1.1" fill={dress.trim} />
      </>
    );
  }

  if (accessory === "cape") {
    return (
      <>
        <path
          d="M53 118 Q90 106 127 118 L139 180 Q90 201 41 180 Z"
          fill={shiftHex(dress.secondary, -26)}
          opacity="0.38"
        />
        <path
          d="M72 120 Q90 136 108 120"
          fill="none"
          stroke={dress.trim}
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      </>
    );
  }

  if (accessory === "boots") {
    return (
      <>
        <path d="M66 234 Q73 226 80 234" fill="none" stroke={dress.trim} strokeWidth="2" />
        <path d="M100 234 Q107 226 114 234" fill="none" stroke={dress.trim} strokeWidth="2" />
      </>
    );
  }

  return (
    <>
      <circle cx="35" cy="168" r="7" fill={skinFill} stroke={OUTLINE} strokeWidth="1.3" />
      <circle cx="145" cy="168" r="7" fill={skinFill} stroke={OUTLINE} strokeWidth="1.3" />
    </>
  );
}

export default function PrincessSara({
  expression = "happy",
  size = "md",
  className = "",
  dressStyle,
  crownStyle,
  accessoryStyle = "book",
  breathe = true,
}: PrincessSaraProps) {
  const id = useId().replace(/:/g, "");
  const px = sizeMap[size];
  const dress = dressStyle ?? DEFAULT_DRESS;
  const crown = crownStyle ?? DEFAULT_CROWN;

  const dressDark = shiftHex(dress.primary, -24);
  const dressLight = shiftHex(dress.secondary, 10);
  const dressPanel = shiftHex(dress.primary, -14);
  const beltShade = shiftHex(dress.belt, -20);
  const trimShade = shiftHex(dress.trim, -26);

  const skinGradId = `skin-grad-${id}`;
  const hairGradId = `hair-grad-${id}`;
  const veilGradId = `veil-grad-${id}`;
  const skirtGradId = `skirt-grad-${id}`;
  const skirtPanelId = `skirt-panel-${id}`;
  const bodiceGradId = `bodice-grad-${id}`;
  const jewelGradId = `jewel-grad-${id}`;
  const wandStarId = `wand-star-${id}`;

  const leftBraid = [
    { x: 55, y: 120, r: 11 },
    { x: 50, y: 135, r: 11 },
    { x: 46, y: 151, r: 10.5 },
    { x: 44, y: 168, r: 10 },
    { x: 46, y: 185, r: 9.4 },
    { x: 51, y: 201, r: 8.8 },
  ];

  const rightBraid = [
    { x: 125, y: 120, r: 11 },
    { x: 130, y: 135, r: 11 },
    { x: 134, y: 151, r: 10.5 },
    { x: 136, y: 168, r: 10 },
    { x: 134, y: 185, r: 9.4 },
    { x: 129, y: 201, r: 8.8 },
  ];

  const leftArmPath =
    expression === "celebrating"
      ? "M70 132 C54 122 43 107 37 90"
      : expression === "thinking"
        ? "M70 132 C55 142 45 156 35 167"
        : "M70 132 C56 142 45 156 35 166";
  const rightArmPath =
    expression === "celebrating"
      ? "M110 132 C126 122 137 107 143 90"
      : expression === "thinking"
        ? "M110 132 C124 142 133 156 144 166"
        : "M110 132 C124 142 135 155 145 165";
  const leftHandX = expression === "celebrating" ? 36 : 34;
  const leftHandY = expression === "celebrating" ? 89 : 168;
  const rightHandX = expression === "celebrating" ? 144 : 146;
  const rightHandY = expression === "celebrating" ? 89 : 167;

  return (
    <svg
      viewBox="0 0 180 250"
      width={px}
      height={px * (250 / 180)}
      className={`${breathe ? "animate-breathe" : ""} ${className}`.trim()}
      aria-label="Princess Sara"
    >
      <defs>
        <linearGradient id={skinGradId} x1="58" y1="42" x2="122" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE6CA" />
          <stop offset="100%" stopColor="#F6C59A" />
        </linearGradient>
        <linearGradient id={hairGradId} x1="44" y1="52" x2="140" y2="202" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#87552F" />
          <stop offset="100%" stopColor="#5A351E" />
        </linearGradient>
        <linearGradient id={veilGradId} x1="30" y1="60" x2="150" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={dressDark} />
          <stop offset="100%" stopColor={dress.primary} />
        </linearGradient>
        <linearGradient id={skirtGradId} x1="28" y1="130" x2="152" y2="234" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={dress.primary} />
          <stop offset="100%" stopColor={dressDark} />
        </linearGradient>
        <linearGradient id={skirtPanelId} x1="68" y1="142" x2="112" y2="228" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={dress.secondary} />
          <stop offset="100%" stopColor={shiftHex(dress.secondary, -20)} />
        </linearGradient>
        <linearGradient id={bodiceGradId} x1="63" y1="110" x2="118" y2="164" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={dressLight} />
          <stop offset="100%" stopColor={dress.primary} />
        </linearGradient>
        <radialGradient id={jewelGradId} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor={crown.centerGem} />
          <stop offset="100%" stopColor={shiftHex(crown.centerGem, -28)} />
        </radialGradient>
        <radialGradient id={wandStarId} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={dress.trim} />
          <stop offset="100%" stopColor={dress.belt} />
        </radialGradient>
      </defs>

      <ellipse cx="90" cy="238" rx="50" ry="9.5" fill="#1F2468" opacity="0.3" />

      <path
        d="M30 74 C45 33 67 17 90 17 C113 17 135 33 150 74 L166 176 C146 201 34 201 14 176 Z"
        fill={`url(#${veilGradId})`}
        stroke={OUTLINE}
        strokeWidth="2.1"
      />
      <path
        d="M42 76 C54 47 72 34 90 34 C108 34 126 47 138 76 L150 168 C133 186 47 186 30 168 Z"
        fill={shiftHex(dress.secondary, -20)}
        opacity="0.44"
      />
      <path
        d="M36 73 C52 43 71 30 90 30 C109 30 128 43 144 73"
        fill="none"
        stroke={dress.trim}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <g>
        {[46, 64, 82, 98, 116, 134].map((x, index) => (
          <circle
            key={`veil-bead-top-${x}`}
            cx={x}
            cy={76 + (index % 2 === 0 ? 0 : 2)}
            r={index % 2 === 0 ? 2.5 : 2.1}
            fill={index % 3 === 0 ? crown.leftGem : index % 3 === 1 ? crown.rightGem : dress.trim}
            stroke={OUTLINE}
            strokeWidth="0.6"
          />
        ))}
        {[94, 112, 130, 148].map((y, index) => (
          <circle
            key={`veil-bead-left-${y}`}
            cx={24 + (index % 2 === 0 ? 0 : -1)}
            cy={y}
            r={index % 2 === 0 ? 2.6 : 2.2}
            fill={index % 2 === 0 ? dress.trim : crown.rightGem}
            stroke={OUTLINE}
            strokeWidth="0.6"
          />
        ))}
        {[94, 112, 130, 148].map((y, index) => (
          <circle
            key={`veil-bead-right-${y}`}
            cx={156 + (index % 2 === 0 ? 0 : 1)}
            cy={y}
            r={index % 2 === 0 ? 2.6 : 2.2}
            fill={index % 2 === 0 ? dress.trim : crown.leftGem}
            stroke={OUTLINE}
            strokeWidth="0.6"
          />
        ))}
      </g>

      <g fill={`url(#${hairGradId})`} stroke={OUTLINE} strokeWidth="1.6">
        {leftBraid.map((node) => (
          <circle key={`left-${node.x}-${node.y}`} cx={node.x} cy={node.y} r={node.r} />
        ))}
        {rightBraid.map((node) => (
          <circle key={`right-${node.x}-${node.y}`} cx={node.x} cy={node.y} r={node.r} />
        ))}
      </g>

      <path
        d="M40 146 C58 121 122 121 140 146 L159 221 C136 242 44 242 21 221 Z"
        fill={`url(#${skirtGradId})`}
        stroke={OUTLINE}
        strokeWidth="2.1"
      />
      <path
        d="M67 147 C75 139 105 139 113 147 L121 223 C108 232 72 232 59 223 Z"
        fill={`url(#${skirtPanelId})`}
        stroke={OUTLINE}
        strokeWidth="1.8"
      />

      <path
        d="M54 224 Q90 214 126 224"
        fill="none"
        stroke={dress.trim}
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <path
        d="M56 212 Q90 203 124 212"
        fill="none"
        stroke={dress.belt}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.92"
      />

      <g>
        {[74, 82, 90, 98, 106].map((x, index) => (
          <circle
            key={`panel-dot-${x}`}
            cx={x}
            cy={190 + (index % 2 === 0 ? 0 : 4)}
            r={2.5}
            fill={index % 2 === 0 ? dress.trim : crown.rightGem}
            stroke={OUTLINE}
            strokeWidth="0.7"
          />
        ))}
        {[74, 90, 106].map((x) => (
          <path
            key={`panel-diamond-${x}`}
            d={`M${x} 173 L${x + 4} 177 L${x} 181 L${x - 4} 177 Z`}
            fill={dress.belt}
            stroke={OUTLINE}
            strokeWidth="0.8"
          />
        ))}
      </g>

      <path
        d="M66 114 C74 104 106 104 114 114 L119 152 C108 165 72 165 61 152 Z"
        fill={`url(#${bodiceGradId})`}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <path
        d="M72 112 Q90 126 108 112"
        fill="none"
        stroke={dress.trim}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M66 132 Q90 142 114 132"
        fill="none"
        stroke={dressPanel}
        strokeWidth="1.8"
        opacity="0.55"
      />
      <rect x="63" y="145" width="54" height="10" rx="5" fill={beltShade} />
      <rect x="65.5" y="143.5" width="49" height="7" rx="3.5" fill={dress.belt} />
      <path
        d="M90 143 L96 151 L90 160 L84 151 Z"
        fill={`url(#${jewelGradId})`}
        stroke={dress.trim}
        strokeWidth="1.8"
      />

      {accessoryStyle === "cape" && (
        <path
          d="M51 116 Q90 102 129 116 L140 179 Q90 201 40 179 Z"
          fill={shiftHex(dress.secondary, -25)}
          opacity="0.42"
        />
      )}

      <path
        d={leftArmPath}
        fill="none"
        stroke={`url(#${skinGradId})`}
        strokeWidth="11.4"
        strokeLinecap="round"
      />
      <path
        d={rightArmPath}
        fill="none"
        stroke={`url(#${skinGradId})`}
        strokeWidth="11.4"
        strokeLinecap="round"
      />
      <circle cx={leftHandX} cy={leftHandY} r="7.2" fill={`url(#${skinGradId})`} stroke={OUTLINE} strokeWidth="1.3" />
      <circle cx={rightHandX} cy={rightHandY} r="7.2" fill={`url(#${skinGradId})`} stroke={OUTLINE} strokeWidth="1.3" />

      <rect x="81" y="101" width="18" height="15" rx="7" fill={`url(#${skinGradId})`} />
      <circle cx="90" cy="78" r="33" fill={`url(#${skinGradId})`} stroke={OUTLINE} strokeWidth="2.1" />

      <path
        d="M57 87 C48 57 66 35 90 34 C114 35 132 57 123 87 C116 73 105 65 90 65 C75 65 64 73 57 87 Z"
        fill={`url(#${hairGradId})`}
      />
      <path d="M59 58 C70 44 110 44 121 58 C110 53 101 51 90 51 C79 51 70 53 59 58 Z" fill={`url(#${hairGradId})`} />
      <path d="M57 86 Q52 101 48 118" fill="none" stroke={shiftHex("#5A351E", 12)} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M123 86 Q128 101 132 118" fill="none" stroke={shiftHex("#5A351E", 12)} strokeWidth="2.8" strokeLinecap="round" />

      <path
        d="M58 55 C67 39 113 39 122 55 L120 67 C108 60 72 60 60 67 Z"
        fill={crown.metal}
        stroke={OUTLINE}
        strokeWidth="1.7"
      />
      <path
        d="M62 54 C73 44 107 44 118 54"
        fill="none"
        stroke={crown.trim}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {[66, 74, 82, 98, 106, 114].map((x, index) => (
        <circle
          key={`tiara-gem-${x}`}
          cx={x}
          cy={58 + (index % 2 === 0 ? 0 : 1)}
          r={2.4}
          fill={index % 3 === 0 ? crown.leftGem : index % 3 === 1 ? crown.rightGem : dress.trim}
          stroke={OUTLINE}
          strokeWidth="0.7"
        />
      ))}
      <path
        d="M90 43 L96 51 L90 60 L84 51 Z"
        fill={`url(#${jewelGradId})`}
        stroke={crown.trim}
        strokeWidth="1.8"
      />

      <path d="M73 113 Q90 126 107 113" fill="none" stroke={dress.trim} strokeWidth="2.6" strokeLinecap="round" />
      {[75, 83, 90, 97, 105].map((x, index) => (
        <circle
          key={`necklace-${x}`}
          cx={x}
          cy={120 + (index % 2 === 0 ? 0 : 1)}
          r={index === 2 ? 3.4 : 2.6}
          fill={index === 2 ? crown.centerGem : index % 2 === 0 ? crown.leftGem : dress.trim}
          stroke={OUTLINE}
          strokeWidth="0.7"
        />
      ))}

      {expression === "happy" && (
        <>
          <ellipse cx="76" cy="80" rx="9.2" ry="10.8" fill="white" />
          <ellipse cx="104" cy="80" rx="9.2" ry="10.8" fill="white" />
          <ellipse cx="76.2" cy="82" rx="5.8" ry="6.9" fill="#3A2035" />
          <ellipse cx="104.2" cy="82" rx="5.8" ry="6.9" fill="#3A2035" />
          <circle cx="79.3" cy="79.4" r="1.8" fill="white" />
          <circle cx="107.3" cy="79.4" r="1.8" fill="white" />
          <path d="M66 72 Q76 64 86 72" fill="none" stroke="#6B3F2D" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M94 72 Q104 64 114 72" fill="none" stroke="#6B3F2D" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M79 95 Q90 104 101 95" fill="none" stroke="#C34A2C" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="64.5" cy="93" rx="5.2" ry="3.8" fill="#F59CAB" opacity="0.66" />
          <ellipse cx="115.5" cy="93" rx="5.2" ry="3.8" fill="#F59CAB" opacity="0.66" />
        </>
      )}

      {expression === "thinking" && (
        <>
          <ellipse cx="76" cy="80" rx="9" ry="10.6" fill="white" />
          <ellipse cx="104" cy="80" rx="9" ry="10.6" fill="white" />
          <ellipse cx="74.9" cy="78.5" rx="5.6" ry="6.7" fill="#332031" />
          <ellipse cx="102.9" cy="78.5" rx="5.6" ry="6.7" fill="#332031" />
          <circle cx="78" cy="75.8" r="1.6" fill="white" />
          <circle cx="106" cy="75.8" r="1.6" fill="white" />
          <path d="M66 71 Q77 61 86 69" fill="none" stroke="#6B3F2D" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M94 69 Q104 61 115 71" fill="none" stroke="#6B3F2D" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M82 96 Q90 99 98 96" fill="none" stroke="#C34A2C" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="130" cy="56" r="3.2" fill={dress.secondary} opacity="0.36" />
          <circle cx="137" cy="48" r="2.6" fill={dress.secondary} opacity="0.3" />
          <circle cx="143" cy="40" r="2" fill={dress.secondary} opacity="0.24" />
        </>
      )}

      {expression === "celebrating" && (
        <>
          <path d="M69 81 Q76 74 83 81" fill="none" stroke="#332031" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M97 81 Q104 74 111 81" fill="none" stroke="#332031" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M66 72 Q76 63 86 71" fill="none" stroke="#6B3F2D" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M94 71 Q104 63 114 72" fill="none" stroke="#6B3F2D" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M78 96 Q90 110 102 96" fill="#F27052" stroke="#C34A2C" strokeWidth="1.6" />
          <path d="M80 96 Q90 104 100 96" fill="#FFECE7" />
          <ellipse cx="64" cy="92.5" rx="5.4" ry="4.1" fill="#F59CAB" opacity="0.7" />
          <ellipse cx="116" cy="92.5" rx="5.4" ry="4.1" fill="#F59CAB" opacity="0.7" />
        </>
      )}

      <path d="M89 86 Q90 89 91 86" fill="none" stroke="#CB9A78" strokeWidth="1.2" />

      <path d="M61 222 Q73 214 85 222 V233 H59 Z" fill={dressDark} />
      <path d="M119 222 Q107 214 95 222 V233 H121 Z" fill={dressDark} />
      <path d="M56 230 Q66 224 78 230 L78 238 L54 238 Z" fill={trimShade} />
      <path d="M124 230 Q114 224 102 230 L102 238 L126 238 Z" fill={trimShade} />
      <path d="M58 232 Q67 227 76 232" fill="none" stroke={dress.trim} strokeWidth="1.7" />
      <path d="M122 232 Q113 227 104 232" fill="none" stroke={dress.trim} strokeWidth="1.7" />

      <AccessoryDetail
        accessory={accessoryStyle}
        expression={expression}
        dress={dress}
        wandStarFill={`url(#${wandStarId})`}
        skinFill={`url(#${skinGradId})`}
      />

      {expression === "celebrating" && (
        <>
          {[52, 69, 111, 128].map((x, index) => (
            <path
              key={`spark-${x}`}
              d={`M${x} 56 l2.4 4.2 4.5 0.6 -3.5 2.7 1.1 4.5 -4.1-2.3 -4.1 2.3 1.1-4.5 -3.5-2.7 4.5-0.6z`}
              fill={index % 2 === 0 ? dress.trim : dress.belt}
              stroke={OUTLINE}
              strokeWidth="0.6"
              className="animate-sparkle"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </>
      )}
    </svg>
  );
}
