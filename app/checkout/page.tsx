'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { ShieldCheck, Lock, CreditCard, Truck, Wallet, Building, Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Abbottabad'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shippingFee, total, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [province, setProvince] = useState('Sindh');
  const [postalCode, setPostalCode] = useState('75500');
  const [notes, setNotes] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'JAZZCASH' | 'BANK_TRANSFER'>('COD');

  // Card Modal / Payment inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [walletPhone, setWalletPhone] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-ivory min-h-screen py-24 px-4 text-center space-y-4">
        <h1 className="font-serif text-3xl text-obsidian">Your bag is empty</h1>
        <p className="text-xs text-obsidian/60">Add items to your bag before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-obsidian text-ivory text-xs uppercase tracking-widest hover:bg-muted-rose"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address || !city) {
      alert('Please complete all required shipping fields.');
      return;
    }

    setIsProcessingPayment(true);

    setTimeout(() => {
      const order = placeOrder(
        cart,
        {
          fullName,
          email,
          phone,
          address,
          city,
          province,
          postalCode,
          notes,
        },
        paymentMethod,
        subtotal,
        shippingFee,
        discount,
        total
      );

      clearCart();
      setIsProcessingPayment(false);
      router.push(`/order-confirmation/${order.id}`);
    }, 1500);
  };

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Checkout Header */}
      <div className="bg-obsidian text-ivory py-8 border-b border-soft-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-ivory uppercase">
            TAHFIÉ
          </Link>
          <div className="flex items-center gap-2 text-xs text-warm-taupe">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL PCI-DSS Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact, Shipping & Payment (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Details */}
            <div className="p-6 bg-white border border-soft-beige space-y-4">
              <h2 className="font-serif text-xl font-semibold text-obsidian flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-obsidian text-ivory text-xs flex items-center justify-center font-sans">
                  1
                </span>
                Contact & Notification Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-obsidian tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahnoor Ali"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory/50 border border-soft-beige text-xs text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-obsidian tracking-wider mb-1">
                    Phone (Mobile for Delivery SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory/50 border border-soft-beige text-xs text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-bold text-obsidian tracking-wider mb-1">
                    Email Address (For Order Receipt)
                  </label>
                  <input
                    type="email"
                    placeholder="mahnoor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory/50 border border-soft-beige text-xs text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address (Pakistan) */}
            <div className="p-6 bg-white border border-soft-beige space-y-4">
              <h2 className="font-serif text-xl font-semibold text-obsidian flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-obsidian text-ivory text-xs flex items-center justify-center font-sans">
                  2
                </span>
                Pakistani Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-obsidian tracking-wider mb-1">
                    House / Street / Apartment Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House No., Street, Sector/Block, DHA / Bahria / Gulberg"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory/50 border border-soft-beige text-xs text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-obsidian tracking-wider mb-1">
                      City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-ivory border border-soft-beige text-xs text-obsidian focus:outline-none font-semibold"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-obsidian tracking-wider mb-1">
                      Province
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2.5 bg-ivory border border-soft-beige text-xs text-obsidian focus:outline-none font-semibold"
                    >
                      <option value="Punjab">Punjab</option>
                      <option value="Sindh">Sindh</option>
                      <option value="KPK">Khyber Pakhtunkhwa</option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="ICT">Islamabad Capital Territory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-obsidian tracking-wider mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2.5 bg-ivory/50 border border-soft-beige text-xs text-obsidian focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-obsidian tracking-wider mb-1">
                    Delivery Instructions / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leave with gate security / Ring doorbell"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2.5 bg-ivory/50 border border-soft-beige text-xs text-obsidian focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="p-6 bg-white border border-soft-beige space-y-4">
              <h2 className="font-serif text-xl font-semibold text-obsidian flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-obsidian text-ivory text-xs flex items-center justify-center font-sans">
                  3
                </span>
                Payment Options (PKR)
              </h2>

              <div className="space-y-3">
                {/* COD */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === 'COD' ? 'border-obsidian bg-soft-beige/30' : 'border-soft-beige bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1 accent-obsidian"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-obsidian uppercase tracking-wider">
                      <Truck className="w-4 h-4 text-emerald-700" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-xs text-obsidian/70 mt-1">
                      Pay in cash to the courier rider upon receiving your TAHFIÉ luxury parcel.
                    </p>
                  </div>
                </label>

                {/* Card Payment */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === 'CARD' ? 'border-obsidian bg-soft-beige/30' : 'border-soft-beige bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'CARD'}
                    onChange={() => setPaymentMethod('CARD')}
                    className="mt-1 accent-obsidian"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs text-obsidian uppercase tracking-wider">
                        <CreditCard className="w-4 h-4 text-obsidian" />
                        <span>Debit / Credit Card (Visa / Mastercard)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                        256-Bit Encrypted
                      </span>
                    </div>
                    <p className="text-xs text-obsidian/70 mt-1">
                      Pay securely via PayFast 3D-Secure Encrypted Gateway.
                    </p>

                    {paymentMethod === 'CARD' && (
                      <div className="mt-4 pt-4 border-t border-soft-beige space-y-3 bg-white p-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-obsidian mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="Name on card"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full px-3 py-2 border border-soft-beige text-xs text-obsidian focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-obsidian mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-soft-beige text-xs text-obsidian font-mono focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-obsidian mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              placeholder="12/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3 py-2 border border-soft-beige text-xs text-obsidian font-mono focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-obsidian mb-1">
                              CVC / CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full px-3 py-2 border border-soft-beige text-xs text-obsidian font-mono focus:outline-none"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setCardHolder('Mahnoor Ali');
                            setCardNumber('4242 4242 4242 4242');
                            setCardExpiry('12/28');
                            setCardCvc('888');
                          }}
                          className="text-[11px] text-muted-rose underline font-semibold"
                        >
                          Auto-fill Test Card Details
                        </button>
                      </div>
                    )}
                  </div>
                </label>

                {/* JazzCash / EasyPaisa */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === 'JAZZCASH' ? 'border-obsidian bg-soft-beige/30' : 'border-soft-beige bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'JAZZCASH'}
                    onChange={() => setPaymentMethod('JAZZCASH')}
                    className="mt-1 accent-obsidian"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-obsidian uppercase tracking-wider">
                      <Wallet className="w-4 h-4 text-rose-600" />
                      <span>JazzCash / EasyPaisa Mobile Wallet</span>
                    </div>
                    <p className="text-xs text-obsidian/70 mt-1">
                      Direct OTP request sent to your registered Pakistani mobile number.
                    </p>

                    {paymentMethod === 'JAZZCASH' && (
                      <div className="mt-3 pt-3 border-t border-soft-beige">
                        <label className="block text-[11px] font-semibold text-obsidian mb-1">
                          Mobile Wallet Account Number
                        </label>
                        <input
                          type="tel"
                          placeholder="0300 9876543"
                          value={walletPhone}
                          onChange={(e) => setWalletPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-soft-beige text-xs text-obsidian focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Direct IBAN Bank Transfer */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === 'BANK_TRANSFER' ? 'border-obsidian bg-soft-beige/30' : 'border-soft-beige bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'BANK_TRANSFER'}
                    onChange={() => setPaymentMethod('BANK_TRANSFER')}
                    className="mt-1 accent-obsidian"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-obsidian uppercase tracking-wider">
                      <Building className="w-4 h-4 text-obsidian" />
                      <span>Direct IBAN Bank Transfer (Meezan / HBL / SCB)</span>
                    </div>
                    <p className="text-xs text-obsidian/70 mt-1">
                      Transfer directly to TAHFIÉ Meezan Bank IBAN: PK42MEZN00018928371.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-white border border-soft-beige space-y-6 shadow-sm sticky top-24">
              <h3 className="font-serif text-xl font-bold text-obsidian border-b border-soft-beige pb-3">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-64 overflow-y-auto divide-y divide-soft-beige/60">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor.name}`} className="pt-3 first:pt-0 flex gap-3">
                    <div className="relative w-14 h-16 bg-ivory border border-soft-beige flex-shrink-0">
                      <Image src={item.selectedColor.image || item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-obsidian text-ivory text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif font-semibold text-xs text-obsidian">{item.product.name}</h4>
                      <p className="text-[11px] text-obsidian/60">{item.selectedColor.name}</p>
                    </div>
                    <span className="text-xs font-bold text-obsidian">
                      PKR {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-obsidian/80 pt-4 border-t border-soft-beige">
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
                  <span>Shipping Fee ({city})</span>
                  <span>{shippingFee === 0 ? 'FREE' : `PKR ${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-obsidian pt-3 border-t border-soft-beige">
                  <span>Total Amount</span>
                  <span>PKR {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Complete Purchase Button */}
              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-4 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-[0.2em] hover:bg-muted-rose transition-colors flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <span>Encrypting Payment & Placing Order...</span>
                ) : (
                  <>
                    <span>Place Order (PKR {total.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="space-y-2 pt-2 text-[10px] text-obsidian/60 border-t border-soft-beige">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>TAHFIÉ 7-Day Hassle-Free Exchange Guarantee</span>
                </div>
                <p>
                  By completing your order, you agree to TAHFIÉ Terms of Sale & Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
