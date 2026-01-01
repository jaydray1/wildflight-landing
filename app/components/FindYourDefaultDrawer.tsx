"use client";

import { useState } from "react";
import Drawer from "./ui/Drawer";
import Button from "./ui/Button";
import { QuizAnswer, Profile } from "../types/coffee";
import { findCoffeeByQuiz } from "../lib/coffee-data";
import Link from "next/link";

interface FindYourDefaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FindYourDefaultDrawer({ isOpen, onClose }: FindYourDefaultDrawerProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [recommendedCoffee, setRecommendedCoffee] = useState<any>(null);

  const handleAnswer = (question: keyof QuizAnswer, value: any) => {
    const newAnswers = { ...answers, [question]: value };
    setAnswers(newAnswers);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final answer
      const finalAnswers = { ...newAnswers, vibe: value } as QuizAnswer;
      const coffee = findCoffeeByQuiz(finalAnswers);
      setRecommendedCoffee(coffee);
      setStep(4);
    }
  };

  const reset = () => {
    setStep(1);
    setAnswers({});
    setRecommendedCoffee(null);
  };

  const getProfileColor = (profile: Profile) => {
    switch (profile) {
      case "bright":
        return "bg-yellow-100 text-yellow-900";
      case "balanced":
        return "bg-green-100 text-green-900";
      case "bold":
        return "bg-slate-900 text-white";
      default:
        return "bg-slate-100 text-slate-900";
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={step < 4 ? "Find Your Default" : undefined}>
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900">How do you drink it?</h3>
          <div className="space-y-3">
            {[
              { value: "black", label: "Black" },
              { value: "milk", label: "With milk" },
              { value: "espresso", label: "Espresso" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer("drinkStyle", option.value)}
                className="w-full p-4 text-left border-2 border-slate-200 rounded-lg hover:border-slate-900 hover:bg-slate-50 transition-all font-bold"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900">What do you hate?</h3>
          <div className="space-y-3">
            {[
              { value: "sour", label: "Sour" },
              { value: "bitter", label: "Bitter" },
              { value: "weak", label: "Weak" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer("dislike", option.value)}
                className="w-full p-4 text-left border-2 border-slate-200 rounded-lg hover:border-slate-900 hover:bg-slate-50 transition-all font-bold"
              >
                {option.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-slate-600 hover:text-slate-900">
            ← Back
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900">Pick a vibe</h3>
          <div className="space-y-3">
            {[
              { value: "bright", label: "Bright", desc: "Lively, citrusy, energetic" },
              { value: "balanced", label: "Balanced", desc: "Smooth, versatile, reliable" },
              { value: "bold", label: "Bold", desc: "Rich, intense, powerful" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer("vibe", option.value)}
                className="w-full p-4 text-left border-2 border-slate-200 rounded-lg hover:border-slate-900 hover:bg-slate-50 transition-all"
              >
                <div className="font-bold text-slate-900">{option.label}</div>
                <div className="text-sm text-slate-600">{option.desc}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="text-slate-600 hover:text-slate-900">
            ← Back
          </button>
        </div>
      )}

      {step === 4 && recommendedCoffee && (
        <div className="space-y-6">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-3 ${getProfileColor(recommendedCoffee.profile)}`}>
              {recommendedCoffee.profile.charAt(0).toUpperCase() + recommendedCoffee.profile.slice(1)}
            </span>
            <h3 className="text-3xl font-black text-slate-900 mb-2">{recommendedCoffee.name}</h3>
            <p className="text-slate-700">{recommendedCoffee.story}</p>
          </div>

          <div className="space-y-3">
            <Link
              href={`/coffee/${recommendedCoffee.slug}`}
              className="block w-full p-4 bg-slate-900 text-white text-center font-bold uppercase tracking-wide hover:bg-slate-800 transition-all rounded-lg"
              onClick={onClose}
            >
              Buy 12 oz · ${recommendedCoffee.variants["12oz"].price}
            </Link>
            <Link
              href={`/subscribe?coffee=${recommendedCoffee.slug}&size=12oz`}
              className="block w-full p-4 bg-white text-slate-900 text-center font-bold uppercase tracking-wide hover:bg-slate-50 transition-all rounded-lg ring-1 ring-slate-300"
              onClick={onClose}
            >
              Make it my default (Subscribe)
            </Link>
            {(answers.drinkStyle === "espresso" || answers.drinkStyle === "milk") && (
              <Link
                href={`/coffee/${recommendedCoffee.slug}?variant=2lb`}
                className="block w-full p-4 bg-white text-slate-900 text-center font-medium hover:bg-slate-50 transition-all rounded-lg ring-1 ring-slate-200 text-sm"
                onClick={onClose}
              >
                Also great in 2 lb · ${recommendedCoffee.variants["2lb"].price} (best value)
              </Link>
            )}
          </div>

          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="text-slate-600 hover:text-slate-900"
          >
            Start over
          </button>
        </div>
      )}
    </Drawer>
  );
}

