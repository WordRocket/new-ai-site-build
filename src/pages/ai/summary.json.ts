import { getCollection } from 'astro:content';
import siteConfig from '../../lib/site-config';

export async function GET() {
  const services = await getCollection('services').catch(() => []);
  const niche: string = ((siteConfig as any).niche as string | undefined)?.trim() || 'services';

  const sortedServices = services.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));

  const keyFeatures = sortedServices.length > 0
    ? sortedServices.slice(0, 6).map((s) => s.data.title)
    : [`Professional ${niche} in ${siteConfig.city}, ${siteConfig.state}`];

  const primaryUseCases = sortedServices.length > 0
    ? sortedServices.slice(0, 3).map((s) => s.data.shortDescription || s.data.description || s.data.title)
    : [`${niche} services for customers in ${siteConfig.city}, ${siteConfig.state}`];

  const today = new Date().toISOString().slice(0, 10);

  const payload = {
    version: '1.0',
    lastModified: today + 'T00:00:00.000Z',
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
    keyFeatures,
    targetAudience: [
      `${niche.charAt(0).toUpperCase() + niche.slice(1)} customers in ${siteConfig.city}, ${siteConfig.state}`,
      `Residents and businesses in ${siteConfig.city} and surrounding areas`,
    ],
    primaryUseCases,
    contentLanguage: 'en',
    lastReviewed: today,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
