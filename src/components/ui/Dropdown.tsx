"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Icon, { type IconName } from "./Icon";

export interface DropdownItem {
  label: string;
  icon: IconName;
  href: string;
  active?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  open: boolean;
  onToggle: () => void;
}

export default function Dropdown({
  trigger,
  items,
  open,
  onToggle,
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onToggle]);

  return (
    <div ref={ref} className="relative">
      <button onClick={onToggle} className="flex items-center justify-center">
        {trigger}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-purple-100 overflow-hidden animate-slide-down z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onToggle}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              <Icon
                name={item.icon}
                size={18}
                className={item.active ? "text-purple-500" : "text-gray-400"}
              />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
