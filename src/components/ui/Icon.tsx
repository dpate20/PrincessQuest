"use client";

export type IconName =
  | "home"
  | "map"
  | "progress"
  | "settings"
  | "star"
  | "star-outline"
  | "flame"
  | "lock"
  | "check"
  | "x-mark"
  | "arrow-left"
  | "fortress"
  | "courtyard"
  | "tower"
  | "keep"
  | "arena"
  | "scroll"
  | "quill"
  | "chain-lock"
  | "shield"
  | "crown"
  | "treasure-chest"
  | "gem";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

// Inline SVG paths — no external dependencies
const ICON_PATHS: Record<IconName, { viewBox: string; d: string | string[] }> = {
  home: {
    viewBox: "0 0 24 24",
    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z",
  },
  map: {
    viewBox: "0 0 24 24",
    d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  progress: {
    viewBox: "0 0 24 24",
    d: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  settings: {
    viewBox: "0 0 24 24",
    d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  star: {
    viewBox: "0 0 24 24",
    d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  "star-outline": {
    viewBox: "0 0 24 24",
    d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  flame: {
    viewBox: "0 0 24 24",
    d: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  },
  lock: {
    viewBox: "0 0 24 24",
    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  check: {
    viewBox: "0 0 24 24",
    d: "M5 13l4 4L19 7",
  },
  "x-mark": {
    viewBox: "0 0 24 24",
    d: "M6 18L18 6M6 6l12 12",
  },
  "arrow-left": {
    viewBox: "0 0 24 24",
    d: "M10 19l-7-7m0 0l7-7m-7 7h18",
  },
  fortress: {
    viewBox: "0 0 24 24",
    d: ["M3 21h18M4 21V10l2-2V4h2v2h2V4h2v2h2V4h2v4l2 2v11", "M9 21v-4h6v4"],
  },
  courtyard: {
    viewBox: "0 0 24 24",
    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  tower: {
    viewBox: "0 0 24 24",
    d: ["M8 21h8M10 21V11h4v10", "M12 3v2m0 0l-3 6h6l-3-6"],
  },
  keep: {
    viewBox: "0 0 24 24",
    d: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
  },
  arena: {
    viewBox: "0 0 24 24",
    d: "M12 15l-3-3m0 0l3-3m-3 3h12M5 19.5A2.5 2.5 0 017.5 17H20a1 1 0 001-1V8a1 1 0 00-1-1H7.5A2.5 2.5 0 015 4.5v15z",
  },
  scroll: {
    viewBox: "0 0 24 24",
    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  quill: {
    viewBox: "0 0 24 24",
    d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  },
  "chain-lock": {
    viewBox: "0 0 24 24",
    d: ["M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", "M8 7a4 4 0 018 0"],
  },
  shield: {
    viewBox: "0 0 24 24",
    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  crown: {
    viewBox: "0 0 24 24",
    d: "M5 16l2-8 5 4 5-4 2 8H5zM4 18h16v2H4v-2z",
  },
  "treasure-chest": {
    viewBox: "0 0 24 24",
    d: ["M4 12h16v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8z", "M4 12V8a1 1 0 011-1h14a1 1 0 011 1v4", "M12 12v4m-2-2h4"],
  },
  gem: {
    viewBox: "0 0 24 24",
    d: "M12 22l-8-10 4-8h8l4 8-8 10zM4 12h16M8 4l4 8 4-8",
  },
};

export default function Icon({ name, size = 24, className = "" }: IconProps) {
  const icon = ICON_PATHS[name];
  if (!icon) return null;

  const paths = Array.isArray(icon.d) ? icon.d : [icon.d];
  const isFilled = name === "star";

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
