'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data/products';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo/jsonLd';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Share2,
  Sparkles,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'care' | 'shipping'>('desc');
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  // Cross sell items
  const recommendations = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  // Delivery estimate calculation
  const getDeliveryEstimate = (city: string) => {
    const c = city.toLowerCase();
    if (c === 'karachi') return 'Delivered Express (Same Day / 1-2 Days) in Karachi';
    if (c === 'lahore' || c === 'islamabad' || c === 'rawalpindi') return 'Delivered in 2-3 Business Days';
    return 'Delivered in 3-4 Business Days Nationwide';
  };

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: product.category, url: `/shop?category=${product.categorySlug}` },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    router.push('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment && newName) {
      product.reviews.unshift({
        id: `rev-${Date.now()}`,
        author: newName,
        city: selectedCity,
        rating: newRating,
        date: new Date().toISOString().split('T')[0],
        title: 'Outstanding craftsmanship',
        comment: newComment,
        verified: true,
      });
      setReviewSubmitted(true);
      setNewComment('');
      setNewName('');
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-ivory min-h-screen pb-24">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-soft-beige">
          <nav className="flex items-center gap-2 text-xs text-obsidian/60">
            <Link href="/" className="hover:text-obsidian">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-obsidian">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-obsidian">{product.category}</Link>
            <span>/</span>
            <span className="text-obsidian font-semibold truncate">{product.name}</span>
          </nav>
        </div>

        {/* Main PDP Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full bg-white border border-soft-beige overflow-hidden shadow-sm group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {product.originalPrice && (
                <span className="absolute top-4 left-4 z-10 bg-muted-rose text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
                  SAVE PKR {(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-24 bg-white border flex-shrink-0 transition-all ${
                    selectedImage === img ? 'border-obsidian ring-1 ring-obsidian' : 'border-soft-beige opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Buy Box & Product Specs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Tagline */}
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-warm-taupe block mb-1">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-obsidian leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-obsidian/60 mt-1">{product.tagline}</p>

              {/* Rating Summary */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-obsidian">{product.rating}</span>
                <span className="text-xs text-obsidian/50">({product.reviewCount} Client Reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white border border-soft-beige space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-obsidian">PKR {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-obsidian/40 line-through">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">
                ✓ Inclusive of all taxes • Free Shipping on orders over PKR 10,000
              </p>
            </div>

            {/* Color Swatch Selection */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-bold text-obsidian tracking-wider">
                Select Color: <span className="font-normal text-obsidian/70">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => {
                      setSelectedColor(col);
                      if (col.image) setSelectedImage(col.image);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 border text-xs transition-all ${
                      selectedColor.name === col.name
                        ? 'border-obsidian bg-white font-semibold ring-1 ring-obsidian'
                        : 'border-soft-beige bg-white/60 hover:border-obsidian'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: col.hex }}></span>
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Counter */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-bold text-obsidian tracking-wider">Quantity</label>
              <div className="inline-flex items-center border border-soft-beige bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-obsidian/70 hover:text-obsidian"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-obsidian">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-obsidian/70 hover:text-obsidian"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Bag & Buy Now Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => addToCart(product, selectedColor, quantity)}
                className="w-full py-4 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-[0.2em] hover:bg-muted-rose transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • PKR {(product.price * quantity).toLocaleString()}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-gold text-obsidian text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold-light transition-colors"
              >
                Buy Now (Fast Checkout)
              </button>

              <div className="flex items-center justify-between text-xs pt-1 text-obsidian/70">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center gap-1.5 hover:text-muted-rose"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-muted-rose text-muted-rose' : ''}`} />
                  <span>{isLiked ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Product link copied to clipboard!');
                  }}
                  className="flex items-center gap-1.5 hover:text-muted-rose"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Delivery Estimate Calculator by Pakistani City */}
            <div className="p-4 bg-white border border-soft-beige space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-obsidian uppercase tracking-wider">
                <Truck className="w-4 h-4 text-muted-rose" />
                <span>Pakistani City Delivery Estimator</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-2 bg-ivory border border-soft-beige text-xs text-obsidian focus:outline-none font-medium"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Sialkot">Sialkot</option>
                </select>
                <div className="text-xs text-obsidian font-semibold">
                  {getDeliveryEstimate(selectedCity)}
                </div>
              </div>
              <p className="text-[11px] text-obsidian/50">Cash on Delivery (COD) supported for {selectedCity}.</p>
            </div>

            {/* Information Accordion Tabs */}
            <div className="border border-soft-beige bg-white divide-y divide-soft-beige text-xs">
              {/* Description */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'desc' ? ('' as any) : 'desc')}
                  className="w-full p-4 flex justify-between items-center text-left uppercase font-bold text-obsidian tracking-wider"
                >
                  <span>Product Description & Features</span>
                  {activeTab === 'desc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeTab === 'desc' && (
                  <div className="p-4 pt-0 space-y-3 text-obsidian/80 leading-relaxed font-sans border-t border-soft-beige/50">
                    <p>{product.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {product.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Specs */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'specs' ? ('' as any) : 'specs')}
                  className="w-full p-4 flex justify-between items-center text-left uppercase font-bold text-obsidian tracking-wider"
                >
                  <span>Specifications & Dimensions</span>
                  {activeTab === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeTab === 'specs' && (
                  <div className="p-4 pt-0 space-y-2 text-obsidian/80 border-t border-soft-beige/50">
                    <p><strong>Dimensions:</strong> {product.dimensions}</p>
                    <p><strong>Weight:</strong> {product.weight}</p>
                    <p><strong>Capacity:</strong> {product.capacity}</p>
                    <p><strong>Closure:</strong> {product.closure}</p>
                    <p><strong>Strap:</strong> {product.strapLength}</p>
                    {product.specifications.map((spec, i) => (
                      <p key={i}><strong>{spec.label}:</strong> {spec.value}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div>
                <button
                  onClick={() => setActiveTab(activeTab === 'care' ? ('' as any) : 'care')}
                  className="w-full p-4 flex justify-between items-center text-left uppercase font-bold text-obsidian tracking-wider"
                >
                  <span>Material Care & Maintenance</span>
                  {activeTab === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeTab === 'care' && (
                  <div className="p-4 pt-0 space-y-2 text-obsidian/80 border-t border-soft-beige/50">
                    {product.careInstructions.map((care, i) => (
                      <p key={i}>• {care}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Client Reviews Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 border-t border-soft-beige">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-3xl font-semibold text-obsidian">Client Reviews & Feedback</h3>
                <p className="text-xs text-obsidian/60 mt-1">Verified buyer ratings from women across Pakistan</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-obsidian">{product.rating} / 5</div>
                <div className="flex text-amber-500 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Submission Form */}
            <div className="p-6 bg-white border border-soft-beige space-y-4">
              <h4 className="font-serif text-lg font-bold text-obsidian">Write a Review for TAHFIÉ</h4>
              <form onSubmit={handleAddReview} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Full Name (e.g. Fatima Shah)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="px-3 py-2 border border-soft-beige text-xs text-obsidian focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-obsidian">Rating:</span>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
                      className="px-3 py-2 border border-soft-beige text-xs text-obsidian"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                      <option value="3">⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                </div>
                <textarea
                  placeholder="Share your experience regarding leather feel, size, stitching, or delivery speed..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  required
                  className="w-full p-3 border border-soft-beige text-xs text-obsidian focus:outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-obsidian text-ivory text-xs uppercase font-semibold tracking-wider hover:bg-muted-rose"
                >
                  Submit Review
                </button>
                {reviewSubmitted && (
                  <p className="text-xs text-emerald-700 font-semibold">Thank you! Your review has been published.</p>
                )}
              </form>
            </div>

            {/* List of Reviews */}
            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 bg-white border border-soft-beige space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-obsidian">{rev.author}</span>
                      <span className="text-xs text-obsidian/50">({rev.city})</span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-obsidian/40">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-obsidian/80 font-sans leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="mb-8">
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-warm-taupe block mb-1">
              Curated Cross-Sells
            </span>
            <h3 className="font-serif text-3xl font-normal text-obsidian">Complete Your Look</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
