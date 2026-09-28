'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/data/products';
import { CATEGORIES } from '@/lib/data/categories';
import { COLLECTIONS } from '@/lib/data/collections';
import { ProductCard } from '@/components/product/ProductCard';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialCollection = searchParams.get('collection') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedColor, setSelectedColor] = useState('');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory && p.categorySlug !== selectedCategory) return false;
      if (selectedCollection && !p.collections.includes(selectedCollection)) return false;
      if (selectedColor && !p.colors.some((c) => c.name.toLowerCase() === selectedColor.toLowerCase())) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured / default
    });
  }, [selectedCategory, selectedCollection, selectedColor, maxPrice, inStockOnly, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedCollection('');
    setSelectedColor('');
    setMaxPrice(15000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedCollection ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (maxPrice < 15000 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-obsidian text-ivory py-16 border-b border-soft-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-warm-taupe">
            Flagship Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-ivory">
            {selectedCategory
              ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Collection'
              : selectedCollection
              ? COLLECTIONS.find((c) => c.slug === selectedCollection)?.name || 'Edit'
              : 'All Bags & Accessories'}
          </h1>
          <p className="text-xs text-warm-taupe/90 max-w-lg mx-auto font-light">
            Discover architectural luxury bags handcrafted with premium vegan leather and custom gold hardware.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Bar & Count Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-soft-beige">
          <div className="flex items-center gap-4">
            {/* Filter Drawer Button */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-soft-beige text-xs uppercase font-semibold text-obsidian hover:border-obsidian transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-obsidian text-ivory rounded-full text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <span className="text-xs text-obsidian/60">
              Showing <strong className="text-obsidian">{filteredProducts.length}</strong> designs
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-obsidian/50" />
            <span className="text-obsidian/60 uppercase font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white border border-soft-beige text-xs font-medium text-obsidian focus:outline-none focus:border-obsidian cursor-pointer"
            >
              <option value="featured">Featured Edit</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filter Pills */}
        {activeFilterCount > 0 && (
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-obsidian/50 font-medium">Active filters:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-soft-beige text-obsidian text-xs rounded-full">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedCollection && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-soft-beige text-obsidian text-xs rounded-full">
                Collection: {selectedCollection}
                <button onClick={() => setSelectedCollection('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedColor && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-soft-beige text-obsidian text-xs rounded-full">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {maxPrice < 15000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-soft-beige text-obsidian text-xs rounded-full">
                Max PKR {maxPrice.toLocaleString()}
                <button onClick={() => setMaxPrice(15000)}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-muted-rose underline font-semibold ml-2 hover:text-obsidian"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Catalog Grid */}
        <div className="pt-8">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl text-obsidian">No bags match your exact filter criteria</p>
              <p className="text-xs text-obsidian/60">Try adjusting your price slider or color selection.</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-obsidian text-ivory text-xs uppercase font-semibold tracking-widest hover:bg-muted-rose"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xs bg-ivory h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-soft-beige pb-4">
                <h3 className="font-serif text-xl font-bold text-obsidian">Filter Catalog</h3>
                <button onClick={() => setFilterDrawerOpen(false)} className="p-1 text-obsidian">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold text-obsidian tracking-wider">Category</h4>
                <div className="space-y-1.5 text-xs text-obsidian/80">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                    />
                    <span>All Categories</span>
                  </label>
                  {CATEGORIES.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Slider in PKR */}
              <div className="space-y-3 border-t border-soft-beige pt-4">
                <div className="flex justify-between items-center text-xs">
                  <h4 className="uppercase font-bold text-obsidian tracking-wider">Max Price</h4>
                  <span className="font-bold text-obsidian">PKR {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                  className="w-full accent-obsidian cursor-pointer"
                />
              </div>

              {/* Color filter */}
              <div className="space-y-3 border-t border-soft-beige pt-4">
                <h4 className="text-xs uppercase font-bold text-obsidian tracking-wider">Color Hues</h4>
                <div className="flex flex-wrap gap-2">
                  {['Espresso', 'Obsidian Black', 'Warm Taupe', 'Muted Rose', 'Soft Beige', 'Champagne Gold'].map(
                    (col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(selectedColor === col ? '' : col)}
                        className={`px-3 py-1.5 text-xs border rounded-none transition-colors ${
                          selectedColor === col
                            ? 'bg-obsidian text-ivory border-obsidian'
                            : 'bg-white text-obsidian border-soft-beige hover:border-obsidian'
                        }`}
                      >
                        {col}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* In Stock toggle */}
              <div className="border-t border-soft-beige pt-4">
                <label className="flex items-center gap-2 text-xs font-semibold text-obsidian cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-obsidian"
                  />
                  <span>Show Ready-to-Ship Items Only</span>
                </label>
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="pt-6 border-t border-soft-beige space-y-2">
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="w-full py-3 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-muted-rose"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-2 text-xs text-obsidian/70 hover:text-obsidian uppercase"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import ClientOnly from '@/components/common/ClientOnly';

export default function ShopPage() {
  return (
    <ClientOnly fallback={<div className="py-24 text-center font-serif text-xl">Loading TAHFIÉ Shop...</div>}>
      <Suspense fallback={<div className="py-24 text-center font-serif text-xl">Loading TAHFIÉ Shop...</div>}>
        <ShopContent />
      </Suspense>
    </ClientOnly>
  );
}
