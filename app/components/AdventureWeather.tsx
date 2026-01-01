"use client";

import Image from "next/image";

interface WeatherReport {
  location: string;
  elevation: string;
  temp: number;
  condition: string;
  wind: string;
  image: string;
}

const adventureSpots: WeatherReport[] = [
  {
    location: "K2 Base Camp",
    elevation: "5,150m",
    temp: 10,
    condition: "Clear",
    wind: "15 km/h",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031d91d?w=800&h=600&fit=crop&q=80",
  },
  {
    location: "Everest Base Camp",
    elevation: "5,364m",
    temp: 18,
    condition: "Partly Cloudy",
    wind: "12 km/h",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop&q=80",
  },
  {
    location: "Denali",
    elevation: "6,190m",
    temp: 0,
    condition: "Snow",
    wind: "25 km/h",
    image: "https://images.unsplash.com/photo-1464822759844-d150ad9c3c93?w=800&h=600&fit=crop&q=80",
  },
  {
    location: "Kilimanjaro",
    elevation: "5,895m",
    temp: 23,
    condition: "Clear",
    wind: "8 km/h",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop&q=80",
  },
  {
    location: "Patagonia",
    elevation: "3,405m",
    temp: 36,
    condition: "Windy",
    wind: "35 km/h",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop&q=80",
  },
];

export default function AdventureWeather() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center border-b-2 border-[#222222] pb-6">
          <div className="font-mono-bold text-2xl text-[#222222] mb-2 uppercase">Field Conditions</div>
          <div className="text-lg text-[#666666] font-mono">
            Weather reports from the world's top adventure spots
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {adventureSpots.map((spot, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] border-2 border-[#222222] overflow-hidden hover:border-[#FF6B35] transition-colors"
            >
              <div className="aspect-video relative bg-[#222222]">
                <Image
                  src={spot.image}
                  alt={spot.location}
                  fill
                  className="object-cover grayscale contrast-125"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="font-black text-xl text-[#222222] mb-1">{spot.location}</div>
                  <div className="font-mono text-base text-[#666666]">{spot.elevation}</div>
                </div>

              <div className="space-y-2 font-mono text-base">
                <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="text-[#666666]">Temp:</span>
                  <span className="text-[#222222] font-mono-bold">
                    {spot.temp}°F
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                  <span className="text-[#666666]">Condition:</span>
                  <span className="text-[#222222]">{spot.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Wind:</span>
                  <span className="text-[#222222]">{spot.wind}</span>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="font-mono text-sm text-[#666666]">
            Data updated hourly • Conditions at base camp elevation
          </div>
        </div>
      </div>
    </section>
  );
}

