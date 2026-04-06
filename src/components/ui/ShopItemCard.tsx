"use client";

import type { ShopItem } from "@/data/shop-items";
import Card from "./Card";
import Button from "./Button";
import Icon from "./Icon";
import Princess from "@/components/characters/Princess";
import { useGameStore } from "@/stores/useGameStore";

interface ShopItemCardProps {
  item: ShopItem;
  state: "locked" | "owned" | "equipped";
  canAfford: boolean;
  onBuy: () => void;
  onEquip: () => void;
}

export default function ShopItemCard({
  item,
  state,
  canAfford,
  onBuy,
  onEquip,
}: ShopItemCardProps) {
  const equippedDress = useGameStore((s) => s.equippedDress);
  const equippedCrown = useGameStore((s) => s.equippedCrown);
  const equippedAccessory = useGameStore((s) => s.equippedAccessory);

  const previewDress = item.category === "dresses" ? item.id : equippedDress;
  const previewCrown = item.category === "crowns" ? item.id : equippedCrown;
  const previewAccessory =
    item.category === "accessories" ? item.id : equippedAccessory;

  const previewBg =
    item.category === "dresses"
      ? "from-fuchsia-100 to-purple-100"
      : item.category === "crowns"
        ? "from-amber-100 to-yellow-100"
        : "from-cyan-100 to-indigo-100";

  return (
    <Card
      className={`p-4 transition-all duration-200 ${
        state === "locked" ? "opacity-95" : ""
      } ${state === "equipped" ? "ring-2 ring-yellow-400 shadow-[0_0_16px_rgba(251,211,141,0.4)]" : ""}`}
    >
      {/* Item illustration placeholder */}
      <div
        className={`w-full aspect-square rounded-xl mb-3 flex items-center justify-center relative bg-gradient-to-br ${previewBg}`}
      >
        <div
          className={`pointer-events-none transition-all duration-200 ${
            state === "locked" ? "grayscale-[0.7] opacity-85" : ""
          }`}
        >
          <Princess
            size="md"
            animateIdle={false}
            showName={false}
            dressId={previewDress}
            crownId={previewCrown}
            accessoryId={previewAccessory}
            className="scale-90"
          />
        </div>
        {state === "locked" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gray-400/80 flex items-center justify-center">
              <Icon name="lock" size={14} className="text-white" />
            </div>
          </div>
        )}
        {state === "equipped" && (
          <div className="absolute top-1.5 right-1.5 bg-yellow-400 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Equipped
          </div>
        )}
      </div>

      {/* Item info */}
      <h3 className="text-sm font-bold text-purple-800 mb-0.5 line-clamp-1">
        {item.name}
      </h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2 min-h-[2rem]">
        {item.description}
      </p>

      {/* Price & action */}
      {state === "locked" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Icon name="star" size={14} className="text-yellow-400" />
            <span className="text-sm font-bold text-purple-800">{item.price}</span>
          </div>
          <Button
            variant="gold"
            size="sm"
            onClick={onBuy}
            className="text-xs px-3 py-1.5 min-h-0"
          >
            {canAfford ? "Buy" : "Need More"}
          </Button>
        </div>
      )}
      {state === "owned" && (
        <Button
          variant="primary"
          size="sm"
          onClick={onEquip}
          className="w-full text-xs"
        >
          Equip
        </Button>
      )}
      {state === "equipped" && (
        <Button variant="ghost" size="sm" className="w-full text-xs" disabled>
          Equipped
        </Button>
      )}
    </Card>
  );
}
