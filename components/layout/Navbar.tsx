'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { AIStylistDrawer } from '../ai/AIStylistDrawer';
import { SearchModal } from '../search/SearchModal';
import { CartDrawer } from '../cart/CartDrawer';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiStylistOpen, setAiStylistOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300" suppressHydrationWarning>
        {/* Announcement Bar */}
        <div className="bg-obsidian text-ivory text-[11px] py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2">
          <span>Complimentary Express Delivery Nationwide on Orders Over PKR 10,000</span>
          <span className="hidden sm:inline text-warm-taupe">•</span>
          <span className="hidden sm:inline text-warm-taupe">Cash on Delivery Available</span>
        </div>

        <nav
          className={`w-full transition-all duration-300 ${
            isScrolled ? 'glass-nav shadow-sm py-3.5' : 'bg-ivory/95 py-5 border-b border-soft-beige/70'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center">
            {/* Left Nav Column */}
            <div className="flex items-center justify-start">
              {/* Desktop Links */}
              <div className="hidden lg:flex items-center space-x-6 text-xs font-semibold uppercase tracking-widest text-obsidian">
                <Link href="/shop" className="hover:text-muted-rose transition-colors">
                  Shop All
                </Link>
                <Link href="/shop?category=shoulder-bags" className="hover:text-muted-rose transition-colors">
                  Shoulder Bags
                </Link>
                <Link href="/shop?category=tote-bags" className="hover:text-muted-rose transition-colors">
                  Work Totes
                </Link>
                <Link href="/shop?category=clutches" className="hover:text-muted-rose transition-colors">
                  Evening
                </Link>
                <Link href="/journal" className="hover:text-muted-rose transition-colors">
                  Journal
                </Link>
              </div>

              {/* Mobile Hamburger */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-1.5 text-obsidian hover:text-muted-rose transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Center Column - Brand Logo Absolutely Centered */}
            <div className="flex items-center justify-center text-center">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-obsidian uppercase block leading-none">
                  TAHFIÉ
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-warm-taupe group-hover:text-obsidian transition-colors block mt-1">
                  Karachi • Pakistan
                </span>
              </Link>
            </div>

            {/* Right Column - Icons */}
            <div className="flex items-center justify-end space-x-3 sm:space-x-5">
              {/* AI Stylist Button */}
              <button
                onClick={() => setAiStylistOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-obsidian text-ivory rounded-full text-xs font-medium hover:bg-muted-rose transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>AI Stylist</span>
              </button>

              {/* Search Icon */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-1.5 text-obsidian hover:text-muted-rose transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-1.5 text-obsidian hover:text-muted-rose transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-muted-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-obsidian hover:text-muted-rose transition-colors relative flex items-center gap-1"
                aria-label="View bag"
                suppressHydrationWarning
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && cartCount > 0 && (
                  <span className="w-4 h-4 bg-obsidian text-ivory text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="w-4/5 max-w-sm bg-ivory h-full shadow-2xl flex flex-col justify-between p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-soft-beige pb-4">
                <span className="font-serif text-xl font-bold tracking-widest text-obsidian">TAHFIÉ</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-obsidian">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* AI Stylist Mobile Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAiStylistOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Launch AI Stylist</span>
              </button>

              <div className="space-y-4 text-sm font-semibold uppercase tracking-wider text-obsidian flex flex-col">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>
                  Shop All Bags
                </Link>
                <Link href="/shop?category=shoulder-bags" onClick={() => setMobileMenuOpen(false)}>
                  Shoulder Bags
                </Link>
                <Link href="/shop?category=tote-bags" onClick={() => setMobileMenuOpen(false)}>
                  Work & Laptop Totes
                </Link>
                <Link href="/shop?category=crossbody" onClick={() => setMobileMenuOpen(false)}>
                  Crossbody
                </Link>
                <Link href="/shop?category=clutches" onClick={() => setMobileMenuOpen(false)}>
                  Evening Clutches
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                  About TAHFIÉ
                </Link>
                <Link href="/journal" onClick={() => setMobileMenuOpen(false)}>
                  Journal & Style Guide
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact & Support
                </Link>
                <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                  My Account
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-soft-beige text-xs text-obsidian/70 space-y-2">
              <p className="font-semibold text-obsidian">Customer Support (PK):</p>
              <p>WhatsApp: +92 300 TAHFIE (8243433)</p>
              <p>Email: care@tahfie.pk</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Drawer Modal */}
      <AIStylistDrawer isOpen={aiStylistOpen} onClose={() => setAiStylistOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
};
