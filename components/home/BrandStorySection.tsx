'use client';

import React from 'react';
import Link from 'next/link';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-24 bg-ivory text-obsidian border-b border-soft-beige">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <span className="text-xs uppercase font-bold tracking-[0.4em] text-warm-taupe block">
          Designed in Karachi • Handcrafted for Pakistan
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-obsidian">
          &quot;This is a fashion brand, not just another Instagram store.&quot;
        </h2>

        <p className="text-base text-obsidian/75 font-light leading-relaxed max-w-2xl mx-auto">
          TAHFIÉ was born out of a desire to create refined luxury bags tailored for the Pakistani woman&apos;s lifestyle. From corporate boardrooms in Karachi to weekend dinners in Islamabad, our bags marry high-grade vegan materials with timeless editorial design.
        </p>

        <div className="pt-4">
          <Link
            href="/about"
            className="inline-block border-b-2 border-obsidian pb-1 text-xs uppercase tracking-[0.25em] font-semibold text-obsidian hover:text-muted-rose hover:border-muted-rose transition-colors"
          >
            Read Our Brand Manifesto →
          </Link>
        </div>
      </div>
    </section>
  );
};
