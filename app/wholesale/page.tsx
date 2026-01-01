"use client";

import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    volume: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // You'd typically send this to an API route
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4">
            Wholesale
          </h1>
          <p className="text-xl text-slate-700 mb-12">
            Serving cafes, restaurants, and offices. Let's work together.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-3">What We Offer</h2>
                <ul className="space-y-2 text-slate-700">
                  <li>• Custom blends for your menu</li>
                  <li>• Consistent quality and supply</li>
                  <li>• Flexible ordering and delivery</li>
                  <li>• Competitive wholesale pricing</li>
                  <li>• Training and support</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-3">Minimum Orders</h2>
                <p className="text-slate-700">
                  We work with businesses ordering 5+ lbs per week. Volume discounts available for larger orders.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-3">Delivery</h2>
                <p className="text-slate-700 mb-4">
                  We deliver fresh-roasted coffee weekly. Local delivery available, shipping options for wider areas.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-3">Get Started</h2>
                <p className="text-slate-700">
                  Fill out the form and we'll get back to you within 24 hours to discuss your needs.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-base font-bold text-[#222222] mb-3">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full p-5 text-lg border-2 border-[#E0E0E0] rounded-lg font-medium text-[#222222] focus:border-[#222222] focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-bold text-slate-900 mb-2">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full p-5 text-lg border-2 border-[#E0E0E0] rounded-lg font-medium text-[#222222] focus:border-[#222222] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-5 text-lg border-2 border-[#E0E0E0] rounded-lg font-medium text-[#222222] focus:border-[#222222] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-slate-900 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-5 text-lg border-2 border-[#E0E0E0] rounded-lg font-medium text-[#222222] focus:border-[#222222] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="volume" className="block text-sm font-bold text-slate-900 mb-2">
                Estimated Weekly Volume
              </label>
              <select
                id="volume"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                className="w-full p-5 text-lg border-2 border-[#E0E0E0] rounded-lg font-medium text-[#222222] focus:border-[#222222] focus:outline-none"
              >
                <option value="">Select volume</option>
                <option value="5-10">5-10 lbs</option>
                <option value="10-25">10-25 lbs</option>
                <option value="25-50">25-50 lbs</option>
                <option value="50+">50+ lbs</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-5 text-lg border-2 border-[#E0E0E0] rounded-lg font-medium text-[#222222] focus:border-[#222222] focus:outline-none"
                placeholder="Tell us about your business and coffee needs..."
              />
            </div>

            <Button variant="primary" size="lg" type="submit" className="w-full">
              Submit Inquiry
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

