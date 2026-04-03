"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "@/components/ui/Icon";

const navItems: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/world", label: "Map", icon: "map" },
  { href: "/progress", label: "Progress", icon: "progress" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4" style={{ background: "linear-gradient(180deg, rgba(88,28,135,0.95) 0%, rgba(107,70,193,0.98) 100%)" }}>
      <div className="flex gap-8 items-center justify-center max-w-lg mx-auto">
        {navItems.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-2 transition-colors ${
                isActive ? "text-yellow-300" : "text-white hover:text-yellow-300"
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 ${
                isActive ? "bg-yellow-400/80" : "bg-purple-700/50"
              }`}>
                <Icon name={icon} size={28} className={isActive ? "text-purple-900" : ""} />
              </div>
              <span className="text-sm font-medium drop-shadow">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
