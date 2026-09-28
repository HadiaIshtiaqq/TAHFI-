'use client';

import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Header */}
      <div className="bg-obsidian text-ivory py-16 text-center space-y-3 border-b border-soft-beige/30">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-warm-taupe">
          Customer Concierge • Karachi, Pakistan
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-ivory">Contact TAHFIÉ</h1>
        <p className="text-xs text-warm-taupe/90 max-w-md mx-auto font-light">
          Have a question about orders, delivery, or custom styling? We are here to assist you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-obsidian">Get in Touch</h2>
            <p className="text-xs text-obsidian/75 leading-relaxed">
              Our customer concierge team is available Monday through Saturday to ensure your TAHFIÉ experience is seamless.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/923008243433?text=Hello%20TAHFI%C3%89%20Support"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-emerald-700 mt-0.5" />
              <div>
                <strong className="block font-bold">WhatsApp Quick Concierge (Instant Response)</strong>
                <span>+92 300 TAHFIE (8243433)</span>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 bg-white border border-soft-beige">
              <Mail className="w-5 h-5 text-muted-rose mt-0.5" />
              <div>
                <strong className="block font-bold">Email Support</strong>
                <span>care@tahfie.pk • support@tahfie.pk</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white border border-soft-beige">
              <Clock className="w-5 h-5 text-obsidian/60 mt-0.5" />
              <div>
                <strong className="block font-bold">Concierge Hours</strong>
                <span>Mon – Sat: 10:00 AM – 8:00 PM PKT</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white border border-soft-beige">
              <MapPin className="w-5 h-5 text-obsidian/60 mt-0.5" />
              <div>
                <strong className="block font-bold">Head Office & Atelier</strong>
                <span>TAHFIÉ Studio, DHA Phase 6, Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 p-8 bg-white border border-soft-beige space-y-6">
          <h2 className="font-serif text-2xl font-bold text-obsidian">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-obsidian mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Zainab Siddiqui"
                  className="w-full p-3 border border-soft-beige text-xs text-obsidian focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-obsidian mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0300 1234567"
                  className="w-full p-3 border border-soft-beige text-xs text-obsidian focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-obsidian mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="zainab@example.com"
                className="w-full p-3 border border-soft-beige text-xs text-obsidian focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-obsidian mb-1">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Order inquiry / Product specs / Wholesale"
                className="w-full p-3 border border-soft-beige text-xs text-obsidian focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-obsidian mb-1">Message *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How may we assist you today?"
                className="w-full p-3 border border-soft-beige text-xs text-obsidian focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-muted-rose transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>

            {submitted && (
              <p className="text-xs text-emerald-700 font-semibold pt-2">
                Thank you! Your message has been received. Our team will contact you shortly via WhatsApp / Email.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
