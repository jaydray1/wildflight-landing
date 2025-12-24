"use client";

import Link from "next/link";
import { useState } from "react";

export default function CoOpPage() {
  const [cupsPerDay, setCupsPerDay] = useState(0);
  const [ouncesPerCup, setOuncesPerCup] = useState(12);
  const [brewingMethod, setBrewingMethod] = useState("filter");
  const [showModal, setShowModal] = useState(false);
  
  // Intent to Buy state
  const [selectedCompany, setSelectedCompany] = useState<"royal" | "cafe-imports">("royal");
  const [coffeeNameInput, setCoffeeNameInput] = useState("");
  const [submittedCoffee, setSubmittedCoffee] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState<string | null>(null);
  
  // Pricing calculator state
  const [greenBeanCost, setGreenBeanCost] = useState("");
  const [roastingFeePerLb, setRoastingFeePerLb] = useState("6.50");
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup");
  const [deliveryFee, setDeliveryFee] = useState("8.00");
  const [retailBagCost, setRetailBagCost] = useState("18.00");
  const orderFeePerPerson = 5.00; // Flat fee for handling incoming bag
  const portionSizeLbs = 6; // Each person gets 6 lbs
  const [intentCounts, setIntentCounts] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wildflight-intent-counts");
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });

  const handleIntentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coffeeNameInput.trim()) return;

    const coffeeKey = `${selectedCompany}-${coffeeNameInput.trim()}`;
    const currentCount = intentCounts[coffeeKey] || 0;
    const newCount = currentCount + 1;
    
    const updatedCounts = { ...intentCounts, [coffeeKey]: newCount };
    setIntentCounts(updatedCounts);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("wildflight-intent-counts", JSON.stringify(updatedCounts));
    }
    
    setSubmittedCoffee(coffeeKey);
    setCoffeeNameInput("");
    
    // If this is the 3rd person, show payment collection
    if (newCount === 3) {
      setShowPayment(coffeeKey);
    } else {
      // Clear confirmation after 5 seconds if not hitting threshold
      setTimeout(() => setSubmittedCoffee(null), 5000);
    }
  };

  // Get top coffees by intent count for display
  const topIntents = Object.entries(intentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([coffeeKey, count]) => {
      const [company, coffeeName] = coffeeKey.split("-", 2);
      return { company, coffeeName, count, fullKey: coffeeKey };
    });

  // Coffee-to-water ratios by brewing method
  // Filter/Drip: 1:18 (lighter)
  // Pour-over: 1:16 (medium)
  // Aeropress: 1:11 (stronger, more concentrated)
  const brewingRatios: Record<string, number> = {
    filter: 18,
    "pour-over": 16,
    aeropress: 11,
  };

  const ozToGrams = 28.35; // 1 oz = 28.35g
  const coffeeToWaterRatio = brewingRatios[brewingMethod] || 16;
  
  // Calculate coffee beans needed per cup (in grams, then convert to oz)
  const coffeeBeansPerCupGrams = (ouncesPerCup * ozToGrams) / coffeeToWaterRatio;
  const coffeeBeansPerCupOz = coffeeBeansPerCupGrams / ozToGrams;
  
  // Calculate total coffee beans needed
  const totalDailyOzBeans = cupsPerDay * coffeeBeansPerCupOz;
  const weeklyOzBeans = totalDailyOzBeans * 7;
  const monthlyOzBeans = totalDailyOzBeans * 30;
  const monthlyPounds = (monthlyOzBeans / 16).toFixed(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-amber-900">
            WILDFLIGHT
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <Link href="/#roasts" className="hover:text-amber-800 transition-colors">Roasts</Link>
            <Link href="/#coop" className="hover:text-amber-800 transition-colors">Co-Op Program</Link>
            <Link href="/#story" className="hover:text-amber-800 transition-colors">Our Story</Link>
            <Link href="/#contact" className="hover:text-amber-800 transition-colors">Contact</Link>
            <button className="bg-amber-800 text-white px-6 py-2 rounded-full hover:bg-amber-900 transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-stone-900 leading-tight">
            The Wildflight Co-Op
          </h1>
          <p className="text-2xl text-stone-600 leading-relaxed">
            Get wholesale prices without the wholesale commitment. 
            Buy green beans, get fresh roasted coffee in bulk.
          </p>
        </div>
      </section>

      {/* Savings Comparison */}
      <section className="py-12 px-6 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-stone-900 mb-2">See Your Savings</h2>
            <p className="text-stone-600">Based on a typical household drinking 4 bags (12 oz each) per month</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-stone-200">
              <h3 className="text-xl font-bold text-stone-900 mb-4">Retail Bags</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Cost per bag (12 oz):
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-stone-700">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={retailBagCost}
                    onChange={(e) => setRetailBagCost(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>
              {(() => {
                const bagCost = parseFloat(retailBagCost) || 0;
                const monthlyCost = 4 * bagCost;
                const annualCost = monthlyCost * 12;
                return (
                  <>
                    <div className="space-y-2 text-stone-700 mb-4">
                      <div className="flex justify-between">
                        <span>4 bags/month:</span>
                        <span className="font-semibold">${monthlyCost.toFixed(2)}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual cost:</span>
                        <span className="font-semibold">${annualCost.toFixed(2)}/year</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-stone-200">
                      <p className="text-sm text-stone-600">36 lbs of roasted coffee per year</p>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="bg-green-50 rounded-2xl p-6 shadow-lg border-2 border-green-300">
              <h3 className="text-xl font-bold text-stone-900 mb-4">Co-Op Program</h3>
              <div className="space-y-2 text-stone-700 mb-4">
                <div className="flex justify-between">
                  <span>4 orders/year (quarterly, 9 lbs each):</span>
                  <span className="font-semibold">$172.50/order</span>
                </div>
                <div className="flex justify-between">
                  <span>Base annual cost:</span>
                  <span className="font-semibold text-green-800">$690/year</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Pickup:</span>
                  <span className="font-semibold">Free</span>
                </div>
              </div>
              {(() => {
                const bagCost = parseFloat(retailBagCost) || 0;
                const retailAnnual = 4 * bagCost * 12;
                const coopAnnual = 690;
                const savings = retailAnnual - coopAnnual;
                const savingsPercent = retailAnnual > 0 ? ((savings / retailAnnual) * 100).toFixed(0) : "0";
                return (
                  <div className="pt-4 border-t border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-green-800 font-bold text-lg">Your Savings:</span>
                      <span className="text-green-800 font-bold text-2xl">${savings.toFixed(2)}/year</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">{savingsPercent}% savings vs retail</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Consumption Calculator */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-2">Step 1: Calculate Your Coffee Needs</h2>
            <p className="text-stone-600 text-lg">Tell us the size of your coffee cups and how many cups per day your household consumes and we'll tell you how much coffee you need</p>
          </div>

          {/* Brewing method */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <label className="text-xl font-semibold text-stone-900 text-center">
                What brewing method do you use?
              </label>
              <button
                onClick={() => setShowModal(true)}
                className="text-amber-800 hover:text-amber-900 text-sm font-medium underline"
              >
                How we calculate
              </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { id: "filter", label: "Filter/Drip", icon: "☕" },
                { id: "pour-over", label: "Pour-Over", icon: "☕" },
                { id: "aeropress", label: "Aeropress", icon: "☕" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setBrewingMethod(method.id)}
                  className={`px-6 py-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 min-w-[140px] ${
                    brewingMethod === method.id
                      ? "bg-amber-800 border-amber-800 text-white scale-105 shadow-lg"
                      : "bg-white border-amber-300 text-amber-800 hover:border-amber-500 hover:scale-105"
                  }`}
                >
                  <span className="text-3xl">{method.icon}</span>
                  <span className="text-sm font-bold">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cup size */}
          <div className="mb-12">
            <label className="block text-xl font-semibold text-stone-900 mb-6 text-center">
              How big are your cups of coffee?
            </label>
            <div className="flex flex-wrap gap-4 justify-center items-end">
              {[6, 8, 12, 16, 20].map((oz) => {
                const size = oz === 6 ? "w-16 h-16" : oz === 8 ? "w-[72px] h-[72px]" : oz === 12 ? "w-20 h-20" : oz === 16 ? "w-[88px] h-[88px]" : "w-24 h-24";
                const iconSize = oz === 6 ? "text-2xl" : oz === 8 ? "text-2xl" : oz === 12 ? "text-3xl" : oz === 16 ? "text-3xl" : "text-4xl";
                return (
                  <button
                    key={oz}
                    onClick={() => setOuncesPerCup(oz)}
                    className={`relative ${size} rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                      ouncesPerCup === oz
                        ? "bg-amber-800 border-amber-800 text-white scale-110 shadow-lg"
                        : "bg-white border-amber-300 text-amber-800 hover:border-amber-500 hover:scale-105"
                    }`}
                  >
                    <span className={iconSize}>☕</span>
                    <span className="text-xs font-bold">{oz} oz</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cups per day */}
          <div className="mb-12">
            <label className="block text-xl font-semibold text-stone-900 mb-6 text-center">
              How many cups per day does your household drink?
            </label>
            <div className="flex flex-wrap gap-3 justify-center">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setCupsPerDay(num)}
                  className={`relative w-20 h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    cupsPerDay === num
                      ? "bg-amber-800 border-amber-800 text-white scale-110 shadow-lg"
                      : "bg-white border-amber-300 text-amber-800 hover:border-amber-500 hover:scale-105"
                  }`}
                >
                  <span className="text-3xl">☕</span>
                  <span className="text-xs font-bold">{num}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {cupsPerDay > 0 && (
            <div className="mt-12 pt-8 border-t-2 border-amber-200">
              <h3 className="text-3xl font-bold text-stone-900 mb-6 text-center">Your Coffee Consumption</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold text-amber-800">{totalDailyOzBeans.toFixed(1)}</p>
                      <p className="text-stone-600 text-sm mt-1">oz beans per day</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-amber-800">{weeklyOzBeans.toFixed(1)}</p>
                      <p className="text-stone-600 text-sm mt-1">oz beans per week</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-amber-800">{monthlyPounds}</p>
                      <p className="text-stone-600 text-sm mt-1">lbs beans per month</p>
                    </div>
                  </div>
              <p className="text-center text-stone-600 mt-6 text-base">
                Based on {cupsPerDay} {cupsPerDay === 1 ? "cup" : "cups"} of {ouncesPerCup}oz coffee per day
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Browse Green Coffee Offerings */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Browse Green Coffee Offerings</h2>
            <p className="text-xl text-stone-600">
              We source our green coffee from two trusted importers. Browse their offerings to find the beans you'd like us to roast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <a
              href="https://bodega.coffee/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-amber-200 hover:border-amber-800"
            >
              <div className="text-center space-y-4">
                <div className="text-5xl mb-4">☕</div>
                <h3 className="text-2xl font-bold text-stone-900">Cafe Imports</h3>
                <p className="text-lg font-semibold text-amber-800 mb-2">Bodega Program</p>
                <p className="text-stone-600">
                  Browse Cafe Imports' Bodega program for high-quality green coffee beans. Select your favorites and we'll handle the roasting.
                </p>
                <div className="pt-4">
                  <span className="inline-block bg-amber-800 text-white px-6 py-3 rounded-full font-semibold">
                    Browse Cafe Imports →
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://royalcoffee.com/crown-jewels/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-amber-200 hover:border-amber-800"
            >
              <div className="text-center space-y-4">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-2xl font-bold text-stone-900">Royal Coffee</h3>
                <p className="text-lg font-semibold text-amber-800 mb-2">Crown Jewels Program</p>
                <p className="text-stone-600">
                  Explore Royal Coffee's Crown Jewels program featuring 22 lb boxes of super-specialty green coffee micro-lots. Perfect for our co-op bulk roasting model.
                </p>
                <div className="pt-4">
                  <span className="inline-block bg-amber-800 text-white px-6 py-3 rounded-full font-semibold">
                    Browse Royal Coffee →
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Intent to Buy System */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Enter Your Intent to Buy</h2>
            <p className="text-xl text-stone-600 mb-2">
              Found a coffee you want? Enter the coffee name to join our intent to buy list.
            </p>
            <p className="text-stone-600">
              We need 3 commitments before we order and roast. When the 3rd person commits, payment will be collected from all 3 participants to finalize the order.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-200">
            <form onSubmit={handleIntentSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-stone-900 mb-3">
                  Select Company
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedCompany("royal")}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                      selectedCompany === "royal"
                        ? "bg-amber-800 border-amber-800 text-white"
                        : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                    }`}
                  >
                    <span className="font-semibold">Royal Coffee</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCompany("cafe-imports")}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                      selectedCompany === "cafe-imports"
                        ? "bg-amber-800 border-amber-800 text-white"
                        : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                    }`}
                  >
                    <span className="font-semibold">Cafe Imports (Bodega)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-stone-900 mb-3">
                  Enter Coffee Name
                </label>
                <p className="text-sm text-stone-600 mb-3">
                  Copy and paste the full coffee name from {selectedCompany === "royal" ? "Royal Coffee's" : "Cafe Imports'"} website
                </p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={coffeeNameInput}
                    onChange={(e) => setCoffeeNameInput(e.target.value)}
                    placeholder="e.g., Crown Jewel Ethiopia White Honey Worka Chelchele"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                  />
                  <button
                    type="submit"
                    className="bg-amber-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-900 transition-colors whitespace-nowrap"
                  >
                    Submit Intent
                  </button>
                </div>
              </div>
            </form>

            {submittedCoffee && !showPayment && (
              <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-300 rounded-xl">
                <p className="text-amber-900 font-semibold">
                  ✓ We've added you to our intent to buy list for this coffee!
                </p>
                <p className="text-sm text-amber-800 mt-1">
                  Current commitments: {intentCounts[submittedCoffee]} / 3 needed
                </p>
              </div>
            )}

            {showPayment && (
              <div className="mt-6 p-6 bg-amber-100 border-2 border-amber-800 rounded-xl">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-amber-900 mb-2">
                    🎉 You're the 3rd person! We're ready to order.
                  </p>
                  <p className="text-amber-800">
                    We've reached 3 commitments for this coffee. Please complete payment to finalize your order and we'll proceed with ordering and roasting.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 mt-4">
                  <h4 className="font-bold text-stone-900 mb-4">Order Details</h4>
                  <div className="space-y-2 text-stone-700 mb-6">
                    <div className="flex justify-between">
                      <span>Coffee:</span>
                      <span className="font-semibold">{showPayment.split("-").slice(1).join("-")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Company:</span>
                      <span className="font-semibold">
                        {showPayment.startsWith("royal") ? "Royal Coffee" : "Cafe Imports"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Your portion:</span>
                      <span className="font-semibold">6 lbs roasted coffee</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-amber-200 pt-2 mt-2">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold text-amber-800">$XX.XX</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-stone-600 mb-4">
                      Payment will be collected via secure checkout. Once all 3 people have paid, we'll order the green beans and begin roasting.
                    </p>
                    <button
                      onClick={() => {
                        // TODO: Integrate with payment system (Stripe, etc.)
                        alert("Payment integration coming soon! For now, we'll contact you to collect payment.");
                        setShowPayment(null);
                        setSubmittedCoffee(null);
                      }}
                      className="w-full bg-amber-800 text-white px-6 py-4 rounded-xl font-semibold hover:bg-amber-900 transition-colors text-lg"
                    >
                      Proceed to Payment
                    </button>
                    <button
                      onClick={() => {
                        setShowPayment(null);
                        setSubmittedCoffee(null);
                      }}
                      className="w-full border-2 border-amber-800 text-amber-800 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
                    >
                      I'll pay later
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {topIntents.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-stone-900 mb-6 text-center">
                Popular Intent to Buy Items
              </h3>
              <div className="space-y-3">
                {topIntents.map(({ company, coffeeName, count, fullKey }) => (
                  <div
                    key={fullKey}
                    className="bg-white rounded-xl p-4 shadow-md border border-amber-200 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-amber-800 uppercase">
                        {company === "royal" ? "Royal Coffee" : "Cafe Imports"}
                      </span>
                      <p className="text-stone-900 font-medium mt-1">{coffeeName}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-amber-800">{count}</p>
                      <p className="text-xs text-stone-600">
                        {count >= 3 ? "Ready to order!" : `${3 - count} more needed`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Calculate Your Cost</h2>
            <p className="text-xl text-stone-600">
              Enter the green bean cost from the importer to see your total price per 6 lb portion
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-200">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-stone-900 mb-3">
                  Green Bean Cost (total for the bag/box)
                </label>
                <p className="text-sm text-stone-600 mb-3">
                  Enter the total cost from {selectedCompany === "royal" ? "Royal Coffee" : "Cafe Imports"} (e.g., $218.90 for a 22 lb Crown Jewel box)
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-stone-700 font-medium">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={greenBeanCost}
                    onChange={(e) => setGreenBeanCost(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-stone-900 mb-3">
                  Roasting Fee (per pound)
                </label>
                <p className="text-sm text-stone-600 mb-3">
                  We charge <strong className="text-amber-800">$6.50/lb</strong> to roast your coffee. This fee covers our time, expertise, and equipment.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-stone-700 font-medium">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={roastingFeePerLb}
                    onChange={(e) => setRoastingFeePerLb(e.target.value)}
                    className="w-32 px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                  />
                  <span className="text-stone-700 font-medium">per lb</span>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-stone-900 mb-3">
                  Delivery Option
                </label>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption("pickup")}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                      deliveryOption === "pickup"
                        ? "bg-amber-800 border-amber-800 text-white"
                        : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                    }`}
                  >
                    <span className="font-semibold">Pickup (Free)</span>
                    <p className="text-sm mt-1 opacity-90">Pick up from our Salt Lake City home</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption("delivery")}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                      deliveryOption === "delivery"
                        ? "bg-amber-800 border-amber-800 text-white"
                        : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                    }`}
                  >
                    <span className="font-semibold">Delivery</span>
                    <p className="text-sm mt-1 opacity-90">Within 10 mile radius</p>
                  </button>
                </div>
                {deliveryOption === "delivery" && (
                  <div className="flex items-center gap-3">
                    <span className="text-stone-700 font-medium">Delivery fee: $</span>
                    <input
                      type="number"
                      step="0.01"
                      value={deliveryFee}
                      onChange={(e) => setDeliveryFee(e.target.value)}
                      className="w-32 px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                  </div>
                )}
              </div>

              {greenBeanCost && parseFloat(greenBeanCost) > 0 && (
                <div className="mt-8 pt-6 border-t-2 border-amber-200">
                  <h3 className="text-2xl font-bold text-stone-900 mb-4">Price Breakdown</h3>
                  
                  {(() => {
                    const totalGreenBeanCost = parseFloat(greenBeanCost);
                    const roastingFee = parseFloat(roastingFeePerLb) || 0;
                    const deliveryCost = deliveryOption === "delivery" ? (parseFloat(deliveryFee) || 0) : 0;
                    const greenBeanCostPerPerson = totalGreenBeanCost / 3;
                    const roastingCostPerPerson = portionSizeLbs * roastingFee;
                    const totalPerPerson = greenBeanCostPerPerson + orderFeePerPerson + roastingCostPerPerson + deliveryCost;
                    const costPerLb = totalPerPerson / portionSizeLbs;

                    const retailMarkup = 0.30; // 30% markup for single origins
                    const retailPrice = totalPerPerson * (1 + retailMarkup);
                    const savings = retailPrice - totalPerPerson;
                    const savingsPercent = ((savings / retailPrice) * 100).toFixed(0);

                    return (
                      <div className="space-y-3">
                        <div className="flex justify-between text-stone-700">
                          <span>Green beans (your share):</span>
                          <span className="font-semibold">${greenBeanCostPerPerson.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-stone-700">
                          <span>Order handling fee:</span>
                          <span className="font-semibold">${orderFeePerPerson.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-stone-700">
                          <span>Roasting fee ({portionSizeLbs} lbs × ${roastingFee.toFixed(2)}/lb):</span>
                          <span className="font-semibold">${roastingCostPerPerson.toFixed(2)}</span>
                        </div>
                        {deliveryOption === "delivery" && deliveryCost > 0 && (
                          <div className="flex justify-between text-stone-700">
                            <span>Delivery fee (within 10 miles):</span>
                            <span className="font-semibold">${deliveryCost.toFixed(2)}</span>
                          </div>
                        )}
                        {deliveryOption === "pickup" && (
                          <div className="flex justify-between text-stone-600 text-sm">
                            <span>Pickup:</span>
                            <span className="font-semibold text-green-700">Free</span>
                          </div>
                        )}
                        <div className="flex justify-between text-stone-900 text-lg font-bold pt-3 border-t-2 border-amber-200">
                          <span>Total per person ({portionSizeLbs} lbs):</span>
                          <span className="text-amber-800">${totalPerPerson.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-stone-600 text-sm pt-2">
                          <span>Cost per pound:</span>
                          <span>${costPerLb.toFixed(2)}/lb</span>
                        </div>
                        <div className="mt-4 pt-4 border-t-2 border-green-200 bg-green-50 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-stone-700 font-semibold">Estimated retail price (30% markup):</span>
                            <span className="text-stone-600 line-through">${retailPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-green-800 font-bold text-lg">Your savings:</span>
                            <span className="text-green-800 font-bold text-xl">${savings.toFixed(2)} ({savingsPercent}% off)</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Explanation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-stone-900">How We Calculate Your Coffee Needs</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-stone-400 hover:text-stone-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6 text-stone-700">
              <p className="text-lg leading-relaxed">
                We use industry-standard coffee-to-water ratios to calculate how much coffee you need. 
                Different brewing methods require different amounts of coffee grounds to achieve the best flavor.
              </p>

              <div className="bg-amber-50 rounded-xl p-6">
                <h4 className="font-bold text-stone-900 mb-4 text-lg">Brewing Method Ratios:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                    <span className="font-semibold">Filter/Drip Coffee</span>
                    <span className="text-amber-800 font-bold">1:18 ratio</span>
                  </div>
                  <p className="text-sm text-stone-600">
                    Uses approximately 19g of coffee per 12oz cup. Lighter extraction, perfect for automatic drip machines.
                  </p>
                  
                  <div className="flex justify-between items-center border-b border-amber-200 pb-2 pt-3">
                    <span className="font-semibold">Pour-Over</span>
                    <span className="text-amber-800 font-bold">1:16 ratio</span>
                  </div>
                  <p className="text-sm text-stone-600">
                    Uses approximately 21g of coffee per 12oz cup. Balanced extraction, ideal for manual brewing methods like Chemex or V60.
                  </p>
                  
                  <div className="flex justify-between items-center border-b border-amber-200 pb-2 pt-3">
                    <span className="font-semibold">Aeropress</span>
                    <span className="text-amber-800 font-bold">1:11 ratio</span>
                  </div>
                  <p className="text-sm text-stone-600">
                    Uses approximately 31g of coffee per 12oz cup. Stronger, more concentrated extraction due to the immersion brewing method.
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-6">
                <h4 className="font-bold text-stone-900 mb-3">Example Calculation:</h4>
                <p className="text-sm leading-relaxed">
                  For a 12oz cup using Pour-Over (1:16 ratio):<br/>
                  12oz water × 28.35g/oz = 340g water<br/>
                  340g water ÷ 16 = <strong>21.25g of coffee beans</strong>
                </p>
              </div>

              <p className="text-sm text-stone-600 italic">
                These ratios are based on Specialty Coffee Association standards and can be adjusted based on personal preference. 
                Our calculator uses these ratios to estimate your monthly coffee bean needs.
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-amber-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-stone-900 mb-4">How It Works</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              A simple three-step process to get premium coffee at wholesale prices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-3xl font-bold mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Purchase Green Beans</h3>
              <p className="text-stone-600 leading-relaxed">
                Buy green (unroasted) coffee beans directly through us. We source high-quality specialty beans 
                and pass the savings directly to you. No markup, no middleman—just the cost of the beans.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-3xl font-bold mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">We Roast Fresh</h3>
              <p className="text-stone-600 leading-relaxed">
                We roast your beans fresh in our Salt Lake City kitchen. Every batch is carefully monitored 
                to bring out the best flavors. You get the expertise of a specialty roaster without the overhead.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-3xl font-bold mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Receive in Bulk</h3>
              <p className="text-stone-600 leading-relaxed">
                Get your roasted coffee delivered in bulk—no individual bags, no labels, no packaging costs. 
                You save on every step, getting retail-quality coffee at wholesale prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Co-Op */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-stone-900">Why Join the Co-Op?</h2>
              <p className="text-xl text-stone-700 leading-relaxed">
                Traditional coffee retail includes costs for individual bags, labels, and packaging. 
                Our co-op model eliminates those costs, passing the savings directly to you.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-800 mt-1"></div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">Wholesale Pricing for Everyone</h3>
                    <p className="text-stone-600">Retail customers get the same pricing as wholesale buyers—no minimum orders required.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-800 mt-1"></div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">No Packaging Overhead</h3>
                    <p className="text-stone-600">Skip the per-bag costs (bags, labels, packaging materials). Bulk delivery means bulk savings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-800 mt-1"></div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">Fresher Coffee</h3>
                    <p className="text-stone-600">Roasted to order means you get the freshest coffee possible, delivered directly to you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-800 mt-1"></div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">Support Local</h3>
                    <p className="text-stone-600">Your purchase directly supports a local Salt Lake City roaster, keeping the community strong.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-800 mt-1"></div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">Perfect for Enthusiasts</h3>
                    <p className="text-stone-600">Ideal for coffee lovers, small businesses, offices, or anyone who goes through coffee regularly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-3xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-stone-900 mb-6">The Math</h3>
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <p className="text-stone-600 mb-2">Traditional Retail Coffee</p>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-700">Coffee beans</span>
                    <span className="font-bold text-stone-900">$X</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-stone-500">
                    <span>+ Bags & labels</span>
                    <span>+$Y</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-stone-500">
                    <span>+ Packaging labor</span>
                    <span>+$Z</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-amber-200">
                    <span className="font-bold text-stone-900">Total per bag</span>
                    <span className="font-bold text-stone-900">$XX</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="text-stone-600 mb-2">Co-Op Program</p>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-700">Green beans</span>
                    <span className="font-bold text-amber-800">$X</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-stone-500">
                    <span>+ Roasting service</span>
                    <span>+$A</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-amber-200">
                    <span className="font-bold text-amber-800">Total (bulk)</span>
                    <span className="font-bold text-amber-800 text-xl">$XX</span>
                  </div>
                  <p className="text-sm text-amber-700 mt-2 font-semibold">Save $Y per pound!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-stone-900 mb-4">Who Is This For?</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              The co-op program is perfect for anyone who wants premium coffee without premium prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Coffee Enthusiasts</h3>
              <p className="text-stone-600 text-sm">Serious coffee drinkers who go through multiple pounds per month</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Small Businesses</h3>
              <p className="text-stone-600 text-sm">Offices, cafes, or shops that need quality coffee without the markup</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Groups & Families</h3>
              <p className="text-stone-600 text-sm">Households or groups that consume coffee regularly and want to save</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Gift Buyers</h3>
              <p className="text-stone-600 text-sm">Looking for unique, high-quality gifts that support local business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Details */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-stone-900 mb-4">The Details</h2>
            <p className="text-xl text-stone-600">Everything you need to know</p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Ordering Process</h3>
              <ul className="space-y-3 text-stone-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Contact us to discuss your coffee needs and preferences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>We'll help you select green beans that match your taste profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Place your order for green beans (minimum quantities may apply)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>We roast your beans fresh and contact you when ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Pick up from our Salt Lake City home or arrange local delivery</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Pricing & Minimums</h3>
              <ul className="space-y-3 text-stone-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Pricing varies by bean origin and quantity—contact us for current rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Minimum orders help ensure we can source quality beans at good prices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Bulk pricing gets better with larger quantities—perfect for regular customers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>No subscription required—order when you need it</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">What You Get</h3>
              <ul className="space-y-3 text-stone-700">
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Fresh roasted coffee delivered in bulk containers (your choice of format)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Roasted to your preferred level (light, medium, dark, or custom)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Expert roasting from a specialty micro-roaster</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-800 font-bold mt-1">•</span>
                  <span>Local pickup or delivery in Salt Lake City area</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-amber-100 to-amber-200">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-stone-900">Ready to Join?</h2>
          <p className="text-xl text-stone-700">
            Get started with the Wildflight Co-Op program today. Contact us to learn more and place your first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="bg-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition-all shadow-lg">
              Get Started
            </a>
            <Link href="/" className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-50 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Link href="/" className="text-2xl font-bold text-white mb-4 block">WILDFLIGHT</Link>
              <p className="text-stone-400">
                Specialty micro-roasted coffee from Salt Lake City, Utah.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/#roasts" className="hover:text-amber-400 transition-colors">Our Roasts</Link></li>
                <li><Link href="/#coop" className="hover:text-amber-400 transition-colors">Co-Op Program</Link></li>
                <li><Link href="/#story" className="hover:text-amber-400 transition-colors">Our Story</Link></li>
                <li><Link href="/#contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center text-stone-500">
            <p>&copy; {new Date().getFullYear()} Wildflight Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

