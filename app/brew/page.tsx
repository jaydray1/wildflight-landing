import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdventureWeather from "../components/AdventureWeather";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getGuides } from "../../lib/sanity.queries";

export default async function BrewPage() {
  const guides = await getGuides();

  // Sort guides: drip first, then espresso, then milk
  const sortedGuides = [...guides].sort((a, b) => {
    const order = { drip: 1, espresso: 2, milk: 3 };
    return (order[a.type] || 99) - (order[b.type] || 99);
  });

  const dripGuide = guides.find((g) => g.type === 'drip');
  const otherGuides = sortedGuides.filter((g) => g.type !== 'drip');

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
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-b-2 border-[#222222] pb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#222222] mb-2">
              Brew Guides
            </h1>
            <p className="text-lg text-[#666666] font-mono">
              Simple guides to help you brew better coffee at home. No jargon, just results.
            </p>
          </div>

          {/* Featured Drip Guide */}
          {dripGuide && (
            <div className="mb-16">
              <Card className="overflow-hidden border-2 border-[#222222]">
                <Link href={`/brew/${dripGuide.slug.current}`}>
                  <div className="grid md:grid-cols-2">
                    <div className="bg-[#222222] p-12 text-white">
                      <div className="font-mono text-base uppercase tracking-wider mb-4 opacity-80">
                        Start Here
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black mb-4">{dripGuide.title}</h2>
                      <div className="font-mono text-sm mb-6 opacity-90">
                        {getTypeLabel(dripGuide.type)} Guide
                      </div>
                      <Button variant="secondary" size="md">
                        Read guide →
                      </Button>
                    </div>
                    <div className="bg-[#F5F5F5] aspect-square"></div>
                  </div>
                </Link>
              </Card>
            </div>
          )}

          {/* Other Guides */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherGuides.map((guide) => (
              <Card key={guide._id} hover className="overflow-hidden border-2 border-[#222222]">
                <Link href={`/brew/${guide.slug.current}`}>
                  <div className="bg-[#F5F5F5] aspect-video"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-[#666666] uppercase bg-[#F5F5F5] px-2 py-1">
                        {getTypeLabel(guide.type)}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-[#222222] mb-2">{guide.title}</h3>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {guides.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#666666]">No brew guides available yet.</p>
              <p className="text-base text-[#666666] mt-2 font-mono">
                Add guides in Sanity Studio to see them here.
              </p>
            </div>
          )}
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}

