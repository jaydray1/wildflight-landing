import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import AdventureWeather from "../../components/AdventureWeather";
import PortableText from "../../components/PortableText";
import { getFieldNoteBySlug } from "../../../lib/sanity.queries";
import { urlFor } from "../../../lib/sanity.queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IntelArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getFieldNoteBySlug(slug);

  if (!article) {
    notFound();
  }

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/intel"
              className="inline-block font-mono text-base text-[#666666] hover:text-[#222222] transition-colors mb-4"
            >
              ← Field Notes
            </Link>
            {article.category && (
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-base text-[#666666] uppercase">{article.category}</span>
                <span className="font-mono text-base text-[#666666]">·</span>
                <span className="font-mono text-base text-[#666666]">{formatDate(article.publishedAt)}</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl font-black text-[#222222] mb-4">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-xl text-[#666666] font-medium mb-8 leading-relaxed">
                {article.subtitle}
              </p>
            )}
          </div>

          {/* Tech Specs */}
          {article.techSpecs && (
            <div className="bg-white border-2 border-[#222222] p-6 md:p-8 mb-8">
              <div className="font-mono-bold text-base text-[#222222] uppercase mb-4">The Mission</div>
              <div className="font-mono text-base text-[#666666] space-y-2">
                {article.techSpecs.expedition && (
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>Expedition:</span>
                    <span className="text-[#222222] font-mono-bold">{article.techSpecs.expedition}</span>
                  </div>
                )}
                {article.techSpecs.roaster && (
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>Roaster:</span>
                    <span className="text-[#222222] font-mono-bold">{article.techSpecs.roaster}</span>
                  </div>
                )}
                {article.techSpecs.bean && (
                  <div className="flex justify-between border-b border-[#E0E0E0] pb-2">
                    <span>The Bean:</span>
                    <span className="text-[#222222] font-mono-bold">{article.techSpecs.bean}</span>
                  </div>
                )}
                {article.techSpecs.targetProfile && (
                  <div className="flex justify-between pb-2">
                    <span>Target Profile:</span>
                    <span className="text-[#222222] font-mono-bold">{article.techSpecs.targetProfile}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {article.mainImage && (
            <div className="mb-8 aspect-video relative bg-[#222222]">
              <Image
                src={urlFor(article.mainImage).width(1200).height(675).url()}
                alt={article.title}
                fill
                className="object-cover grayscale contrast-125"
              />
            </div>
          )}

          <div className="bg-white border-2 border-[#222222] p-8 md:p-12">
            <article className="prose prose-slate max-w-none">
              <PortableText content={article.content} />
            </article>
          </div>

          {/* Gear List */}
          {article.gearList && article.gearList.length > 0 && (
            <div className="mt-8 bg-white border-2 border-[#222222] p-6 md:p-8">
              <div className="font-mono-bold text-base text-[#222222] uppercase mb-4">Gear List</div>
              <div className="space-y-3">
                {article.gearList.map((gear, index) => (
                  <div key={index} className="flex justify-between border-b border-[#E0E0E0] pb-2 last:border-b-0">
                    <span className="font-mono-bold text-[#222222]">{gear.item}</span>
                    {gear.details && (
                      <span className="font-mono text-base text-[#666666]">{gear.details}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <AdventureWeather />
      <Footer />
    </div>
  );
}

