'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const SignatureEditSection: React.FC = () => {
  return (
    <section className="py-20 bg-obsidian text-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Editorial Text */}
        <div className="lg:col-span-5 space-y-6 z-10">
          <span className="text-xs uppercase font-bold tracking-[0.35em] text-gold block">
            The Signature Edit
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-ivory">
            The Élan <br />
            <span className="italic text-warm-taupe">Espresso Edit</span>
          </h2>
          <p className="text-sm text-warm-taupe/90 font-light leading-relaxed">
            Our hallmark shoulder bag represents the perfect synthesis of architectural precision, Italian-style burnished vegan leather, and bespoke light gold hardware.
          </p>

          <div className="pt-2 space-y-2 border-l-2 border-gold/40 pl-4 text-xs text-ivory/80">
            <p>• Custom Gold Plated TAHFIÉ Emblem</p>
            <p>• Scratch & Water Resistant Microfiber Leather</p>
            <p>• Fits iPhone 16 Pro Max, Long Wallet & Daily Essentials</p>
          </div>

          <div className="pt-4 flex items-center gap-6">
            <Link
              href="/products/tahfie-elan-espresso"
              className="px-8 py-4 bg-ivory text-obsidian text-xs font-semibold uppercase tracking-widest hover:bg-muted-rose hover:text-white transition-all inline-flex items-center gap-2"
            >
              <span>Discover Élan (PKR 5,490)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hero Product Shot */}
        <div className="lg:col-span-7 relative aspect-square sm:aspect-[4/3] bg-obsidian-950 border border-obsidian-800 overflow-hidden shadow-2xl">
          <Image
            src="/images/elan-espresso.jpg"
            alt="TAHFIÉ Élan Espresso Signature Bag"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
          />
        </div>
      </div>
    </section>
  );
};
