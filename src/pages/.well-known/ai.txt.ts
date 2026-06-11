export function GET() {
  const body = `# AI.txt for placeholder.com
# Declares machine-readable endpoints for AI systems
# Following the GEO contract standard (geo-checklist.dev)

User-agent: *
Allow: /ai/faq.json
Allow: /ai/service.json
Allow: /ai/summary.json
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /sitemap-llm.xml
Allow: /.well-known/ai.txt

Preferred-Format: application/json
Contact: contact@placeholder.com

# Last updated: 2026-06-11
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
