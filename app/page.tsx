import Image from "next/image";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AdventureWeather from "./components/AdventureWeather";
import Button from "./components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Hero Image */}
            <div className="relative aspect-[4/3] bg-[#222222]">
              <Image
                src="/images/coffee-hero.jpg"
                alt="Hand marking batch number on coffee bag"
                fill
                className="object-cover grayscale contrast-125"
              />
              {/* Simulated batch marking overlay */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 border-2 border-[#222222]">
                <div className="font-mono-bold text-base text-[#222222]">BATCH #084</div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#222222] leading-tight">
                  Specialty Coffee.
                  <br />
                  Adventure Grade.
                </h1>
                <p className="text-xl sm:text-2xl text-[#666666] leading-relaxed font-medium">
                  Small-batch roasting for high-elevation pursuits and the 5:00 AM start.
                </p>
              </div>

              <Button href="/shop" variant="primary" size="lg">
                Shop Current Lots
              </Button>
            </div>
          </div>

          {/* Proof Strip */}
          <div className="border-t-2 border-b-2 border-[#222222] py-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-mono-bold text-2xl mb-2 text-[#222222]">NO-LABEL</div>
                <div className="text-base text-[#666666] font-mono">PACKAGING</div>
                <div className="text-base text-[#666666] mt-2">Utility over decoration</div>
              </div>
              <div>
                <div className="font-mono-bold text-2xl mb-2 text-[#222222]">ETHICAL</div>
                <div className="text-base text-[#666666] font-mono">SOURCING</div>
                <div className="text-base text-[#666666] mt-2">Direct trade relationships</div>
              </div>
              <div>
                <div className="font-mono-bold text-2xl mb-2 text-[#222222]">TECHNICAL</div>
                <div className="text-base text-[#666666] font-mono">ROAST PROFILING</div>
                <div className="text-base text-[#666666] mt-2">Data-driven consistency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief Value Props */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black text-[#222222] mb-4">The Briefing</h2>
              <p className="text-[#666666] leading-relaxed mb-4">
                We roast for performance. Every batch is tested, logged, and optimized for consistency.
                No marketing fluff—just technical specs and reliable coffee.
              </p>
              <p className="text-[#666666] leading-relaxed">
                Our bags are designed to be thrown in a pack, marked with a Sharpie, and recycled.
                The luxury is inside the bag.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#222222] mb-4">The Protocol</h2>
              <ul className="space-y-3 text-[#666666] font-mono text-base leading-relaxed">
                <li className="flex items-start">
                  <span className="text-[#FF6B35] mr-2">→</span>
                  <span>Weekly roasting schedule published in advance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B35] mr-2">→</span>
                  <span>Batch numbers tracked from green to cup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B35] mr-2">→</span>
                  <span>Technical specs on every lot: varietal, elevation, process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF6B35] mr-2">→</span>
                  <span>No subscriptions without value—15% off, cancel anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}
