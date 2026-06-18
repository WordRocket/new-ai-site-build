import { getCollection } from 'astro:content';
import siteConfig from '../lib/site-config';

export async function GET() {
  const [services, locations] = await Promise.all([
    getCollection('services'),
    getCollection('locations'),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  const serviceLinks = services.length > 0
    ? services
        .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0))
        .map(s => `- [${s.data.title}](${siteConfig.url}/services/${s.slug}): ${s.data.shortDescription || s.data.description}`)
        .join('\n')
    : `- [Services](${siteConfig.url}/services): View all services offered by ${siteConfig.name}.`;

  const locationLinks = locations.length > 0
    ? locations
        .map(l => `- [${l.data.title}](${siteConfig.url}/${l.slug}): ${l.data.description}`)
        .join('\n')
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

## AI Endpoints

- [Business Summary](${siteConfig.url}/ai/summary.json): Structured JSON summary of ${siteConfig.name}.
- [FAQ Data](${siteConfig.url}/ai/faq.json): Machine-readable FAQ for ${siteConfig.name}.
- [Service Data](${siteConfig.url}/ai/service.json): Structured service information for AI agents.

## Last Updated

${today}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
