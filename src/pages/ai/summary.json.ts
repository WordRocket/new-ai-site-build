export function GET() {
  const payload = {
    version: '1.0',
    lastModified: '2026-06-11T00:00:00.000Z',
    schema: 'https://geo-checklist.dev/schemas/summary/v1',
    entity: {
      name: 'SiteName',
      type: 'LocalBusiness',
      url: 'https://placeholder.com',
      description:
        'SiteName builds AI-powered websites and local SEO strategies that help US-based local businesses rank higher, attract more customers, and grow revenue.',
      foundingYear: '2015',
      areaServed: ['Los Angeles', 'San Francisco', 'New York', 'Chicago', 'Houston'],
      sameAs: [
        'https://www.linkedin.com/company/placeholder',
        'https://www.google.com/maps/place/placeholder',
      ],
    },
    summary:
      'SiteName is a digital marketing agency founded in 2015, specialising in local SEO and GEO optimisation for US-based small and medium businesses. We build fast, accessible, AI-optimised websites and content strategies that rank in both traditional search and AI answer engines. With over 500 clients served and a 98% retention rate, we deliver transparent, month-to-month growth programmes backed by Google Partner status and industry certifications.',
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
