import { getCollection } from 'astro:content';
import siteConfig from '../../lib/site-config';
import { isLocalSite, getEntityType, getContentScope } from '../../lib/siteMode';

export async function GET() {
  const isLocal = isLocalSite();
  const entityType = getEntityType();
  const contentScope = getContentScope();
  const niche: string = ((siteConfig as any).niche as string | undefined)?.trim() || 'services';

  const categories = await getCollection('categories').catch(() => []);
  const publishedCategories = categories.filter((c: any) => c.data.published !== false);
  const topics: Array<{ name: string; slug: string }> = publishedCategories.length > 0
    ? publishedCategories.map((c: any) => ({ name: c.data.title || c.data.name || c.slug, slug: c.slug }))
    : (((siteConfig as any).categories as string[] | undefined) ?? []).map((name: string) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-') }));

  const services = await getCollection('services').catch(() => []);
  const sortedServices = services.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));

  const keyFeatures = sortedServices.length > 0
    ? sortedServices.slice(0, 6).map((s) => s.data.title)
    : isLocal
      ? [`Professional ${niche} in ${siteConfig.city}, ${siteConfig.state}`]
      : [`Professional ${niche}`];

  const primaryUseCases = sortedServices.length > 0
    ? sortedServices.slice(0, 3).map((s) => s.data.shortDescription || s.data.description || s.data.title)
    : isLocal
      ? [`${niche} services for customers in ${siteConfig.city}, ${siteConfig.state}`]
      : [`${niche} services for ${contentScope} audience`];

  const today = new Date().toISOString().slice(0, 10);

  const summary = isLocal
    ? `${siteConfig.name} is a local business serving ${siteConfig.city}, ${siteConfig.state} and surrounding areas. ${siteConfig.description}`
    : `${siteConfig.name} is ${siteConfig.description}`;

  const targetAudience = isLocal
    ? [
        `${niche.charAt(0).toUpperCase() + niche.slice(1)} customers in ${siteConfig.city}, ${siteConfig.state}`,
        `Residents and businesses in ${siteConfig.city} and surrounding areas`,
      ]
    : [
        `${niche.charAt(0).toUpperCase() + niche.slice(1)} audience seeking reliable information and services`,
        `Readers and customers interested in ${topics.length > 0 ? topics.slice(0, 3).map(t => t.name).join(', ').toLowerCase() : niche}`,
      ];

  const entity: Record<string, any> = {
    name: siteConfig.name,
    type: entityType,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      siteConfig.linkedinUrl,
      siteConfig.gbpUrl,
    ].filter(Boolean),
  };

  if (isLocal) {
    entity.areaServed = [`${siteConfig.city}, ${siteConfig.state}`];
  }

  const payload: Record<string, any> = {
    version: '1.0',
    lastModified: today + 'T00:00:00.000Z',
    schema: 'https://geo-checklist.dev/schemas/summary/v1',
    entity,
    summary,
    keyFeatures,
    targetAudience,
    primaryUseCases,
    contentScope,
    topics: topics.map(t => t.name),
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
