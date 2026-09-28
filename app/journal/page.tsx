'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES } from '@/lib/data/articles';
import { ArrowRight } from 'lucide-react';

export default function JournalPage() {
  return (
    <div className="bg-ivory min-h-screen pb-24">
      <div className="bg-obsidian text-ivory py-16 border-b border-soft-beige/30 text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-warm-taupe">
          Fashion Editorial & Style Guides
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-ivory">The TAHFIÉ Journal</h1>
        <p className="text-xs text-warm-taupe/90 max-w-md mx-auto font-light">
          Styling guides, handbag care tips, and fashion trends tailored for women in Pakistan.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group bg-white border border-soft-beige overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[16/10] w-full bg-ivory">
                <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-warm-taupe tracking-wider">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-obsidian group-hover:text-muted-rose transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs text-obsidian/70 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-obsidian uppercase tracking-wider group-hover:text-muted-rose">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
