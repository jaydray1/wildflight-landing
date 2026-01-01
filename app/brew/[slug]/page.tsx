import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import AdventureWeather from "../../components/AdventureWeather";
import Accordion from "../../components/ui/Accordion";
import { getGuideBySlug } from "../../../lib/sanity.queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrewGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      drip: 'Drip',
      espresso: 'Espresso',
      milk: 'Milk',
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/brew"
              className="inline-block font-mono text-base text-[#666666] hover:text-[#222222] transition-colors mb-4"
            >
              ← Brew Guides
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-base text-[#666666] uppercase bg-[#F5F5F5] px-3 py-1 border border-[#E0E0E0]">
                {getTypeLabel(guide.type)}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#222222] mb-12">
              {guide.title}
            </h1>
          </div>

          {/* Tech Specs */}
          {guide.specs && (
            <div className="bg-white border-2 border-[#222222] p-6 md:p-8 mb-8">
              <div className="font-mono-bold text-base text-[#222222] uppercase mb-4">Specs</div>
              <div className="font-mono text-base text-[#666666] space-y-2">
                {guide.specs.ratio && (
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>Ratio:</span>
                    <span className="text-[#222222] font-mono-bold">{guide.specs.ratio}</span>
                  </div>
                )}
                {guide.specs.grind && (
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>Grind:</span>
                    <span className="text-[#222222] font-mono-bold">{guide.specs.grind}</span>
                  </div>
                )}
                {guide.specs.waterTemp && (
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>Water Temp:</span>
                    <span className="text-[#222222] font-mono-bold">{guide.specs.waterTemp}</span>
                  </div>
                )}
                {guide.specs.brewTime && (
                  <div className="flex justify-between pb-2">
                    <span>Brew Time:</span>
                    <span className="text-[#222222] font-mono-bold">{guide.specs.brewTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Steps */}
          {guide.steps && guide.steps.length > 0 && (
            <div className="bg-white border-2 border-[#222222] p-8 md:p-12 mb-8">
              <div className="space-y-6">
                {guide.steps.map((step, index) => (
                  <div key={index} className="border-b border-[#E0E0E0] pb-6 last:border-b-0 last:pb-0">
                    <div className="font-mono-bold text-2xl text-[#FF6B35] mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-xl font-black text-[#222222] mb-3">{step.stepTitle}</h3>
                    <p className="text-[#666666] leading-relaxed">{step.instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Troubleshooting */}
          <div className="bg-white border-2 border-[#222222]">
            <Accordion title="Troubleshooting">
              <div className="space-y-4 text-[#666666]">
                <div>
                  <div className="font-black text-[#222222] mb-2">Coffee tastes sour</div>
                  <p className="font-mono text-base">Grind finer, use hotter water, or extend brew time</p>
                </div>
                <div>
                  <div className="font-black text-[#222222] mb-2">Coffee tastes bitter</div>
                  <p className="font-mono text-base">Grind coarser, use cooler water, or shorten brew time</p>
                </div>
                <div>
                  <div className="font-black text-[#222222] mb-2">Coffee is weak</div>
                  <p className="font-mono text-base">Use more coffee or less water</p>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}

