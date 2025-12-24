import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E9F1F2] via-white to-[#E9F1F2]/50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#E9F1F2]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-[#2B2118]">
            WILDFLIGHT
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2B2118]">
            <a href="/about" className="hover:text-[#F4A261] transition-colors">About</a>
            <a href="/coop" className="hover:text-[#F4A261] transition-colors">House Batch Program</a>
            <a href="#contact" className="hover:text-[#F4A261] transition-colors">Contact</a>
            <a href="/coop" className="bg-[#F4A261] text-white px-6 py-2 rounded-full hover:bg-[#E89452] transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-bold text-[#2B2118] leading-tight">
                  Premium coffee at wholesale prices, locally roasted
                </h1>
                <p className="text-xl text-[#2B2118]/80 leading-relaxed max-w-lg">
                  Join our local coffee co-op. Get fresh roasted coffee monthly at wholesale prices—no subscription, no commitment. Salt Lake area only.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4A261]/20 rounded-full text-[#2B2118] font-medium w-fit text-sm">
                    Salt Lake area • pickup-first (free)
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E9F1F2] rounded-full text-[#2B2118] font-medium text-xs w-fit">
                    Monthly batch ordering — order by Thursday, pickup Saturday–Tuesday
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/coop" className="bg-[#F4A261] text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#E89452] transition-all transform hover:scale-105 shadow-lg text-center">
                    Get started (local pickup)
                  </a>
                  <a href="/coop#house-coop" className="border-2 border-[#F4A261] text-[#F4A261] px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#F4A261]/10 transition-all text-center">
                    See sizes & pricing
                  </a>
                </div>
                <p className="text-[#2B2118]/80 text-lg">
                  2 minutes • monthly batch ordering • pickup is free
                </p>
              </div>
            </div>
            <div className="relative p-4">
              <div className="aspect-square rounded-3xl shadow-2xl overflow-hidden ring-4 ring-white/50">
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
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2B2118] mb-4">Why Join?</h2>
            <p className="text-xl text-[#2B2118]/80 max-w-2xl mx-auto">
              Fresh roasted coffee, wholesale prices, and a real relationship with your local roaster
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-lg font-bold text-[#2B2118]">Fresh roasted monthly</h3>
              <p className="text-[#2B2118]/80 text-sm">
                Roasted on the first Saturday, picked up that weekend
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-lg font-bold text-[#2B2118]">Save 25-30%</h3>
              <p className="text-[#2B2118]/80 text-sm">
                No packaging overhead or retail markup
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-lg font-bold text-[#2B2118]">No subscription</h3>
              <p className="text-[#2B2118]/80 text-sm">
                Order when you want, skip any month
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-lg font-bold text-[#2B2118]">Local community</h3>
              <p className="text-[#2B2118]/80 text-sm">
                Meet the roaster, support local craft
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#F4A261]/20 to-[#F4A261]/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-[#2B2118]">Ready to get started?</h2>
          <p className="text-xl text-[#2B2118]/80">
            Learn more about how it works, see pricing, and sign up for the House Batch Program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/coop" className="bg-[#F4A261] text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#E89452] transition-all shadow-lg transform hover:scale-105">
              Get started (local pickup)
            </a>
            <a href="/coop#house-coop" className="border-2 border-[#F4A261] text-[#F4A261] px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#F4A261]/10 transition-all">
              See sizes & pricing
            </a>
          </div>
          <p className="text-sm text-[#2B2118]/60">
            Salt Lake area only. Local pickup is free, and it keeps this community real.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[#E9F1F2]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#2B2118]">Questions?</h2>
          <p className="text-lg text-[#2B2118]/80">
            Based in Salt Lake City, Utah. Pick up from our home or get local delivery within 10 miles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/coop" className="bg-[#F4A261] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#E89452] transition-all shadow-lg">
              View Full Program Details
            </a>
            <button className="border-2 border-[#E9F1F2] text-[#2B2118] px-8 py-4 rounded-full text-lg font-semibold hover:border-[#F4A261] hover:text-[#F4A261] transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2B2118] text-white/70 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">WILDFLIGHT</h3>
              <p className="text-white/60">
                Specialty micro-roasted coffee from Salt Lake City, Utah.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-[#F4A261] transition-colors">About</a></li>
                <li><a href="/coop" className="hover:text-[#F4A261] transition-colors">House Batch Program</a></li>
                <li><a href="#contact" className="hover:text-[#F4A261] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#F4A261] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#F4A261] transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-[#F4A261] transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/50">
            <p>&copy; {new Date().getFullYear()} Wildflight Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
