'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES } from '@/lib/data/articles';
import { ArrowRight } from 'lucide-react';

export const JournalSection: React.FC = () => {
  return (
    <section className="py-20 bg-soft-beige/40 border-t border-soft-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-muted-rose block mb-2">
              Editorial Content
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian">
              The TAHFIÉ Journal
            </h2>
          </div>
          <Link
            href="/journal"
            className="text-xs uppercase font-semibold tracking-widest text-obsidian hover:text-muted-rose transition-colors flex items-center gap-2 mt-4 md:mt-0"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group bg-white border border-soft-beige overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full bg-ivory overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-warm-taupe tracking-wider">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-obsidian group-hover:text-muted-rose transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-obsidian/70 font-sans line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-obsidian uppercase tracking-wider group-hover:text-muted-rose">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
