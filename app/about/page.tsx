'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen pb-24 space-y-20">
      {/* Editorial Hero Header */}
      <div className="relative bg-obsidian text-ivory py-28 border-b border-soft-beige/30 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image src="/images/hero-banner.jpg" alt="TAHFIÉ Editorial Story" fill className="object-cover" />
          <div className="absolute inset-0 bg-obsidian/80"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-warm-taupe">
            A Pakistani Fashion House
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-normal text-ivory">
            The Story Behind TAHFIÉ
          </h1>
          <p className="text-sm text-warm-taupe/90 max-w-xl mx-auto font-light leading-relaxed">
            Contemporary luxury bags, handcrafted in Pakistan for every chapter of your life.
          </p>
        </div>
      </div>

      {/* Manifesto Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-obsidian">
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-rose">01. Our Vision</span>
            <h2 className="font-serif text-3xl font-semibold">Not just another Instagram store.</h2>
            <p className="text-xs text-obsidian/80 font-sans leading-relaxed">
              TAHFIÉ was established in Karachi to fill a distinct void in the Pakistani market: luxury, structured handbags designed with quiet luxury principles, uncompromising quality, and accessible PKR pricing.
            </p>
          </div>
          <div className="md:col-span-6 relative aspect-square bg-white border border-soft-beige shadow-lg">
            <Image src="/images/elan-espresso.jpg" alt="TAHFIÉ Élan Detail" fill className="object-cover" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 order-2 md:order-1 relative aspect-square bg-white border border-soft-beige shadow-lg">
            <Image src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop" alt="TAHFIÉ Atelier Craftsmanship" fill className="object-cover" />
          </div>
          <div className="md:col-span-6 order-1 md:order-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-rose">02. Design Philosophy</span>
            <h2 className="font-serif text-3xl font-semibold">Made for Modern Pakistani Life.</h2>
            <p className="text-xs text-obsidian/80 font-sans leading-relaxed">
              Our designs cater to women navigating corporate careers, university campuses, family events, and international travel. We utilize scratch-resistant microfiber vegan leathers and custom light gold hardware built to withstand Pakistan&apos;s tropical climate.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-obsidian text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-muted-rose"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
