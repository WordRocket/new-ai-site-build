export function GET() {
  const payload = {
    version: '1.0',
    lastModified: '2026-06-11T00:00:00.000Z',
    schema: 'https://geo-checklist.dev/schemas/service/v1',
    service: {
      name: 'SiteName',
      type: 'local-business',
      category: 'Digital Marketing Agency',
      description:
        'SiteName provides local SEO, GEO optimisation, and AI-powered website design for small and medium businesses across the United States. We help clients rank in both traditional search engines and AI-powered answer engines including ChatGPT, Perplexity, and Gemini.',
      url: 'https://placeholder.com',
      areaServed: [
        { type: 'City', name: 'Los Angeles', state: 'CA' },
        { type: 'City', name: 'San Francisco', state: 'CA' },
        { type: 'City', name: 'New York', state: 'NY' },
        { type: 'City', name: 'Chicago', state: 'IL' },
        { type: 'City', name: 'Houston', state: 'TX' },
      ],
      capabilities: [
        'Local SEO and Google Maps optimisation',
        'GEO optimisation for AI answer engines',
        'AI-powered website design and development',
        'Technical SEO audits and remediation',
        'Content strategy and production',
        'Monthly performance reporting',
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
        email: 'contact@placeholder.com',
        phone: '(555) 000-0000',
        address: '123 Main St, Your City, CA 90001',
      },
      trust: {
        founded: '2015',
        license: 'N/A',
        certifications: ['Google Partner', 'SEMrush Certified', 'Clutch Top Agency 2024'],
      },
      availability: '24/7',
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
