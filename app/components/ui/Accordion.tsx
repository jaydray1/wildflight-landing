"use client";

import { ReactNode, useState } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-0 flex items-center justify-between text-left"
      >
        <span className="font-bold text-slate-900">{title}</span>
        <svg
          className={`w-5 h-5 text-slate-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-slate-700">
          {children}
        </div>
      )}
    </div>
  );
}

