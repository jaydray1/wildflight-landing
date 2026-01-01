export type Profile = "bright" | "balanced" | "bold" | "light" | "dark";
export type BrewMethod = "drip" | "espresso" | "milk" | "immersion";
export type Availability = "always-on" | "seasonal" | "limited";
export type StatusTag = "fresh-drop" | "low-inventory" | "roasting-tuesday" | "in-stock";

export interface CoffeeVariant {
  size: "12oz" | "2lb";
  price: number;
  sku: string;
}

export interface TechnicalSpecs {
  varietal: string;
  elevationMASL: number;
  process: string;
  roastProfile?: string;
  batchNumber?: string;
}

export interface Coffee {
  name: string;
  slug: string;
  profile: Profile;
  bestFor: BrewMethod[];
  tasting: [string, string, string]; // 3 tasting notes
  story: string;
  origin?: string;
  process?: string;
  elevation?: string;
  images: string[];
  variants: {
    "12oz": CoffeeVariant;
    "2lb": CoffeeVariant;
  };
  // New technical fields
  status: StatusTag;
  specs: TechnicalSpecs;
  utilityNote: string; // One sentence on why this bean works for adventure
}

export interface QuizAnswer {
  drinkStyle: "black" | "milk" | "espresso";
  dislike: "sour" | "bitter" | "weak";
  vibe: Profile;
}
