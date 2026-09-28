'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/lib/data/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isLiked = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-white border border-soft-beige/60 hover:border-warm-taupe transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-square w-full bg-ivory overflow-hidden">
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 z-10 bg-muted-rose text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            SAVE PKR {(product.originalPrice - product.price).toLocaleString()}
          </div>
        )}

        {/* Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isLiked ? 'bg-muted-rose text-white' : 'bg-white/80 text-obsidian hover:bg-white'
          }`}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Product Link + Images */}
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={isHovered && secondaryImage ? secondaryImage : selectedColor.image || product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick Add To Bag Hover Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => addToCart(product, selectedColor)}
            className="w-full py-2.5 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-muted-rose transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-amber-600 mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium text-obsidian text-[11px]">{product.rating}</span>
            <span className="text-obsidian/40 text-[10px]">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-obsidian group-hover:text-muted-rose transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-obsidian/60 line-clamp-1 mt-0.5">{product.tagline}</p>
        </div>

        {/* Color Swatches & Price */}
        <div className="pt-2 border-t border-soft-beige/60 flex items-center justify-between">
          {/* Color options */}
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === col.name ? 'ring-2 ring-obsidian ring-offset-1 scale-110' : 'border-black/20'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-obsidian/50">+{product.colors.length - 4}</span>
            )}
          </div>

          {/* PKR Price */}
          <div className="text-right">
            <span className="text-sm font-bold text-obsidian">PKR {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-obsidian/40 line-through block text-right font-normal">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
