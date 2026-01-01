"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Logo_v2_LinkedIn400x300.png"
            alt="Wildflight Coffee"
            width={120}
            height={90}
            className="h-10 sm:h-12 md:h-14 w-auto transition-transform hover:scale-110"
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-base font-bold uppercase tracking-wider text-[#222222]">
          <Link href="/shop" className="hover:text-[#666666] transition-colors">The Provision Shop</Link>
          <Link href="/provisioning" className="hover:text-[#666666] transition-colors">Basecamp Subscription</Link>
          <Link href="/intel" className="hover:text-[#666666] transition-colors">Field Notes</Link>
          <Link href="/about" className="hover:text-[#666666] transition-colors">The Manifesto</Link>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#222222]"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E0E0E0]">
            <div className="px-4 py-4 space-y-4">
            <Link href="/shop" className="block text-base font-bold uppercase tracking-wider text-[#222222] hover:text-[#666666] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              The Provision Shop
            </Link>
            <Link href="/provisioning" className="block text-base font-bold uppercase tracking-wider text-[#222222] hover:text-[#666666] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Basecamp Subscription
            </Link>
            <Link href="/intel" className="block text-base font-bold uppercase tracking-wider text-[#222222] hover:text-[#666666] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Field Notes
            </Link>
            <Link href="/about" className="block text-base font-bold uppercase tracking-wider text-[#222222] hover:text-[#666666] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              The Manifesto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
