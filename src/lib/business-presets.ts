export type BusinessType =
  | 'local-service'
  | 'professional'
  | 'health-wellness'
  | 'restaurant'
  | 'ecommerce'
  | 'real-estate'
  | 'other';

export interface BusinessPreset {
  emergencyBarEnabled: boolean;
  heroCta: string;
  heroCtaSecondary: string;
  trustSignals: string[];
  statsLabel: string;
  servicesHeading: string;
  servicesSubheading: string;
  contactCta: string;
  contactSubtext: string;
}

export const BUSINESS_PRESETS: Record<BusinessType, BusinessPreset> = {
  'local-service': {
    emergencyBarEnabled: true,
    heroCta: 'Get a Free Quote',
    heroCtaSecondary: 'Our Services',
    trustSignals: [
      '✓ Licensed & Insured',
      '✓ Free Estimates',
      '✓ Same-Day Service Available',
    ],
    statsLabel: 'Years Experience',
    servicesHeading: 'Our Services',
    servicesSubheading: 'Professional {niche} services in {city}',
    contactCta: 'Call for a Free Quote',
    contactSubtext: 'We respond fast and show up on time.',
  },
  'professional': {
    emergencyBarEnabled: false,
    heroCta: 'Book a Consultation',
    heroCtaSecondary: 'Our Services',
    trustSignals: [
      '✓ Certified Professionals',
      '✓ Confidential & Trusted',
      '✓ Free Initial Consultation',
    ],
    statsLabel: 'Years Experience',
    servicesHeading: 'What We Offer',
    servicesSubheading: 'Expert {niche} services in {city}',
    contactCta: 'Schedule a Consultation',
    contactSubtext: 'Confidential, professional, and results-driven.',
  },
  'health-wellness': {
    emergencyBarEnabled: false,
    heroCta: 'Book an Appointment',
    heroCtaSecondary: 'Our Services',
    trustSignals: [
      '✓ Certified Practitioners',
      '✓ Welcoming Environment',
      '✓ Flexible Scheduling',
    ],
    statsLabel: 'Happy Clients',
    servicesHeading: 'Our Services',
    servicesSubheading: 'Health & wellness in {city}',
    contactCta: 'Book Your Session',
    contactSubtext: 'Take the first step toward feeling better.',
  },
  'restaurant': {
    emergencyBarEnabled: false,
    heroCta: 'View Our Menu',
    heroCtaSecondary: 'Book a Table',
    trustSignals: [
      '✓ Fresh Ingredients Daily',
      '✓ Dine In & Takeout',
      '✓ Open 7 Days a Week',
    ],
    statsLabel: 'Years Serving {city}',
    servicesHeading: 'Our Menu',
    servicesSubheading: 'Delicious food in {city}',
    contactCta: 'Make a Reservation',
    contactSubtext: 'Walk-ins welcome. Reserve for groups.',
  },
  'ecommerce': {
    emergencyBarEnabled: false,
    heroCta: 'Shop Now',
    heroCtaSecondary: 'View Collections',
    trustSignals: [
      '✓ Free Shipping Available',
      '✓ Easy Returns',
      '✓ Secure Checkout',
    ],
    statsLabel: 'Happy Customers',
    servicesHeading: 'Our Products',
    servicesSubheading: 'Quality products delivered to you',
    contactCta: 'Get in Touch',
    contactSubtext: 'Questions? We respond within 24 hours.',
  },
  'real-estate': {
    emergencyBarEnabled: false,
    heroCta: 'Browse Listings',
    heroCtaSecondary: 'Free Valuation',
    trustSignals: [
      '✓ Licensed Realtor',
      '✓ Local Market Expert',
      '✓ Free Home Valuation',
    ],
    statsLabel: 'Homes Sold',
    servicesHeading: 'Our Services',
    servicesSubheading: 'Real estate expertise in {city}',
    contactCta: 'Talk to an Agent',
    contactSubtext: 'Local expertise, personal service.',
  },
  'other': {
    emergencyBarEnabled: false,
    heroCta: 'Get Started',
    heroCtaSecondary: 'Learn More',
    trustSignals: [
      '✓ Locally Owned',
      '✓ Trusted Service',
      '✓ Satisfaction Guaranteed',
    ],
    statsLabel: 'Years in Business',
    servicesHeading: 'What We Offer',
    servicesSubheading: 'Quality services in {city}',
    contactCta: 'Contact Us Today',
    contactSubtext: "We'd love to hear from you.",
  },
};

export function getPreset(businessType: string): BusinessPreset {
  return BUSINESS_PRESETS[businessType as BusinessType] ?? BUSINESS_PRESETS['other'];
}

export function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}
