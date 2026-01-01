import { PortableText as SanityPortableText, PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-[#666666] leading-relaxed mb-4">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-black text-[#222222] mb-4 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-black text-[#222222] mb-3 mt-4">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-3 text-[#666666] list-disc list-inside">{children}</ul>,
    number: ({ children }) => <ol className="space-y-3 text-[#666666] list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#222222]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="font-mono bg-[#F5F5F5] px-2 py-1 text-sm">{children}</code>,
  },
  types: {
    code: ({ value }) => (
      <div className="bg-[#F5F5F5] p-6 border border-[#E0E0E0] font-mono text-base text-[#666666] my-4">
        <pre className="whitespace-pre-wrap">{value.code}</pre>
      </div>
    ),
  },
};

interface PortableTextProps {
  content: any;
}

export default function PortableText({ content }: PortableTextProps) {
  if (!content) return null;

  return (
    <div className="space-y-4">
      <SanityPortableText value={content} components={components} />
    </div>
  );
}

