import { getContentScope, type ContentScope } from './siteMode';

interface CopySet {
  heroSubtext: string;
  contactHeading: string;
  contactSubtext: string;
  contactFormIntro: string;
  sidebarCtaLabel: string;
  servicesBlockHeading: string;
}

const COPY: Record<ContentScope, CopySet> = {
  local: {
    heroSubtext: 'Local service with a personal touch.',
    contactHeading: 'Send Us a Message',
    contactSubtext: 'We respond fast and show up on time.',
    contactFormIntro: "Fill out the form below and we'll get back to you within one business day.",
    sidebarCtaLabel: 'Get a Free Quote',
    servicesBlockHeading: 'Our Services',
  },
  national: {
    heroSubtext: 'We share ideas, guides, and perspectives worth your time.',
    contactHeading: 'Send a Message',
    contactSubtext: 'We respond to all messages within one business day.',
    contactFormIntro: "Fill out the form below and we'll get back to you within one business day.",
    sidebarCtaLabel: 'Get in Touch',
    servicesBlockHeading: 'Browse by Topic',
  },
  global: {
    heroSubtext: 'We share ideas, guides, and perspectives worth your time.',
    contactHeading: 'Send a Message',
    contactSubtext: 'We respond to all messages within one business day.',
    contactFormIntro: "Fill out the form below and we'll get back to you within one business day.",
    sidebarCtaLabel: 'Get in Touch',
    servicesBlockHeading: 'Browse by Topic',
  },
};

export function getCopy(): CopySet {
  return COPY[getContentScope()];
}
