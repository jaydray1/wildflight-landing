import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          <div>
            <div className="mb-4 sm:mb-6">
              <Link href="/">
                <Image
                  src="/images/Logo_v2_LinkedIn400x300.png"
                  alt="Wildflight Coffee"
                  width={120}
                  height={90}
                  className="h-7 sm:h-8 w-auto brightness-0 invert"
                />
              </Link>
            </div>
            <p className="text-sm sm:text-base text-slate-500">
              Specialty micro-roasted coffee from Salt Lake City, Utah.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 sm:mb-6 uppercase tracking-wide text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/house-batch" className="hover:text-white transition-colors font-medium text-sm sm:text-base">House Batch Program</Link></li>
              <li><Link href="/enthusiast-coop" className="hover:text-white transition-colors font-medium text-sm sm:text-base">Enthusiast Co-Op</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors font-medium text-sm sm:text-base">About</Link></li>
            </ul>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-bold text-white mb-4 sm:mb-6 uppercase tracking-wide text-sm sm:text-base">Connect</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="hover:text-white transition-colors font-medium text-sm sm:text-base">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-medium text-sm sm:text-base">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-medium text-sm sm:text-base">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center text-slate-600 text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} Wildflight Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

