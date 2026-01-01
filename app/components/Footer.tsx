import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-white border-t-4 border-[#FF6B35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2 text-base text-gray-300">
              <li><Link href="/shop" className="hover:text-white transition-colors">The Provision Shop</Link></li>
              <li><Link href="/provisioning" className="hover:text-white transition-colors">Basecamp Subscription</Link></li>
              <li><Link href="/intel" className="hover:text-white transition-colors">Field Notes</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">The Manifesto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4">Market Tracker</h3>
            <div className="bg-[#333333] p-4 border border-[#444444] font-mono text-base">
              <div className="text-[#FF6B35] font-mono-bold mb-2">Next Market:</div>
              <div>Saturday, 8AM - City Park</div>
              <div className="text-gray-400 text-base mt-2">Come grab a bag from the Ledger</div>
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4">Get The Roasting Schedule</h3>
            <p className="text-base text-gray-300 mb-4">No spam, just drop alerts.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-5 py-3 text-lg bg-[#333333] border border-[#444444] text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6B35] font-mono"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#FF6B35] text-white px-6 py-3 text-base font-bold uppercase tracking-wide hover:bg-[#E55A2B] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#444444] pt-8 text-center text-base text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wildflight Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
