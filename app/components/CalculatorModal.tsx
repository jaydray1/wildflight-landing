"use client";

import { useState } from "react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const [cupsPerDay, setCupsPerDay] = useState(0);
  const [ouncesPerCup, setOuncesPerCup] = useState(12);
  const [brewingMethod, setBrewingMethod] = useState("filter");

  const brewingRatios: Record<string, number> = {
    filter: 18,
    "pour-over": 16,
    aeropress: 11,
  };

  const ozToGrams = 28.35;
  const coffeeToWaterRatio = brewingRatios[brewingMethod] || 16;
  const coffeeBeansPerCupGrams = (ouncesPerCup * ozToGrams) / coffeeToWaterRatio;
  const coffeeBeansPerCupOz = coffeeBeansPerCupGrams / ozToGrams;
  const totalDailyOzBeans = cupsPerDay * coffeeBeansPerCupOz;
  const monthlyPounds = ((totalDailyOzBeans * 30) / 16).toFixed(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 md:p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 sm:mb-8">
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 sm:mb-6 uppercase tracking-tight">Coffee consumption calculator</h3>
          <p className="text-lg sm:text-xl text-slate-700 font-medium">
            Calculate your monthly coffee needs based on your brewing habits
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          <div>
            <label className="block text-lg sm:text-xl font-black text-slate-900 mb-4 sm:mb-6 text-center uppercase tracking-tight">
              What brewing method do you use?
            </label>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              {[
                { id: "filter", label: "Filter/Drip" },
                { id: "pour-over", label: "Pour-Over" },
                { id: "aeropress", label: "Aeropress" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setBrewingMethod(method.id)}
                  className={`px-6 sm:px-8 py-3 sm:py-4 border-2 transition-all font-bold uppercase tracking-wide text-sm sm:text-base ${
                    brewingMethod === method.id
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg sm:text-xl font-black text-slate-900 mb-4 sm:mb-6 text-center uppercase tracking-tight">
              Cup size (ounces)?
            </label>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              {[6, 8, 12, 16, 20].map((oz) => (
                <button
                  key={oz}
                  onClick={() => setOuncesPerCup(oz)}
                  className={`px-6 sm:px-8 py-3 sm:py-4 border-2 transition-all font-bold text-sm sm:text-base ${
                    ouncesPerCup === oz
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                  }`}
                >
                  {oz} oz
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg sm:text-xl font-black text-slate-900 mb-4 sm:mb-6 text-center uppercase tracking-tight">
              Cups per day?
            </label>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setCupsPerDay(num)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 border-2 transition-all flex items-center justify-center font-black text-base sm:text-lg ${
                    cupsPerDay === num
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-300 text-slate-900 hover:border-slate-900"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {cupsPerDay > 0 && (
            <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t-2 border-slate-200 text-center">
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 sm:mb-4 uppercase tracking-tight">Your monthly coffee needs</h4>
              <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-3 sm:mb-4">{monthlyPounds} lbs</p>
              <p className="text-slate-600 text-base sm:text-lg font-medium">
                Based on {cupsPerDay} {cupsPerDay === 1 ? "cup" : "cups"} of {ouncesPerCup}oz coffee per day
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





