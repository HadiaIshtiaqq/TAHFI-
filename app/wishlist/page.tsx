'use client';

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlistProducts } = useWishlist();

  return (
    <div className="bg-ivory min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 border-b border-soft-beige pb-6">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-warm-taupe">
            Saved Edits
          </span>
          <h1 className="font-serif text-4xl font-normal text-obsidian">Your Wishlist</h1>
          <p className="text-xs text-obsidian/60 font-sans">
            {wishlistProducts.length} items saved for your next chapter
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="font-serif text-2xl text-obsidian">Your wishlist is currently empty</p>
            <p className="text-xs text-obsidian/60">Click the heart icon on any bag to save it here.</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-obsidian text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-muted-rose"
            >
              Discover Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
