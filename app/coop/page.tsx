"use client";

import Link from "next/link";
import { useState } from "react";

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
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold text-stone-900 leading-tight">
            A local coffee co-op for people who drink a lot of good coffee
          </h1>
          <div className="flex flex-col items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-stone-800 font-medium">
              Salt Lake area • pickup-first (free)
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-stone-700 font-medium text-sm">
              Monthly batch ordering — order by Thursday, pickup Saturday–Tuesday
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 text-xl text-stone-700">
            <div className="flex items-center gap-2">
              <span className="text-amber-800">✓</span>
              <span>Fresh roasted monthly, straight from our kitchen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-800">✓</span>
              <span>Lower cost via bulk buying—no retail overhead, no shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-800">✓</span>
              <span>A real relationship with your local roaster</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                className="bg-amber-800 text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-amber-900 transition-all shadow-lg transform hover:scale-105"
                data-event="coop_join_click"
              >
                Get started (local pickup)
              </button>
              <button
                onClick={() => {
                  document.getElementById("house-coop")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border-2 border-amber-800 text-amber-800 px-12 py-5 rounded-full text-xl font-semibold hover:bg-amber-50 transition-all"
              >
                See sizes & pricing
              </button>
            </div>
            <p className="text-stone-600 text-lg">
              2 minutes • monthly batch ordering • pickup is free
            </p>
            <p className="text-sm text-stone-500 max-w-xl mx-auto">
              Salt Lake area only. We keep it local—shipping would destroy both the savings and the community vibe.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-stone-900">Why This Exists</h2>
          <div className="text-lg text-stone-700 leading-relaxed space-y-4">
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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 text-center">Choose how much + roast preference</h3>
              <p className="text-stone-600 leading-relaxed text-center">
                Pick your monthly amount (2, 5, or 10 lbs) and tell us your preferred roast level—light, medium, or dark. That's it.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 text-center">We roast on a predictable cadence</h3>
              <p className="text-stone-600 leading-relaxed text-center">
                We roast for the co-op on the first Saturday of every month. Order cutoff is Thursday night. Pickup window: Saturday–Tuesday. You'll get a text when your coffee is ready.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="w-16 h-16 rounded-full bg-amber-800 text-white flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4 text-center">Pick up locally</h3>
              <p className="text-stone-600 leading-relaxed text-center">
                Free pickup from our Salt Lake City home, or we can deliver locally for a small fee. Either way, you're supporting a local roaster and getting the freshest coffee possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* House Batch Program Section */}
      <section id="house-coop" className="py-20 px-6 bg-amber-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-stone-900 mb-4">House Batch Program</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Monthly batch ordering with curated coffees, always available. We handle sourcing and roasting—you order on roast day and pick it up.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { size: "2 lbs/month", price: "$28", perLb: "$14/lb", desc: "For lighter drinkers or trying us out", monthly: "2" },
              { size: "5 lbs/month", price: "$62.50", perLb: "$12.50/lb", desc: "Sweet spot for regular households", featured: true, monthly: "5" },
              { size: "10 lbs/month", price: "$112.50", perLb: "$11.25/lb", desc: "For serious coffee drinkers", monthly: "10" },
            ].map((tier, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${
                  tier.featured ? "border-amber-800 scale-105" : "border-amber-200"
                }`}
              >
                {tier.featured && (
                  <div className="bg-amber-800 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-3xl font-bold text-stone-900 mb-2">{tier.size}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-amber-800">{tier.price}</span>
                  <span className="text-stone-600 ml-2">per month · {tier.perLb}</span>
                </div>
                <p className="text-stone-600 mb-6">{tier.desc}</p>
                <ul className="space-y-2 text-stone-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800">✓</span>
                    <span>Fresh roasted monthly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800">✓</span>
                    <span>Curated selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-800">✓</span>
                    <span>Your roast level</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* What You Get */}
          <div className="bg-white rounded-2xl p-8 mb-12 border border-amber-100">
            <h3 className="text-2xl font-bold text-stone-900 mb-6">What You Get</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-stone-900 mb-3">Coffee selection</h4>
                <p className="text-stone-700 mb-6">
                  We rotate through coffees we love—seasonal favorites, single origins, and blends that work well. You'll get whatever's featured that month, roasted fresh.
                </p>
                <h4 className="font-bold text-stone-900 mb-3">Roast level</h4>
                <p className="text-stone-700">
                  Light, medium, or dark—your choice. Tell us once, and we'll remember it. Want to change it? Just let us know.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-3">Fulfillment</h4>
                <p className="text-stone-700 mb-4">
                  <strong>Roast day:</strong> First Saturday of every month<br/>
                  <strong>Order cutoff:</strong> Thursday night<br/>
                  <strong>Pickup window:</strong> Saturday–Tuesday
                </p>
                <p className="text-stone-700 mb-6">
                  We'll text you when your coffee is ready (usually Saturday morning). Orders placed by Thursday night are included in that month's roast.
                </p>
                <h4 className="font-bold text-stone-900 mb-3">Pickup & delivery</h4>
                <ul className="text-stone-700 space-y-2">
                  <li>• <strong>Pickup:</strong> Free from our Salt Lake City home. Available Saturday–Tuesday after roast day. We'll send the address after you join.</li>
                  <li>• <strong>Delivery:</strong> $8 within 10 miles of Salt Lake City, available during the pickup window.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Office Callout */}
          <div className="bg-stone-900 rounded-2xl p-8 text-white">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3">Buying for a team or office?</h3>
                <p className="text-stone-300 text-lg">
                  We can set up custom pricing and larger orders for groups. Perfect for offices, teams, or any group that goes through coffee regularly.
                </p>
              </div>
              <div className="text-5xl">🏢</div>
            </div>

            {!showOfficeForm ? (
              <button
                onClick={() => setShowOfficeForm(true)}
                className="bg-amber-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-900 transition-colors"
              >
                Get Office Pricing
              </button>
            ) : (
              <form onSubmit={handleOfficeSubmit} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={officeFormData.name}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, name: e.target.value })}
                    className="px-4 py-3 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={officeFormData.email}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, email: e.target.value })}
                    className="px-4 py-3 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Team Size"
                    required
                    value={officeFormData.teamSize}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, teamSize: e.target.value })}
                    className="px-4 py-3 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-amber-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOfficeForm(false)}
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">A Local Thing</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              It's monthly batch ordering—a small group of people in Salt Lake who appreciate good coffee and supporting local craft. Order on each roast day when you want coffee.
            </p>
          </div>

          <div className="space-y-6 text-lg text-stone-700 leading-relaxed">
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
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">The Math</h2>
            <p className="text-xl text-stone-600">
              If you drink 3-4 cups per day, you'll likely save about $300-400 per year vs buying retail bags
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200">
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-6">
                <p className="text-stone-600 mb-4">The waste we remove:</p>
                <ul className="space-y-2 text-stone-700">
                  <li>• Individual bags and labels</li>
                  <li>• Packaging and shipping costs</li>
                  <li>• Retail markup and shelf time</li>
                  <li>• Cross-country distribution</li>
                </ul>
              </div>
              <div>
                <p className="text-stone-700 mb-2">
                  That's how we keep prices lower. We're not cutting quality—we're cutting the stuff that doesn't add value to your coffee experience.
                </p>
                <p className="text-stone-600 text-sm">
                  Example: 5 lbs/month at House Batch Program = $62.50. Same amount in retail bags (roughly 6-7 bags) = $108-126/month. Over a year, that's about $550-750 in savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do I have to commit to anything?",
                a: "No. It's monthly batch ordering—you order on roast day when you want coffee. You can skip any month by not placing an order, or cancel anytime. No penalties, no hassle.",
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
                q: "What roast levels can I choose?",
                a: "Light, medium, or dark. Tell us your preference when you join, and we'll roast to that level every month. You can change it anytime.",
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
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-amber-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-stone-900">{faq.q}</span>
                  <span className="text-2xl text-amber-800">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-stone-700 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enthusiast Co-Op Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Enthusiast Co-Op</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-6">
              For advanced coffee lovers who want to source specific coffees and participate in group buys. This is optional and requires more involvement.
            </p>
            <button
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    event: "enthusiast_explore_click",
                  });
                }
                document.getElementById("enthusiast-details")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition-colors"
              data-event="enthusiast_explore_click"
            >
              Explore Enthusiast Co-Op
            </button>
          </div>

          <div id="enthusiast-details" className="space-y-12">
            {/* Green Coffee Explanation */}
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">About green coffee and group buys</h3>
              <p className="text-stone-700 leading-relaxed mb-4">
                Green coffee beans are unroasted coffee seeds. In the Enthusiast Co-Op, you can browse offerings from trusted importers and suggest specific coffees you want us to source.
              </p>
              <p className="text-stone-700 leading-relaxed">
                When we get 3 commitments for a particular coffee, we order it and roast it fresh for everyone. This gives you more control over the exact coffees you receive, but requires a group commitment to trigger ordering.
              </p>
            </div>

            {/* Coffee Consumption Calculator (Advanced) */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <h3 className="text-2xl font-bold text-stone-900 mb-6 text-center">Coffee consumption calculator</h3>
              <p className="text-center text-stone-600 mb-8">
                Calculate your monthly coffee needs based on your brewing habits
              </p>

              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-stone-900 mb-4 text-center">
                    What brewing method do you use?
                  </label>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {[
                      { id: "filter", label: "Filter/Drip" },
                      { id: "pour-over", label: "Pour-Over" },
                      { id: "aeropress", label: "Aeropress" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setBrewingMethod(method.id)}
                        className={`px-6 py-4 rounded-xl border-2 transition-all ${
                          brewingMethod === method.id
                            ? "bg-amber-800 border-amber-800 text-white"
                            : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                        }`}
                      >
                        <span className="font-semibold">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-stone-900 mb-4 text-center">
                    Cup size (ounces)?
                  </label>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {[6, 8, 12, 16, 20].map((oz) => (
                      <button
                        key={oz}
                        onClick={() => setOuncesPerCup(oz)}
                        className={`px-6 py-3 rounded-xl border-2 transition-all ${
                          ouncesPerCup === oz
                            ? "bg-amber-800 border-amber-800 text-white"
                            : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                        }`}
                      >
                        {oz} oz
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-stone-900 mb-4 text-center">
                    Cups per day?
                  </label>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCupsPerDay(num)}
                        className={`w-16 h-16 rounded-xl border-2 transition-all flex items-center justify-center ${
                          cupsPerDay === num
                            ? "bg-amber-800 border-amber-800 text-white"
                            : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {cupsPerDay > 0 && (
                  <div className="mt-8 pt-8 border-t-2 border-amber-200 text-center">
                    <h4 className="text-xl font-bold text-stone-900 mb-4">Your monthly coffee needs</h4>
                    <p className="text-3xl font-bold text-amber-800 mb-2">{monthlyPounds} lbs</p>
                    <p className="text-stone-600">
                      Based on {cupsPerDay} {cupsPerDay === 1 ? "cup" : "cups"} of {ouncesPerCup}oz coffee per day
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Browse Green Coffee */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <h3 className="text-2xl font-bold text-stone-900 mb-4 text-center">Browse green coffee offerings</h3>
              <p className="text-center text-stone-600 mb-6">
                We source from trusted importers. Browse their offerings to find beans you'd like us to roast.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <a
                  href="https://bodega.coffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200 hover:border-amber-800 transition-all text-center"
                >
                  <h4 className="text-xl font-bold text-stone-900 mb-2">Cafe Imports</h4>
                  <p className="text-amber-800 font-semibold mb-2">Bodega Program</p>
                  <p className="text-stone-600 text-sm">Browse green coffee offerings →</p>
                </a>

                <a
                  href="https://royalcoffee.com/crown-jewels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200 hover:border-amber-800 transition-all text-center"
                >
                  <h4 className="text-xl font-bold text-stone-900 mb-2">Royal Coffee</h4>
                  <p className="text-amber-800 font-semibold mb-2">Crown Jewels Program</p>
                  <p className="text-stone-600 text-sm">Browse green coffee offerings →</p>
                </a>
              </div>

              {/* Intent to Buy Form */}
              <div className="bg-stone-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-stone-900 mb-4">Enter your intent to buy</h4>
                <p className="text-stone-600 mb-4">
                  Found a coffee you want? Enter the coffee name. We need 3 commitments before we order and roast.
                </p>

                <form onSubmit={handleIntentSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedCompany("royal")}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedCompany === "royal"
                          ? "bg-amber-800 border-amber-800 text-white"
                          : "bg-white border-amber-300 text-amber-800"
                      }`}
                    >
                      Royal Coffee
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCompany("cafe-imports")}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedCompany === "cafe-imports"
                          ? "bg-amber-800 border-amber-800 text-white"
                          : "bg-white border-amber-300 text-amber-800"
                      }`}
                    >
                      Cafe Imports
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={coffeeNameInput}
                      onChange={(e) => setCoffeeNameInput(e.target.value)}
                      placeholder="Enter coffee name from importer website"
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-amber-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-900 transition-colors"
                    >
                      Submit Intent
                    </button>
                  </div>
                </form>

                {submittedCoffee && (
                  <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-300 rounded-xl">
                    <p className="text-amber-900 font-semibold">
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
      <section id="join-form" className="py-20 px-6 bg-gradient-to-b from-amber-100 to-amber-200">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Ready to get started?</h2>
            <p className="text-xl text-stone-700 mb-2">
              Fill out the form below and we'll get you set up with House Batch Program
            </p>
            <p className="text-stone-600 text-sm">
              Salt Lake area only. Local pickup is free, and it keeps this community real.
            </p>
          </div>

          {showForm ? (
            <form onSubmit={handleJoinSubmit} className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-2">ZIP Code *</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-2">Pickup or delivery? *</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preference: "pickup" })}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                      formData.preference === "pickup"
                        ? "bg-amber-800 border-amber-800 text-white"
                        : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                    }`}
                  >
                    Pickup (Free)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preference: "delivery" })}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                      formData.preference === "delivery"
                        ? "bg-amber-800 border-amber-800 text-white"
                        : "bg-white border-amber-300 text-amber-800 hover:border-amber-500"
                    }`}
                  >
                    Delivery ($8)
                  </button>
                </div>
                <p className="text-sm text-stone-600 mt-2">Delivery available within 10 miles of Salt Lake City</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-2">
                  Estimated monthly coffee usage (lbs)
                </label>
                <input
                  type="text"
                  value={formData.monthlyUsage}
                  onChange={(e) => setFormData({ ...formData, monthlyUsage: e.target.value })}
                  placeholder="e.g., 2, 5, or 10"
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-300 text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition-colors shadow-lg"
              >
                Get started
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full border-2 border-amber-800 text-amber-800 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-colors"
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
                className="bg-amber-800 text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-amber-900 transition-all shadow-lg transform hover:scale-105"
                data-event="coop_join_click"
              >
                Get started (local pickup)
              </button>
              <p className="mt-4 text-stone-600">
                Or <Link href="/#contact" className="text-amber-800 font-semibold hover:underline">contact us</Link> to learn more
              </p>
            </div>
          )}
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
