const TODAY = '2026-06-11';

const urls: Array<{ loc: string; changefreq: string; priority: string }> = [
  { loc: 'https://placeholder.com/', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://placeholder.com/services', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://placeholder.com/blog', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://placeholder.com/contact', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://placeholder.com/about', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://placeholder.com/faq', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://placeholder.com/.well-known/ai.txt', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://placeholder.com/ai/summary.json', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://placeholder.com/ai/faq.json', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://placeholder.com/ai/service.json', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://placeholder.com/llms.txt', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://placeholder.com/llms-full.txt', changefreq: 'monthly', priority: '0.8' },
];

export function GET() {
  const entries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
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
