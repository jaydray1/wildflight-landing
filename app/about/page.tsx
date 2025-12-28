"use client";

import Link from "next/link";
import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              <div className="space-y-6 sm:space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  About Wildflight
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed max-w-lg font-medium">
                  From trail running performance enhancer to single-origin revelation—how coffee became a path to connection and consciousness.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors font-medium"
                  >
                    <span className="text-sm uppercase tracking-wide">Scroll to story</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="relative w-full flex justify-center mt-8 md:mt-0">
              <div className="relative w-full max-w-sm">
                <Image
                  src="/images/meditate-coffee.png"
                  alt="Coffee cupping session"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Staggered Layout */}
      <section id="journey" className="px-4 sm:px-6 py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">The Journey</h2>
              <div className="space-y-4 sm:space-y-6 text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
                <p>
                  I got into coffee roasting because I wanted to feel more connected to the daily living I was doing. I wanted to be more conscious of the way I consume staples in my life, and I wanted to be part of providing other people the same kind of staple and consciousness.
                </p>
                <p>
                  It started with coffee as a performance enhancer for trail running. Then I had a single-origin pour-over, and my eyes opened to the world and its connection to coffee.
                </p>
              </div>
            </div>
            <div className="bg-slate-100 p-6 sm:p-8 md:p-10 border-l-4 border-slate-900">
              <p className="text-xl sm:text-2xl text-slate-900 leading-relaxed font-medium italic">
                "That connection—between where coffee comes from, how it's roasted, and how we experience it—became something I needed to be part of creating."
              </p>
            </div>
          </div>

          {/* Breakout Section */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12 md:p-16 text-white mb-8 sm:mb-10 md:mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-indigo-950/20"></div>
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">I roast every batch with resting in mind</h3>
              <div className="space-y-4 sm:space-y-6 text-lg sm:text-xl text-white/90 leading-relaxed font-medium">
                <p>
                  Freshly roasted coffee releases gas—that's why coffee bags have those air release valves. The beans continue to off-gas after roasting, and this resting period changes how coffee tastes.
                </p>
                <p>
                  We've found 1-3 weeks to be the ideal window for experiencing coffee at different stages of its rest. Each week reveals new flavors and characteristics.
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="relative w-full aspect-[4/3] max-w-4xl mx-auto overflow-hidden">
              <Image
                src="/images/about-me.jpg"
                alt="Mountain biker in natural setting"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* The Name Section */}
          <div className="bg-slate-100 p-8 sm:p-12 md:p-16 mb-12 sm:mb-16 md:mb-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 sm:mb-10 md:mb-12 text-center tracking-tight">Why Wildflight</h2>
              <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Wild</h4>
                    <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                      The untouched places of nature and our hearts where adventure calls.
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Flight</h4>
                    <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                      Our trajectories may zig, zag, dive, and climb and we're in it for the ride.
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Birds/Peregrines</h4>
                    <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                      Peregrines are unmatched in their speed and focus when hunting prey—a wild representation of the focus it takes to achieve our adventures in nature.
                    </p>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Nature</h4>
                    <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                      Nature is the last great reminder in an industrialized world of the free and open places in our hearts and lands.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 sm:p-8 md:p-10">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6 uppercase tracking-tight">The Community</h4>
                  <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                    <p>
                      We roast for the co-op on the first Saturday of every month. Pickup day is the community moment—meet the roaster, swap brew tips, and grab your month's coffee.
                    </p>
                    <p className="font-black text-slate-900">
                      It's small batch, it's local, and it's real.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* CTA Section */}
          <div className="text-center space-y-6 sm:space-y-8 md:space-y-10">
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 italic">
              "The wilderness is not a luxury but a necessity of the human spirit." – Edward Abbey
            </p>
            <Link
              href="/house-batch"
              className="inline-block bg-slate-900 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-800 transition-all"
            >
              Join the House Batch Program
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
