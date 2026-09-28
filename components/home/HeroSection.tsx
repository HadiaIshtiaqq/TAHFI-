'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-obsidian text-ivory overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src="/images/hero-banner.jpg"
          alt="TAHFIÉ Editorial Luxury Handbag Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-ivory/10 backdrop-blur-md border border-ivory/20 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-warm-taupe">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Autumn / Winter 2026 Collection</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-ivory leading-[1.05]">
            Carry Your <br />
            <span className="italic font-light text-warm-taupe">Chapter.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-ivory/80 font-sans font-light leading-relaxed max-w-lg">
            Contemporary luxury bags handcrafted for modern Pakistani women. Engineered with quiet elegance, premium vegan leather, and bespoke gold-plated accents.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/shop?collection=new-arrivals"
              className="px-8 py-4 bg-ivory text-obsidian text-xs font-semibold uppercase tracking-[0.25em] hover:bg-muted-rose hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 group"
            >
              <span>Shop New Arrivals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 bg-transparent border border-ivory/40 text-ivory text-xs font-semibold uppercase tracking-[0.25em] hover:border-ivory hover:bg-ivory/10 transition-all text-center"
            >
              Explore TAHFIÉ
            </Link>
          </div>

          {/* Pakistani Delivery Guarantee Pill */}
          <div className="pt-8 flex items-center gap-6 text-xs text-warm-taupe/90 font-mono uppercase tracking-widest border-t border-ivory/15">
            <span>• Express Delivery Across Pakistan</span>
            <span>• Cash on Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};
