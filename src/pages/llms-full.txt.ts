import { getCollection } from 'astro:content';
import siteConfig from '../lib/site-config';

export async function GET() {
  const [services, locations, posts] = await Promise.all([
    getCollection('services'),
    getCollection('locations'),
    getCollection('blog'),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  const sortedServices = services.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));

  const serviceLinks = sortedServices.length > 0
    ? sortedServices
        .map(s => `- [${s.data.title}](${siteConfig.url}/services/${s.slug}): ${s.data.shortDescription || s.data.description}`)
        .join('\n')
    : `- [Services](${siteConfig.url}/services): View all services offered by ${siteConfig.name}.`;

  const locationLinks = locations.length > 0
    ? locations
        .map(l => `- [${l.data.title}](${siteConfig.url}/${l.slug}): ${l.data.description}`)
        .join('\n')
    : '';

  const postLinks = posts.length > 0
    ? posts
        .sort((a, b) => new Date(b.data.datePublished).getTime() - new Date(a.data.datePublished).getTime())
        .slice(0, 10)
        .map(p => `- [${p.data.title}](${siteConfig.url}/blog/${p.slug}): ${p.data.description}`)
        .join('\n')
    : '';

  const serviceSummaries = sortedServices.length > 0
    ? sortedServices
        .map(s => `### ${s.data.title}\n${s.data.description}`)
        .join('\n\n')
    : `### Services\n${siteConfig.name} offers professional services to clients in ${siteConfig.city}, ${siteConfig.state} and surrounding areas.`;

  const locationSummaries = locations.length > 0
    ? locations
        .map(l => `### ${l.data.title}\n${l.data.description}`)
        .join('\n\n')
    : '';

  const body = `# ${siteConfig.name}

> ${siteConfig.name} is ${siteConfig.description}

## Entity

- **Brand:** ${siteConfig.name}
- **Type:** Local Business
- **Location:** ${siteConfig.city}, ${siteConfig.state}
- **Contact:** ${siteConfig.email}

## Services

${serviceLinks}
${locationLinks ? `\n## Service Areas\n\n${locationLinks}\n` : ''}
## Key Pages

- [Home](${siteConfig.url}/): ${siteConfig.description}
- [About](${siteConfig.url}/about): Learn about ${siteConfig.name}, our team, and our commitment to ${siteConfig.city}.
- [Services](${siteConfig.url}/services): Browse all services offered by ${siteConfig.name}.
- [Blog](${siteConfig.url}/blog): Tips, guides, and industry news from ${siteConfig.name}.
- [Contact](${siteConfig.url}/contact): Get in touch with ${siteConfig.name} in ${siteConfig.city}, ${siteConfig.state}.
- [FAQ](${siteConfig.url}/faq): Answers to common questions about ${siteConfig.name}.
${postLinks ? `\n## Recent Blog Posts\n\n${postLinks}\n` : ''}
## AI Endpoints

- [Business Summary](${siteConfig.url}/ai/summary.json): Structured JSON summary of ${siteConfig.name}.
- [FAQ Data](${siteConfig.url}/ai/faq.json): Machine-readable FAQ for ${siteConfig.name}.
- [Service Data](${siteConfig.url}/ai/service.json): Structured service information for AI agents.

## Last Updated

${today}

---

## Page Summaries

### Home
${siteConfig.name} serves ${siteConfig.city}, ${siteConfig.state} and surrounding areas. ${siteConfig.description} The home page highlights key services, trust signals, and a clear call to action.

${serviceSummaries}

### About
${siteConfig.name} is a trusted local business serving clients in ${siteConfig.city}, ${siteConfig.state}. The team delivers transparent, results-driven service with a focus on customer satisfaction.

### Contact
Prospective clients can reach ${siteConfig.name} via the contact form, phone at ${siteConfig.phone}, or email at ${siteConfig.email}. The team responds to all enquiries within one business day.

### FAQ
The FAQ covers common questions about services offered, what to expect, pricing, and the process from first contact through to completion.
${locationSummaries ? `\n## Location Summaries\n\n${locationSummaries}\n` : ''}
## Content Freshness

Last full update: ${today}
Update frequency: Weekly
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
