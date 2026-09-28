'use client';

import React from 'react';
import { PRODUCTS } from '@/lib/data/products';
import { ProductCard } from '../product/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const NewArrivalsSection: React.FC = () => {
  const newProducts = PRODUCTS.filter((p) => p.collections.includes('new-arrivals')).slice(0, 4);

  return (
    <section className="py-20 bg-ivory-light border-t border-b border-soft-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-muted-rose block mb-2">
              Just Unveiled
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?collection=new-arrivals"
            className="text-xs uppercase font-semibold tracking-widest text-obsidian hover:text-muted-rose transition-colors flex items-center gap-2 mt-4 md:mt-0"
          >
            <span>Explore All New Releases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
