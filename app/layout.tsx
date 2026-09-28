import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { OrderProvider } from '@/context/OrderContext';
import { generateOrganizationSchema } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: {
    default: 'TAHFIÉ — Luxury Bags & Accessories | Handcrafted in Pakistan',
    template: '%s | TAHFIÉ'
  },
  description: 'Contemporary D2C fashion e-commerce flagship. Handcrafted shoulder bags, laptop work totes, crossbody bags, and clutches for modern Pakistani women. PKR pricing, Cash on Delivery & fast express shipping.',
  keywords: [
    'tahfie',
    'bags pakistan',
    'luxury handbags lahore',
    'women shoulder bags karachi',
    'laptop tote bag islamabad',
    'evening clutches rawalpindi',
    'vegan leather bags pakistan'
  ],
  authors: [{ name: 'TAHFIÉ Fashion House' }],
  metadataBase: new URL('https://tahfie.pk'),
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://tahfie.pk',
    title: 'TAHFIÉ — Contemporary Luxury Bags | Pakistan',
    description: 'Carry Your Chapter. Contemporary luxury bags designed for modern women across Pakistan.',
    siteName: 'TAHFIÉ Flagship Store',
    images: [
      {
        url: 'https://tahfie.pk/images/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'TAHFIÉ Luxury Bags Pakistan'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TAHFIÉ — Contemporary Luxury Bags',
    description: 'Contemporary bags designed for every version of you. PKR pricing & Cash on Delivery nationwide.',
    images: ['https://tahfie.pk/images/hero-banner.jpg']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-ivory text-obsidian font-sans min-h-screen flex flex-col justify-between" suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
