export function GET() {
  const body = `# SiteName

> SiteName is a digital marketing agency serving local businesses across the United States. We build AI-powered websites and local SEO strategies that help businesses rank higher, attract more customers, and grow revenue.

## Entity

- **Brand:** SiteName
- **Type:** Local Business
- **Founded:** 2015
- **Location:** Your City, CA
- **Contact:** hello@placeholder.com

## Services
- Local SEO: End-to-end local search optimisation to rank in Google Maps and organic results.
- GEO Optimisation: Structured content strategy to earn citations in AI answer engines like ChatGPT and Perplexity.
- Website Design: Fast, accessible, conversion-focused websites built to rank from launch day.

## About
SiteName has helped over 500 local businesses improve their online visibility since 2015. Our team holds Google Partner status and recognised industry certifications. We combine technical SEO, AI-optimised content, and high-performance web design into a single, measurable growth system.

## Key Pages
- Home: https://placeholder.com/
- About: https://placeholder.com/about
- Services: https://placeholder.com/services
- Blog: https://placeholder.com/blog
- Contact: https://placeholder.com/contact
- FAQ: https://placeholder.com/faq

## AI Endpoints
- Summary: https://placeholder.com/ai/summary.json
- FAQ: https://placeholder.com/ai/faq.json
- Service: https://placeholder.com/ai/service.json

## Last Updated
2026-06-11
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
