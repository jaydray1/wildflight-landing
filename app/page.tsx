import Image from "next/image";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function Home() {
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
                  Coffee for the wild
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed max-w-lg font-medium">
                  Join our local coffee co-op. Get fresh roasted coffee monthly at wholesale prices—no subscription, no commitment. Salt Lake area only.
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
                  <Link href="/house-batch" className="bg-slate-900 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-800 transition-all text-center">
                    Get started (local pickup)
                  </Link>
                  <Link href="/house-batch#house-coop" className="bg-white text-slate-900 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-50 transition-all text-center ring-1 ring-slate-300">
                    See sizes & pricing
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/images/hiker-hero1.jpg"
                  alt="Camping mug by campfire with mountain lake in background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 md:mb-8 tracking-tight">Why Join?</h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 max-w-4xl font-bold leading-relaxed">
              Fresh roasted coffee, wholesale prices, and a community of wild coffee lovers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-2 sm:mb-4">✓</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">Fresh roasted monthly</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Roasted on the first Saturday, picked up that weekend
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-2 sm:mb-4">✓</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">Save 25-30%</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                No packaging overhead or retail markup
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-2 sm:mb-4">✓</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">No subscription</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Order when you want, skip any month
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-2 sm:mb-4">✓</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">Local community</h3>
              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                Meet the roaster, support local craft
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 md:py-40 px-4 sm:px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-indigo-950/20"></div>
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 md:space-y-12 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-black text-white uppercase tracking-tight">Ready to get started?</h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 font-bold max-w-4xl mx-auto leading-relaxed">
            Learn more about how it works, see pricing, and sign up for the House Batch Program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6 sm:pt-8">
            <Link href="/house-batch" className="bg-white text-slate-900 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-slate-100 transition-all">
              Get started (local pickup)
            </Link>
            <Link href="/house-batch#house-coop" className="bg-transparent text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl font-black uppercase tracking-wide hover:bg-white/10 transition-all ring-1 ring-white/30">
              See sizes & pricing
            </Link>
          </div>
          <p className="text-base sm:text-lg text-slate-400 font-semibold pt-4 sm:pt-6">
            Salt Lake area only. Local pickup is free, and it keeps this community real.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 uppercase tracking-tight">Questions?</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 font-bold">
            Based in Salt Lake City, Utah. Pick up from our home or get local delivery within 10 miles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6 sm:pt-8">
            <Link href="/house-batch" className="bg-slate-900 text-white px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-black uppercase tracking-wide hover:bg-slate-800 transition-all">
              View Full Program Details
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
