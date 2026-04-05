"use client";

import { useMemo, useState } from "react";
import { useGameStore } from "@/stores/useGameStore";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import ShopItemCard from "@/components/ui/ShopItemCard";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Princess from "@/components/characters/Princess";
import {
  SHOP_ITEMS,
  CATEGORY_LABELS,
  type ShopCategory,
  type ShopItem,
} from "@/data/shop-items";

const CATEGORIES: ShopCategory[] = ["dresses", "crowns", "accessories"];

type ShopDialogState =
  | { type: "confirm"; item: ShopItem }
  | { type: "insufficient"; item: ShopItem }
  | { type: "purchased"; item: ShopItem }
  | null;

export default function ShopPage() {
  const coins = useGameStore((s) => s.coins);
  const equippedDress = useGameStore((s) => s.equippedDress);
  const equippedCrown = useGameStore((s) => s.equippedCrown);
  const equippedAccessory = useGameStore((s) => s.equippedAccessory);
  const ownedItems = useGameStore((s) => s.ownedItems);
  const purchaseItem = useGameStore((s) => s.purchaseItem);
  const equipItem = useGameStore((s) => s.equipItem);

  const [activeCategory, setActiveCategory] = useState<ShopCategory>("dresses");
  const [dialog, setDialog] = useState<ShopDialogState>(null);

  const filteredItems = useMemo(
    () => SHOP_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  function getItemState(item: ShopItem): "locked" | "owned" | "equipped" {
    const equippedId =
      item.category === "dresses"
        ? equippedDress
        : item.category === "crowns"
          ? equippedCrown
          : equippedAccessory;

    if (equippedId === item.id) return "equipped";
    if (ownedItems.includes(item.id)) return "owned";
    return "locked";
  }

  function handleBuyClick(item: ShopItem) {
    if (coins >= item.price) {
      setDialog({ type: "confirm", item });
      return;
    }

    setDialog({ type: "insufficient", item });
  }

  function handleConfirmPurchase(item: ShopItem) {
    const result = purchaseItem(item.id, item.price);
    if (!result.success) {
      setDialog({ type: "insufficient", item });
      return;
    }

    equipItem(item.id);
    setDialog({ type: "purchased", item });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 relative overflow-hidden pb-16">
      <TopBar title="Royal Boutique" />

      <div className="relative z-10 flex-1 px-4 py-6 max-w-[900px] mx-auto w-full">
        <div className="grid gap-4 lg:grid-cols-[260px_1fr] mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-lg p-4">
            <Princess size="lg" showName animationState="idle" />
            <p className="text-center text-xs text-purple-700 font-semibold mt-3">
              Your current look is live in every level.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 w-fit mx-auto mb-4 animate-fade-in-up">
              <Icon name="star" size={20} className="text-yellow-400" />
              <span className="text-lg font-bold text-white">{coins}</span>
              <span className="text-sm text-white/70">coins to spend</span>
            </div>

            <div className="flex gap-2 justify-center animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-yellow-400 text-purple-800 shadow-md scale-105"
                      : "bg-white/15 text-white/80 hover:bg-white/25 border border-white/20"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {filteredItems.map((item) => {
            const state = getItemState(item);
            return (
              <ShopItemCard
                key={item.id}
                item={item}
                state={state}
                canAfford={coins >= item.price}
                onBuy={() => handleBuyClick(item)}
                onEquip={() => equipItem(item.id)}
              />
            );
          })}
        </div>
      </div>

      <BottomNav />

      <Modal
        open={dialog?.type === "confirm"}
        onClose={() => setDialog(null)}
        title="Confirm Purchase"
      >
        {dialog?.type === "confirm" && (
          <div className="text-center">
            <p className="text-sm text-purple-800 mb-3">
              Buy <strong>{dialog.item.name}</strong> for <strong>{dialog.item.price}</strong> coins?
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="ghost" size="sm" onClick={() => setDialog(null)}>
                Cancel
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => handleConfirmPurchase(dialog.item)}
              >
                Buy Now
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={dialog?.type === "insufficient"}
        onClose={() => setDialog(null)}
        title="Not Enough Coins"
      >
        {dialog?.type === "insufficient" && (
          <div className="text-center">
            <p className="text-sm text-purple-800 mb-3">
              You need <strong>{dialog.item.price}</strong> coins for <strong>{dialog.item.name}</strong>, but you only have <strong>{coins}</strong>.
            </p>
            <Button variant="primary" size="sm" onClick={() => setDialog(null)}>
              Keep Questing
            </Button>
          </div>
        )}
      </Modal>

      <Modal
        open={dialog?.type === "purchased"}
        onClose={() => setDialog(null)}
        title="Royal Upgrade"
      >
        {dialog?.type === "purchased" && (
          <div className="text-center">
            <p className="text-sm text-purple-800 mb-3">
              <strong>{dialog.item.name}</strong> is now yours and has been equipped.
            </p>
            <Button variant="gold" size="sm" onClick={() => setDialog(null)}>
              Awesome
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
