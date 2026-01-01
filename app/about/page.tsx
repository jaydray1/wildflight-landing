import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdventureWeather from "../components/AdventureWeather";
import Button from "../components/ui/Button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 border-b-2 border-[#222222] pb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#222222] mb-2">
              The Manifesto
            </h1>
            <p className="text-lg text-[#666666] font-mono">
              Intellectual honesty. Utility over decoration.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* The No-Label Story */}
            <div className="bg-white border-2 border-[#222222] p-8 md:p-12">
              <h2 className="text-3xl font-black text-[#222222] mb-6">Why We Don't Use Labels</h2>
              <div className="space-y-6 text-[#666666] leading-relaxed">
                <p>
                  We are roasters, not a marketing agency. Our money goes into Green Coffee Quality
                  and Roasting Precision, not into glossy stickers and fancy boxes.
                </p>
                <p>
                  High-income people respect utility. They don't need pretty packaging to validate
                  their purchase. They want performance, consistency, and transparency.
                </p>
                <p className="font-bold text-[#222222] text-lg">
                  Our bags are designed to be thrown in a pack, marked with a Sharpie, and recycled.
                  The luxury is inside the bag.
                </p>
              </div>
            </div>

            {/* The Approach */}
            <div className="bg-white border-2 border-[#222222] p-8 md:p-12">
              <h2 className="text-3xl font-black text-[#222222] mb-6">Where Our Money Goes</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="font-mono-bold text-2xl text-[#FF6B35] mb-3">Green Coffee Quality</div>
                  <p className="text-[#666666] leading-relaxed">
                    Direct trade relationships with farmers who care about quality. We pay more for
                    better beans, not for middlemen or certifications that don't improve the cup.
                  </p>
                </div>
                <div>
                  <div className="font-mono-bold text-2xl text-[#FF6B35] mb-3">Roasting Precision</div>
                  <p className="text-[#666666] leading-relaxed">
                    Every batch is logged. Every curve is analyzed. We iterate on roast profiles until
                    they're dialed, then we replicate. Consistency is non-negotiable.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Transparency */}
            <div className="bg-[#222222] text-white p-8 md:p-12 border-4 border-[#FF6B35]">
              <h2 className="text-3xl font-black mb-6">Technical Transparency</h2>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-white/20 py-2">
                  <span className="text-gray-300">Batch Number</span>
                  <span>Tracked from green to cup</span>
                </div>
                <div className="flex justify-between border-b border-white/20 py-2">
                  <span className="text-gray-300">Roast Date</span>
                  <span>Stamped on every bag</span>
                </div>
                <div className="flex justify-between border-b border-white/20 py-2">
                  <span className="text-gray-300">Technical Specs</span>
                  <span>Varietal, elevation, process — all disclosed</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Roast Profile</span>
                  <span>Development time and drop temp logged</span>
                </div>
              </div>
            </div>

            {/* The Philosophy */}
            <div className="bg-white border-2 border-[#222222] p-8 md:p-12">
              <h2 className="text-3xl font-black text-[#222222] mb-6">The Philosophy</h2>
              <div className="space-y-6 text-[#666666] leading-relaxed">
                <p>
                  We roast for performance. For the 5:00 AM start. For high-elevation pursuits where
                  coffee isn't a luxury—it's fuel. We respect that.
                </p>
                <p>
                  You don't need us to tell you our coffee is "craft" or "artisan." You'll taste it.
                  You don't need a pretty bag to feel good about your purchase. The cup quality speaks.
                </p>
                <p className="font-bold text-[#222222] text-lg">
                  Utility. Honesty. Performance. That's what we stand for.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-6">
              <Button href="/shop" variant="primary" size="lg">
                Shop Current Lots
              </Button>
              <p className="text-sm text-[#666666] font-mono">
                No labels. Just good coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}
