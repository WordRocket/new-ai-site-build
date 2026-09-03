import { getCollection } from 'astro:content';
import siteConfig from '../../lib/site-config';
import { isLocalSite } from '../../lib/siteMode';

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const base = siteConfig.url.replace(/\/+$/, '');

  if (isLocalSite()) {
    const payload = {
      error: 'not_applicable',
      seeInstead: '/ai/service.json',
    };
    return new Response(JSON.stringify(payload, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  }

  const categories = await getCollection('categories').catch(() => []);
  const publishedCategories = categories.filter((c: any) => c.data.published !== false);

  let topics: Array<{ name: string; slug: string; url: string; description: string }>;

  if (publishedCategories.length > 0) {
    topics = publishedCategories.map((c: any) => ({
      name: c.data.title || c.data.name || c.slug,
      slug: c.slug,
      url: `${base}/category/${c.slug}`,
      description: c.data.description || '',
    }));
  } else {
    const fallbackNames: string[] = ((siteConfig as any).categories as string[] | undefined) ?? [];
    topics = fallbackNames.map((name) => {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      return { name, slug, url: `${base}/category/${slug}`, description: '' };
    });
  }

  const payload = {
    version: '1.0',
    lastModified: today + 'T00:00:00.000Z',
    schema: 'https://geo-checklist.dev/schemas/topics/v1',
    topics,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
