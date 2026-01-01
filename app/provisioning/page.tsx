"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdventureWeather from "../components/AdventureWeather";
import Button from "../components/ui/Button";
import { coffees } from "../lib/coffee-data";
import { Profile } from "../types/coffee";

export default function ProvisioningPage() {
  const [frequency, setFrequency] = useState<"weekend-warrior" | "full-time-explorer" | null>(null);
  const [profile, setProfile] = useState<"light-acidic" | "dark-developed" | null>(null);
  const [selectedSize, setSelectedSize] = useState<"12oz" | "2lb">("12oz");

  const frequencyConfig = {
    "weekend-warrior": {
      label: "Weekend Warrior",
      desc: "Every 4 weeks",
      price: 18,
      recommended: true,
    },
    "full-time-explorer": {
      label: "Full-Time Explorer",
      desc: "Every 2 weeks",
      price: 18,
      recommended: false,
    },
  };

  const profileCoffees = {
    "light-acidic": coffees.find((c) => c.profile === "bright") || coffees[1],
    "dark-developed": coffees.find((c) => c.profile === "bold") || coffees[2],
  };

  const basePrice = frequency ? (frequency === "weekend-warrior" ? 18 : 18) : 18;
  const discountPrice = Math.round(basePrice * 0.85);
  const savings = basePrice - discountPrice;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 border-b-2 border-[#222222] pb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#222222] mb-2">
              Basecamp Subscription
            </h1>
            <p className="text-lg text-[#666666] font-mono">
              Automated Provisioning — Save 15% and never run out of fuel
            </p>
          </div>

          {/* Value Prop */}
          <div className="bg-[#222222] text-white p-8 mb-12 border-4 border-[#FF6B35]">
            <div className="font-mono-bold text-2xl mb-2">Save 15%</div>
            <div className="text-lg mb-4">Never run out of fuel. Cancel when you're off the grid.</div>
            <div className="font-mono text-base text-gray-300">No commitments. Pause or cancel anytime.</div>
          </div>

          <div className="space-y-12">
            {/* Step 1: Frequency */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="font-mono-bold text-2xl text-[#FF6B35]">01</div>
                <h2 className="text-2xl font-black text-[#222222]">Choose Your Frequency</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(frequencyConfig).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setFrequency(key as "weekend-warrior" | "full-time-explorer")}
                    className={`p-6 border-2 text-left transition-all ${
                      frequency === key
                        ? "border-[#222222] bg-white"
                        : "border-[#E0E0E0] bg-white hover:border-[#222222]"
                    }`}
                  >
                    <div className="font-black text-xl text-[#222222] mb-1">{config.label}</div>
                    <div className="font-mono text-base text-[#666666] mb-2">{config.desc}</div>
                    {(config.recommended || false) && (
                      <div className="text-sm font-mono-bold text-[#FF6B35] uppercase">Most Popular</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Profile */}
            {frequency && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="font-mono-bold text-2xl text-[#FF6B35]">02</div>
                  <h2 className="text-2xl font-black text-[#222222]">Choose Your Profile</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setProfile("light-acidic")}
                    className={`p-6 border-2 text-left transition-all ${
                      profile === "light-acidic"
                        ? "border-[#222222] bg-white"
                        : "border-[#E0E0E0] bg-white hover:border-[#222222]"
                    }`}
                  >
                    <div className="font-black text-xl text-[#222222] mb-1">Light / Acidic</div>
                    <div className="font-mono text-base text-[#666666] mb-4">
                      Bright, energetic, complex
                    </div>
                    {profile === "light-acidic" && profileCoffees["light-acidic"] && (
                      <div className="font-mono text-base text-[#666666] border-t border-[#E0E0E0] pt-4">
                        Recommended: {profileCoffees["light-acidic"].name}
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => setProfile("dark-developed")}
                    className={`p-6 border-2 text-left transition-all ${
                      profile === "dark-developed"
                        ? "border-[#222222] bg-white"
                        : "border-[#E0E0E0] bg-white hover:border-[#222222]"
                    }`}
                  >
                    <div className="font-black text-xl text-[#222222] mb-1">Dark / Developed</div>
                    <div className="font-mono text-base text-[#666666] mb-4">
                      Bold, rich, intense
                    </div>
                    {profile === "dark-developed" && profileCoffees["dark-developed"] && (
                      <div className="font-mono text-base text-[#666666] border-t border-[#E0E0E0] pt-4">
                        Recommended: {profileCoffees["dark-developed"].name}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Size Selection */}
            {frequency && profile && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="font-mono-bold text-2xl text-[#FF6B35]">03</div>
                  <h2 className="text-2xl font-black text-[#222222]">Set and Forget</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => setSelectedSize("12oz")}
                    className={`p-6 border-2 text-left transition-all ${
                      selectedSize === "12oz"
                        ? "border-[#222222] bg-white"
                        : "border-[#E0E0E0] bg-white hover:border-[#222222]"
                    }`}
                  >
                    <div className="font-black text-xl text-[#222222] mb-1">12 oz</div>
                    <div className="font-mono text-sm text-[#666666]">
                      ${discountPrice} / delivery (was ${basePrice})
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedSize("2lb")}
                    className={`p-6 border-2 text-left transition-all ${
                      selectedSize === "2lb"
                        ? "border-[#222222] bg-white"
                        : "border-[#E0E0E0] bg-white hover:border-[#222222]"
                    }`}
                  >
                    <div className="font-black text-xl text-[#222222] mb-1">2 lb</div>
                    <div className="font-mono text-sm text-[#666666]">
                      Best value — lowest cost per cup
                    </div>
                  </button>
                </div>

                {/* Summary */}
                <div className="bg-white border-2 border-[#222222] p-6 mb-8">
                  <div className="font-mono-bold text-lg text-[#222222] mb-4 uppercase">Subscription Summary</div>
                  <div className="space-y-2 font-mono text-base text-[#666666] mb-4">
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <span className="text-[#222222] font-mono-bold">
                        {frequencyConfig[frequency].label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profile:</span>
                      <span className="text-[#222222] font-mono-bold">
                        {profile === "light-acidic" ? "Light / Acidic" : "Dark / Developed"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="text-[#222222] font-mono-bold">{selectedSize}</span>
                    </div>
                  </div>
                  <div className="border-t-2 border-[#222222] pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-mono-bold text-xl text-[#222222]">${discountPrice} / delivery</div>
                        <div className="font-mono text-base text-[#666666]">Save ${savings} per delivery</div>
                      </div>
                      <Button variant="primary" size="lg">
                        Start Automated Provisioning
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center text-base text-[#666666] font-mono">
                  Cancel anytime. No questions asked.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}

