"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

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

  // Enthusiast calculator state (moved below fold)
  const [cupsPerDay, setCupsPerDay] = useState(0);
  const [ouncesPerCup, setOuncesPerCup] = useState(12);
  const [brewingMethod, setBrewingMethod] = useState("filter");

  // Enthusiast intent to buy state
  const [selectedCompany, setSelectedCompany] = useState<"royal" | "cafe-imports">("royal");
  const [coffeeNameInput, setCoffeeNameInput] = useState("");
  const [submittedCoffee, setSubmittedCoffee] = useState<string | null>(null);
  const [intentCounts, setIntentCounts] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wildflight-intent-counts");
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });

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
    setTimeout(() => setSubmittedCoffee(null), 5000);
  };

  // Coffee consumption calculator (for Enthusiast section)
  const brewingRatios: Record<string, number> = {
    filter: 18,
    "pour-over": 16,
    aeropress: 11,
  };

  const ozToGrams = 28.35;
  const coffeeToWaterRatio = brewingRatios[brewingMethod] || 16;
  const coffeeBeansPerCupGrams = (ouncesPerCup * ozToGrams) / coffeeToWaterRatio;
  const coffeeBeansPerCupOz = coffeeBeansPerCupGrams / ozToGrams;
  const totalDailyOzBeans = cupsPerDay * coffeeBeansPerCupOz;
  const monthlyPounds = ((totalDailyOzBeans * 30) / 16).toFixed(1);

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
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  Coffee co-op
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed max-w-lg font-medium">
                  Get fresh roasted coffee monthly at wholesale prices—no subscription, no commitment. Salt Lake area only.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-900 text-white font-bold uppercase tracking-wide text-xs whitespace-nowrap">
                    Salt Lake area • local pickup (free)
                  </span>
                  <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-200 text-slate-800 font-bold uppercase tracking-wide text-xs">
                    Just in time roasting — we roast only what you order
                  </span>
                </div>
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
                    Get started (local pickup)
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("house-coop")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-white text-slate-900 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-50 transition-all ring-1 ring-slate-300"
                  >
                    See sizes & pricing
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
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">Why This Exists</h2>
          <div className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed space-y-4 sm:space-y-6 font-medium">
            <p>
              Specialty coffee is expensive because of packaging, shipping, distribution, and retail markup. Every bag costs money to design, print, fill, and move across the country.
            </p>
            <p>
              We do it locally in bulk so you pay less and get fresher coffee. No individual bags, no cross-country shipping, no retail shelf time. Just roasted coffee, delivered locally.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-2 sm:mb-4">1</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">Choose how much</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Pick your monthly amount (2, 5, or 10 lbs). We roast each coffee to the level that brings out its best flavor profile. That's it.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-2 sm:mb-4">2</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">We roast on a predictable cadence</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                We roast for the co-op on the first Saturday of every month. Order cutoff is Thursday night. Pickup window: Saturday–Tuesday. You'll get a text when your coffee is ready.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-2 sm:mb-4">3</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">Pick up locally</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Free pickup from our Salt Lake City home, or we can deliver locally for a small fee. Either way, you're supporting a local roaster and getting the freshest coffee possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* House Batch Program Section */}
      <section id="house-coop" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">House Batch Program</h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 max-w-4xl mx-auto font-bold text-center leading-relaxed">
              Monthly batch ordering with curated coffees, always available. We handle sourcing and roasting—you order on roast day and pick it up.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-8 sm:mb-12">
            {[
              { size: "2 lbs/month", price: "$28", perLb: "$14/lb", desc: "For lighter drinkers or trying us out", monthly: "2" },
              { size: "5 lbs/month", price: "$62.50", perLb: "$12.50/lb", desc: "Sweet spot for regular households", featured: true, monthly: "5" },
              { size: "10 lbs/month", price: "$112.50", perLb: "$11.25/lb", desc: "For serious coffee drinkers", monthly: "10" },
            ].map((tier, i) => (
              <div key={i} className="space-y-4 sm:space-y-6">
                {tier.featured && (
                  <div className="bg-slate-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wide px-3 sm:px-4 py-2 inline-block">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">{tier.size}</h3>
                <div>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">{tier.price}</span>
                  <span className="text-slate-600 ml-2 text-base sm:text-lg font-medium">per month · {tier.perLb}</span>
                </div>
                <p className="text-slate-700 text-base sm:text-lg font-medium">{tier.desc}</p>
                <ul className="space-y-2 sm:space-y-3 text-slate-700 text-base sm:text-lg font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-slate-900 font-black text-xl">✓</span>
                    <span>Fresh roasted monthly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-900 font-black text-xl">✓</span>
                    <span>Curated selection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-slate-900 font-black text-xl">✓</span>
                    <span>Roasted to highlight origin flavors</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Pricing Note */}
          <div className="mb-12 sm:mb-16 bg-slate-50 p-6 sm:p-8 border-l-4 border-slate-900">
            <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
              <strong className="font-black text-slate-900">Note on pricing:</strong> Prices may vary month-to-month based on the cost of green coffee beans. We pass through green coffee costs directly—no markup—so you get wholesale pricing that reflects current market rates. You'll see the exact price when you order each month.
            </p>
          </div>

          {/* What You Get */}
          <div className="mb-12 sm:mb-16 space-y-8 sm:space-y-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">What You Get</h3>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Coffee selection</h4>
                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    We rotate through coffees we love—seasonal favorites, single origins, and blends that work well. You'll get whatever's featured that month, roasted fresh.
                  </p>
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
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 font-bold text-center leading-relaxed">
              If you drink 3-4 cups per day, you'll likely save about $300-400 per year vs buying retail bags
            </p>
          </div>

          <div className="space-y-6 sm:space-y-10">
            <div className="pb-6 sm:pb-10 border-b-2 border-slate-200">
              <p className="text-slate-700 mb-4 sm:mb-6 text-lg sm:text-xl font-bold">The waste we remove:</p>
              <ul className="space-y-2 sm:space-y-3 text-slate-700 text-base sm:text-lg font-medium">
                <li>• Individual bags and labels</li>
                <li>• Packaging and shipping costs</li>
                <li>• Retail markup and shelf time</li>
                <li>• Cross-country distribution</li>
              </ul>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-slate-900 text-lg sm:text-xl font-medium leading-relaxed">
                That's how we keep prices lower. We're not cutting quality—we're cutting the stuff that doesn't add value to your coffee experience.
              </p>
              <p className="text-slate-600 text-base sm:text-lg font-medium">
                Example: 5 lbs/month at House Batch Program = $62.50. Same amount in retail bags (roughly 6-7 bags) = $108-126/month. Over a year, that's about $550-750 in savings.
              </p>
            </div>
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

      {/* Enthusiast Co-Op Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">Enthusiast Co-Op</h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 max-w-4xl mx-auto font-bold text-center leading-relaxed mb-6 sm:mb-8 md:mb-10">
              For advanced coffee lovers who want to source specific coffees and participate in group buys. This is optional and requires more involvement.
            </p>
            <div className="text-center">
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      event: "enthusiast_explore_click",
                    });
                  }
                  document.getElementById("enthusiast-details")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-slate-900 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-black uppercase tracking-wide hover:bg-slate-50 transition-colors ring-1 ring-slate-300"
                data-event="enthusiast_explore_click"
              >
                Explore Enthusiast Co-Op
              </button>
            </div>
          </div>

          <div id="enthusiast-details" className="space-y-12 sm:space-y-16">
            {/* Green Coffee Explanation */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">About green coffee and group buys</h3>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                <p>
                  Green coffee beans are unroasted coffee seeds. In the Enthusiast Co-Op, you can browse offerings from trusted importers and suggest specific coffees you want us to source.
                </p>
                <p>
                  When we get 3 commitments for a particular coffee, we order it and roast it fresh for everyone. This gives you more control over the exact coffees you receive, but requires a group commitment to trigger ordering.
                </p>
              </div>
            </div>

            {/* Coffee Consumption Calculator (Advanced) */}
            <div className="space-y-8 sm:space-y-10">
              <div className="text-center">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 sm:mb-6 uppercase tracking-tight">Coffee consumption calculator</h3>
                <p className="text-lg sm:text-xl text-slate-700 font-medium">
                  Calculate your monthly coffee needs based on your brewing habits
                </p>
              </div>

              <div className="space-y-8 sm:space-y-10">
                <div>
                  <label className="block text-lg sm:text-xl font-black text-slate-900 mb-4 sm:mb-6 text-center uppercase tracking-tight">
                    What brewing method do you use?
                  </label>
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    {[
                      { id: "filter", label: "Filter/Drip" },
                      { id: "pour-over", label: "Pour-Over" },
                      { id: "aeropress", label: "Aeropress" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setBrewingMethod(method.id)}
                        className={`px-6 sm:px-8 py-3 sm:py-4 border-2 transition-all font-bold uppercase tracking-wide text-sm sm:text-base ${
                          brewingMethod === method.id
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-black text-slate-900 mb-4 sm:mb-6 text-center uppercase tracking-tight">
                    Cup size (ounces)?
                  </label>
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    {[6, 8, 12, 16, 20].map((oz) => (
                      <button
                        key={oz}
                        onClick={() => setOuncesPerCup(oz)}
                        className={`px-6 sm:px-8 py-3 sm:py-4 border-2 transition-all font-bold text-sm sm:text-base ${
                          ouncesPerCup === oz
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                        }`}
                      >
                        {oz} oz
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg sm:text-xl font-black text-slate-900 mb-4 sm:mb-6 text-center uppercase tracking-tight">
                    Cups per day?
                  </label>
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCupsPerDay(num)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 border-2 transition-all flex items-center justify-center font-black text-base sm:text-lg ${
                          cupsPerDay === num
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {cupsPerDay > 0 && (
                  <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t-2 border-slate-200 text-center">
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Your monthly coffee needs</h4>
                    <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-3 sm:mb-4">{monthlyPounds} lbs</p>
                    <p className="text-slate-600 text-base sm:text-lg font-medium">
                      Based on {cupsPerDay} {cupsPerDay === 1 ? "cup" : "cups"} of {ouncesPerCup}oz coffee per day
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Browse Green Coffee */}
            <div className="space-y-8 sm:space-y-10">
              <div className="text-center">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 sm:mb-6 uppercase tracking-tight">Browse green coffee offerings</h3>
                <p className="text-lg sm:text-xl text-slate-700 font-medium">
                  We source from trusted importers. Browse their offerings to find beans you'd like us to roast.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <a
                  href="https://bodega.coffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-100 p-6 sm:p-8 border-2 border-slate-300 hover:border-slate-900 transition-all text-center"
                >
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Cafe Imports</h4>
                  <p className="text-slate-700 font-bold mb-2 sm:mb-3 text-sm sm:text-base">Bodega Program</p>
                  <p className="text-slate-600 font-medium text-sm sm:text-base">Browse green coffee offerings →</p>
                </a>

                <a
                  href="https://royalcoffee.com/crown-jewels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-100 p-6 sm:p-8 border-2 border-slate-300 hover:border-slate-900 transition-all text-center"
                >
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Royal Coffee</h4>
                  <p className="text-slate-700 font-bold mb-2 sm:mb-3 text-sm sm:text-base">Crown Jewels Program</p>
                  <p className="text-slate-600 font-medium text-sm sm:text-base">Browse green coffee offerings →</p>
                </a>
              </div>

              {/* Intent to Buy Form */}
              <div className="bg-slate-100 p-6 sm:p-8 space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Enter your intent to buy</h4>
                  <p className="text-slate-700 text-base sm:text-lg font-medium">
                    Found a coffee you want? Enter the coffee name. We need 3 commitments before we order and roast.
                  </p>
                </div>

                <form onSubmit={handleIntentSubmit} className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedCompany("royal")}
                      className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 transition-all font-bold uppercase tracking-wide text-sm sm:text-base ${
                        selectedCompany === "royal"
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-white border-slate-300 text-slate-900"
                      }`}
                    >
                      Royal Coffee
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCompany("cafe-imports")}
                      className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 transition-all font-bold uppercase tracking-wide text-sm sm:text-base ${
                        selectedCompany === "cafe-imports"
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-white border-slate-300 text-slate-900"
                      }`}
                    >
                      Cafe Imports
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <input
                      type="text"
                      value={coffeeNameInput}
                      onChange={(e) => setCoffeeNameInput(e.target.value)}
                      placeholder="Enter coffee name from importer website"
                      className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 text-white px-8 sm:px-10 py-3 sm:py-4 font-black uppercase tracking-wide hover:bg-slate-800 transition-colors text-sm sm:text-base"
                    >
                      Submit Intent
                    </button>
                  </div>
                </form>

                {submittedCoffee && (
                  <div className="p-4 sm:p-6 bg-white border-2 border-slate-900">
                    <p className="text-slate-900 font-black text-base sm:text-lg">
                      ✓ Added to intent list! Current commitments: {intentCounts[submittedCoffee]} / 3 needed
                    </p>
                  </div>
                )}
              </div>
            </div>
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
    </div>
  );
}
