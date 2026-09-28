import { Product, Article, FAQItem } from '../data/types';

const BASE_URL = 'https://tahfie.pk';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FashionBrand',
    '@id': `${BASE_URL}/#organization`,
    name: 'TAHFIÉ',
    legalName: 'TAHFIÉ Leather Goods & Accessories',
    url: BASE_URL,
    logo: `${BASE_URL}/images/tahfie-logo.png`,
    description: 'Contemporary luxury bag brand designed for modern Pakistani women. Handcrafted shoulder bags, totes, clutches & crossbody bags in PKR.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Karachi, Pakistan'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK'
    },
    sameAs: [
      'https://instagram.com/tahfie.official',
      'https://facebook.com/tahfie.pk',
      'https://tiktok.com/@tahfie'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-300-8243433',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu']
    }
  };
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE_URL}/products/${product.slug}#product`,
    name: product.name,
    image: product.images.map(img => img.startsWith('http') ? img : `${BASE_URL}${img}`),
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'TAHFIÉ'
    },
    material: product.material,
    color: product.colors.map(c => c.name).join(', '),
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/products/${product.slug}`,
      priceCurrency: 'PKR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'TAHFIÉ'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '250',
          currency: 'PKR'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PK'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 4,
            unitCode: 'DAY'
          }
        }
      }
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: Math.max(product.reviewCount || 1, 1),
      bestRating: '5',
      worstRating: '1'
    } : undefined,
    review: product.reviews.map(rev => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.author
      },
      datePublished: rev.date,
      reviewBody: rev.comment,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.rating,
        bestRating: '5'
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateArticleSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.image.startsWith('http') ? article.image : `${BASE_URL}${article.image}`,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'TAHFIÉ',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/tahfie-logo.png`
      }
    },
    datePublished: article.date,
    mainEntityOfPage: `${BASE_URL}/journal/${article.slug}`
  };
}
