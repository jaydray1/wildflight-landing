"use client";

import { useState } from "react";
import Drawer from "./ui/Drawer";
import { Guide } from "../../lib/sanity.queries";

interface BrewGuidesProps {
  guides?: Guide[];
  associatedGuide?: Guide | null;
}

export default function BrewGuides({ guides = [], associatedGuide }: BrewGuidesProps) {
  const [selectedGuideType, setSelectedGuideType] = useState<'drip' | 'espresso' | 'milk' | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Create a map of guides by type
  const guidesByType: Record<'drip' | 'espresso' | 'milk', Guide | null> = {
    drip: guides.find(g => g.type === 'drip') || null,
    espresso: guides.find(g => g.type === 'espresso') || null,
    milk: guides.find(g => g.type === 'milk') || null,
  };

  // If associatedGuide exists, use it for its type
  if (associatedGuide) {
    guidesByType[associatedGuide.type] = associatedGuide;
  }

  const handleButtonClick = (type: 'drip' | 'espresso' | 'milk') => {
    const guide = guidesByType[type];
    if (guide) {
      setSelectedGuideType(type);
      setDrawerOpen(true);
    }
  };

  const selectedGuide = selectedGuideType ? guidesByType[selectedGuideType] : null;

  return (
    <>
      <div className="bg-white border-2 border-[#222222] p-6 md:p-8">
        <div className="font-mono-bold text-base text-[#222222] uppercase mb-4">Brew Guides</div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleButtonClick('drip')}
            disabled={!guidesByType.drip}
            className={`px-4 py-2 border-2 font-bold uppercase tracking-wide transition-all ${
              guidesByType.drip
                ? 'border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white cursor-pointer'
                : 'border-[#E0E0E0] text-[#CCCCCC] cursor-not-allowed opacity-50'
            }`}
          >
            Drip Guide →
          </button>
          <button
            onClick={() => handleButtonClick('espresso')}
            disabled={!guidesByType.espresso}
            className={`px-4 py-2 border-2 font-bold uppercase tracking-wide transition-all ${
              guidesByType.espresso
                ? 'border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white cursor-pointer'
                : 'border-[#E0E0E0] text-[#CCCCCC] cursor-not-allowed opacity-50'
            }`}
          >
            Espresso Guide →
          </button>
          <button
            onClick={() => handleButtonClick('milk')}
            disabled={!guidesByType.milk}
            className={`px-4 py-2 border-2 font-bold uppercase tracking-wide transition-all ${
              guidesByType.milk
                ? 'border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white cursor-pointer'
                : 'border-[#E0E0E0] text-[#CCCCCC] cursor-not-allowed opacity-50'
            }`}
          >
            Milk Guide →
          </button>
        </div>
      </div>

      {/* Slide-over Drawer */}
      {selectedGuide && (
        <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title={selectedGuide.title}>
          <div className="space-y-8">
            {/* Type Badge */}
            <div>
              <span className="font-mono text-sm text-[#666666] uppercase bg-[#F5F5F5] px-3 py-1 border border-[#E0E0E0]">
                {selectedGuide.type}
              </span>
            </div>

            {/* Specs */}
            {selectedGuide.specs && (
              <div className="bg-[#F5F5F5] border-2 border-[#222222] p-6">
                <div className="font-mono-bold text-base text-[#222222] uppercase mb-4">Specs</div>
                <div className="font-mono text-base text-[#666666] space-y-2">
                  {selectedGuide.specs.ratio && (
                    <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                      <span>Ratio:</span>
                      <span className="text-[#222222] font-mono-bold">{selectedGuide.specs.ratio}</span>
                    </div>
                  )}
                  {selectedGuide.specs.grind && (
                    <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                      <span>Grind:</span>
                      <span className="text-[#222222] font-mono-bold">{selectedGuide.specs.grind}</span>
                    </div>
                  )}
                  {selectedGuide.specs.waterTemp && (
                    <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                      <span>Water Temp:</span>
                      <span className="text-[#222222] font-mono-bold">{selectedGuide.specs.waterTemp}</span>
                    </div>
                  )}
                  {selectedGuide.specs.brewTime && (
                    <div className="flex justify-between pb-2">
                      <span>Brew Time:</span>
                      <span className="text-[#222222] font-mono-bold">{selectedGuide.specs.brewTime}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Steps */}
            {selectedGuide.steps && selectedGuide.steps.length > 0 && (
              <div>
                <div className="font-mono-bold text-base text-[#222222] uppercase mb-4">Steps</div>
                <div className="space-y-6">
                  {selectedGuide.steps.map((step, index) => (
                    <div key={index} className="border-b border-[#E0E0E0] pb-6 last:border-b-0 last:pb-0">
                      <div className="font-mono-bold text-2xl text-[#FF6B35] mb-2">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-xl font-black text-[#222222] mb-3">{step.stepTitle}</h3>
                      <p className="text-[#666666] leading-relaxed font-mono text-base">{step.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Drawer>
      )}
    </>
  );
}

