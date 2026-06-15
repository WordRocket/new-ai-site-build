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

---

## Page Summaries

### Home
The home page introduces ${siteConfig.name} and its core value proposition. It targets local business owners who want to grow their online presence. The page highlights key services, trust signals, and a clear call to action to start a conversation.

### Services
The services section covers the offerings available to local businesses in ${siteConfig.city}, ${siteConfig.state} and surrounding areas. Each service page explains the problem solved, the methodology, and expected outcomes.

### Blog
The blog covers actionable topics in local SEO, GEO optimisation, AI search trends, and digital marketing strategy for small and medium businesses.

### About
${siteConfig.name} serves clients in ${siteConfig.city}, ${siteConfig.state}. The team delivers transparent, results-driven service to local businesses.

### Contact
Prospective clients can reach ${siteConfig.name} via the contact form, phone at ${siteConfig.phone}, or email at ${siteConfig.email}. The team responds to all inquiries within one business day.

### FAQ
The FAQ covers common questions across services offered, results and timelines, and the onboarding process.

## Content Freshness
Last full update: 2026-06-11
Update frequency: Weekly
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
