import siteConfig from '../../lib/site-config';
import { isLocalSite } from '../../lib/siteMode';

export function GET() {
  const isLocal = isLocalSite();
  const today = new Date().toISOString().slice(0, 10);

  const faq1Answer = isLocal
    ? `${siteConfig.name} offers services tailored to local businesses in ${siteConfig.city}, ${siteConfig.state}. Contact us to learn more about how we can help you grow.`
    : `${siteConfig.name} offers services and resources tailored to your needs. Contact us to learn more about how we can help.`;

  const baseFaqs = [
    {
      id: 'faq-1',
      question: `What services does ${siteConfig.name} offer?`,
      answer: faq1Answer,
      category: 'Services',
    },
    ...(isLocal ? [
      {
        id: 'faq-2',
        question: 'What areas do you serve?',
        answer:
          `We primarily serve ${siteConfig.city}, ${siteConfig.state} and surrounding areas. Contact us to confirm availability in your location.`,
        category: 'Coverage',
      },
    ] : []),
    {
      id: 'faq-3',
      question: 'How much do your services cost?',
      answer:
        'Pricing is custom and based on your needs and goals. Contact us for a free consultation and tailored proposal.',
      category: 'Pricing',
    },
    {
      id: 'faq-4',
      question: 'How do I get started?',
      answer:
        `Start by filling out the contact form at ${siteConfig.url}/contact or calling us at ${siteConfig.phone}. We will respond within one business day.`,
      category: 'Process',
    },
    {
      id: 'faq-5',
      question: `What makes ${siteConfig.name} different?`,
      answer:
        `${siteConfig.name} is committed to delivering quality results with care and professionalism. We focus on transparent communication and measurable outcomes for every client.`,
      category: 'About',
    },
  ];

  const payload = {
    version: '1.0',
    lastModified: today + 'T00:00:00.000Z',
    schema: 'https://geo-checklist.dev/schemas/faq/v1',
    context: `Frequently asked questions about ${siteConfig.name} services and processes`,
    faqs: baseFaqs,
    totalCount: baseFaqs.length,
    lastReviewed: today,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
