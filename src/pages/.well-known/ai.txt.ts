import siteConfig from '../../lib/site-config';
import { isLocalSite } from '../../lib/siteMode';

export function GET() {
  const siteUrl = (siteConfig.url || 'https://placeholder.com').replace(/\/+$/, '');
  const contactEmail = siteConfig.email || '';
  const today = new Date().toISOString().slice(0, 10);
  const isLocal = isLocalSite();

  const aiEndpointAllow = isLocal
    ? 'Allow: /ai/service.json'
    : 'Allow: /ai/topics.json';

  const body = `# AI.txt for ${siteUrl}
# Declares machine-readable endpoints for AI systems
# Following the GEO contract standard (geo-checklist.dev)

User-agent: *
Allow: /ai/faq.json
${aiEndpointAllow}
Allow: /ai/summary.json
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /sitemap-llm.xml
Allow: /.well-known/ai.txt

Preferred-Format: application/json
${contactEmail ? `Contact: ${contactEmail}` : ''}

# Last updated: ${today}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
