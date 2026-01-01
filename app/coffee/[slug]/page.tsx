"use client";

import { useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import AdventureWeather from "../../components/AdventureWeather";
import Button from "../../components/ui/Button";
import StatusTag from "../../components/ui/StatusTag";
import Accordion from "../../components/ui/Accordion";
import { getCoffeeBySlug } from "../../lib/coffee-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}

export default function CoffeePage({ params, searchParams }: PageProps) {
  const { slug } = use(params);
  const { variant } = use(searchParams);
  const coffee = getCoffeeBySlug(slug);
  const [selectedVariant, setSelectedVariant] = useState<"12oz" | "2lb">(variant === "2lb" ? "2lb" : "12oz");
  const [grind, setGrind] = useState<string>("whole-bean");
  const [isSubscribe, setIsSubscribe] = useState(false);

  if (!coffee) {
    notFound();
  }

  const currentVariant = coffee.variants[selectedVariant];
  const cupsPerBag = selectedVariant === "12oz" ? 20 : 36;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Image */}
            <div className="aspect-square relative bg-[#222222]">
              <Image
                src={coffee.images[0] || "/images/coffee-hero.jpg"}
                alt={coffee.name}
                fill
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute top-4 left-4">
                <StatusTag status={coffee.status} />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="font-mono text-base text-[#666666] uppercase mb-2">
                  {coffee.specs.batchNumber}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#222222] mb-4">
                  {coffee.name}
                </h1>
                <p className="text-lg text-[#666666] italic mb-6">
                  {coffee.utilityNote}
                </p>
              </div>

              {/* Technical Specs */}
              <div className="bg-white border-2 border-[#222222] p-6">
                <div className="font-mono-bold text-base text-[#222222] uppercase mb-4">Technical Specs</div>
                <div className="font-mono text-base text-[#666666] space-y-2">
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>Varietal:</span>
                    <span className="text-[#222222]">{coffee.specs.varietal}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>Elevation:</span>
                    <span className="text-[#222222]">{coffee.specs.elevationMASL} MASL</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>Process:</span>
                    <span className="text-[#222222]">{coffee.specs.process}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span>Roast Profile:</span>
                    <span className="text-[#222222]">{coffee.specs.roastProfile}</span>
                  </div>
                </div>
              </div>

              {/* Variant Selector */}
              <div>
                <h3 className="text-lg font-black text-[#222222] mb-4 uppercase">Choose Size</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedVariant("12oz")}
                    className={`p-6 border-2 text-left transition-all ${
                      selectedVariant === "12oz" ? "border-[#222222] bg-white" : "border-[#E0E0E0] bg-white hover:border-[#222222]"
                    }`}
                  >
                    <div className="font-black text-[#222222] mb-1">12 oz</div>
                    <div className="font-mono text-base text-[#666666] mb-2">Personal ritual</div>
                    <div className="font-mono-bold text-2xl text-[#222222]">${coffee.variants["12oz"].price}</div>
                  </button>
                  <button
                    onClick={() => setSelectedVariant("2lb")}
                    className={`p-6 border-2 text-left transition-all ${
                      selectedVariant === "2lb" ? "border-[#222222] bg-white" : "border-[#E0E0E0] bg-white hover:border-[#222222]"
                    }`}
                  >
                    <div className="font-black text-[#222222] mb-1">2 lb</div>
                    <div className="font-mono text-base text-[#666666] mb-2">Daily default / best value</div>
                    <div className="font-mono-bold text-2xl text-[#222222] mb-1">${coffee.variants["2lb"].price}</div>
                    <div className="font-mono text-base text-[#666666]">About {cupsPerBag} cups</div>
                    {selectedVariant === "2lb" && (
                      <div className="mt-4 p-4 bg-[#F5F5F5] border border-[#E0E0E0] font-mono text-base">
                        <div className="font-mono-bold text-[#222222] mb-1">Best for: daily drinkers, espresso households, offices</div>
                        <div className="text-[#666666]">Lower cost per cup</div>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Grind Selector */}
              <div>
                <h3 className="text-lg font-black text-[#222222] mb-4 uppercase">Grind</h3>
                <select
                  value={grind}
                  onChange={(e) => setGrind(e.target.value)}
                  className="w-full p-5 border-2 border-[#222222] font-mono text-base text-[#222222] bg-white focus:outline-none text-lg"
                >
                  <option value="whole-bean">Whole Bean</option>
                  <option value="coarse">Coarse (French Press, Cold Brew)</option>
                  <option value="medium-coarse">Medium-Coarse (Pour Over)</option>
                  <option value="medium">Medium (Drip)</option>
                  <option value="fine">Fine (Espresso)</option>
                </select>
              </div>

              {/* Subscribe Toggle */}
              <div>
                <div className="flex items-center justify-between p-4 bg-white border-2 border-[#E0E0E0]">
                  <div>
                    <div className="font-black text-[#222222]">One-time purchase</div>
                    <div className="font-mono text-base text-[#666666]">or subscribe and save 15%</div>
                  </div>
                  <button
                    onClick={() => setIsSubscribe(!isSubscribe)}
                    className={`relative w-14 h-8 rounded-full transition-colors border-2 ${
                      isSubscribe ? "bg-[#222222] border-[#222222]" : "bg-white border-[#E0E0E0]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white border-2 border-[#222222] rounded-full transition-transform ${
                        isSubscribe ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="lg"
                href={isSubscribe ? `/provisioning?coffee=${coffee.slug}&size=${selectedVariant}` : "#"}
                className="w-full"
              >
                {isSubscribe ? `Subscribe - $${Math.round(currentVariant.price * 0.85)}` : `Add to cart - $${currentVariant.price}`}
              </Button>
            </div>
          </div>

          {/* Utility Note & Story */}
          <div className="max-w-3xl mb-16">
            <div className="bg-white border-2 border-[#222222] p-8">
              <h2 className="text-2xl font-black text-[#222222] mb-4 uppercase">The Story</h2>
              <p className="text-[#666666] leading-relaxed mb-4">{coffee.story}</p>
              <div className="font-mono text-base text-[#666666]">
                <span className="font-mono-bold text-[#222222]">Best for: </span>
                {coffee.bestFor.map((method) => method.charAt(0).toUpperCase() + method.slice(1)).join(", ")}
              </div>
            </div>
          </div>

          {/* Brew Recommendations */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-black text-[#222222] mb-4 uppercase">Brew Guides</h2>
            <div className="flex flex-wrap gap-3">
              {coffee.bestFor.map((method) => (
                <Link
                  key={method}
                  href={`/intel/${method}`}
                  className="px-6 py-3 bg-white border-2 border-[#222222] text-[#222222] font-bold uppercase tracking-wide hover:bg-[#222222] hover:text-white transition-colors"
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)} Guide →
                </Link>
              ))}
            </div>
          </div>

          {/* Details Accordion */}
          <div className="max-w-3xl">
            <div className="bg-white border-2 border-[#222222]">
              <Accordion title="Tasting Notes" defaultOpen>
                <div className="font-mono text-base text-[#666666] space-y-2">
                  {coffee.tasting.map((note, i) => (
                    <div key={i} className="flex items-start">
                      <span className="text-[#FF6B35] mr-2 font-mono-bold">→</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </Accordion>
              <Accordion title="FAQ">
                <div className="space-y-4 text-[#666666]">
                  <div>
                    <div className="font-black text-[#222222] mb-2">How long does it stay fresh?</div>
                    <p className="font-mono text-base leading-relaxed">Coffee is best within 2-3 weeks of roast date. We include the roast date on every bag.</p>
                  </div>
                  <div>
                    <div className="font-black text-[#222222] mb-2">Can I change my subscription?</div>
                    <p className="font-mono text-base leading-relaxed">Yes, you can pause, skip, or cancel anytime. No commitments.</p>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}
