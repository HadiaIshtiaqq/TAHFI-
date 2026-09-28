'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useOrders } from '@/context/OrderContext';
import { CheckCircle2, Truck, Package, Clock, MessageSquare, Printer, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { getOrderById } = useOrders();

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="bg-ivory min-h-screen py-24 px-4 text-center space-y-4">
        <h1 className="font-serif text-3xl text-obsidian">Order Not Found</h1>
        <p className="text-xs text-obsidian/60">We could not locate order &quot;{orderId}&quot;.</p>
        <Link href="/shop" className="inline-block px-6 py-3 bg-obsidian text-ivory text-xs uppercase tracking-widest">
          Return to Shop
        </Link>
      </div>
    );
  }

  const steps = [
    { title: 'Placed', date: order.date, active: true },
    { title: 'Processing', date: 'In Quality Check', active: ['Processing', 'Dispatched', 'Out for Delivery', 'Delivered'].includes(order.orderStatus) },
    { title: 'Dispatched', date: `${order.courier}`, active: ['Dispatched', 'Out for Delivery', 'Delivered'].includes(order.orderStatus) },
    { title: 'Out for Delivery', date: order.estimatedDeliveryDate, active: ['Out for Delivery', 'Delivered'].includes(order.orderStatus) },
    { title: 'Delivered', date: 'Expected Delivery', active: order.orderStatus === 'Delivered' },
  ];

  return (
    <div className="bg-ivory min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner */}
        <div className="p-8 bg-white border border-soft-beige text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-warm-taupe block">
            Order Confirmation • {order.orderNumber}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian">
            Your TAHFIÉ chapter begins here.
          </h1>
          <p className="text-xs text-obsidian/70 max-w-md mx-auto font-sans leading-relaxed">
            Thank you for ordering from TAHFIÉ. A confirmation SMS & email has been dispatched to <strong>{order.shippingAddress.phone}</strong>.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 border border-soft-beige text-obsidian hover:bg-obsidian hover:text-ivory transition-colors uppercase font-semibold"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <a
              href={`https://wa.me/923008243433?text=Hello%20TAHFI%C3%89%20Support%2C%20checking%20status%20for%20order%20${order.orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 text-ivory rounded hover:bg-emerald-700 transition-colors uppercase font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Track via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Live Order Status Timeline */}
        <div className="p-8 bg-white border border-soft-beige space-y-6">
          <div className="flex justify-between items-center border-b border-soft-beige pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-obsidian">Live Order Tracking</h3>
              <p className="text-xs text-obsidian/60">Courier Partner: {order.courier} • Tracking #{order.trackingNumber}</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-soft-beige text-obsidian uppercase">
              Status: {order.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2 relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    step.active ? 'bg-obsidian text-ivory' : 'bg-soft-beige text-obsidian/40'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className={`text-xs font-semibold ${step.active ? 'text-obsidian' : 'text-obsidian/40'}`}>
                  {step.title}
                </span>
                <span className="text-[10px] text-obsidian/50">{step.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Purchased Items */}
          <div className="p-6 bg-white border border-soft-beige space-y-4">
            <h3 className="font-serif text-lg font-bold text-obsidian border-b border-soft-beige pb-2">
              Purchased Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-ivory border border-soft-beige flex-shrink-0">
                    <Image src={item.selectedColor.image || item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-semibold text-sm text-obsidian">{item.product.name}</h4>
                    <p className="text-xs text-obsidian/60">Color: {item.selectedColor.name}</p>
                    <p className="text-xs text-obsidian/60">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-obsidian">
                    PKR {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Summary */}
          <div className="p-6 bg-white border border-soft-beige space-y-4">
            <h3 className="font-serif text-lg font-bold text-obsidian border-b border-soft-beige pb-2">
              Delivery Details
            </h3>
            <div className="space-y-2 text-xs text-obsidian/80">
              <p><strong>Customer:</strong> {order.shippingAddress.fullName}</p>
              <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.province}</p>
              <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
              <p><strong>Estimated Delivery:</strong> {order.estimatedDeliveryDate}</p>

              <div className="pt-4 border-t border-soft-beige space-y-1 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>PKR {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-obsidian pt-2 border-t border-soft-beige">
                  <span>Total Paid / Due</span>
                  <span>PKR {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-obsidian text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-muted-rose"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
