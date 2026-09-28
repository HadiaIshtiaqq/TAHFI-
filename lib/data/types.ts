export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number; // PKR
  originalPrice?: number; // PKR if discounted
  category: string;
  categorySlug: string;
  collections: string[];
  colors: ColorOption[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  sku: string;
  material: string;
  dimensions: string;
  weight: string;
  closure: string;
  strapLength: string;
  capacity: string;
  description: string;
  features: string[];
  specifications: Specification[];
  careInstructions: string[];
  reviews: ProductReview[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  seoKeywords: string[];
}

export interface FAQItem {
  id: string;
  category: 'Shipping & Delivery' | 'Payment & Ordering' | 'Exchanges & Returns' | 'Product & Care' | 'Brand';
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ColorOption;
  quantity: number;
}

export interface OrderAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  shippingAddress: OrderAddress;
  paymentMethod: 'COD' | 'CARD' | 'JAZZCASH' | 'BANK_TRANSFER';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Placed' | 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  trackingNumber: string;
  courier: string;
  estimatedDeliveryDate: string;
}

export interface FilterState {
  category: string;
  collection: string;
  minPrice: number;
  maxPrice: number;
  colors: string[];
  material: string;
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'bestselling' | 'price-low' | 'price-high';
  searchQuery: string;
}
