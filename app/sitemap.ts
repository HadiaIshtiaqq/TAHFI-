import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data/products';
import { ARTICLES } from '@/lib/data/articles';
import { CATEGORIES } from '@/lib/data/categories';
import { COLLECTIONS } from '@/lib/data/collections';

const BASE_URL = 'https://tahfie.pk';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/shop',
    '/about',
    '/journal',
    '/contact',
    '/faq',
    '/cart',
    '/checkout',
    '/wishlist',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/shop?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const collectionRoutes = COLLECTIONS.map((col) => ({
    url: `${BASE_URL}/collections/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const articleRoutes = ARTICLES.map((article) => ({
    url: `${BASE_URL}/journal/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes, ...categoryRoutes, ...collectionRoutes, ...articleRoutes];
}
