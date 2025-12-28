"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Logo_v2_LinkedIn400x300.png"
            alt="Wildflight Coffee"
            width={120}
            height={90}
            className="h-8 sm:h-10 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-800">
          <Link href="/house-batch" className="hover:text-slate-600 transition-colors">House Batch Program</Link>
          <Link href="/about" className="hover:text-slate-600 transition-colors">About</Link>
          <Link href="/house-batch" className="bg-slate-900 text-white px-6 py-3 hover:bg-slate-800 transition-colors font-bold">
            Get Started
          </Link>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-900"
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
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-4">
            <Link href="/house-batch" className="block text-sm font-bold uppercase tracking-wider text-slate-800 hover:text-slate-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              House Batch Program
            </Link>
            <Link href="/about" className="block text-sm font-bold uppercase tracking-wider text-slate-800 hover:text-slate-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/house-batch" className="block bg-slate-900 text-white px-6 py-3 hover:bg-slate-800 transition-colors font-bold text-center text-sm uppercase tracking-wider" onClick={() => setMobileMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

