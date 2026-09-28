'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Ayesha Khan',
    city: 'Lahore',
    rating: 5,
    title: 'Exceeded all expectations!',
    text: 'The quality of the leather and stitching feels like a luxury European designer bag. Received so many compliments at my office in Gulberg!',
    product: 'Élan Shoulder Bag (Espresso)'
  },
  {
    id: 2,
    name: 'Mahnoor Ali',
    city: 'Karachi',
    rating: 5,
    title: 'Perfect for Karachi commute',
    text: 'Delivered in 2 days via COD. The packaging felt like unboxing a high-end gift. The espresso shade goes with both lawn suits and western wear.',
    product: 'Atelier Work Tote (Warm Taupe)'
  },
  {
    id: 3,
    name: 'Zainab Siddiqui',
    city: 'Islamabad',
    rating: 5,
    title: 'Great capacity and sturdy gold hardware',
    text: 'Fits my Kindle, long wallet, cosmetic pouch and keys easily without bulging. 10/10 recommendation!',
    product: 'Lumina Camera Crossbody'
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-ivory text-obsidian border-b border-soft-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-warm-taupe">
            Social Proof & Trust
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian">
            Client Reflections
          </h2>
          <p className="text-xs text-obsidian/60 font-sans">Over 4,500+ satisfied women across Karachi, Lahore, & Islamabad</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 bg-white border border-soft-beige shadow-sm flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <h3 className="font-serif text-lg font-semibold text-obsidian">&quot;{rev.title}&quot;</h3>
                <p className="text-xs text-obsidian/75 font-sans leading-relaxed italic">
                  &quot;{rev.text}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-soft-beige/60 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-obsidian">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-obsidian/50">{rev.city}, Pakistan</span>
                </div>

                <span className="text-[10px] uppercase tracking-wider font-mono text-warm-taupe bg-ivory px-2 py-1 rounded">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
