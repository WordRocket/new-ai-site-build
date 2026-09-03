import { getCollection } from 'astro:content';
import siteConfig from '../lib/site-config';
import { isLocalSite } from '../lib/siteMode';

const TODAY = new Date().toISOString().split('T')[0];
const IS_LOCAL = isLocalSite();

const RESERVED_PAGE_SLUGS = new Set([
  '', 'index', 'home', 'about', 'contact', 'faq',
  'privacy-policy', 'terms-and-conditions',
  'blog', 'services', 'locations', 'our-work', 'category', 'resources',
]);

const staticPaths = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services/', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog/', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact/', changefreq: 'monthly', priority: '0.9' },
  { path: '/about/', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq/', changefreq: 'monthly', priority: '0.8' },
  { path: '/locations/', changefreq: 'weekly', priority: '0.8' },
  { path: '/.well-known/ai.txt', changefreq: 'monthly', priority: '0.8' },
  { path: '/ai/summary.json', changefreq: 'monthly', priority: '0.8' },
  { path: '/ai/faq.json', changefreq: 'monthly', priority: '0.8' },
  ...(IS_LOCAL
    ? [{ path: '/ai/service.json', changefreq: 'monthly', priority: '0.8' }]
    : [{ path: '/ai/topics.json', changefreq: 'monthly', priority: '0.8' }]),
  { path: '/llms.txt', changefreq: 'monthly', priority: '0.8' },
  { path: '/llms-full.txt', changefreq: 'monthly', priority: '0.8' },
];

function withTrailingSlash(path: string): string {
  const p = path.replace(/^\/+/, '/');
  if (p === '/' || p.endsWith('/')) return p;
  if (p.includes('.')) return p;
  return p + '/';
}

export async function GET() {
  const base = siteConfig.url.replace(/\/$/, '');

  const locations = await getCollection('locations').catch(() => []);
  const locationPaths = locations.map((entry) => ({
    path: withTrailingSlash(`/${entry.slug.replace(/^\/+/, '')}`),
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const industries = await getCollection('industries').catch(() => []);
  const industryPaths = industries.map((entry) => ({
    path: withTrailingSlash(`/${entry.slug.replace(/^\/+/, '')}`),
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const services = await getCollection('services').catch(() => []);
  const servicePaths = services.map((entry) => ({
    path: withTrailingSlash(`/services/${entry.slug}`),
    changefreq: 'monthly',
    priority: '0.8',
  }));

  const posts = await getCollection('blog').catch(() => []);
  const blogPaths = posts.map((entry) => ({
    path: withTrailingSlash(`/blog/${entry.slug}`),
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const categories = await getCollection('categories').catch(() => []);
  const categoryPaths = categories
    .filter((c) => c.data.published !== false)
    .map((entry) => ({
      path: withTrailingSlash(`/category/${entry.slug}`),
      changefreq: 'weekly',
      priority: '0.7',
    }));

  const pages = await getCollection('pages').catch(() => []);
  const pagePaths = pages
    .filter((p) => !RESERVED_PAGE_SLUGS.has(p.slug))
    .map((entry) => ({
      path: withTrailingSlash(`/${entry.slug}`),
      changefreq: 'monthly',
      priority: '0.7',
    }));

  const allPaths = [
    ...staticPaths,
    ...servicePaths,
    ...blogPaths,
    ...categoryPaths,
    ...pagePaths,
    ...locationPaths,
    ...industryPaths,
  ];

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
