'use client';

import React, { useState } from 'react';
import { useOrders } from '@/context/OrderContext';
import { Package, User, MapPin, Award, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'rewards'>('orders');

  return (
    <div className="bg-ivory min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-soft-beige pb-6">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-warm-taupe block mb-1">
            My Account
          </span>
          <h1 className="font-serif text-4xl font-semibold text-obsidian">Welcome Back, Mahnoor</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-3 space-y-1">
            {[
              { id: 'orders', label: 'My Orders', icon: Package },
              { id: 'profile', label: 'Profile Details', icon: User },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
              { id: 'rewards', label: 'TAHFIÉ Club Rewards', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? 'bg-obsidian text-ivory'
                      : 'bg-white text-obsidian hover:bg-soft-beige/50 border border-soft-beige'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="md:col-span-9 p-6 bg-white border border-soft-beige min-h-[400px]">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-semibold text-obsidian">Order History</h2>

                {orders.length === 0 ? (
                  <p className="text-xs text-obsidian/60 py-12 text-center">No past orders found.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="p-4 border border-soft-beige space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-serif font-bold text-base text-obsidian block">{ord.orderNumber}</span>
                            <span className="text-obsidian/50">{ord.date}</span>
                          </div>
                          <div className="text-right">
                            <span className="px-2.5 py-1 bg-soft-beige text-obsidian font-bold rounded text-[11px]">
                              {ord.orderStatus}
                            </span>
                            <span className="block text-xs font-bold text-obsidian mt-1">
                              PKR {ord.total.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-soft-beige/50 flex items-center justify-between text-xs">
                          <span className="text-obsidian/60">
                            {ord.items.length} item(s) • Payment: {ord.paymentMethod}
                          </span>
                          <Link
                            href={`/order-confirmation/${ord.id}`}
                            className="text-muted-rose underline font-semibold"
                          >
                            View Receipt & Track →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-4 max-w-md text-xs text-obsidian/80">
                <h2 className="font-serif text-2xl font-semibold text-obsidian">Profile Settings</h2>
                <div>
                  <label className="block font-bold mb-1">Full Name</label>
                  <input type="text" defaultValue="Mahnoor Ali" className="w-full p-2.5 border border-soft-beige text-xs" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Phone Number</label>
                  <input type="text" defaultValue="+92 300 9876543" className="w-full p-2.5 border border-soft-beige text-xs" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Email</label>
                  <input type="email" defaultValue="mahnoor.ali@example.com" className="w-full p-2.5 border border-soft-beige text-xs" />
                </div>
                <button className="px-6 py-3 bg-obsidian text-ivory text-xs uppercase font-semibold">Save Changes</button>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4 text-xs text-obsidian/80">
                <h2 className="font-serif text-2xl font-semibold text-obsidian">Saved Delivery Addresses</h2>
                <div className="p-4 border border-soft-beige bg-ivory/50 space-y-1">
                  <span className="font-bold text-obsidian block">Home (Default)</span>
                  <p>House 14-B, Street 7, Phase 5 DHA, Lahore, Punjab</p>
                  <p>Phone: +92 300 9876543</p>
                </div>
              </div>
            )}

            {activeTab === 'rewards' && (
              <div className="space-y-4 text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-3xl font-semibold text-obsidian">TAHFIÉ Club Gold Member</h2>
                <p className="text-xs text-obsidian/60">You have earned <strong>450 reward points</strong> from your orders.</p>
                <div className="p-4 bg-soft-beige/40 max-w-sm mx-auto text-xs font-medium">
                  Redeem 500 points for PKR 1,000 voucher on your next purchase!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
