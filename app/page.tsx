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
                <p className="text-xl sm:text-2xl text-[#222222] leading-relaxed font-medium">
                  High-spec coffee for low-light starts
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
                <div className="font-mono-bold text-2xl mb-2 text-[#222222]">MINIMALIST PACKAGING</div>
                <div className="text-base text-[#222222] font-mono">Recyclable card stock</div>
              </div>
              <div>
                <div className="font-mono-bold text-2xl mb-2 text-[#222222]">ETHICAL SOURCING</div>
                <div className="text-base text-[#222222] font-mono">Verified importer relationships</div>
              </div>
              <div>
                <div className="font-mono-bold text-2xl mb-2 text-[#222222]">TECHNICAL</div>
                <div className="text-base text-[#222222] font-mono">ROAST PROFILING</div>
                <div className="text-base text-[#222222] mt-2">Data-driven consistency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief Value Props - Industrial Technical Manual */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(to right, #222222 1px, transparent 1px),
            linear-gradient(to bottom, #222222 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}></div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* THE BRIEFING */}
            <div className="border border-[#222222] bg-white p-6 md:p-8 relative">
              {/* Status Stamp */}
              <div className="absolute top-4 right-4 border border-[#222222] bg-[#F5F5F5] px-3 py-1">
                <div className="font-mono text-xs text-[#222222] uppercase tracking-wider">DEPT: ROAST OPS // STATUS: ACTIVE</div>
              </div>

              <h2 className="font-mono-bold text-2xl md:text-3xl text-[#222222] mb-6 uppercase tracking-wider border-b border-[#222222] pb-3">
                THE BRIEFING
              </h2>

              <div className="space-y-6 text-[#222222] leading-relaxed">
                <p className="font-mono text-sm md:text-base">
                  We believe the best coffee doesn't need a pedestal; it needs a profile. We've stripped away the pretense to focus on what actually matters: performance. We use recyclable card stock instead of expensive labels because we'd rather invest in the technical specs and the roasting drum. The luxury isn't the packaging—the luxury is the performance.
                </p>

                {/* Horizontal Rule */}
                <hr className="border-[#222222] border-t" />

                {/* MISSION OBJECTIVE */}
                <div>
                  <div className="font-mono-bold text-base md:text-lg text-[#222222] mb-3 uppercase tracking-wider">
                    MISSION OBJECTIVE
                  </div>
                  <p className="font-mono text-sm md:text-base">
                    Equip the operator with reliable, data-backed coffee. We strip the friction from the specialty experience by prioritizing technical consistency over decorative marketing.
                  </p>
                </div>

                {/* Horizontal Rule */}
                <hr className="border-[#222222] border-t" />

                {/* HARDWARE SPECS */}
                <div>
                  <div className="font-mono-bold text-base md:text-lg text-[#222222] mb-3 uppercase tracking-wider">
                    HARDWARE SPECS
                  </div>
                  <ul className="font-mono text-sm md:text-base space-y-1">
                    <li>DATA: CROPSTER SUITE</li>
                    <li>HEAT: AILLIO BULLET R1 V2</li>
                    <li>LABEL: FIBER CARD STOCK</li>
                  </ul>
                </div>

                {/* Document ID Footer */}
                <div className="pt-4 mt-4 border-t border-[#222222]">
                  <div className="font-mono text-xs text-[#222222] uppercase tracking-wider">
                    DOCUMENT ID: [MIDVALE]
                  </div>
                </div>
              </div>
            </div>

            {/* THE PROTOCOL */}
            <div className="border border-[#222222] bg-white p-6 md:p-8">
              <h2 className="font-mono-bold text-2xl md:text-3xl text-[#222222] mb-6 uppercase tracking-wider border-b border-[#222222] pb-3">
                THE PROTOCOL
              </h2>

              <div className="space-y-6">
                {/* 01 // THE LOGBOOK */}
                <div className="border-l-2 border-[#222222] pl-4 md:pl-6">
                  <div className="font-mono text-xs md:text-sm text-[#222222] mb-2 uppercase tracking-wider">
                    01 // THE LOGBOOK
                  </div>
                  <p className="font-mono text-sm md:text-base text-[#222222] leading-relaxed">
                    We use advanced telemetry to map every roast curve, logging heat and airflow in real-time. We use the technology to stabilize the data so we can focus on the craft. Think of it like a GPS on a trek: the tech shows you exactly where you are, but you still have to hike the trail.
                  </p>
                </div>

                {/* 02 // THE SOURCING CHAIN */}
                <div className="border-l-2 border-[#222222] pl-4 md:pl-6">
                  <div className="font-mono text-xs md:text-sm text-[#222222] mb-2 uppercase tracking-wider">
                    02 // THE SOURCING CHAIN
                  </div>
                  <p className="font-mono text-sm md:text-base text-[#222222] leading-relaxed">
                    Transparency over storytelling. We partner with professional importers who have decades-long roots in the farming co-ops. They handle the ethics at origin; we handle the chemistry in the shop.
                  </p>
                </div>

                {/* 03 // THE UTILITY LABEL */}
                <div className="border-l-2 border-[#222222] pl-4 md:pl-6">
                  <div className="font-mono text-xs md:text-sm text-[#222222] mb-2 uppercase tracking-wider">
                    03 // THE UTILITY LABEL
                  </div>
                  <p className="font-mono text-sm md:text-base text-[#222222] leading-relaxed">
                    Information should be readily available, not buried in a QR code. Our card stock labels are designed for expeditions—easy to read in low light, easy to mark with a Sharpie, and built to be tucked into a pack. No sticky waste, just the specs: Varietal, Altitude, Process.
                  </p>
                </div>

                {/* 04 // THE PERFORMANCE SUB */}
                <div className="border-l-2 border-[#222222] pl-4 md:pl-6">
                  <div className="font-mono text-xs md:text-sm text-[#222222] mb-2 uppercase tracking-wider">
                    04 // THE PERFORMANCE SUB
                  </div>
                  <p className="font-mono text-sm md:text-base text-[#222222] leading-relaxed">
                    15% off for trusting our system. No traps, no-contract flexibility. Reliability is the only loyalty program we need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}
