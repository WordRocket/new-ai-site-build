export function GET() {
  const body = `# Search engines
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/private/

User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /api/private/

# AI search crawlers — explicitly allowed
User-agent: GPTBot
Allow: /
Disallow: /admin/

User-agent: OAI-SearchBot
Allow: /
Disallow: /admin/

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Gemini-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

# Social crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Default — allow all except private paths
User-agent: *
Disallow: /admin/
Disallow: /api/private/
Disallow: /_astro/

# Block SEO scrapers entirely
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: DataForSeoBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: MegaIndex
Disallow: /

User-agent: PetalBot
Disallow: /

User-agent: SiteAuditBot
Disallow: /

# Sitemaps
Sitemap: https://placeholder.com/sitemap.xml
Sitemap: https://placeholder.com/sitemap-llm.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
