import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Image
              src="/images/Logo_v2_LinkedIn400x300.png"
              alt="Wildflight Coffee"
              width={120}
              height={90}
              className="h-10 w-auto"
            />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-800">
            <a href="/house-batch" className="hover:text-slate-600 transition-colors">House Batch Program</a>
            <a href="/about" className="hover:text-slate-600 transition-colors">About</a>
            <a href="/house-batch" className="bg-slate-900 text-white px-6 py-3 hover:bg-slate-800 transition-colors font-bold">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-40 px-6 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  Coffee for the wild
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-lg font-medium">
                  Join our local coffee co-op. Get fresh roasted coffee monthly at wholesale prices—no subscription, no commitment. Salt Lake area only.
                </p>
                <div className="flex flex-wrap gap-4 pt-6">
                  <span className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold uppercase tracking-wide text-xs">
                    Salt Lake area • local pickup (free)
                  </span>
                  <span className="inline-block px-5 py-2.5 bg-slate-200 text-slate-800 font-bold uppercase tracking-wide text-xs">
                    Just in time roasting — we roast only what you order
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-8 pt-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <a href="/house-batch" className="bg-slate-900 text-white px-10 py-6 text-xl font-black uppercase tracking-wide hover:bg-slate-800 transition-all text-center">
                    Get started (local pickup)
                  </a>
                  <a href="/house-batch#house-coop" className="bg-white text-slate-900 px-10 py-6 text-xl font-black uppercase tracking-wide hover:bg-slate-50 transition-all text-center ring-1 ring-slate-300">
                    See sizes & pricing
                  </a>
                </div>
              </div>
            </div>
            <div className="relative">
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
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">Why Join?</h2>
            <p className="text-2xl md:text-3xl text-slate-700 max-w-4xl font-bold leading-relaxed">
              Fresh roasted coffee, wholesale prices, and a community of wild coffee lovers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            <div className="space-y-6">
              <div className="text-6xl font-black text-slate-900 mb-4">✓</div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">Fresh roasted monthly</h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Roasted on the first Saturday, picked up that weekend
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-6xl font-black text-slate-900 mb-4">✓</div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">Save 25-30%</h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                No packaging overhead or retail markup
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-6xl font-black text-slate-900 mb-4">✓</div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">No subscription</h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Order when you want, skip any month
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-6xl font-black text-slate-900 mb-4">✓</div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">Local community</h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Meet the roaster, support local craft
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-indigo-950/20"></div>
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight">Ready to get started?</h2>
          <p className="text-2xl md:text-3xl text-slate-300 font-bold max-w-4xl mx-auto leading-relaxed">
            Learn more about how it works, see pricing, and sign up for the House Batch Program.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <a href="/house-batch" className="bg-white text-slate-900 px-12 py-6 text-xl font-black uppercase tracking-wide hover:bg-slate-100 transition-all">
              Get started (local pickup)
            </a>
            <a href="/house-batch#house-coop" className="bg-transparent text-white px-12 py-6 text-xl font-black uppercase tracking-wide hover:bg-white/10 transition-all ring-1 ring-white/30">
              See sizes & pricing
            </a>
          </div>
          <p className="text-lg text-slate-400 font-semibold pt-6">
            Salt Lake area only. Local pickup is free, and it keeps this community real.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tight">Questions?</h2>
          <p className="text-xl md:text-2xl text-slate-700 font-bold">
            Based in Salt Lake City, Utah. Pick up from our home or get local delivery within 10 miles.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <a href="/house-batch" className="bg-slate-900 text-white px-10 py-5 text-lg font-black uppercase tracking-wide hover:bg-slate-800 transition-all">
              View Full Program Details
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <Image
                  src="/images/Logo_v2_LinkedIn400x300.png"
                  alt="Wildflight Coffee"
                  width={120}
                  height={90}
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-slate-500">
                Specialty micro-roasted coffee from Salt Lake City, Utah.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/house-batch" className="hover:text-white transition-colors font-medium">House Batch Program</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wide">Connect</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors font-medium">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors font-medium">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-600">
            <p>&copy; {new Date().getFullYear()} Wildflight Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
