"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdventureWeather from "../components/AdventureWeather";
import Button from "../components/ui/Button";
import StatusTag from "../components/ui/StatusTag";
import { coffees } from "../lib/coffee-data";

export default function ShopPage() {
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleQuickAdd = (sku: string, size: "12oz" | "2lb") => {
    setAddedToCart(`${sku}-${size}`);
    setTimeout(() => setAddedToCart(null), 2000);
    // TODO: Implement actual cart functionality
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-b-2 border-[#222222] pb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#222222] mb-2">
              The Provision Shop
            </h1>
            <p className="text-lg text-[#666666] font-mono">
              Current roast lots — inventory status and technical specs
            </p>
          </div>

          {/* List View - Equipment Inventory Style */}
          <div className="space-y-0 border border-[#222222] bg-white">
            {coffees.map((coffee, index) => (
              <div
                key={coffee.slug}
                className={`grid md:grid-cols-12 gap-4 p-6 border-b border-[#E0E0E0] last:border-b-0 hover:bg-[#FAFAFA] transition-colors ${
                  index === 0 ? "bg-[#FAFAFA]" : ""
                }`}
              >
                {/* Status Tag */}
                <div className="md:col-span-1">
                  <StatusTag status={coffee.status} />
                </div>

                {/* Product Name & Link */}
                <div className="md:col-span-3">
                  <Link href={`/coffee/${coffee.slug}`} className="group">
                    <div className="font-black text-2xl text-[#222222] mb-2 group-hover:text-[#FF6B35] transition-colors">
                      {coffee.name}
                    </div>
                    <div className="font-mono text-sm text-[#666666]">{coffee.specs.batchNumber}</div>
                  </Link>
                </div>

                {/* Technical Specs */}
                <div className="md:col-span-4">
                  <div className="font-mono text-sm text-[#222222] space-y-2">
                    <div>
                      <span className="text-[#666666]">Varietal:</span> {coffee.specs.varietal}
                    </div>
                    <div>
                      <span className="text-[#666666]">Elevation:</span> {coffee.specs.elevationMASL} MASL
                    </div>
                    <div>
                      <span className="text-[#666666]">Process:</span> {coffee.specs.process}
                    </div>
                    <div>
                      <span className="text-[#666666]">Roast:</span> {coffee.specs.roastProfile}
                    </div>
                  </div>
                </div>

                {/* Utility Note */}
                <div className="md:col-span-3">
                  <div className="text-base text-[#666666] italic mb-4 leading-relaxed">
                    {coffee.utilityNote}
                  </div>
                </div>

                {/* Quick Add */}
                <div className="md:col-span-1 flex flex-col gap-3">
                  <div className="font-mono-bold text-xl text-[#222222] mb-2">
                    ${coffee.variants["12oz"].price}
                  </div>
                  <button
                    onClick={() => handleQuickAdd(coffee.variants["12oz"].sku, "12oz")}
                    className={`px-6 py-3 text-base font-bold uppercase border-2 transition-colors ${
                      addedToCart === `${coffee.variants["12oz"].sku}-12oz`
                        ? "bg-[#10B981] text-white border-[#10B981]"
                        : "bg-white text-[#222222] border-[#222222] hover:bg-[#222222] hover:text-white"
                    }`}
                  >
                    {addedToCart === `${coffee.variants["12oz"].sku}-12oz` ? "Added" : "Quick Add"}
                  </button>
                  <Link
                    href={`/coffee/${coffee.slug}`}
                    className="text-base text-[#666666] hover:text-[#222222] transition-colors text-center underline"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Inventory Legend */}
          <div className="mt-8 p-6 bg-white border border-[#E0E0E0]">
            <div className="font-mono-bold text-base text-[#222222] mb-3">Status Legend:</div>
            <div className="flex flex-wrap gap-6 text-base text-[#666666] font-mono leading-relaxed">
              <span><span className="text-[#10B981] font-bold">Fresh Drop</span> — Just roasted this week</span>
              <span><span className="text-[#F59E0B] font-bold">Low Inventory</span> — Fewer than 10 bags remaining</span>
              <span><span className="text-[#3B82F6] font-bold">Roasting Tuesday</span> — Next roast date scheduled</span>
              <span><span className="text-[#666666] font-bold">In Stock</span> — Available for immediate shipment</span>
            </div>
          </div>
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}
