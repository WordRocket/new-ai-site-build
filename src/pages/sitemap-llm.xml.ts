import { getCollection } from 'astro:content';
import siteConfig from '../lib/site-config';

const TODAY = '2026-06-17';

const staticPaths = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.8' },
  { path: '/locations', changefreq: 'weekly', priority: '0.8' },
  { path: '/.well-known/ai.txt', changefreq: 'monthly', priority: '0.8' },
  { path: '/ai/summary.json', changefreq: 'monthly', priority: '0.8' },
  { path: '/ai/faq.json', changefreq: 'monthly', priority: '0.8' },
  { path: '/ai/service.json', changefreq: 'monthly', priority: '0.8' },
  { path: '/llms.txt', changefreq: 'monthly', priority: '0.8' },
  { path: '/llms-full.txt', changefreq: 'monthly', priority: '0.8' },
];

export async function GET() {
  const base = siteConfig.url.replace(/\/$/, '');

  const locations = await getCollection('locations').catch(() => []);
  const locationPaths = locations.map((entry) => ({
    path: `/${entry.slug.replace(/^\/+/, '')}`,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const allPaths = [...staticPaths, ...locationPaths];

  const entries = allPaths
    .map(
      (u) => `  <url>
    <loc>${base}${u.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
