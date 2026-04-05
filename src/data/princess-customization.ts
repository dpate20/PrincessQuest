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
    primary: "#7C7AAB",
    secondary: "#A0AEC0",
    belt: "#F6E05E",
    trim: "#EDF2F7",
  },
  "dress-rose": {
    primary: "#D53F8C",
    secondary: "#F687B3",
    belt: "#F6E05E",
    trim: "#FED7E2",
  },
  "dress-ocean": {
    primary: "#2B6CB0",
    secondary: "#4299E1",
    belt: "#90CDF4",
    trim: "#BEE3F8",
  },
  "dress-forest": {
    primary: "#2F855A",
    secondary: "#48BB78",
    belt: "#D69E2E",
    trim: "#C6F6D5",
  },
  "dress-golden": {
    primary: "#B7791F",
    secondary: "#D69E2E",
    belt: "#F6E05E",
    trim: "#FEFCBF",
  },
};

const CROWN_STYLES: Record<string, CrownStyle> = {
  "crown-wisdom": {
    metal: "#D69E2E",
    trim: "#F6E05E",
    leftGem: "#38B2AC",
    rightGem: "#4299E1",
    centerGem: "#9F7AEA",
  },
  "crown-stars": {
    metal: "#F6E05E",
    trim: "#FAF089",
    leftGem: "#63B3ED",
    rightGem: "#9F7AEA",
    centerGem: "#F6E05E",
  },
  "crown-flowers": {
    metal: "#D69E2E",
    trim: "#FBD38D",
    leftGem: "#F687B3",
    rightGem: "#F687B3",
    centerGem: "#68D391",
  },
  "crown-ice": {
    metal: "#A0AEC0",
    trim: "#E2E8F0",
    leftGem: "#90CDF4",
    rightGem: "#63B3ED",
    centerGem: "#BEE3F8",
  },
  "crown-ember": {
    metal: "#C05621",
    trim: "#F6AD55",
    leftGem: "#F56565",
    rightGem: "#ED8936",
    centerGem: "#ECC94B",
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
