'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { Product } from '@/lib/data/types';
import Image from 'next/image';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.colors.some((c) => c.name.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/60 backdrop-blur-md animate-fade-in p-4">
      <div className="w-full max-w-2xl bg-ivory shadow-2xl border border-soft-beige overflow-hidden">
        {/* Header input */}
        <div className="p-4 bg-white border-b border-soft-beige flex items-center gap-3">
          <Search className="w-5 h-5 text-obsidian/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bags, colors, categories (e.g. espresso, tote, crossbody)..."
            autoFocus
            className="flex-1 text-base font-serif text-obsidian placeholder:text-obsidian/40 focus:outline-none bg-transparent"
          />
          <button onClick={onClose} className="p-1 text-obsidian/40 hover:text-obsidian">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick searches */}
        {!query && (
          <div className="p-6 space-y-4">
            <p className="text-xs uppercase font-bold text-obsidian/50 tracking-wider">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Élan Shoulder Bag', 'Atelier Laptop Tote', 'Crossbody', 'Espresso', 'Evening Clutch', 'Work Bags'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 bg-white border border-soft-beige text-obsidian hover:bg-obsidian hover:text-ivory transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
            {results.length === 0 ? (
              <p className="text-center py-8 text-xs text-obsidian/60">
                No bags found matching &quot;{query}&quot;. Try searching &quot;tote&quot; or &quot;espresso&quot;.
              </p>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 bg-white border border-soft-beige hover:border-obsidian transition-colors group"
                >
                  <div className="relative w-14 h-16 bg-ivory flex-shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-semibold text-sm text-obsidian group-hover:text-muted-rose transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-obsidian/60">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-obsidian">PKR {product.price.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4 text-obsidian/30 group-hover:text-obsidian group-hover:translate-x-1 transition-all mt-1 ml-auto" />
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
