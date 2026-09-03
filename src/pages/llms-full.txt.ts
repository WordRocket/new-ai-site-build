import { getCollection } from 'astro:content';
import siteConfig from '../lib/site-config';
import { isLocalSite, getEntityType } from '../lib/siteMode';

export async function GET() {
  const [services, locations, posts, categories] = await Promise.all([
    getCollection('services'),
    getCollection('locations'),
    getCollection('blog'),
    getCollection('categories').catch(() => []),
  ]);

  const isLocal = isLocalSite();
  const entityType = getEntityType();
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
    : isLocal
      ? `### Services\n${siteConfig.name} offers professional services to clients in ${siteConfig.city}, ${siteConfig.state} and surrounding areas.`
      : `### Services\n${siteConfig.name} offers professional services. ${siteConfig.description}`;

  const locationSummaries = locations.length > 0
    ? locations
        .map(l => `### ${l.data.title}\n${l.data.description}`)
        .join('\n\n')
    : '';

  const publishedCategories = categories.filter((c: any) => c.data.published !== false);
  const topicNames: string[] = publishedCategories.length > 0
    ? publishedCategories.map((c: any) => c.data.title || c.data.name || c.slug)
    : ((siteConfig as any).categories as string[] | undefined) ?? [];

  const typeLine = `- **Type:** ${entityType}`;
  const locationLine = isLocal
    ? `- **Location:** ${siteConfig.city}, ${siteConfig.state}`
    : (topicNames.length > 0 ? `- **Topics:** ${topicNames.join(', ')}` : '');

  const aboutSummary = isLocal
    ? `Learn about ${siteConfig.name}, our team, and our commitment to ${siteConfig.city}.`
    : `Learn about ${siteConfig.name}, our team, and what we do.`;

  const contactSummary = isLocal
    ? `Get in touch with ${siteConfig.name} in ${siteConfig.city}, ${siteConfig.state}.`
    : `Get in touch with ${siteConfig.name}.`;

  const aiEndpointLine = isLocal
    ? `- [Service Data](${siteConfig.url}/ai/service.json): Structured service information for AI agents.`
    : `- [Topics Data](${siteConfig.url}/ai/topics.json): Structured topic/category information for AI agents.`;

  const homeSummary = isLocal
    ? `${siteConfig.name} serves ${siteConfig.city}, ${siteConfig.state} and surrounding areas. ${siteConfig.description} The home page highlights key services, trust signals, and a clear call to action.`
    : `${siteConfig.name} — ${siteConfig.description} The home page highlights key offerings, trust signals, and a clear call to action.`;

  const aboutPageSummary = isLocal
    ? `${siteConfig.name} is a trusted local business serving clients in ${siteConfig.city}, ${siteConfig.state}. The team delivers transparent, results-driven service with a focus on customer satisfaction.`
    : `${siteConfig.name} is a trusted provider. The team delivers transparent, results-driven work with a focus on customer satisfaction.`;

  const body = `# ${siteConfig.name}

> ${siteConfig.name} is ${siteConfig.description}

## Entity

- **Brand:** ${siteConfig.name}
${typeLine}
${locationLine}
- **Contact:** ${siteConfig.email}

## Services

${serviceLinks}
${locationLinks ? `\n## Service Areas\n\n${locationLinks}\n` : ''}
## Key Pages

- [Home](${siteConfig.url}/): ${siteConfig.description}
- [About](${siteConfig.url}/about): ${aboutSummary}
- [Services](${siteConfig.url}/services): Browse all services offered by ${siteConfig.name}.
- [Blog](${siteConfig.url}/blog): Tips, guides, and industry news from ${siteConfig.name}.
- [Contact](${siteConfig.url}/contact): ${contactSummary}
- [FAQ](${siteConfig.url}/faq): Answers to common questions about ${siteConfig.name}.
${postLinks ? `\n## Recent Blog Posts\n\n${postLinks}\n` : ''}
## AI Endpoints

- [Business Summary](${siteConfig.url}/ai/summary.json): Structured JSON summary of ${siteConfig.name}.
- [FAQ Data](${siteConfig.url}/ai/faq.json): Machine-readable FAQ for ${siteConfig.name}.
${aiEndpointLine}

## Last Updated

${today}

---

## Page Summaries

### Home
${homeSummary}

${serviceSummaries}

### About
${aboutPageSummary}

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
