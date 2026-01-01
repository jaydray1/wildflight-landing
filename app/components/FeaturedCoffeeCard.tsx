import Link from "next/link";
import Image from "next/image";
import Card from "./ui/Card";
import { Coffee } from "../types/coffee";

interface FeaturedCoffeeCardProps {
  coffee: Coffee;
  badge?: string;
}

export default function FeaturedCoffeeCard({ coffee, badge }: FeaturedCoffeeCardProps) {
  const getProfileColor = (profile: string) => {
    switch (profile) {
      case "bright":
        return "bg-yellow-100 text-yellow-900";
      case "balanced":
        return "bg-green-100 text-green-900";
      case "bold":
        return "bg-slate-900 text-white";
      default:
        return "bg-slate-100 text-slate-900";
    }
  };

  return (
    <Card hover className="overflow-hidden">
      <Link href={`/coffee/${coffee.slug}`}>
        <div className="aspect-square relative">
          <Image
            src={coffee.images[0] || "/images/coffee-hero.jpg"}
            alt={coffee.name}
            fill
            className="object-cover"
          />
          {badge && (
            <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
              {badge}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-bold ${getProfileColor(coffee.profile)}`}>
              {coffee.profile.charAt(0).toUpperCase() + coffee.profile.slice(1)}
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">{coffee.name}</h3>
          <p className="text-sm text-slate-600 mb-1">
            Best for: {coffee.bestFor.map((method) => method.charAt(0).toUpperCase() + method.slice(1)).join(", ")}
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">${coffee.variants["12oz"].price}</span>
            <span className="text-sm text-slate-600">12 oz</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-slate-600">from ${(coffee.variants["12oz"].price / 20).toFixed(2)} per cup</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}

