"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CalculatorModal from "../components/CalculatorModal";

export default function CoOpPage() {
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    zip: "",
    preference: "pickup" as "pickup" | "delivery",
    monthlyUsage: "",
  });

  // Office form state
  const [officeFormData, setOfficeFormData] = useState({
    name: "",
    email: "",
    teamSize: "",
  });
  const [showOfficeForm, setShowOfficeForm] = useState(false);

  // Calculator modal state
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Analytics hook
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "coop_form_submit",
        form_type: "house_coop",
      });
    }
    // TODO: Integrate with backend/signup flow
    alert("Thanks for signing up! We'll be in touch soon.");
    setShowForm(false);
    setFormData({ name: "", email: "", zip: "", preference: "pickup", monthlyUsage: "" });
  };

  const handleOfficeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Analytics hook
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "office_lead_submit",
      });
    }
    // TODO: Integrate with backend/CRM
    alert("Thanks! We'll contact you about setting up an office co-op.");
    setShowOfficeForm(false);
    setOfficeFormData({ name: "", email: "", teamSize: "" });
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
                  Fresh coffee. Roasted once a month. Shared locally.
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed max-w-lg font-medium">
                  House Batch is WildFlight's monthly small-batch roast for locals who want better coffee without subscriptions, shipping, or markup.
                </p>
              </div>
              <div className="flex flex-col gap-6 sm:gap-8 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <button
                    onClick={() => {
                      setShowForm(true);
                      if (typeof window !== "undefined" && (window as any).dataLayer) {
                        (window as any).dataLayer.push({
                          event: "coop_join_click",
                          location: "hero",
                        });
                      }
                      document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-slate-900 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-800 transition-all text-center"
                    data-event="coop_join_click"
                  >
                    Join the next batch
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
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

      {/* Why This Exists */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 sm:mb-12 tracking-tight text-center">Why This Exists</h2>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-10">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0 text-4xl sm:text-5xl">🚫</div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">No shipping costs</h3>
                <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                  No cross-country shipping, no distribution centers, no delivery fees.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0 text-4xl sm:text-5xl">🚫</div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">No packaging waste</h3>
                <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                  No individual bags to design, print, fill, or dispose of.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0 text-4xl sm:text-5xl">🚫</div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">No retail markup</h3>
                <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                  No shelf space costs, no middlemen, no retail markup.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0 text-4xl sm:text-5xl">✓</div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Just fresh coffee</h3>
                <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                  Roasted locally, shared in bulk, delivered fresh—you get better coffee for less.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl text-slate-900 font-bold text-center leading-relaxed">
            You're beating the system. We're just making it possible.
          </p>
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
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12" y2="18.01"/>
                    <path d="M9 6h6M9 10h6"/>
                    <circle cx="15" cy="7" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">Order by Thursday night</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Choose 2, 5, or 10 lbs — no subscription, no commitment.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">2</div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-slate-900">
                    <path d="M8 10c0-2 1.8-4 4-4s4 2 4 4c0 1.2-.8 2.5-1.5 3.5C13.5 14.5 12 16 12 18c0-2-1.5-3.5-2.5-4.5C8.8 12.5 8 11.2 8 10z"/>
                    <path d="M16 10c0 2-1.8 4-4 4s-4-2-4-4c0-1.2.8-2.5 1.5-3.5C10.5 5.5 12 4 12 2c0 2 1.5 3.5 2.5 4.5C15.2 7.5 16 8.8 16 10z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">We roast on the first Saturday</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                One batch. Fresh, intentional, and dialed in.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">3</div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-slate-900">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M13 8H3M17 12H3M9 16H3"/>
                    <circle cx="18" cy="8" r="2" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">You get notified</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                We'll text you when it's ready.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">4</div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-slate-900">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                    <rect x="8" y="6" width="8" height="4" rx="1"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">Pick up locally (or get delivery)</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Free pickup in Salt Lake City, optional local delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* House Batch Program Section */}
      <section id="house-coop" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-8 sm:mb-10 md:mb-12 tracking-tight text-center">House pricing, because this is a shared batch.</h2>
          </div>

          {/* Pricing */}
          <div className="mb-12 sm:mb-16">
            <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed text-center mb-8 sm:mb-10">
              Pricing reflects green coffee costs — no markup, no fluff.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {[
                { size: "2 lbs", price: "$28", perCup: "$0.45", desc: "Perfect if you brew daily at home.", monthly: "2" },
                { size: "5 lbs", price: "$62.50", perCup: "$0.40", desc: "Best value for households or offices.", featured: true, monthly: "5" },
                { size: "10 lbs", price: "$112.50", perCup: "$0.36", desc: "For teams, workplaces, or serious coffee drinkers.", monthly: "10" },
              ].map((tier, i) => (
                <div key={i} className="bg-slate-50 border-2 border-slate-200 p-6 sm:p-8 md:p-10 space-y-4 sm:space-y-6 hover:border-slate-300 transition-colors">
                  {tier.featured && (
                    <div className="bg-slate-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wide px-3 sm:px-4 py-2 inline-block">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">{tier.size}</h4>
                    <div className="mb-2">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">{tier.price}</span>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base font-medium">{tier.perCup} per cup</p>
                  </div>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">{tier.desc}</p>
                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    <p className="text-slate-600 text-sm sm:text-base font-medium">Fresh roasted monthly</p>
                    <p className="text-slate-600 text-sm sm:text-base font-medium">Curated selection</p>
                    <p className="text-slate-600 text-sm sm:text-base font-medium">No subscription</p>
                  </div>
                </div>
              ))}
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

          {/* What You Get */}
          <div className="mb-12 sm:mb-16 space-y-8 sm:space-y-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">What You Get</h3>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Coffee selection</h4>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed mb-4 sm:mb-6">
                    We rotate through coffees we love—seasonal favorites, single origins, and blends that work well. You'll get whatever's featured that month, roasted fresh.
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
                    <strong className="font-black">Roast day:</strong> First Saturday of every month<br/>
                    <strong className="font-black">Order cutoff:</strong> Thursday night<br/>
                    <strong className="font-black">Pickup window:</strong> Saturday–Tuesday
                  </p>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    We'll text you when your coffee is ready (usually Saturday morning). Orders placed by Thursday night are included in that month's roast.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Pickup & delivery</h4>
                  <ul className="text-slate-700 text-base sm:text-lg font-medium space-y-2 sm:space-y-3 leading-relaxed">
                    <li><strong className="font-black">Pickup:</strong> Free from our Salt Lake City home. Available Saturday–Tuesday after roast day. We'll send the address after you join.</li>
                    <li><strong className="font-black">Delivery:</strong> $8 within 10 miles of Salt Lake City, available during the pickup window.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Office Callout */}
          <div className="bg-slate-900 p-6 sm:p-8 md:p-12 text-white">
            <div className="flex items-start justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 uppercase tracking-tight">Buying for a team or office?</h3>
                <p className="text-white/90 text-lg sm:text-xl font-medium leading-relaxed">
                  We can set up custom pricing and larger orders for groups. Perfect for offices, teams, or any group that goes through coffee regularly.
                </p>
              </div>
              <div className="text-4xl sm:text-5xl hidden sm:block">🏢</div>
            </div>

            {!showOfficeForm ? (
              <button
                onClick={() => setShowOfficeForm(true)}
                className="bg-white text-slate-900 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-black uppercase tracking-wide hover:bg-slate-100 transition-colors"
              >
                Get Office Pricing
              </button>
            ) : (
              <form onSubmit={handleOfficeSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={officeFormData.name}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, name: e.target.value })}
                    className="px-4 sm:px-5 py-3 sm:py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-white font-medium text-base"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={officeFormData.email}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, email: e.target.value })}
                    className="px-4 sm:px-5 py-3 sm:py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-white font-medium text-base"
                  />
                  <input
                    type="text"
                    placeholder="Team Size"
                    required
                    value={officeFormData.teamSize}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, teamSize: e.target.value })}
                    className="px-4 sm:px-5 py-3 sm:py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-white font-medium text-base sm:col-span-2 md:col-span-1"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="submit"
                    className="bg-white text-slate-900 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-black uppercase tracking-wide hover:bg-slate-100 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOfficeForm(false)}
                    className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-black uppercase tracking-wide hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
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
            ].map((faq, i) => (
              <div key={i} className="bg-white overflow-hidden border-b-2 border-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors gap-4"
                >
                  <span className="text-base sm:text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight text-left">{faq.q}</span>
                  <span className="text-2xl sm:text-3xl text-slate-900 font-black flex-shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
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

          {showForm ? (
            <form onSubmit={handleJoinSubmit} className="bg-white p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">ZIP Code *</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Pickup or delivery? *</label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preference: "pickup" })}
                    className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 border-2 transition-all font-bold uppercase tracking-wide text-sm sm:text-base ${
                      formData.preference === "pickup"
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                    }`}
                  >
                    Pickup (Free)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preference: "delivery" })}
                    className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 border-2 transition-all font-bold uppercase tracking-wide text-sm sm:text-base ${
                      formData.preference === "delivery"
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-300 text-slate-900 hover:border-slate-900"
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
                  onChange={(e) => setFormData({ ...formData, monthlyUsage: e.target.value })}
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
          ) : (
            <div className="text-center">
              <button
                onClick={() => {
                  setShowForm(true);
                  if (typeof window !== "undefined" && (window as any).dataLayer) {
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
