'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTICLES } from '@/lib/data/articles';
import { generateArticleSchema } from '@/lib/seo/jsonLd';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';

export default function SingleArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
  const articleSchema = generateArticleSchema(article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="bg-ivory min-h-screen pb-24">
        {/* Back link */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/journal" className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-obsidian hover:text-muted-rose">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4 text-center">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-muted-rose">
              {article.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-xs text-obsidian/60 pt-2 border-t border-b border-soft-beige py-3 font-sans">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {article.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full bg-white border border-soft-beige shadow-md overflow-hidden">
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          </div>

          {/* Article Body */}
          <div className="prose prose-stone max-w-none text-obsidian/85 font-sans leading-relaxed text-sm sm:text-base space-y-6 pt-4">
            <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
          </div>

          {/* Related Tags */}
          <div className="pt-8 border-t border-soft-beige flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-obsidian">Tags:</span>
              {article.tags.map((t) => (
                <span key={t} className="text-xs bg-white border border-soft-beige px-2.5 py-1 text-obsidian/80">
                  #{t}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-obsidian hover:text-muted-rose"
            >
              <Share2 className="w-4 h-4" /> Share Article
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
