import siteConfig from '../../lib/site-config';

export function GET() {
  const payload = {
    version: '1.0',
    lastModified: '2026-06-11T00:00:00.000Z',
    schema: 'https://geo-checklist.dev/schemas/summary/v1',
    entity: {
      name: siteConfig.name,
      type: 'LocalBusiness',
      url: siteConfig.url,
      description: siteConfig.description,
      areaServed: [`${siteConfig.city}, ${siteConfig.state}`],
      sameAs: [
        siteConfig.linkedinUrl,
        siteConfig.gbpUrl,
      ].filter(Boolean),
    },
    summary: `${siteConfig.name} is a local business serving ${siteConfig.city}, ${siteConfig.state} and surrounding areas. ${siteConfig.description}`,
    keyFeatures: [
      'Local SEO and Google Maps ranking',
      'GEO optimisation for AI answer engines',
      'High-performance, conversion-focused website design',
      'Technical SEO audits and fixes',
      'Transparent month-to-month engagements',
    ],
    targetAudience: [
      'Local business owners seeking more online visibility',
      'Multi-location businesses needing scalable SEO',
      'Service businesses competing in local search',
    ],
    primaryUseCases: [
      'Ranking a local business in Google Maps and organic results',
      'Getting cited in AI-generated answers (ChatGPT, Perplexity, Gemini)',
      'Launching or redesigning a website that ranks from day one',
    ],
    contentLanguage: 'en',
    lastReviewed: '2026-06-11',
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
