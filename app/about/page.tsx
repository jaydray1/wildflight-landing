import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E9F1F2] via-white to-[#E9F1F2]/50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#E9F1F2]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#2B2118]">
            WILDFLIGHT
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2B2118]">
            <Link href="/about" className="hover:text-[#F4A261] transition-colors">About</Link>
            <Link href="/coop" className="hover:text-[#F4A261] transition-colors">House Batch Program</Link>
            <Link href="/#contact" className="hover:text-[#F4A261] transition-colors">Contact</Link>
            <Link href="/coop" className="bg-[#F4A261] text-white px-6 py-2 rounded-full hover:bg-[#E89452] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold text-[#2B2118] mb-6">About Wildflight</h1>
            <p className="text-2xl text-[#2B2118]/80 max-w-3xl mx-auto leading-relaxed">
              From trail running performance enhancer to single-origin revelation—how coffee became a path to connection and consciousness.
            </p>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden">
            <Image
              src="/images/about-me.jpg"
              alt="Wildflight Coffee roaster"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Story Section - Staggered Layout */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#2B2118]">The Journey</h2>
              <p className="text-lg text-[#2B2118]/80 leading-relaxed">
                I got into coffee roasting because I wanted to feel more connected to the daily living I was doing. I wanted to be more conscious of the way I consume staples in my life, and I wanted to be part of providing other people the same kind of staple and consciousness.
              </p>
              <p className="text-lg text-[#2B2118]/80 leading-relaxed">
                It started with coffee as a performance enhancer for trail running. Then I had a single-origin pour-over, and my eyes opened to the world and its connection to coffee.
              </p>
            </div>
            <div className="bg-[#F4A261]/10 rounded-3xl p-8 border-l-4 border-[#F4A261]">
              <p className="text-xl text-[#2B2118] leading-relaxed italic">
                "That connection—between where coffee comes from, how it's roasted, and how we experience it—became something I needed to be part of creating."
              </p>
            </div>
          </div>

          {/* Breakout Section */}
          <div className="bg-gradient-to-br from-[#2B2118] to-[#2B2118]/90 rounded-3xl p-12 text-white mb-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-3xl font-bold">Now I roast every batch fresh</h3>
              <p className="text-xl text-white/90 leading-relaxed">
                In my home kitchen here in Salt Lake City, drawing inspiration from the peregrines that live at the top of the sky—the very wildest of places still left on earth.
              </p>
            </div>
          </div>

          {/* Why Wildflight Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🦅</div>
              <h3 className="text-2xl font-bold text-[#2B2118] mb-4">Birds & Freedom</h3>
              <p className="text-[#2B2118]/80 leading-relaxed">
                I have a strong pull towards birds and the freedom they experience in nature and in the wild.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">⛰️</div>
              <h3 className="text-2xl font-bold text-[#2B2118] mb-4">The Mountains</h3>
              <p className="text-[#2B2118]/80 leading-relaxed">
                Salt Lake City keeps me here because of the mountains, and the people who love the mountains.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-2xl font-bold text-[#2B2118] mb-4">Wild Places</h3>
              <p className="text-[#2B2118]/80 leading-relaxed">
                When I'm not roasting, you'll find me mountain biking or running on high mountain trails.
              </p>
            </div>
          </div>

          {/* The Name Section */}
          <div className="bg-[#E9F1F2] rounded-3xl p-12 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-[#2B2118] mb-6 text-center">Why Wildflight</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-lg text-[#2B2118] leading-relaxed">
                  <p>
                    The name Wildflight is about emphasizing our community connection to the wild and that largely unknown space above our heads—where peregrines live, where wild things still exist.
                  </p>
                  <p>
                    Their focus on hunting and piercing through distraction is something I connect with as a recreational athlete and seeker of the wild places.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h4 className="text-xl font-bold text-[#2B2118] mb-4">The Community</h4>
                  <p className="text-[#2B2118]/80 leading-relaxed">
                    We roast for the co-op on the first Saturday of every month. Pickup day is the community moment—meet the roaster, swap brew tips, and grab your month's coffee.
                  </p>
                  <p className="text-[#2B2118]/80 leading-relaxed mt-4 font-semibold">
                    It's small batch, it's local, and it's real.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <p className="text-2xl font-semibold text-[#F4A261] italic mb-8">
              "For those who chase horizons and soar high."
            </p>
            <Link
              href="/coop"
              className="inline-block bg-[#F4A261] text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-[#E89452] transition-all shadow-lg transform hover:scale-105"
            >
              Join the House Batch Program
            </Link>
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
                <li><Link href="/about" className="hover:text-[#F4A261] transition-colors">About</Link></li>
                <li><Link href="/coop" className="hover:text-[#F4A261] transition-colors">House Batch Program</Link></li>
                <li><Link href="/#contact" className="hover:text-[#F4A261] transition-colors">Contact</Link></li>
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
