'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Shield, Truck, RefreshCw, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-obsidian text-ivory pt-8 pb-6 border-t border-obsidian-800 text-xs" suppressHydrationWarning>
      {/* Compact Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 border-b border-obsidian-800 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2.5">
          <Truck className="w-4 h-4 text-warm-taupe flex-shrink-0" />
          <span className="text-[11px] text-warm-taupe/90 font-medium">Nationwide Express Delivery</span>
        </div>

        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-4 h-4 text-warm-taupe flex-shrink-0" />
          <span className="text-[11px] text-warm-taupe/90 font-medium">7-Day Easy Exchange Policy</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-warm-taupe flex-shrink-0" />
          <span className="text-[11px] text-warm-taupe/90 font-medium">Cash on Delivery Available</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-warm-taupe flex-shrink-0" />
          <span className="text-[11px] text-warm-taupe/90 font-medium">256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      {/* Main Footer Compact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-3">
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl font-bold tracking-[0.2em] text-ivory uppercase block">
              TAHFIÉ
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-warm-taupe block mt-0.5">
              Karachi • Pakistan
            </span>
          </Link>
          <p className="text-[11px] text-warm-taupe/80 leading-relaxed font-sans max-w-xs">
            Contemporary luxury bags handcrafted in Pakistan for every chapter of your life.
          </p>
          <a
            href="https://wa.me/923008243433?text=Hello%20TAHFI%C3%89%20Support"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 border border-emerald-700/60 text-emerald-200 text-[11px] rounded hover:bg-emerald-800 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp (+92 300 TAHFIE)</span>
          </a>
        </div>

        {/* Shop Links */}
        <div className="space-y-2">
          <h5 className="text-[11px] uppercase font-bold tracking-widest text-ivory">Shop</h5>
          <ul className="space-y-1.5 text-[11px] text-warm-taupe">
            <li><Link href="/shop?category=shoulder-bags" className="hover:text-ivory">Shoulder Bags</Link></li>
            <li><Link href="/shop?category=tote-bags" className="hover:text-ivory">Work & Laptop Totes</Link></li>
            <li><Link href="/shop?category=crossbody" className="hover:text-ivory">Crossbody Bags</Link></li>
            <li><Link href="/shop?category=clutches" className="hover:text-ivory">Evening Clutches</Link></li>
            <li><Link href="/shop?collection=new-arrivals" className="hover:text-ivory">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-2">
          <h5 className="text-[11px] uppercase font-bold tracking-widest text-ivory">Customer Care</h5>
          <ul className="space-y-1.5 text-[11px] text-warm-taupe">
            <li><Link href="/faq" className="hover:text-ivory">Shipping & Delivery FAQ</Link></li>
            <li><Link href="/faq" className="hover:text-ivory">7-Day Exchange Policy</Link></li>
            <li><Link href="/contact" className="hover:text-ivory">Contact Support</Link></li>
            <li><Link href="/about" className="hover:text-ivory">Our Brand Story</Link></li>
            <li><Link href="/journal" className="hover:text-ivory">The TAHFIÉ Journal</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-2">
          <h5 className="text-[11px] uppercase font-bold tracking-widest text-ivory">Newsletter</h5>
          <form onSubmit={handleNewsletter} className="flex gap-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 bg-obsidian-950 border border-obsidian-700 text-[11px] text-ivory placeholder:text-warm-taupe/50 focus:outline-none"
            />
            <button type="submit" className="px-3 py-1.5 bg-warm-taupe text-obsidian font-semibold text-[11px] uppercase hover:bg-ivory transition-colors">
              Join
            </button>
          </form>
          {subscribed && <p className="text-[10px] text-emerald-400">Subscribed!</p>}

          <div className="pt-1 flex items-center space-x-3 text-warm-taupe text-[10px]">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">Instagram</a>
            <span>•</span>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">TikTok</a>
            <span>•</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">Facebook</a>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-obsidian-800 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-warm-taupe/70">
        <p suppressHydrationWarning>© 2026 TAHFIÉ Leather Goods. All Rights Reserved. Designed in Karachi, Pakistan.</p>

        <div className="flex flex-wrap items-center gap-2 uppercase font-mono text-[9px]">
          <span className="px-2 py-0.5 bg-obsidian-950 border border-obsidian-700 rounded">CASH ON DELIVERY</span>
          <span className="px-2 py-0.5 bg-obsidian-950 border border-obsidian-700 rounded">VISA / MASTERCARD</span>
          <span className="px-2 py-0.5 bg-obsidian-950 border border-obsidian-700 rounded">JAZZCASH</span>
          <span className="px-2 py-0.5 bg-obsidian-950 border border-obsidian-700 rounded">EASYPAISA</span>
        </div>
      </div>
    </footer>
  );
};
