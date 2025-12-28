"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function EnthusiastCoopPage() {
  // Nomination state
  const [nominations, setNominations] = useState([
    { id: 1, name: "Ethiopia Anaerobic Natural", origin: "Ethiopia / Natural", price: "$18/lb", commitments: 2, needed: 3, source: "Royal Crown Jewel" },
    { id: 2, name: "Colombia Pink Bourbon", origin: "Colombia / Washed", price: "$16/lb", commitments: 1, needed: 3, source: "Cafe Imports Bodega" },
  ]);

  // Nomination form state
  const [showSourcingForm, setShowSourcingForm] = useState(false);
  const [coffeeLink, setCoffeeLink] = useState("");
  const [nominatorContact, setNominatorContact] = useState("");


  const handleJoinBatch = (id: number) => {
    setNominations((prev) =>
      prev.map((nom) => (nom.id === id ? { ...nom, commitments: Math.min(nom.commitments + 1, nom.needed) } : nom))
    );
  };

  const handleNominationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend
    alert("Thanks for your nomination! We'll review it and add it to the leaderboard if it meets our criteria.");
    setCoffeeLink("");
    setNominatorContact("");
    setShowSourcingForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-40 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              <div className="space-y-6 sm:space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  The Enthusiast Co-Op
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed max-w-lg font-medium">
                  For those who want to explore rare origins, experimental processes, and the craft of green coffee sourcing.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  We source the beans, you share the batch. High-end specialty coffee at importer prices.
                </p>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/enthusiast-hero.jpg"
                  alt="Coffee cherries being harvested"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="flex items-center gap-4 mb-2 sm:mb-4">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">1</div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">The Nomination</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Browse our importer partners (Royal & Cafe Imports) and suggest a coffee or "Upvote" a current nomination.
              </p>
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="flex items-center gap-4 mb-2 sm:mb-4">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">2</div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">The Commitment</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Once a coffee hits 3 commitments (usually 10-15 lbs total), we pull the trigger and buy the bag.
              </p>
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="flex items-center gap-4 mb-2 sm:mb-4">
                <div className="text-5xl sm:text-6xl font-black text-slate-900">3</div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-3 sm:mb-4">The Roast</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                We roast it specifically for the co-op members, often with a more nuanced, lighter profile to highlight the "Crown Jewel" or "Bodega" quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Leaderboard */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">Active Group Buys</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {nominations.map((nom) => (
              <div key={nom.id} className="bg-white border-2 border-slate-200 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">{nom.name}</h3>
                <p className="text-slate-600 text-base sm:text-lg font-medium mb-2">{nom.origin}</p>
                <p className="text-slate-700 text-sm sm:text-base font-bold mb-4">{nom.source}</p>
                
                <p className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{nom.price}</p>
                
                <div className="w-full bg-slate-200 h-4 mb-2">
                  <div
                    className="bg-slate-900 h-full transition-all"
                    style={{ width: `${(nom.commitments / nom.needed) * 100}%` }}
                  />
                </div>
                <p className="text-sm sm:text-base text-slate-600 font-medium mb-4">
                  {nom.commitments} of {nom.needed} spots filled {nom.commitments < nom.needed ? `(Need ${nom.needed - nom.commitments} more!)` : ""}
                </p>
                
                <button
                  onClick={() => handleJoinBatch(nom.id)}
                  disabled={nom.commitments >= nom.needed}
                  className={`w-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-black uppercase tracking-wide transition-all ${
                    nom.commitments >= nom.needed
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {nom.commitments >= nom.needed ? "Complete" : "Join this Batch"}
                </button>
              </div>
            ))}
            
            {/* Add New Card */}
            <button
              onClick={() => {
                setShowSourcingForm(true);
                document.getElementById("sourcing-engine")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white border-2 border-dashed border-slate-300 p-6 sm:p-8 hover:border-slate-900 transition-all flex flex-col items-center justify-center min-h-[300px] text-center"
            >
              <div className="text-6xl sm:text-7xl font-black text-slate-400 mb-4">+</div>
              <p className="text-slate-600 text-base sm:text-lg font-medium">Don't see what you want? Source a new one.</p>
            </button>
          </div>
        </div>
      </section>

      {/* The Sourcing Engine */}
      <section id="sourcing-engine" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">How to Source a New Coffee</h2>
          </div>

          <div className="space-y-8 sm:space-y-12 mb-12 sm:mb-16">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">1</div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Browse</h3>
                <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                  Check out the current arrivals at our importers.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://royalcoffee.com/crown-jewels/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 font-bold underline hover:text-slate-700 transition-colors"
                  >
                    Royal Coffee →
                  </a>
                  <a
                    href="https://bodega.coffee/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 font-bold underline hover:text-slate-700 transition-colors"
                  >
                    Cafe Imports →
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">2</div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Paste</h3>
                <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                  Drop the link below.
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">3</div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Launch</h3>
                <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                  We'll add it to the leaderboard. If 2 other people join you, we buy it.
                </p>
              </div>
            </div>
          </div>

          {/* Nomination Form */}
          <div className="bg-slate-100 p-6 sm:p-8 md:p-10">
            <form onSubmit={handleNominationSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Coffee URL</label>
                <input
                  type="url"
                  value={coffeeLink}
                  onChange={(e) => setCoffeeLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3 uppercase tracking-tight">Email / Phone</label>
                <input
                  type="text"
                  value={nominatorContact}
                  onChange={(e) => setNominatorContact(e.target.value)}
                  placeholder="your@email.com or (555) 123-4567"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900 font-medium text-base"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-slate-900 text-white px-8 sm:px-10 py-3 sm:py-4 font-black uppercase tracking-wide hover:bg-slate-800 transition-colors text-base sm:text-lg"
              >
                Launch Group Buy
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Geek Stats */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight text-center">Geek Stats</h2>
          </div>

          <div className="space-y-8 sm:space-y-12 bg-white p-6 sm:p-8 md:p-10 border-2 border-slate-200">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 sm:mb-6 uppercase tracking-tight">Roast Profile</h3>
              <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                Co-Op roasts are typically "Light-Medium" to preserve origin character. We roast each coffee to highlight its unique terroir and processing methods, ensuring you taste exactly what makes each origin special.
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 sm:mb-6 uppercase tracking-tight">The Math</h3>
              <div className="bg-slate-100 p-6 sm:p-8 border-l-4 border-slate-900">
                <p className="text-slate-900 text-base sm:text-lg font-bold mb-4">Transparent pricing:</p>
                <ul className="space-y-2 text-slate-700 text-base sm:text-lg font-medium">
                  <li>• Importer Price (varies by coffee)</li>
                  <li>• + $6/lb Roasting/Labor Fee</li>
                  <li>• = Your Price</li>
                </ul>
                <p className="text-slate-600 text-sm sm:text-base font-medium mt-4">
                  No markup. No hidden fees. Just the cost of the beans plus our labor to roast them perfectly for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

