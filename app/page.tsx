import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-amber-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-amber-900">
            WILDFLIGHT
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
            <a href="#roasts" className="hover:text-amber-800 transition-colors">Roasts</a>
            <a href="#coop" className="hover:text-amber-800 transition-colors">Co-Op Program</a>
            <a href="#story" className="hover:text-amber-800 transition-colors">Our Story</a>
            <a href="#contact" className="hover:text-amber-800 transition-colors">Contact</a>
            <button className="bg-amber-800 text-white px-6 py-2 rounded-full hover:bg-amber-900 transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-bold text-stone-900 leading-tight">
                  Soar with
                  <span className="block text-amber-800">Every Sip</span>
                </h1>
                <p className="text-xl text-stone-600 leading-relaxed max-w-lg">
                  Hyper-local specialty coffee, roasted fresh in our Salt Lake City kitchen.
                  Delivered to your door or pick up from our home. Adventure starts here.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/coop" className="bg-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition-all transform hover:scale-105 shadow-lg text-center">
                  Join the Co-Op
                </a>
                <button className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-50 transition-all">
                  Explore Our Roasts
                </button>
                <button className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-50 transition-all">
                  Our Story
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/falcon-hero.jpg"
                  alt="Peregrine falcon portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-8 rounded-2xl bg-amber-50/50">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-stone-900">Hyper-Local</h3>
              <p className="text-stone-600">
                Roasted fresh in our Salt Lake City kitchen. Local delivery or pickup from our home—coffee that's truly from the neighborhood.
              </p>
            </div>
            <div className="text-center space-y-4 p-8 rounded-2xl bg-amber-50/50">
              <div className="text-5xl mb-4">☕</div>
              <h3 className="text-2xl font-bold text-stone-900">Kitchen Crafted</h3>
              <p className="text-stone-600">
                Small batch roasting in our home kitchen ensures every cup is perfectly crafted with personal attention to detail.
              </p>
            </div>
            <div className="text-center space-y-4 p-8 rounded-2xl bg-amber-50/50">
              <div className="text-5xl mb-4">🦅</div>
              <h3 className="text-2xl font-bold text-stone-900">Wild & Free</h3>
              <p className="text-stone-600">
                Inspired by birds of prey and the untamed spirit of the great outdoors. Born in the mountains, raised on adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roasts Section */}
      <section id="roasts" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-stone-900">Our Roasts</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Each blend tells a story of adventure, crafted for those who chase horizons
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {name: "Golden Eagle",desc: "Bold & Powerful",notes: "Dark roast with notes of dark chocolate and smoke"},
              {name: "Peregrine",desc: "Swift & Smooth",notes: "Medium roast with bright citrus and caramel"},
              {name: "Hawk's Flight",desc: "Elevated & Balanced",notes: "Light roast with floral notes and honey"},
            ].map((roast,i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-amber-800">{roast.name}</h3>
                  <p className="text-lg text-amber-600 font-semibold">{roast.desc}</p>
                  <p className="text-stone-600">{roast.notes}</p>
                  <button className="w-full mt-6 border-2 border-amber-800 text-amber-800 px-6 py-3 rounded-full font-semibold hover:bg-amber-800 hover:text-white transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Op Program Section */}
      <section id="coop" className="py-20 px-6 bg-gradient-to-b from-amber-50 to-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-stone-900">The Co-Op Program</h2>
              <p className="text-xl text-stone-700 leading-relaxed">
                Get wholesale prices without the wholesale commitment. Our unique co-op program lets you buy green beans directly and receive roasted coffee in bulk.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">Buy Green Beans</h3>
                    <p className="text-stone-600">Purchase green coffee beans directly through us at source pricing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">We Roast in Bulk</h3>
                    <p className="text-stone-600">We roast your beans fresh and deliver them roasted in bulk quantities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">Save on Packaging</h3>
                    <p className="text-stone-600">Skip the per-bag costs (bags, labels, packaging). Get retail-quality coffee at wholesale prices.</p>
                  </div>
                </div>
              </div>
              <button className="mt-6 bg-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition-all shadow-lg">
                Learn More About Co-Op
              </button>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-stone-900">Why Co-Op?</h3>
                <ul className="space-y-4 text-stone-700">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-800 font-bold">✓</span>
                    <span>Retail customers get wholesale pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-800 font-bold">✓</span>
                    <span>No per-bag packaging costs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-800 font-bold">✓</span>
                    <span>Fresh roasted, delivered in bulk</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-800 font-bold">✓</span>
                    <span>Support local, hyper-local roasting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-800 font-bold">✓</span>
                    <span>Perfect for coffee enthusiasts and small businesses</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 px-6 bg-gradient-to-b from-stone-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-stone-900">Our Story</h2>
          <div className="space-y-6 text-lg text-stone-700 leading-relaxed">
            <p>
              Wildflight Coffee was born from a passion for two things: exceptional coffee and the wild spirit of adventure.
              As a specialty micro-roaster based in Salt Lake City, I roast every batch fresh in my kitchen, drawing inspiration
              from the birds that soar above our mountain ranges and the hunters who respect the land.
            </p>
            <p>
              What makes us different? We're hyper-local. Every bean is roasted in my home kitchen, and you can pick up your
              coffee directly from my house or have it delivered locally. No warehouses, no middlemen—just fresh coffee from
              my kitchen to your cup.
            </p>
            <p>
              Every batch is roasted with precision, honoring the craft of specialty coffee while celebrating the untamed
              beauty of the American West. From the first light of dawn to the last call of the wild, we're here to fuel
              your next adventure.
            </p>
            <p className="text-xl font-semibold text-amber-800 italic">
              "For those who chase horizons and soar high."
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-stone-900">Get Your Coffee</h2>
          <p className="text-xl text-stone-600">
            Based in Salt Lake City, Utah. Pick up from our home or get local delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition-all shadow-lg">
              Place an Order
            </button>
            <button className="border-2 border-stone-300 text-stone-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-amber-800 hover:text-amber-800 transition-all">
              Contact Us
            </button>
          </div>
          <div className="mt-8 p-6 bg-amber-50 rounded-2xl">
            <p className="text-stone-700">
              <strong>Local Delivery:</strong> Available in Salt Lake City area<br />
              <strong>Pickup:</strong> Available from our home (contact for address)
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">WILDFLIGHT</h3>
              <p className="text-stone-400">
                Specialty micro-roasted coffee from Salt Lake City, Utah.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#roasts" className="hover:text-amber-400 transition-colors">Our Roasts</a></li>
                <li><a href="#coop" className="hover:text-amber-400 transition-colors">Co-Op Program</a></li>
                <li><a href="#story" className="hover:text-amber-400 transition-colors">Our Story</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center text-stone-500">
            <p>&copy; {new Date().getFullYear()} Wildflight Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
