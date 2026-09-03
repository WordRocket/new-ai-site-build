import { getEntityType } from './siteMode';

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  logo: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  hasMap?: string;
  sameAs?: string[];
}

export interface PostData {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
}

export interface ServiceData {
  name: string;
  description: string;
  providerName: string;
  areaServed: string;
}

export function getOrganizationSchema(config: SiteConfig): object {
  const type = getEntityType(config as any);
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: config.name,
    url: config.url,
    logo: config.logo,
    description: config.description,
    ...(config.telephone && { telephone: config.telephone }),
    ...(config.email && { email: config.email }),
    ...(config.address && { address: { '@type': 'PostalAddress', ...config.address } }),
    ...(config.sameAs && { sameAs: config.sameAs }),
  };
}

export function getWebSiteSchema(config: SiteConfig): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.url,
    description: config.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${config.url}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBlogPostSchema(post: PostData): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    url: post.url,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author,
    },
  };
}

export function getServiceSchema(service: ServiceData): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.providerName,
    },
    areaServed: service.areaServed,
  };
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getGeneralOrganizationSchema(config: SiteConfig): object {
  const hasAddress = !!(config.address && (config.address as any).addressLocality);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    logo: config.logo,
    description: config.description,
    ...(config.telephone && { telephone: config.telephone }),
    ...(config.email && { email: config.email }),
    ...(hasAddress && {
      address: { '@type': 'PostalAddress', ...config.address },
    }),
    ...(config.sameAs && { sameAs: config.sameAs }),
  };
}

export function getGeneralWebSiteSchema(config: SiteConfig): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.url,
    description: config.description,
    publisher: {
      '@type': 'Organization',
      name: config.name,
      url: config.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${config.url}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getLocalBusinessSchema(config: SiteConfig): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.name,
    url: config.url,
    logo: config.logo,
    description: config.description,
    ...(config.telephone && { telephone: config.telephone }),
    ...(config.email && { email: config.email }),
    ...(config.address && { address: { '@type': 'PostalAddress', ...config.address } }),
    ...(config.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: config.geo.latitude,
        longitude: config.geo.longitude,
      },
    }),
    ...(config.openingHours && {
      openingHoursSpecification: config.openingHours.map((hours) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours,
      })),
    }),
    ...(config.hasMap && { hasMap: config.hasMap }),
    ...(config.sameAs && { sameAs: config.sameAs }),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
