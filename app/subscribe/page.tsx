"use client";

import { useState, use } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { getCoffeeBySlug, coffees } from "../lib/coffee-data";
import { Profile } from "../types/coffee";

interface PageProps {
  searchParams: Promise<{ coffee?: string; size?: string }>;
}

export default function SubscribePage({ searchParams }: PageProps) {
  const params = use(searchParams);
  const [selectedSize, setSelectedSize] = useState<"12oz" | "2lb">((params.size as "12oz" | "2lb") || "12oz");
  const [selectedCadence, setSelectedCadence] = useState<string>(
    selectedSize === "12oz" ? "2" : "4"
  );
  const [selectedProfile, setSelectedProfile] = useState<Profile | "surprise">(
    params.coffee ? "balanced" : "surprise"
  );
  const [selectedCoffee, setSelectedCoffee] = useState<string | null>(params.coffee || null);

  const cadenceOptions = selectedSize === "12oz"
    ? [
        { value: "1", label: "Every 1 week", savings: null },
        { value: "2", label: "Every 2 weeks", savings: "Most popular" },
        { value: "4", label: "Every 4 weeks", savings: null },
      ]
    : [
        { value: "2", label: "Every 2 weeks", savings: null },
        { value: "4", label: "Every 4 weeks", savings: "Most popular" },
      ];

  const selectedCoffeeData = selectedCoffee ? getCoffeeBySlug(selectedCoffee) : null;
  const price = selectedCoffeeData
    ? selectedCoffeeData.variants[selectedSize].price
    : selectedSize === "12oz" ? 18 : 32;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4">
            Subscribe
          </h1>
          <p className="text-xl text-slate-700 mb-12">
            Make great coffee your default. Pause, skip, or cancel anytime.
          </p>

          <div className="space-y-12">
            {/* Size Selection */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Choose size</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card
                  hover
                  onClick={() => {
                    setSelectedSize("12oz");
                    setSelectedCadence("2");
                  }}
                  className={`p-6 border-2 transition-all ${
                    selectedSize === "12oz" ? "border-slate-900" : "border-slate-200"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="font-bold text-xl text-slate-900">12 oz</div>
                    <div className="text-sm text-slate-600">Personal ritual</div>
                    <div className="text-3xl font-black text-slate-900">${price}</div>
                    <div className="text-sm text-slate-600">per delivery</div>
                  </div>
                </Card>
                <Card
                  hover
                  onClick={() => {
                    setSelectedSize("2lb");
                    setSelectedCadence("4");
                  }}
                  className={`p-6 border-2 transition-all ${
                    selectedSize === "2lb" ? "border-slate-900" : "border-slate-200"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="font-bold text-xl text-slate-900">2 lb</div>
                    <div className="text-sm text-slate-600">Daily default / best value</div>
                    <div className="text-3xl font-black text-slate-900">${price}</div>
                    <div className="text-sm text-slate-600">per delivery</div>
                    <div className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded inline-block">
                      Best value per cup
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Cadence Selection */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Delivery frequency</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {cadenceOptions.map((option) => (
                  <Card
                    key={option.value}
                    hover
                    onClick={() => setSelectedCadence(option.value)}
                    className={`p-6 border-2 transition-all text-center ${
                      selectedCadence === option.value ? "border-slate-900" : "border-slate-200"
                    }`}
                  >
                    <div className="font-bold text-lg text-slate-900">{option.label}</div>
                    {option.savings && (
                      <div className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded inline-block mt-2">
                        {option.savings}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Profile/Coffee Selection */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Choose your coffee</h2>
              <div className="space-y-4">
                <Card
                  hover
                  onClick={() => {
                    setSelectedProfile("surprise");
                    setSelectedCoffee(null);
                  }}
                  className={`p-6 border-2 transition-all ${
                    selectedProfile === "surprise" ? "border-slate-900" : "border-slate-200"
                  }`}
                >
                  <div className="font-bold text-lg text-slate-900">Surprise me</div>
                  <div className="text-sm text-slate-600 mt-1">
                    We'll send our best pick based on your preferences
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  {(["bright", "balanced", "bold"] as Profile[]).map((profile) => {
                    const profileCoffees = coffees.filter((c) => c.profile === profile);
                    if (profileCoffees.length === 0) return null;
                    const coffee = profileCoffees[0];

                    return (
                      <Card
                        key={profile}
                        hover
                        onClick={() => {
                          setSelectedProfile(profile);
                          setSelectedCoffee(coffee.slug);
                        }}
                        className={`p-6 border-2 transition-all ${
                          selectedProfile === profile && selectedCoffee === coffee.slug
                            ? "border-slate-900"
                            : "border-slate-200"
                        }`}
                      >
                        <div className="font-bold text-lg text-slate-900">{coffee.name}</div>
                        <div className="text-sm text-slate-600 mt-1 capitalize">{profile}</div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 p-8 rounded-lg space-y-4">
              <h3 className="text-xl font-black text-slate-900">Subscription summary</h3>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="font-bold">{selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span className="font-bold">
                    {cadenceOptions.find((o) => o.value === selectedCadence)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Coffee:</span>
                  <span className="font-bold">
                    {selectedCoffee
                      ? getCoffeeBySlug(selectedCoffee)?.name
                      : "Surprise me"}
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-300 flex justify-between text-lg">
                  <span className="font-bold">Price:</span>
                  <span className="font-black">${price} per delivery</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button variant="primary" size="lg" className="w-full">
              Start subscription
            </Button>

            <div className="text-center text-sm text-slate-600">
              Pause, skip, or cancel anytime. No commitment.
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

