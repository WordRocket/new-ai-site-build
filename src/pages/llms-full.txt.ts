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

---

## Page Summaries

### Home
The home page introduces SiteName and its core value proposition: AI-powered websites and local SEO that rank and convert. It targets local business owners who want to grow their online presence. The page highlights key services, trust signals, and a clear call to action to start a conversation. It is designed for both human visitors and AI crawlers to quickly understand what SiteName does.

### Services
The services section covers Local SEO, GEO Optimisation, Website Design, Technical SEO, and Content Strategy. Each service page explains the problem solved, the methodology, and expected outcomes. Services are available to local businesses throughout the United States, with particular depth in competitive markets. Pricing is custom, based on market competitiveness and scope.

### Blog
The blog covers actionable topics in local SEO, GEO optimisation, AI search trends, and digital marketing strategy for small and medium businesses. Articles are written by certified practitioners and published on a weekly cadence. Content is designed to rank in both traditional search and AI answer engines.

### About
SiteName was founded in 2015 and has since served over 500 local businesses. The team includes certified SEO strategists, developers, and content specialists holding Google Partner status, SEMrush Academy credentials, and Clutch Top Agency recognition. The agency operates on transparent month-to-month agreements, with a 98% client retention rate demonstrating consistent results.

### Contact
Prospective clients can reach SiteName via the contact form, phone, or email. The team responds to all inquiries within one business day and offers a free discovery call to assess fit and project scope.

### FAQ
The FAQ covers common questions across three categories: services offered, results and timelines, and the onboarding process. It addresses topics like how long SEO takes, what GEO optimisation is, and whether long-term contracts are required.

## Trust Signals
- Years in business: 10+
- Clients served: 500+
- Service area: United States (primary: California, Texas, Florida, New York)
- Certifications: Google Partner, SEMrush Certified, Clutch Top Agency 2024, Moz SEO Expert

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
