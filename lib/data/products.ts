import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-elan-espresso',
    slug: 'tahfie-elan-espresso',
    name: 'TAHFIÉ Élan Shoulder Bag',
    tagline: 'Structured luxury crafted for every chapter of your day.',
    price: 5490,
    originalPrice: 6850,
    category: 'Shoulder Bags',
    categorySlug: 'shoulder-bags',
    collections: ['new-arrivals', 'best-sellers', 'the-signature-edit'],
    colors: [
      { name: 'Espresso', hex: '#3B2418', image: '/images/elan-espresso.jpg' },
      { name: 'Obsidian Black', hex: '#171717', image: '/images/elan-espresso.jpg' },
      { name: 'Warm Taupe', hex: '#B4A69B', image: '/images/elan-espresso.jpg' },
      { name: 'Muted Rose', hex: '#B88C87', image: '/images/elan-espresso.jpg' },
    ],
    images: [
      '/images/elan-espresso.jpg',
      '/images/hero-banner.jpg',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
    ],
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 38,
    sku: 'TF-ELN-ESP-01',
    material: 'Premium Vegan Grain Leather (Scratch & Water Resistant)',
    dimensions: '26cm x 18cm x 9cm (L x H x W)',
    weight: '520 grams',
    closure: 'Magnetic Flap Lock with Custom TAHFIÉ Gold Plaque',
    strapLength: 'Adjustable Drop: 45cm - 58cm',
    capacity: 'Holds iPhone 16 Pro Max, Long Wallet, Compact Powder, Keys, Lipsticks, & Small Notebook',
    description: 'The TAHFIÉ Élan is our hallmark shoulder bag. Architecturally designed with smooth bevelled contours and gold-plated brushed metal hardware, the Élan exudes quiet sophistication. Designed in Pakistan for modern women balancing corporate meetings, café catchups, and formal dinners.',
    features: [
      'Hand-burnished Italian-style vegan grain leather',
      'Custom gold-embossed TAHFIÉ signature front emblem',
      'Dual internal slot pockets plus zippered security pocket',
      'Removable cross-body extension strap included',
      'Custom champagne satin lining with reinforced base studs'
    ],
    specifications: [
      { label: 'Exterior Material', value: 'Microfiber Vegan Leather' },
      { label: 'Interior Lining', value: 'Custom Champagne Silk Satin' },
      { label: 'Hardware', value: 'Light Gold Plated Zinc Alloy' },
      { label: 'Warranty', value: '6 Months Stitching & Hardware Guarantee' },
      { label: 'Origin', value: 'Designed & Handcrafted in Pakistan' }
    ],
    careInstructions: [
      'Wipe clean gently with a soft dry or slightly moist microfiber cloth.',
      'Keep away from direct heat sources and prolonged extreme sunlight exposure.',
      'Store inside the provided custom dust bag when not in use.'
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Ayesha Khan',
        city: 'Lahore',
        rating: 5,
        date: '2026-09-12',
        title: 'Exceeded all expectations!',
        comment: 'The quality of the leather and stitching feels like a luxury European designer bag. Received so many compliments at my office in Gulberg!',
        verified: true,
      },
      {
        id: 'rev-2',
        author: 'Mahnoor Ali',
        city: 'Karachi',
        rating: 5,
        date: '2026-09-05',
        title: 'Perfect for Karachi everyday commute',
        comment: 'Delivered in 2 days via COD. The packaging felt like unboxing a high-end gift. The espresso shade goes with both lawn lawn suits and western wear.',
        verified: true,
      },
      {
        id: 'rev-3',
        author: 'Zainab Siddiqui',
        city: 'Islamabad',
        rating: 4.8,
        date: '2026-08-28',
        title: 'Great capacity and sturdy gold hardware',
        comment: 'Fits my Kindle, long wallet, cosmetic pouch and keys easily without bulging. 10/10 recommendation!',
        verified: true,
      }
    ],
    seoTitle: 'TAHFIÉ Élan Espresso Shoulder Bag | Luxury Women Bags Pakistan | PKR 5,490',
    seoDescription: 'Buy TAHFIÉ Élan Espresso Shoulder Bag online in Pakistan. Premium vegan leather, gold hardware, fast COD delivery to Karachi, Lahore, Islamabad.',
    keywords: ['tahfie elan', 'espresso bag pakistan', 'shoulder bag ladies', 'luxury handbags lahore', 'vegan leather bag karachi']
  },
  {
    id: 'prod-atelier-tote',
    slug: 'tahfie-atelier-tote-taupe',
    name: 'TAHFIÉ Atelier Work Tote',
    tagline: 'The ultimate 14" laptop tote designed for ambitious modern women.',
    price: 7990,
    originalPrice: 9490,
    category: 'Tote Bags',
    categorySlug: 'tote-bags',
    collections: ['the-work-edit', 'best-sellers', 'the-essentials'],
    colors: [
      { name: 'Warm Taupe', hex: '#B4A69B' },
      { name: 'Obsidian Black', hex: '#171717' },
      { name: 'Soft Beige', hex: '#E9E0D5' }
    ],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
      '/images/elan-espresso.jpg',
      '/images/hero-banner.jpg'
    ],
    inStock: true,
    stockCount: 9,
    rating: 4.95,
    reviewCount: 44,
    sku: 'TF-ATL-TPE-02',
    material: 'Pebbled Structure Vegan Leather',
    dimensions: '38cm x 29cm x 13cm (L x H x W)',
    weight: '750 grams',
    closure: 'Top Full Length Zip Closure',
    strapLength: 'Shoulder Strap Drop: 28cm',
    capacity: 'Fits 14" MacBook Pro, A4 Notebook, Water Bottle, Makeup Pouch, iPad & Wallet',
    description: 'The Atelier Tote is built for the corporate powerhouse, doctor, or creative director who refuses to sacrifice style for utility. Featuring a dedicated padded laptop sleeve, key leash, and water bottle pocket holder.',
    features: [
      'Dedicated padded sleeve for 13" and 14" laptops',
      'Sturdy structured base with protective brass feet',
      'Dual phone slots and zippered interior partition',
      'Includes detachable matching wristlet pouch'
    ],
    specifications: [
      { label: 'Laptop Sleeve', value: 'Padded for up to 14" devices' },
      { label: 'Strap Style', value: 'Comfort-padded wide shoulder straps' },
      { label: 'Weight Limit', value: 'Tested up to 6 kg carrying weight' }
    ],
    careInstructions: [
      'Do not machine wash. Clean with damp cloth.'
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Dr. Fatima Tariq',
        city: 'Rawalpindi',
        rating: 5,
        date: '2026-09-01',
        title: 'My daily hospital & clinic companion',
        comment: 'Fits my iPad, stethoscope, planner and laptop without straining my shoulder. Super elegant taupe shade!',
        verified: true
      }
    ],
    seoTitle: 'TAHFIÉ Atelier Work Tote Bag Pakistan | Women Laptop Bags PKR 7,990',
    seoDescription: 'Spacious 14" laptop work tote for women in Pakistan. Handcrafted premium vegan leather with padded laptop sleeve.'
  },
  {
    id: 'prod-nocturne-clutch',
    slug: 'tahfie-nocturne-clutch-obsidian',
    name: 'TAHFIÉ Nocturne Evening Clutch',
    tagline: 'Sculptural elegance for galas, weddings, and evening celebrations.',
    price: 4890,
    category: 'Clutches & Evening',
    categorySlug: 'clutches',
    collections: ['the-evening-edit', 'new-arrivals'],
    colors: [
      { name: 'Obsidian Black', hex: '#171717' },
      { name: 'Champagne Gold', hex: '#C5A059' },
      { name: 'Muted Rose', hex: '#B88C87' }
    ],
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop',
      '/images/elan-espresso.jpg'
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.85,
    reviewCount: 22,
    sku: 'TF-NCT-BLK-03',
    material: 'Satin & Structured Vegan Metallic Trim',
    dimensions: '22cm x 13cm x 5cm',
    weight: '380 grams',
    closure: 'Sculptural Gold Clasp',
    strapLength: 'Detachable 110cm Fine Gold Chain',
    capacity: 'Fits iPhone 16, Lip Gloss, Car Key, Card Holder',
    description: 'Elevate your wedding guest couture or evening cocktail attire with the Nocturne Clutch. Finished with a gold jewel clasp and detachable snake chain.',
    features: [
      'Custom molded hard shell chassis',
      'Reflective gold trim hardware',
      'Versatile clutch or shoulder bag wear'
    ],
    specifications: [
      { label: 'Closure', value: 'Jewel Clasp Snap Lock' },
      { label: 'Lining', value: 'Black Velvet' }
    ],
    careInstructions: ['Store in velvet dust bag.'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Saman Shah',
        city: 'Faisalabad',
        rating: 5,
        date: '2026-08-19',
        title: 'Carried it to my cousin wedding in Lahore',
        comment: 'Looks 3x more expensive than PKR 4,890. Beautiful gold chain finish!',
        verified: true
      }
    ],
    seoTitle: 'TAHFIÉ Nocturne Evening Clutch | Formal Party Bag Pakistan',
    seoDescription: 'Handcrafted evening clutch for women in Pakistan. Perfect for weddings, valima & formal evening events.'
  },
  {
    id: 'prod-lumina-crossbody',
    slug: 'tahfie-lumina-crossbody-rose',
    name: 'TAHFIÉ Lumina Camera Crossbody',
    tagline: 'Chic hands-free companion for university, travel & weekend outings.',
    price: 4990,
    originalPrice: 5990,
    category: 'Crossbody Bags',
    categorySlug: 'crossbody',
    collections: ['the-essentials', 'best-sellers'],
    colors: [
      { name: 'Muted Rose', hex: '#B88C87' },
      { name: 'Soft Beige', hex: '#E9E0D5' },
      { name: 'Obsidian Black', hex: '#171717' }
    ],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
      '/images/elan-espresso.jpg'
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.88,
    reviewCount: 31,
    sku: 'TF-LUM-RSE-04',
    material: 'Smooth Microfiber Leather',
    dimensions: '22cm x 15cm x 8cm',
    weight: '410 grams',
    closure: 'Dual Top Zip Compartments',
    strapLength: 'Adjustable Webbing Strap: 60cm - 120cm',
    capacity: 'Phone, Wallet, Powerbank, Sanitizer, Sunscreen',
    description: 'Compact yet double-zippered for ultimate organization. Perfect for university lectures, shopping sprees in Islamabad, or international travel.',
    features: [
      'Dual zipped independent compartments',
      'Wide graphic woven guitar-style comfortable strap',
      'Back external quick-access card sleeve'
    ],
    specifications: [
      { label: 'Strap', value: 'Adjustable Woven Webbing Strap' },
      { label: 'Zipper', value: 'Smooth Glide Metallic Zippers' }
    ],
    careInstructions: ['Clean strap with mild soap foam if soiled.'],
    reviews: [
      {
        id: 'rev-6',
        author: 'Hira Bilal',
        city: 'Multan',
        rating: 5,
        date: '2026-08-10',
        title: 'Best everyday uni bag!',
        comment: 'Lightweight, cute rose pink shade, fits everything needed for university.',
        verified: true
      }
    ],
    seoTitle: 'TAHFIÉ Lumina Crossbody Bag | Everyday Bag Pakistan',
    seoDescription: 'Stylish women crossbody bag in Pakistan. Lightweight vegan leather camera bag for university & daily wear.'
  },
  {
    id: 'prod-sovereign-handbag',
    slug: 'tahfie-sovereign-top-handle',
    name: 'TAHFIÉ Sovereign Top Handle Handbag',
    tagline: 'Regal silhouette with structured top handle and padlock accent.',
    price: 6490,
    originalPrice: 7990,
    category: 'Handbags',
    categorySlug: 'handbags',
    collections: ['the-signature-edit', 'new-arrivals'],
    colors: [
      { name: 'Espresso', hex: '#3B2418' },
      { name: 'Obsidian Black', hex: '#171717' }
    ],
    images: [
      '/images/elan-espresso.jpg',
      '/images/hero-banner.jpg'
    ],
    inStock: true,
    stockCount: 7,
    rating: 4.92,
    reviewCount: 19,
    sku: 'TF-SOV-BLK-05',
    material: 'Full Grain Saffiano Texture Leather',
    dimensions: '28cm x 21cm x 11cm',
    weight: '640 grams',
    closure: 'Turn-Lock Clasp',
    strapLength: 'Detachable Shoulder Strap Drop 52cm',
    capacity: 'Full Size Wallet, Cosmetics, Specs Case, Phone',
    description: 'Command the room with the Sovereign Handbag. Features a vintage-inspired turn-lock and rigid top handle.',
    features: ['Saffiano anti-scratch leather', 'Metal feet on base', 'Key fob accent'],
    specifications: [{ label: 'Texture', value: 'Crosshatch Saffiano' }],
    careInstructions: ['Store stuffed with tissue paper to maintain structure.'],
    reviews: [
      {
        id: 'rev-7',
        author: 'Nida Farooq',
        city: 'Sialkot',
        rating: 5,
        date: '2026-08-04',
        title: 'So elegant and sturdy',
        comment: 'Looks like an Italian designer piece. Very happy with TAHFIÉ service!',
        verified: true
      }
    ],
    seoTitle: 'TAHFIÉ Sovereign Top Handle Handbag | Luxury Handbags Pakistan',
    seoDescription: 'Shop Sovereign Top Handle Handbag by TAHFIÉ. Turn-lock closure, structured elegance, COD available.'
  },
  {
    id: 'prod-celeste-mini',
    slug: 'tahfie-celeste-mini-bag',
    name: 'TAHFIÉ Celeste Micro Satchel',
    tagline: 'Petite statement satchel for high-fashion minimalists.',
    price: 3990,
    category: 'Mini Bags',
    categorySlug: 'mini-bags',
    collections: ['new-arrivals', 'the-essentials'],
    colors: [
      { name: 'Soft Beige', hex: '#E9E0D5' },
      { name: 'Muted Rose', hex: '#B88C87' }
    ],
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.79,
    reviewCount: 14,
    sku: 'TF-CEL-BGE-06',
    material: 'Smooth Calfskin Texture Leather',
    dimensions: '18cm x 13cm x 7cm',
    weight: '310 grams',
    closure: 'Magnetic Lock',
    strapLength: 'Crossbody Strap Drop 55cm',
    capacity: 'Phone, Cards, Lipstick, AirPods',
    description: 'The Celeste Mini is the ultimate lightweight satchel when you only need your key essentials.',
    features: ['Micro silhouette', 'Gold chain accent handle'],
    specifications: [{ label: 'Size', value: 'Micro Satchel' }],
    careInstructions: ['Avoid liquid contact.'],
    reviews: [],
    seoTitle: 'TAHFIÉ Celeste Micro Satchel | Mini Bags Women Pakistan',
    seoDescription: 'Cute mini bags for women in Pakistan. TAHFIÉ Celeste micro satchel in soft beige and muted rose.'
  }
];
