export type ShopCategory = "dresses" | "crowns" | "accessories";

export interface ShopItem {
  id: string;
  name: string;
  category: ShopCategory;
  price: number;
  description: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  // Dresses
  { id: "dress-moonlight", name: "Moonlight Gown", category: "dresses", price: 15, description: "A shimmering silver gown woven from moonbeams" },
  { id: "dress-rose", name: "Rose Petal Dress", category: "dresses", price: 10, description: "Soft pink petals cascade in a flowing design" },
  { id: "dress-ocean", name: "Ocean Wave Robe", category: "dresses", price: 20, description: "Deep blue fabric that flows like ocean waves" },
  { id: "dress-forest", name: "Enchanted Forest Tunic", category: "dresses", price: 12, description: "Woven with magic from the ancient forest" },
  { id: "dress-golden", name: "Golden Sun Gown", category: "dresses", price: 25, description: "Radiates warmth like the morning sun" },

  // Crowns
  { id: "crown-wisdom", name: "Crown of Wisdom", category: "crowns", price: 30, description: "Glows brighter as you learn more" },
  { id: "crown-stars", name: "Starlight Tiara", category: "crowns", price: 20, description: "Adorned with captured starlight" },
  { id: "crown-flowers", name: "Flower Crown", category: "crowns", price: 8, description: "Fresh blossoms that never wilt" },
  { id: "crown-ice", name: "Crystal Ice Crown", category: "crowns", price: 22, description: "Crafted from eternal frost crystals" },
  { id: "crown-ember", name: "Ember Circlet", category: "crowns", price: 18, description: "Warm flames dance harmlessly around it" },

  // Accessories
  { id: "acc-wand", name: "Spelling Wand", category: "accessories", price: 15, description: "Helps channel your spelling power" },
  { id: "acc-book", name: "Enchanted Spellbook", category: "accessories", price: 12, description: "Pages fill with your knowledge" },
  { id: "acc-pendant", name: "Star Pendant", category: "accessories", price: 10, description: "A pendant shaped like your favorite stars" },
  { id: "acc-cape", name: "Scholar's Cape", category: "accessories", price: 20, description: "Flows majestically in the magical breeze" },
  { id: "acc-boots", name: "Swift Boots", category: "accessories", price: 14, description: "Makes you feel light as a feather" },
];

export const CATEGORY_LABELS: Record<ShopCategory, string> = {
  dresses: "Dresses",
  crowns: "Crowns",
  accessories: "Accessories",
};
