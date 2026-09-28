'use client';

import React from 'react';
import { PRODUCTS } from '@/lib/data/products';
import { ProductCard } from '../product/ProductCard';
import Link from 'next/link';

export const BestsellersSection: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.collections.includes('best-sellers')).slice(0, 4);

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-warm-taupe">
            Most Coveted
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian">
            The Bestsellers
          </h2>
          <p className="text-xs text-obsidian/60 font-sans">Loved by trendsetters and working women across Pakistan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop?collection=best-sellers"
            className="inline-block px-8 py-3.5 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-muted-rose transition-colors"
          >
            Explore All Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
};
