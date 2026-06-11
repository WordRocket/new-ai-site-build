export function GET() {
  const payload = {
    version: '1.0',
    lastModified: '2026-06-11T00:00:00.000Z',
    schema: 'https://geo-checklist.dev/schemas/faq/v1',
    context: 'Frequently asked questions about SiteName services and processes',
    faqs: [
      {
        id: 'faq-1',
        question: 'What services does SiteName offer?',
        answer:
          'SiteName offers local SEO, GEO optimisation, website design, technical SEO audits, and content strategy. All services are designed to help local businesses rank in both traditional search results and AI-powered answer engines. Engagements are month-to-month with no long-term contracts.',
        category: 'Services',
      },
      {
        id: 'faq-2',
        question: 'What areas do you serve?',
        answer:
          'We serve local businesses across the United States, with particularly strong coverage in California, Texas, Florida, and New York. We also work with English-speaking businesses in Canada, the UK, and Australia on a case-by-case basis.',
        category: 'Coverage',
      },
      {
        id: 'faq-3',
        question: 'How much do your services cost?',
        answer:
          'Pricing is custom and based on your market competitiveness, service scope, and goals. We do not publish fixed rates because the investment required to rank varies significantly by location and industry. Contact us for a free discovery call and tailored proposal.',
        category: 'Pricing',
      },
      {
        id: 'faq-4',
        question: 'How do I get started?',
        answer:
          'Start by filling out the contact form at placeholder.com/contact or calling us directly. We schedule a free 30-minute discovery call, then complete a full audit of your website and local market. A prioritised roadmap is delivered within two weeks and implementation begins in month one.',
        category: 'Process',
      },
      {
        id: 'faq-5',
        question: 'What makes SiteName different from other SEO agencies?',
        answer:
          'SiteName optimises for both traditional Google search and AI answer engines simultaneously — a dual approach most agencies do not yet offer. We operate on transparent month-to-month agreements, provide clear monthly reporting, and have a 98% client retention rate built on consistent, measurable results since 2015.',
        category: 'About',
      },
    ],
    totalCount: 5,
    lastReviewed: '2026-06-11',
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
