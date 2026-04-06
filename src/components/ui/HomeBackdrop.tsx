const TWINKLES = [
  { top: "10%", left: "8%", size: 3, delay: "0s" },
  { top: "16%", left: "23%", size: 4, delay: "1.1s" },
  { top: "13%", left: "66%", size: 3, delay: "0.8s" },
  { top: "22%", left: "80%", size: 4, delay: "1.7s" },
  { top: "31%", left: "14%", size: 3, delay: "0.5s" },
  { top: "35%", left: "88%", size: 3, delay: "2.2s" },
  { top: "44%", left: "9%", size: 3, delay: "1.3s" },
  { top: "50%", left: "78%", size: 4, delay: "0.9s" },
];

export default function HomeBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-purple-950/55 via-purple-900/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-purple-950/45 to-transparent" />

      <div className="absolute top-20 right-[9%] h-24 w-24 rounded-full bg-gradient-to-b from-yellow-100/95 via-yellow-200/90 to-amber-300/80 shadow-[0_0_46px_rgba(255,226,148,0.55)] animate-home-moon-breath" />
      <div className="absolute top-[74px] right-[8%] h-28 w-28 rounded-full border border-yellow-100/40" />

      <div className="absolute top-24 left-[7%] h-10 w-44 rounded-full bg-white/14 blur-sm animate-home-cloud-drift" />
      <div
        className="absolute top-32 right-[15%] h-9 w-36 rounded-full bg-white/12 blur-sm animate-home-cloud-drift"
        style={{ animationDelay: "1.6s" }}
      />
      <div
        className="absolute top-44 left-[62%] h-8 w-28 rounded-full bg-white/10 blur-sm animate-home-cloud-drift"
        style={{ animationDelay: "0.8s" }}
      />

      {TWINKLES.map((star) => (
        <span
          key={`${star.top}-${star.left}`}
          className="absolute rounded-full bg-yellow-200/95 animate-home-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
          }}
        />
      ))}

      <div className="absolute inset-0 bottom-[60px]">
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="home-castle-stone-main" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dfb86f" />
              <stop offset="100%" stopColor="#8750c8" />
            </linearGradient>
            <linearGradient id="home-castle-stone-side" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cfa15f" />
              <stop offset="100%" stopColor="#6f3ea8" />
            </linearGradient>
            <radialGradient id="home-gate-glow" cx="50%" cy="46%" r="62%">
              <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ffd98a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path
            d="M0 900 V680 C122 650 244 708 388 676 C532 645 626 692 760 664 C884 639 998 688 1132 662 C1268 636 1387 681 1600 644 V900 Z"
            fill="#6d3ca8"
            opacity="0.65"
          />

          <path
            d="M0 900 V716 C140 690 264 735 410 708 C560 679 674 726 812 700 C945 675 1048 717 1174 694 C1314 669 1436 706 1600 682 V900 Z"
            fill="#8750c2"
            opacity="0.6"
          />

          <g opacity="0.82">
            <path
              d="M0 900 V690 H120 V662 H160 V690 H276 V650 H320 V690 H468 V664 H510 V690 H1092 V658 H1136 V690 H1284 V648 H1326 V690 H1448 V662 H1488 V690 H1600 V900 Z"
              fill="url(#home-castle-stone-side)"
            />

            <rect x="480" y="370" width="640" height="350" rx="14" fill="url(#home-castle-stone-main)" />
            <rect x="640" y="246" width="320" height="474" rx="14" fill="url(#home-castle-stone-main)" />
            <rect x="316" y="332" width="190" height="388" rx="14" fill="url(#home-castle-stone-side)" />
            <rect x="1094" y="332" width="190" height="388" rx="14" fill="url(#home-castle-stone-side)" />
            <rect x="270" y="238" width="128" height="482" rx="14" fill="url(#home-castle-stone-side)" />
            <rect x="1202" y="238" width="128" height="482" rx="14" fill="url(#home-castle-stone-side)" />
          </g>

          <g fill="#ffd88a" opacity="0.9">
            <path d="M270 238 L302 188 L334 238 Z" />
            <path d="M334 238 L366 184 L398 238 Z" />
            <path d="M1202 238 L1234 188 L1266 238 Z" />
            <path d="M1266 238 L1298 184 L1330 238 Z" />
            <path d="M640 246 L662 210 L684 246 Z" />
            <path d="M684 246 L706 204 L728 246 Z" />
            <path d="M728 246 L750 210 L772 246 Z" />
            <path d="M828 246 L850 210 L872 246 Z" />
            <path d="M872 246 L894 204 L916 246 Z" />
            <path d="M916 246 L938 210 L960 246 Z" />
          </g>

          <g fill="#ffe8b8" opacity="0.6">
            <rect x="706" y="426" width="18" height="28" rx="4" />
            <rect x="740" y="426" width="18" height="28" rx="4" />
            <rect x="842" y="426" width="18" height="28" rx="4" />
            <rect x="876" y="426" width="18" height="28" rx="4" />
            <rect x="354" y="414" width="14" height="22" rx="4" />
            <rect x="1232" y="414" width="14" height="22" rx="4" />
          </g>

          <ellipse cx="800" cy="700" rx="250" ry="80" fill="url(#home-gate-glow)" opacity="0.75" />
          <path
            d="M740 720 V558 C740 525 766 499 800 499 C834 499 860 525 860 558 V720 Z"
            fill="#46246e"
            opacity="0.62"
          />
          <path
            d="M800 720 C748 742 676 760 568 772 H1032 C924 760 852 742 800 720 Z"
            fill="#ffd88a"
            opacity="0.25"
          />
        </svg>
      </div>

      <div className="absolute bottom-[60px] inset-x-0 h-16 bg-gradient-to-t from-white/16 via-white/8 to-transparent animate-home-mist-drift" />
      <div className="absolute bottom-[58px] inset-x-0 h-[18px] bg-gradient-to-r from-transparent via-yellow-200/45 to-transparent blur-[1px]" />
    </div>
  );
}
