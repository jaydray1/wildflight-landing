import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AdventureWeather from "../components/AdventureWeather";
import Button from "../components/ui/Button";
import { getFieldNotes, getFeaturedFieldNote } from "../../lib/sanity.queries";

export default async function IntelPage() {
  const [articles, featured] = await Promise.all([
    getFieldNotes(),
    getFeaturedFieldNote(),
  ]);

  // Separate featured from regular articles
  const regularArticles = featured
    ? articles.filter(article => article.slug.current !== featured.slug.current)
    : articles;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 border-b-2 border-[#222222] pb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#222222] mb-2">
              Field Notes
            </h1>
            <p className="text-lg text-[#666666] font-mono">
              Technical roasting blog and guides — expertise, not marketing
            </p>
          </div>

          {/* Featured Article */}
          {featured && (
            <div className="bg-white border-2 border-[#222222] mb-12">
              <div className="p-8 border-b-2 border-[#222222]">
                <div className="font-mono text-base text-[#666666] uppercase mb-3">
                  Featured: {featured.category || 'Field Notes'}
                </div>
                <h2 className="text-3xl font-black text-[#222222] mb-4">{featured.title}</h2>
                {featured.excerpt && (
                  <p className="text-[#666666] text-lg mb-6 leading-relaxed">{featured.excerpt}</p>
                )}
                <Link
                  href={`/intel/${featured.slug.current}`}
                  className="inline-block font-mono-bold text-base text-[#FF6B35] hover:text-[#E55A2B] transition-colors"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          )}

          {/* Article List */}
          <div className="space-y-0 border border-[#222222] bg-white">
            {regularArticles.map((article, index) => (
              <Link
                key={article._id}
                href={`/intel/${article.slug.current}`}
                className={`block p-6 border-b border-[#E0E0E0] last:border-b-0 hover:bg-[#FAFAFA] transition-colors ${
                  index === 0 ? "bg-[#FAFAFA]" : ""
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {article.category && (
                        <>
                          <span className="font-mono text-base text-[#666666] uppercase">{article.category}</span>
                          <span className="font-mono text-base text-[#666666]">·</span>
                        </>
                      )}
                      <span className="font-mono text-base text-[#666666]">{formatDate(article.publishedAt)}</span>
                    </div>
                    <h3 className="text-xl font-black text-[#222222] mb-3 hover:text-[#FF6B35] transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-[#666666] text-base leading-relaxed">{article.excerpt}</p>
                    )}
                  </div>
                  <div className="font-mono text-lg text-[#FF6B35]">→</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div className="mt-12 p-6 bg-white border border-[#E0E0E0]">
            <div className="font-mono-bold text-base text-[#222222] mb-4 uppercase">Categories</div>
            <div className="flex flex-wrap gap-3">
              {["Technical", "Roasting Notes", "Field Guides", "Batch Logs"].map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 bg-[#F5F5F5] border border-[#E0E0E0] font-mono text-base text-[#666666] hover:border-[#222222] hover:text-[#222222] transition-colors cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}

