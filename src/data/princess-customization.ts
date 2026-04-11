import { SHOP_ITEMS, type ShopCategory } from "./shop-items";

export interface DressStyle {
  primary: string;
  secondary: string;
  belt: string;
  trim: string;
}

export interface CrownStyle {
  metal: string;
  trim: string;
  leftGem: string;
  rightGem: string;
  centerGem: string;
}

export type AccessoryStyle = "wand" | "book" | "pendant" | "cape" | "boots";

export const STARTER_LOADOUT = {
  dress: "dress-rose",
  crown: "crown-flowers",
  accessory: "acc-book",
} as const;

export const DEFAULT_OWNED_ITEMS = [
  STARTER_LOADOUT.dress,
  STARTER_LOADOUT.crown,
  STARTER_LOADOUT.accessory,
] as const;

const DRESS_STYLES: Record<string, DressStyle> = {
  "dress-moonlight": {
    primary: "#47527A",
    secondary: "#8FA6D9",
    belt: "#D7E6FF",
    trim: "#F4FAFF",
  },
  "dress-rose": {
    primary: "#C63D8C",
    secondary: "#F06FAE",
    belt: "#F6D067",
    trim: "#FFE4F2",
  },
  "dress-ocean": {
    primary: "#1C5EA8",
    secondary: "#3DA3DB",
    belt: "#7ED6F8",
    trim: "#DBF5FF",
  },
  "dress-forest": {
    primary: "#1F7A57",
    secondary: "#33A86A",
    belt: "#E4B94E",
    trim: "#E6F8D9",
  },
  "dress-golden": {
    primary: "#B53C2F",
    secondary: "#E9853B",
    belt: "#F4C95D",
    trim: "#FFF2B4",
  },
};

const CROWN_STYLES: Record<string, CrownStyle> = {
  "crown-wisdom": {
    metal: "#C89A33",
    trim: "#F2D98A",
    leftGem: "#2FB8B3",
    rightGem: "#3C82E4",
    centerGem: "#8D67E8",
  },
  "crown-stars": {
    metal: "#E8CB62",
    trim: "#FFF2B0",
    leftGem: "#8FD4FF",
    rightGem: "#B39CFF",
    centerGem: "#FFF1B8",
  },
  "crown-flowers": {
    metal: "#D9953B",
    trim: "#F6C983",
    leftGem: "#FF7FB6",
    rightGem: "#FF9F5F",
    centerGem: "#60C989",
  },
  "crown-ice": {
    metal: "#BAC7DC",
    trim: "#E8F1FF",
    leftGem: "#9EDAFF",
    rightGem: "#7EC9FF",
    centerGem: "#D8EEFF",
  },
  "crown-ember": {
    metal: "#B95A2B",
    trim: "#F0B06D",
    leftGem: "#F56D58",
    rightGem: "#F3913E",
    centerGem: "#F7CF5B",
  },
};

const ACCESSORY_STYLES: Record<string, AccessoryStyle> = {
  "acc-wand": "wand",
  "acc-book": "book",
  "acc-pendant": "pendant",
  "acc-cape": "cape",
  "acc-boots": "boots",
};

export function getItemCategory(itemId: string): ShopCategory | null {
  const item = SHOP_ITEMS.find((entry) => entry.id === itemId);
  return item?.category ?? null;
}

export function getDressStyle(itemId: string): DressStyle {
  return DRESS_STYLES[itemId] ?? DRESS_STYLES[STARTER_LOADOUT.dress];
}

export function getCrownStyle(itemId: string): CrownStyle {
  return CROWN_STYLES[itemId] ?? CROWN_STYLES[STARTER_LOADOUT.crown];
}

export function getAccessoryStyle(itemId: string): AccessoryStyle {
  return ACCESSORY_STYLES[itemId] ?? ACCESSORY_STYLES[STARTER_LOADOUT.accessory];
}
