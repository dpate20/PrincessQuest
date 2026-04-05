"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "@/components/ui/Icon";

const navItems: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/world", label: "Map", icon: "map" },
  { href: "/progress", label: "Progress", icon: "progress" },
  { href: "/shop", label: "Shop", icon: "shop" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 py-2 px-4" style={{ background: "linear-gradient(180deg, rgba(88,28,135,0.95) 0%, rgba(107,70,193,0.98) 100%)" }}>
      <div className="flex gap-4 items-center justify-center max-w-lg mx-auto">
        {navItems.map(({ href, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-center transition-all ${
                isActive ? "text-yellow-300" : "text-white/70 hover:text-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isActive ? "bg-yellow-400/80 scale-110" : "bg-white/10 hover:bg-white/20"
              }`}>
                <Icon name={icon} size={20} className={isActive ? "text-purple-900" : ""} />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
