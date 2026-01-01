import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function BrewPage() {
  const guides = [
    {
      slug: "start-here",
      title: "Start Here",
      description: "The basics of brewing great coffee at home",
      featured: true,
    },
    {
      slug: "v60",
      title: "V60 Guide",
      description: "The standard pour-over method for clean, bright coffee",
    },
    {
      slug: "espresso",
      title: "Espresso Basics",
      description: "Getting started with espresso at home",
    },
    {
      slug: "french-press",
      title: "French Press",
      description: "Rich, full-bodied coffee with full immersion",
    },
    {
      slug: "aeropress",
      title: "AeroPress",
      description: "Versatile and forgiving brewing method",
    },
    {
      slug: "cold-brew",
      title: "Cold Brew",
      description: "Smooth, low-acid coffee for hot days",
    },
  ];

  const featured = guides.find((g) => g.featured);
  const otherGuides = guides.filter((g) => !g.featured);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4">
            Brew Guides
          </h1>
          <p className="text-xl text-slate-700 mb-12 max-w-3xl">
            Simple guides to help you brew better coffee at home. No jargon, just results.
          </p>

          {featured && (
            <div className="mb-16">
              <Card className="overflow-hidden">
                <Link href={`/brew/${featured.slug}`}>
                  <div className="grid md:grid-cols-2">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-700 p-12 text-white">
                      <div className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80">
                        Featured Guide
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black mb-4">{featured.title}</h2>
                      <p className="text-lg opacity-90 mb-6">{featured.description}</p>
                      <Button variant="secondary" size="md">
                        Read guide →
                      </Button>
                    </div>
                    <div className="bg-slate-100 aspect-square"></div>
                  </div>
                </Link>
              </Card>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherGuides.map((guide) => (
              <Card key={guide.slug} hover className="overflow-hidden">
                <Link href={`/brew/${guide.slug}`}>
                  <div className="bg-slate-100 aspect-video"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-slate-900 mb-2">{guide.title}</h3>
                    <p className="text-slate-600">{guide.description}</p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

