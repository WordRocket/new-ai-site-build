import siteConfig from '../lib/site-config';

export function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.name} is ${siteConfig.description}

## Entity

- **Brand:** ${siteConfig.name}
- **Type:** Local Business
- **Location:** ${siteConfig.city}, ${siteConfig.state}
- **Contact:** ${siteConfig.email}

## Services
- Local SEO: End-to-end local search optimisation to rank in Google Maps and organic results.
- GEO Optimisation: Structured content strategy to earn citations in AI answer engines like ChatGPT and Perplexity.
- Website Design: Fast, accessible, conversion-focused websites built to rank from launch day.

## About
${siteConfig.name} serves local businesses in ${siteConfig.city}, ${siteConfig.state} and surrounding areas. We combine technical SEO, AI-optimised content, and high-performance web design into a single, measurable growth system.

## Key Pages
- Home: ${siteConfig.url}/
- About: ${siteConfig.url}/about
- Services: ${siteConfig.url}/services
- Blog: ${siteConfig.url}/blog
- Contact: ${siteConfig.url}/contact
- FAQ: ${siteConfig.url}/faq

## AI Endpoints
- Summary: ${siteConfig.url}/ai/summary.json
- FAQ: ${siteConfig.url}/ai/faq.json
- Service: ${siteConfig.url}/ai/service.json

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
