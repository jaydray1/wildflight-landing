"use client";

import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CalculatorModal from "../components/CalculatorModal";

export default function CoOpPage() {
  // Form states
  const [showForm,setShowForm]=useState(false);
  const [formData,setFormData]=useState({
    name: "",
    email: "",
    zip: "",
    preference: "pickup" as "pickup"|"delivery",
    monthlyUsage: "",
  });

  // Calculator modal state
  const [showCalculatorModal,setShowCalculatorModal]=useState(false);

  // FAQ accordion state
  const [openFaq,setOpenFaq]=useState<number|null>(null);

  const handleJoinSubmit=(e: React.FormEvent) => {
    e.preventDefault();
    // Analytics hook
    if (typeof window!=="undefined"&&(window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "coop_form_submit",
        form_type: "house_coop",
      });
    }
    // TODO: Integrate with backend/signup flow
    alert("Thanks for signing up! We'll be in touch soon.");
    setShowForm(false);
    setFormData({name: "",email: "",zip: "",preference: "pickup",monthlyUsage: ""});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-40 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              <div className="space-y-6 sm:space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  Fresh Coffee. Zero Waste. No Retail Markup.
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed max-w-lg font-medium">
                  High-end specialty coffee delivered in reusable glass/steel canisters. Join the Salt Lake collective beating the grocery store system.
                </p>
              </div>
              <div className="flex flex-col gap-6 sm:gap-8 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <button
                    onClick={() => {
                      setShowForm(true);
                      if (typeof window!=="undefined"&&(window as any).dataLayer) {
                        (window as any).dataLayer.push({
                          event: "coop_join_click",
                          location: "hero",
                        });
                      }
                      document.getElementById("join-form")?.scrollIntoView({behavior: "smooth"});
                    }}
                    className="bg-slate-900 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-800 transition-all text-center"
                    data-event="coop_join_click"
                  >
                    Join the next batch
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("how-it-works")?.scrollIntoView({behavior: "smooth"});
                    }}
                    className="bg-white text-slate-900 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-50 transition-all ring-1 ring-slate-300"
                  >
                    How it works
                  </button>
                </div>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/coffee-hero.jpg"
                  alt="Coffee beans and brewing equipment"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem (The "Bag" Issue) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/clutter-bags.png"
                alt="Cluttered drawer of half-empty coffee bags"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">The Problem</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-900 font-bold leading-relaxed">
                Standard coffee bags are designed for global logistics, not a local community. They create unnecessary costs, physical waste in your home, and a barrier between the roaster and the drinker.
              </p>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Production Overhead</h3>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    Every bag requires its own manufacturing, labeling, and bagging labor. This "packaging tax" is built into the price of every pound, even though it adds nothing to the quality of the coffee.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">The Disposal Cycle</h3>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    Even "recyclable" or "compostable" bags contribute to a constant cycle of waste in your kitchen. It's a recurring physical footprint that we can eliminate by simply using a permanent container.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">A Disconnected System</h3>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    Grocery store bags are built to sit on a shelf for months. In a local model, that extra packaging is just an expensive middleman between the Saturday roast and your morning cup.
                  </p>
                </div>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-900 font-bold leading-relaxed pt-4 border-t-2 border-slate-200">
                By moving away from single-use bags in House Batch, we lower the overhead and keep the focus on the coffee and the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution (The Canister Integration) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">The Solution</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-900 font-bold leading-relaxed">
                The House Vault is our solution to the "bag drawer" problem. By moving away from the "roast, bag, toss" cycle, we've created a permanent, beautiful canister that looks better on your counter and keeps beans fresh for the long haul.
              </p>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">A Smaller Physical Footprint</h3>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    Unlike flimsy bags that clutter your pantry, the Vault sits cleanly next to your brewer. It's a "closed-loop" system—bring it back, fill it up, and eliminate the physical waste in your kitchen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Cutting the Overhead</h3>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    Every bag of coffee requires labor, additional manufacturing steps, and specialized packaging. By killing the bagging process, we remove those hidden costs and pass the savings directly to you.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Built for your Routine</h3>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    No more crumpled bags or stale beans. The Vault's airtight seal preserves vibrancy far longer than a standard bag, ensuring your last cup of the month is as good as the first.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-slate-200">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">How it works</h3>
                <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                  Choose your size, get your Vault on day one, and bring it back to our SLC home for the monthly swap.
                </p>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/vault-1.png"
                alt="House Vault canister showing air-tight seal and aesthetic"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">How House Batch works</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">1</div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-slate-900">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12" y2="18.01" />
                    <path d="M9 6h6M9 10h6" />
                    <circle cx="15" cy="7" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">Select Your Size</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Choose 2lb, 5lb, or 10lb.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">2</div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-slate-900">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">Get Your Vault</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                On your first order, you'll receive your permanent House Vault(s) with your Vault setup.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">3</div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-slate-900">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">The Monthly Swap</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-2">
                Every first Saturday, bring your clean, empty vault to our SLC home. We fill it fresh from the batch.
              </p>
              <p className="text-slate-500 text-sm sm:text-base font-medium italic">
                Just bring your rinsed vault back—we'll take care of the rest.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">4</div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-slate-900">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">Repeat & Save</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                No shipping, no bags, just specialty coffee at wholesale pricing. Monthly costs drop after your Vault setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* House Batch Program Section */}
      <section id="house-coop" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* What You Get */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">What You Get</h2>
          </div>
          <div className="mb-12 sm:mb-16 space-y-8 sm:space-y-12">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Coffee selection</h4>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed mb-4 sm:mb-6">
                    We rotate through coffees we love—The Monthly Roast, single origins, and blends that work well. You'll get whatever's featured that month, roasted fresh.
                  </p>
                  <div className="bg-slate-100 p-4 sm:p-5 border-l-4 border-slate-900">
                    <p className="text-slate-900 text-sm sm:text-base font-black uppercase tracking-wide mb-3 sm:mb-4">Past roasts</p>
                    <ul className="text-slate-900 text-base sm:text-lg font-bold leading-relaxed space-y-2">
                      <li>Nov: Ethiopia Yirgacheffe</li>
                      <li>Oct: Colombian Huila</li>
                      <li>Sep: Guatemala Antigua</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Roast level</h4>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    We roast each coffee to the level that best brings out its local flavor profile. We don't choose beans for dark roasts in the batch program—dark roasts are available in our retail offerings. Our focus is on highlighting the unique characteristics of each origin.
                  </p>
                </div>
              </div>
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Fulfillment</h4>
                  <p className="text-slate-700 text-base sm:text-lg font-medium mb-4 sm:mb-6 leading-relaxed">
                    <strong className="font-black">Roast day:</strong> First Saturday of every month<br />
                    <strong className="font-black">Order cutoff:</strong> Thursday night<br />
                    <strong className="font-black">The Swap Window:</strong> Saturday–Tuesday
                  </p>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    We'll text you when your coffee is ready (usually Saturday morning). Orders placed by Thursday night are included in that month's roast.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Pickup & delivery</h4>
                  <ul className="text-slate-700 text-base sm:text-lg font-medium space-y-2 sm:space-y-3 leading-relaxed">
                    <li><strong className="font-black">Pickup:</strong> Free from our Salt Lake City home. Available Saturday–Tuesday after roast day. We'll send the address after you join.</li>
                    <li><strong className="font-black">Delivery:</strong> $8 within 10 miles of Salt Lake City, available during The Swap Window.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Vault Validation Micro-Section */}
          <div className="mb-8 sm:mb-10 text-center">
            <p className="text-lg sm:text-xl text-slate-900 font-bold leading-relaxed">
              Ready to join? Select your supply below. Your first month includes your permanent House Vault setup so we can kill the bag for good.
            </p>
          </div>

          {/* Pricing */}
          <div className="mb-12 sm:mb-16">
            <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed text-center mb-8 sm:mb-10">
              Pricing reflects green coffee costs — no markup, no fluff.
            </p>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {[
                {
                  name: "The Starter",
                  size: "2 lbs",
                  bestFor: "Daily home brewing",
                  monthlyRoast: "$28",
                  vaultSetup: "$20",
                  savings: null,
                  vault: "1x House Vault",
                  monthlyHook: "$28/mo after your permanent Vault is on your counter.",
                  featured: false
                },
                {
                  name: "The Stockpile",
                  size: "5 lbs",
                  bestFor: "Families & heavy drinkers",
                  monthlyRoast: "$62.50",
                  vaultSetup: "$35",
                  savings: "$5",
                  vault: "2x House Vaults",
                  monthlyHook: "$62.50/mo. Kill the bag tax and save $5 on your Vault setup.",
                  featured: true
                },
                {
                  name: "The Office",
                  size: "10 lbs",
                  bestFor: "Teams & shared spaces",
                  monthlyRoast: "$112.50",
                  vaultSetup: "$60",
                  savings: "$20",
                  vault: "4x House Vaults",
                  vaultDescription: "Perfect for rotating through different office breakrooms or kitchen stations.",
                  monthlyHook: "$112.50/mo. Professional-grade supply with a $20 savings on your Vault fleet.",
                  featured: false
                },
              ].map((tier,i) => {
                const monthlyPrice=parseFloat(tier.monthlyRoast.replace('$',''));
                const setupPrice=parseFloat(tier.vaultSetup.replace('$',''));
                const firstMonthTotal=monthlyPrice+setupPrice;
                return (
                  <div key={i} className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-8 md:p-10 space-y-5 sm:space-y-6 hover:border-slate-300 transition-colors">
                    {tier.featured&&(
                      <div className="bg-slate-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wide px-3 sm:px-4 py-2 inline-block">
                        Most Popular
                      </div>
                    )}
                    <div>
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">{tier.name}</h4>
                      <p className="text-slate-600 text-base sm:text-lg font-medium mb-6">{tier.size} • {tier.bestFor}</p>

                      {/* Headline: First Month Total */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900">${firstMonthTotal.toFixed(2)}</span>
                          <span className="text-lg sm:text-xl font-bold text-slate-700">Start-up</span>
                          <span className="text-lg text-green-600 ml-2">🌱</span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                          Includes your initial Vault setup. Subsequent months drop to {tier.monthlyRoast}/mo as we cut out the packaging and labor overhead.
                        </p>
                      </div>

                      {/* Happy Number: Monthly Price */}
                      <div className="bg-green-50 border-2 border-green-200 p-4 sm:p-5 mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs sm:text-sm font-bold text-green-800 uppercase tracking-wide">Your Monthly Price</span>
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-green-900">{tier.monthlyRoast}<span className="text-lg sm:text-xl font-bold text-green-700">/mo</span></div>
                        <p className="text-xs sm:text-sm text-green-700 font-medium mt-1">{tier.monthlyHook}</p>
                      </div>

                      {/* Vault Setup Details (softened) */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm sm:text-base text-slate-500 font-medium">Monthly roast:</span>
                          <span className="text-base sm:text-lg text-slate-700 font-medium">{tier.monthlyRoast}</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm sm:text-base text-slate-500 font-medium">Vault Setup (one-time):</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-base sm:text-lg text-slate-500 font-medium">{tier.vaultSetup}</span>
                            {tier.savings&&(
                              <span className="text-xs sm:text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">Save {tier.savings}!</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Vault Info */}
                      <div className="pt-4 border-t border-slate-200 space-y-2">
                        <p className="text-slate-700 text-base sm:text-lg font-bold">{tier.vault}</p>
                        {tier.vaultDescription&&(
                          <p className="text-slate-600 text-sm sm:text-base font-medium italic">{tier.vaultDescription}</p>
                        )}
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0">
                            <Image
                              src="/images/vault-1.png"
                              alt="House Vault canister"
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <span className="text-xs sm:text-sm text-slate-500 font-medium">Premium permanent system</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <button
                onClick={() => setShowCalculatorModal(true)}
                className="text-slate-700 hover:text-slate-900 text-base sm:text-lg font-medium underline underline-offset-4 transition-colors"
              >
                Not sure which size? Calculate your monthly needs →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Community / Local Relationship */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">A Local Thing</h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 max-w-4xl mx-auto font-bold text-center leading-relaxed">
              It's monthly batch ordering—a small group of people in Salt Lake who appreciate good coffee and supporting local craft. Order on each roast day when you want coffee.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8 text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
            <p>
              We're a small roaster. When you pick up your coffee, you'll be picking it up from our home. You'll meet us, see where we roast, and become part of a small community of people who care about quality coffee.
            </p>
            <p>
              Pickup day is the community moment—meet the roaster, swap brew tips, and grab your month's coffee. It's often a quick chat about coffee, maybe trying a new roast, or just grabbing your bag and heading out. No pressure, no performance—just good coffee and a real connection.
            </p>
            <p>
              By keeping it local, we keep costs down and relationships real. Shipping would eat into the savings and turn this into just another transaction. We're intentionally small, intentionally local, and intentionally focused on doing one thing well.
            </p>
          </div>
        </div>
      </section>

      {/* Savings */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">The Math</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 sm:mb-6">Retail Shop</h3>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">$18-22/bag</p>
            </div>
            <div className="bg-slate-900 border-2 border-slate-900 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-4 sm:mb-6">House Batch</h3>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white">$14/lb</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
              You save $400/year.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">Common Questions</h2>
          </div>

          <div className="space-y-2 sm:space-y-4">
            {[
              {
                q: "Do I have to commit to anything?",
                a: "No. It's monthly batch ordering—you order on roast day when you want coffee. You can skip any month by not placing an order, or cancel anytime. No penalties, no hassle.",
              },
              {
                q: "Do prices change?",
                a: "Prices may vary month-to-month based on the cost of green coffee beans. We pass through green coffee costs directly with no markup, so you get wholesale pricing that reflects current market rates. You'll see the exact price for each month when you order.",
              },
              {
                q: "What if I don't like a coffee?",
                a: "Let us know. We want you to love your coffee. If something doesn't work for you, we'll work with you to find a better match or make it right.",
              },
              {
                q: "How fresh is it?",
                a: "We roast on the first Saturday of every month. You'll get coffee that was roasted that same weekend—far fresher than anything on a grocery store shelf.",
              },
              {
                q: "What roast level do you use?",
                a: "We roast each coffee to the level that best brings out its local flavor profile. We don't use dark roasts in the batch program—those are available in our retail offerings. Our focus is on highlighting the unique origin characteristics of each coffee.",
              },
              {
                q: "Where is pickup?",
                a: "Our home in Salt Lake City. We'll send you the address after you join. It's a quick, friendly pickup—no retail space, just good coffee.",
              },
              {
                q: "What's your delivery area?",
                a: "Within 10 miles of Salt Lake City. If you're outside that, pickup is always free. Delivery costs $8 and is available during the pickup window (Saturday–Tuesday after roast day).",
              },
              {
                q: "Can I pause or skip a month?",
                a: "Absolutely. Just don't place an order for that month. No questions asked, no penalties. You're in control.",
              },
            ].map((faq,i) => (
              <div key={i} className="bg-white overflow-hidden border-b-2 border-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq===i? null:i)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors gap-4"
                >
                  <span className="text-base sm:text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight text-left">{faq.q}</span>
                  <span className="text-2xl sm:text-3xl text-slate-900 font-black flex-shrink-0">{openFaq===i? "−":"+"}</span>
                </button>
                {openFaq===i&&(
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-slate-700 text-base sm:text-lg font-medium leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + Intake Form */}
      <section id="join-form" className="py-20 sm:py-32 md:py-40 px-4 sm:px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-indigo-950/20"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 md:mb-8 uppercase tracking-tight">Ready to get started?</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-bold mb-3 sm:mb-4">
              Fill out the form below and we'll get you set up with House Batch Program
            </p>
            <p className="text-slate-400 text-base sm:text-lg font-medium">
              Salt Lake area only. Local pickup is free, and it keeps this community real.
            </p>
          </div>

          {showForm? (
            <form onSubmit={handleJoinSubmit} className="bg-white p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData,name: e.target.value})}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData,email: e.target.value})}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">ZIP Code *</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({...formData,zip: e.target.value})}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Pickup or delivery? *</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData,preference: "pickup"})}
                    className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 border-2 transition-all font-bold uppercase tracking-wide text-sm sm:text-base ${formData.preference==="pickup"
                      ? "bg-slate-900 border-slate-900 text-white"
                      :"bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                      }`}
                  >
                    Pickup (Free)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData,preference: "delivery"})}
                    className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 border-2 transition-all font-bold uppercase tracking-wide text-sm sm:text-base ${formData.preference==="delivery"
                      ? "bg-slate-900 border-slate-900 text-white"
                      :"bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                      }`}
                  >
                    Delivery ($8)
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3 font-medium">Delivery available within 10 miles of Salt Lake City</p>
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">
                  Estimated monthly coffee usage (lbs)
                </label>
                <input
                  type="text"
                  value={formData.monthlyUsage}
                  onChange={(e) => setFormData({...formData,monthlyUsage: e.target.value})}
                  placeholder="e.g., 2, 5, or 10"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-black uppercase tracking-wide hover:bg-slate-800 transition-colors"
              >
                Get started
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full border-2 border-slate-900 text-slate-900 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-black uppercase tracking-wide hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </form>
          ):(
            <div className="text-center">
              <button
                onClick={() => {
                  setShowForm(true);
                  if (typeof window!=="undefined"&&(window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: "coop_join_click",
                      location: "final_cta",
                    });
                  }
                }}
                className="bg-white text-slate-900 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-100 transition-all"
                data-event="coop_join_click"
              >
                Get started (local pickup)
              </button>
              <p className="mt-4 sm:mt-6 text-slate-400 text-base sm:text-lg font-medium">
                Click the button above to get started
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <CalculatorModal isOpen={showCalculatorModal} onClose={() => setShowCalculatorModal(false)} />
    </div>
  );
}
