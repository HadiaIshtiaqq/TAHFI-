'use client';

import React, { useState } from 'react';
import { FAQS } from '@/lib/data/faqs';
import { generateFAQSchema } from '@/lib/seo/jsonLd';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  const faqSchema = generateFAQSchema(FAQS);

  const categories = ['All', 'Shipping & Delivery', 'Payment & Ordering', 'Exchanges & Returns', 'Product & Care', 'Brand'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-ivory min-h-screen pb-24">
        <div className="bg-obsidian text-ivory py-16 text-center space-y-4 border-b border-soft-beige/30">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-warm-taupe">
            AEO & Customer Care Knowledge Base
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-ivory">Frequently Asked Questions</h1>
          <p className="text-xs text-warm-taupe/90 max-w-md mx-auto font-light">
            Everything you need to know about TAHFIÉ shipping in Pakistan, payment methods, exchanges, and handbag care.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-obsidian/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQ (e.g. COD delivery time, exchange policy, vegan leather)..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-soft-beige text-xs text-obsidian placeholder:text-obsidian/40 focus:outline-none focus:border-obsidian shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-obsidian text-ivory border-obsidian'
                    : 'bg-white text-obsidian border-soft-beige hover:border-obsidian'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <p className="text-center py-12 text-xs text-obsidian/60">No questions found matching your search query.</p>
            ) : (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white border border-soft-beige shadow-sm">
                  <button
                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-ivory/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-muted-rose flex-shrink-0" />
                      <span className="font-serif text-lg font-semibold text-obsidian">{faq.question}</span>
                    </div>
                    {openFaqId === faq.id ? (
                      <ChevronUp className="w-4 h-4 text-obsidian flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-obsidian/40 flex-shrink-0" />
                    )}
                  </button>

                  {openFaqId === faq.id && (
                    <div className="px-5 pb-5 pt-1 text-xs text-obsidian/80 font-sans leading-relaxed border-t border-soft-beige/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
