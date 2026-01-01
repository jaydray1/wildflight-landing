import { use } from "react";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Accordion from "../../components/ui/Accordion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const guides: Record<string, { title: string; content: any }> = {
  "start-here": {
    title: "Start Here",
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">The Basics</h2>
          <p className="text-slate-700 mb-4">
            Great coffee comes down to three things: fresh beans, good water, and the right ratio.
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>Use fresh coffee:</strong> Roasted within the last 2-3 weeks</li>
            <li>• <strong>Use good water:</strong> Filtered is best, avoid distilled</li>
            <li>• <strong>Get the ratio right:</strong> Start with 1:15 (1g coffee to 15g water)</li>
            <li>• <strong>Grind fresh:</strong> Grind just before brewing for best flavor</li>
          </ul>
        </div>
      </div>
    ),
  },
  "v60": {
    title: "V60 Guide",
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">What You Need</h2>
          <ul className="space-y-2 text-slate-700">
            <li>• V60 dripper</li>
            <li>• V60 filters</li>
            <li>• Gooseneck kettle</li>
            <li>• Scale</li>
            <li>• Medium-fine grind coffee</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">The Method</h2>
          <ol className="space-y-4 text-slate-700 list-decimal list-inside">
            <li>Heat water to 200-205°F</li>
            <li>Weigh 20g coffee, grind medium-fine</li>
            <li>Rinse filter with hot water, discard water</li>
            <li>Add coffee, create a small well in the center</li>
            <li>Bloom: Pour 40g water, wait 30 seconds</li>
            <li>Pour to 300g in a slow, spiral motion</li>
            <li>Total brew time: 2:30-3:00</li>
          </ol>
        </div>
      </div>
    ),
  },
  "espresso": {
    title: "Espresso Basics",
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">The Foundation</h2>
          <p className="text-slate-700 mb-4">
            Espresso is about precision and pressure. Start with good equipment and fresh beans.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Basic Parameters</h2>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>Dose:</strong> 18-20g coffee</li>
            <li>• <strong>Yield:</strong> 36-40g espresso</li>
            <li>• <strong>Time:</strong> 25-30 seconds</li>
            <li>• <strong>Temperature:</strong> 200-205°F</li>
            <li>• <strong>Grind:</strong> Fine, like table salt</li>
          </ul>
        </div>
      </div>
    ),
  },
  "french-press": {
    title: "French Press",
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">What You Need</h2>
          <ul className="space-y-2 text-slate-700">
            <li>• French press</li>
            <li>• Coarse ground coffee</li>
            <li>• Hot water (200°F)</li>
            <li>• Timer</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">The Method</h2>
          <ol className="space-y-4 text-slate-700 list-decimal list-inside">
            <li>Heat water to 200°F</li>
            <li>Add 30g coarse ground coffee</li>
            <li>Pour 500g water, stir gently</li>
            <li>Place lid, don't press yet</li>
            <li>Steep for 4 minutes</li>
            <li>Press slowly and serve</li>
          </ol>
        </div>
      </div>
    ),
  },
};

export default function BrewGuidePage({ params }: PageProps) {
  const { slug } = use(params);
  const guide = guides[slug];

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-12">
            {guide.title}
          </h1>

          <div className="prose prose-slate max-w-none">
            {guide.content}
          </div>

          <div className="mt-16">
            <Accordion title="Troubleshooting">
              <div className="space-y-4 text-slate-700">
                <div>
                  <div className="font-bold mb-2">Coffee tastes sour</div>
                  <p>Grind finer, use hotter water, or extend brew time</p>
                </div>
                <div>
                  <div className="font-bold mb-2">Coffee tastes bitter</div>
                  <p>Grind coarser, use cooler water, or shorten brew time</p>
                </div>
                <div>
                  <div className="font-bold mb-2">Coffee is weak</div>
                  <p>Use more coffee or less water</p>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

