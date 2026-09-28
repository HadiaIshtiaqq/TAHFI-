'use client';

import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';
import { Product } from '@/lib/data/types';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface AIStylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIStylistDrawer: React.FC<AIStylistDrawerProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [adviceText, setAdviceText] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const textToSearch = customQuery || query;
    if (!textToSearch.trim()) return;

    setIsThinking(true);

    setTimeout(() => {
      const q = textToSearch.toLowerCase();
      let matches = PRODUCTS.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const catMatch = p.category.toLowerCase().includes(q);
        const colorMatch = p.colors.some((c) => c.name.toLowerCase().includes(q));
        const descMatch = p.description.toLowerCase().includes(q);
        const tagMatch = p.tagline.toLowerCase().includes(q);

        // Price checks in PKR
        if (q.includes('under') || q.includes('less than') || q.includes('<')) {
          const matchNumber = q.match(/\d+/);
          if (matchNumber) {
            let limit = parseInt(matchNumber[0], 10);
            if (limit < 100) limit = limit * 1000; // e.g. 8k -> 8000
            return p.price <= limit;
          }
        }

        return nameMatch || catMatch || colorMatch || descMatch || tagMatch;
      });

      if (matches.length === 0) {
        matches = PRODUCTS.slice(0, 3);
        setAdviceText(
          `Here are our hallmark TAHFIÉ recommendations based on contemporary Pakistani style preferences for "${textToSearch}":`
        );
      } else {
        if (q.includes('work') || q.includes('laptop') || q.includes('office')) {
          setAdviceText(
            `For work & office use in Pakistan, structured space and device protection are essential. We recommend the Atelier Tote and Élan Shoulder Bag:`
          );
        } else if (q.includes('wedding') || q.includes('party') || q.includes('evening')) {
          setAdviceText(
            `For Pakistani festive events & formal dinners, metallic hardware and compact clutches make the ultimate statement:`
          );
        } else if (q.includes('black') || q.includes('obsidian')) {
          setAdviceText(`Here are TAHFIÉ's signature Obsidian Black pieces crafted for timeless versatility:`);
        } else {
          setAdviceText(`Here are personalized TAHFIÉ bags matching your query:`);
        }
      }

      setRecommendations(matches);
      setIsThinking(false);
    }, 600);
  };

  const samplePrompts = [
    'Black handbag for office & laptop under PKR 8,000',
    'What bag should I carry to a wedding in Lahore?',
    'Everyday lightweight crossbody for university',
    'Espresso brown shoulder bag with gold hardware'
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-ivory h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-soft-beige">
        {/* Header */}
        <div className="p-6 bg-obsidian text-ivory flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-xl tracking-wide text-ivory">TAHFIÉ AI Stylist</h3>
              <p className="text-xs text-warm-taupe">Personalized luxury bag recommendations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-warm-taupe hover:text-white transition-colors"
            aria-label="Close Stylist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Query Form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-obsidian/70">
              Describe your occasion, color, or budget preference
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Black office bag for 14 inch laptop under PKR 8000"
                className="w-full pl-4 pr-12 py-3 bg-white border border-soft-beige text-sm text-obsidian placeholder:text-obsidian/40 focus:outline-none focus:border-obsidian transition-colors rounded-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-obsidian hover:text-muted-rose transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Suggestions */}
          <div>
            <p className="text-xs text-obsidian/60 mb-2 font-medium">Or tap a quick style query:</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(prompt);
                    handleSearch(undefined, prompt);
                  }}
                  className="text-xs px-3 py-1.5 bg-white border border-soft-beige hover:border-obsidian hover:bg-obsidian hover:text-ivory transition-all text-left text-obsidian/80"
                >
                  ✨ {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Thinking state */}
          {isThinking && (
            <div className="py-12 text-center space-y-3">
              <div className="inline-block w-8 h-8 border-2 border-obsidian border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-obsidian/60 italic font-serif">
                Consulting TAHFIÉ catalog & Pakistani fashion preferences...
              </p>
            </div>
          )}

          {/* Results */}
          {!isThinking && adviceText && (
            <div className="space-y-4 pt-2">
              <div className="p-3 bg-white/80 border border-soft-beige rounded text-xs text-obsidian/80 leading-relaxed font-sans">
                {adviceText}
              </div>

              <div className="space-y-3">
                {recommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex gap-4 p-3 bg-white border border-soft-beige hover:border-warm-taupe transition-colors group"
                  >
                    <div className="relative w-20 h-24 bg-ivory flex-shrink-0 overflow-hidden">
                      <Image
                        src={prod.images[0]}
                        alt={prod.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/products/${prod.slug}`}
                            onClick={onClose}
                            className="font-serif font-semibold text-base text-obsidian hover:text-muted-rose transition-colors"
                          >
                            {prod.name}
                          </Link>
                          <span className="text-xs font-semibold text-obsidian">
                            PKR {prod.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-obsidian/60 line-clamp-1 mt-1">{prod.tagline}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] uppercase font-bold text-warm-taupe tracking-wider">
                          {prod.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/products/${prod.slug}`}
                            onClick={onClose}
                            className="text-xs underline text-obsidian hover:text-muted-rose"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => addToCart(prod)}
                            className="p-1.5 bg-obsidian text-ivory hover:bg-muted-rose transition-colors"
                            title="Add to Bag"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-soft-beige text-center">
          <p className="text-[11px] text-obsidian/60">
            TAHFIÉ AI Assistant matches catalog specifications with real Pakistani wardrobe needs.
          </p>
        </div>
      </div>
    </div>
  );
};
