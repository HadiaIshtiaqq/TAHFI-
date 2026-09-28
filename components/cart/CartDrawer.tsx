'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    shippingFee,
    freeShippingThreshold,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) setCouponInput('');
  };

  const amountNeededForFreeShipping = freeShippingThreshold - subtotal;
  const freeShippingProgress = Math.min(100, Math.max(0, (subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-ivory h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-soft-beige">
        {/* Header */}
        <div className="p-5 border-b border-soft-beige bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl tracking-wide text-obsidian uppercase">Your Bag</h3>
            <span className="text-xs bg-soft-beige text-obsidian font-semibold px-2 py-0.5 rounded-full">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-obsidian/60 hover:text-obsidian transition-colors"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-soft-beige/50 p-4 border-b border-soft-beige">
          <div className="flex items-center gap-2 text-xs text-obsidian font-medium mb-1.5">
            <Truck className="w-4 h-4 text-muted-rose" />
            {amountNeededForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-obsidian">PKR {amountNeededForFreeShipping.toLocaleString()}</strong> more
                for <strong>FREE Nationwide Express Shipping</strong>
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold">🎉 You have unlocked FREE Nationwide Express Shipping!</span>
            )}
          </div>
          <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-soft-beige">
            <div
              className="bg-muted-rose h-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-soft-beige/60">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-soft-beige flex items-center justify-center text-obsidian/40">
                <Tag className="w-8 h-8" />
              </div>
              <div>
                <p className="font-serif text-lg text-obsidian">Your bag is empty</p>
                <p className="text-xs text-obsidian/60 mt-1">Discover our new arrivals and timeless edits.</p>
              </div>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="inline-block px-6 py-3 bg-obsidian text-ivory text-xs uppercase tracking-widest font-medium hover:bg-muted-rose transition-colors"
              >
                Shop Collection
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor.name}`} className="pt-4 first:pt-0 flex gap-4">
                <div className="relative w-20 h-24 bg-white border border-soft-beige flex-shrink-0">
                  <Image
                    src={item.selectedColor.image || item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-serif text-base font-semibold text-obsidian hover:text-muted-rose transition-colors leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name)}
                        className="text-obsidian/40 hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-obsidian/60 mt-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: item.selectedColor.hex }}></span>
                      <span>{item.selectedColor.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-soft-beige bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.name, -1)}
                        className="p-1 text-obsidian/60 hover:text-obsidian"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-obsidian">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.name, 1)}
                        className="p-1 text-obsidian/60 hover:text-obsidian"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-obsidian">
                      PKR {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-soft-beige space-y-4 shadow-lg">
            {/* Coupon Code Input */}
            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. TAHFIE10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-soft-beige text-xs uppercase text-obsidian focus:outline-none focus:border-obsidian"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-soft-beige text-obsidian text-xs font-semibold hover:bg-obsidian hover:text-ivory transition-colors uppercase"
              >
                Apply
              </button>
            </form>

            {couponMessage && (
              <p className={`text-xs ${couponMessage.success ? 'text-emerald-700 font-semibold' : 'text-red-600'}`}>
                {couponMessage.text}
              </p>
            )}

            {couponCode && (
              <div className="flex justify-between items-center text-xs bg-emerald-50 p-2 text-emerald-800 border border-emerald-200">
                <span>Code <strong>{couponCode}</strong> applied</span>
                <button onClick={removeCoupon} className="underline text-xs">Remove</button>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-obsidian/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount</span>
                  <span>- PKR {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `PKR ${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-obsidian pt-2 border-t border-soft-beige">
                <span>Total</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-obsidian text-ivory flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest hover:bg-muted-rose transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center py-2 text-xs text-obsidian/70 hover:text-obsidian uppercase tracking-wider"
              >
                Continue Shopping
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-obsidian/50 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Encrypted Secure Checkout | COD Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
