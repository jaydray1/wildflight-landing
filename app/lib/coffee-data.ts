import { Coffee, Profile } from "../types/coffee";

// Mock data - replace with real data source later
export const coffees: Coffee[] = [
  {
    name: "Batch #084",
    slug: "batch-084",
    profile: "balanced",
    bestFor: ["drip", "espresso", "milk"],
    tasting: ["Chocolate", "Caramel", "Nuts"],
    story: "Our signature blend. Always reliable, always right. This is the coffee that becomes your default.",
    origin: "Colombia",
    process: "Washed",
    elevation: "1800m",
    images: ["/images/coffee-hero.jpg"],
    variants: {
      "12oz": { size: "12oz", price: 18, sku: "BATCH-084-12" },
      "2lb": { size: "2lb", price: 32, sku: "BATCH-084-2LB" },
    },
    status: "fresh-drop",
    specs: {
      varietal: "Caturra, Castillo",
      elevationMASL: 1800,
      process: "Washed",
      roastProfile: "Medium",
      batchNumber: "084",
    },
    utilityNote: "The balanced body of this Colombian lot holds up perfectly in an Aeropress on the trail.",
  },
  {
    name: "Batch #087",
    slug: "batch-087",
    profile: "bright",
    bestFor: ["drip", "espresso"],
    tasting: ["Citrus", "Berry", "Floral"],
    story: "Lively and energetic. Perfect for morning clarity and afternoon pick-me-ups.",
    origin: "Ethiopia",
    process: "Washed",
    elevation: "2100m",
    images: ["/images/falcon-hero.jpg"],
    variants: {
      "12oz": { size: "12oz", price: 22, sku: "BATCH-087-12" },
      "2lb": { size: "2lb", price: 40, sku: "BATCH-087-2LB" },
    },
    status: "in-stock",
    specs: {
      varietal: "Heirloom",
      elevationMASL: 2100,
      process: "Washed",
      roastProfile: "Light",
      batchNumber: "087",
    },
    utilityNote: "Bright acidity cuts through morning fog at high elevation. Ideal for pour-over at basecamp.",
  },
  {
    name: "Batch #091",
    slug: "batch-091",
    profile: "bold",
    bestFor: ["espresso", "milk"],
    tasting: ["Dark chocolate", "Spice", "Smoke"],
    story: "The bold one. Rich, intense, unapologetic. For those who take their coffee seriously.",
    origin: "Peru",
    process: "Natural",
    elevation: "1650m",
    images: ["/images/coffee-hero.jpg"],
    variants: {
      "12oz": { size: "12oz", price: 20, sku: "BATCH-091-12" },
      "2lb": { size: "2lb", price: 36, sku: "BATCH-091-2LB" },
    },
    status: "low-inventory",
    specs: {
      varietal: "Typica, Caturra",
      elevationMASL: 1650,
      process: "Natural",
      roastProfile: "Dark",
      batchNumber: "091",
    },
    utilityNote: "The heavy body of this Peru lot holds up perfectly in an Aeropress on the trail.",
  },
];

export function getCoffeeBySlug(slug: string): Coffee | undefined {
  return coffees.find((coffee) => coffee.slug === slug);
}

export function getFeaturedCoffees(): Coffee[] {
  // Always-on, Seasonal, Limited
  return [coffees[0], coffees[1], coffees[2]]; // Adjust based on availability
}

export function findCoffeeByQuiz(answers: {
  drinkStyle: "black" | "milk" | "espresso";
  dislike: "sour" | "bitter" | "weak";
  vibe: Profile;
}): Coffee {
  // Simple matching logic - can be improved
  const { vibe, drinkStyle } = answers;

  // First try to match profile
  let matches = coffees.filter((c) => c.profile === vibe);

  // Then filter by bestFor
  if (matches.length > 0) {
    const brewMethod = drinkStyle === "milk" ? "milk" : drinkStyle === "espresso" ? "espresso" : "drip";
    matches = matches.filter((c) => c.bestFor.includes(brewMethod));
  }

  return matches[0] || coffees[0]; // Fallback to House
}

