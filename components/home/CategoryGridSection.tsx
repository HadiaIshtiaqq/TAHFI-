'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/data/categories';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGridSection: React.FC = () => {
  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-soft-beige pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-warm-taupe block mb-2">
              Curated Silhouettes
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase font-semibold tracking-widest text-obsidian hover:text-muted-rose transition-colors flex items-center gap-1 mt-4 md:mt-0"
          >
            <span>View Full Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 4).map((category, idx) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative aspect-[3/4] bg-white border border-soft-beige overflow-hidden flex flex-col justify-end p-6 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent"></div>

              {/* Text Over Card */}
              <div className="relative z-10 space-y-1 text-ivory">
                <span className="text-[10px] uppercase tracking-widest text-warm-taupe font-semibold">
                  {category.itemCount} Designs
                </span>
                <h3 className="font-serif text-2xl font-normal group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-ivory/70 line-clamp-1 font-light">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
