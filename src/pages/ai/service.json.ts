import siteConfig from '../../lib/site-config';
import { isLocalSite } from '../../lib/siteMode';

export function GET() {
  const today = new Date().toISOString().slice(0, 10);

  if (!isLocalSite()) {
    const payload = {
      error: 'not_applicable',
      seeInstead: '/ai/topics.json',
    };
    return new Response(JSON.stringify(payload, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  }

  const payload = {
    version: '1.0',
    lastModified: today + 'T00:00:00.000Z',
    schema: 'https://geo-checklist.dev/schemas/service/v1',
    service: {
      name: siteConfig.name,
      type: 'local-business',
      category: siteConfig.niche || 'Local Business',
      description: siteConfig.description,
      url: siteConfig.url,
      areaServed: [
        { type: 'City', name: siteConfig.city, state: siteConfig.state },
      ],
      capabilities: [
        'Local service delivery',
        'Professional consultation',
        'Customer support',
      ],
      endpoints: {
        home: '/',
        blog: '/blog',
        services: '/services',
        contact: '/contact',
        faq: '/faq',
        aiSummary: '/ai/summary.json',
        aiFaq: '/ai/faq.json',
        llms: '/llms.txt',
      },
      contact: {
        email: siteConfig.email,
        phone: siteConfig.phone,
        address: `${siteConfig.address}, ${siteConfig.city}, ${siteConfig.state} ${siteConfig.zip}`,
      },
      trust: {
        license: 'N/A',
        certifications: [],
      },
      availability: 'Contact for hours',
      priceRange: '$$',
    },
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
