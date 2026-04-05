"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGameStore } from "@/stores/useGameStore";
import Icon from "@/components/ui/Icon";
import Dropdown, { type DropdownItem } from "@/components/ui/Dropdown";

interface TopBarProps {
  title?: string;
  backHref?: string;
}

const NAV_ITEMS: DropdownItem[] = [
  { label: "Home", icon: "home", href: "/" },
  { label: "World Map", icon: "map", href: "/world" },
  { label: "Progress", icon: "progress", href: "/progress" },
  { label: "Shop", icon: "shop", href: "/shop" },
  { label: "Settings", icon: "settings", href: "/settings" },
];

export default function TopBar({ title, backHref }: TopBarProps) {
  const coins = useGameStore((s) => s.coins);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    active: pathname === item.href,
  }));

  return (
    <header className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
      style={{ background: "linear-gradient(180deg, rgba(88,28,135,0.9) 0%, rgba(88,28,135,0.6) 70%, transparent 100%)" }}
    >
      {/* Left side: hamburger or back arrow */}
      <div className="w-10 h-10 flex items-center justify-center">
        {backHref ? (
          <Link
            href={backHref}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          >
            <Icon name="arrow-left" size={18} />
          </Link>
        ) : (
          <Dropdown
            trigger={
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
                <Icon name="menu" size={20} />
              </div>
            }
            items={navItems}
            open={menuOpen}
            onToggle={() => setMenuOpen((p) => !p)}
          />
        )}
      </div>

      {/* Center: title */}
      {title && (
        <span className="bg-purple-500/80 backdrop-blur-sm text-white px-5 py-1.5 rounded-full font-bold text-sm shadow-md border border-white/20">
          {title}
        </span>
      )}

      {/* Right side: star badge */}
      <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
        <Icon name="star" size={16} className="text-yellow-400" />
        <span className="text-sm font-bold text-white">{coins}</span>
      </div>
    </header>
  );
}
