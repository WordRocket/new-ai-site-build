export type BusinessType =
  | 'local-service'
  | 'professional'
  | 'health-wellness'
  | 'restaurant'
  | 'ecommerce'
  | 'real-estate'
  | 'general'
  | 'other';

export interface TrustSignal {
  icon: string;   // lucide icon name
  label: string;
}

export interface StickyBar {
  show: boolean;
  primaryLabel: string;
  primaryHref: string;   // {phone} resolved at render time via interpolate()
  secondaryLabel: string;
  secondaryHref: string;
}

export interface CtaBand {
  heading: string;
  subtext: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface BusinessPreset {
  skin: 'light' | 'dark';
  emergencyBarEnabled: boolean;
  heroCta: string;
  heroCtaSecondary: string;
  trustSignals: TrustSignal[];
  statsLabel: string;
  servicesHeading: string;
  servicesSubheading: string;
  contactCta: string;
  contactSubtext: string;
  stickyBar: StickyBar;
  ctaBand: CtaBand;
  processHeading: string;
}

export const BUSINESS_PRESETS: Record<BusinessType, BusinessPreset> = {
  'local-service': {
    skin: 'light',
    emergencyBarEnabled: true,
    heroCta: 'Get a Free Quote',
    heroCtaSecondary: 'Our Services',
    trustSignals: [
      { icon: 'shield-check', label: 'Licensed & Insured' },
      { icon: 'check-circle',  label: 'Free Estimates' },
      { icon: 'clock',         label: 'Same-Day Service Available' },
    ],
    statsLabel: 'Years Experience',
    servicesHeading: 'Our Services',
    servicesSubheading: 'Professional {niche} services in {city}',
    contactCta: 'Call for a Free Quote',
    contactSubtext: 'We respond fast and show up on time.',
    stickyBar: {
      show: true,
      primaryLabel: 'Call Now',
      primaryHref: 'tel:{phone}',
      secondaryLabel: 'Free Quote',
      secondaryHref: '/contact',
    },
    ctaBand: {
      heading: 'Ready to Get Started?',
      subtext: 'Call us today for a free, no-obligation estimate.',
      buttonLabel: 'Get a Free Quote',
      buttonHref: '/contact',
    },
    processHeading: 'How It Works',
  },

  'professional': {
    skin: 'light',
    emergencyBarEnabled: false,
    heroCta: 'Book a Consultation',
    heroCtaSecondary: 'Our Services',
    trustSignals: [
      { icon: 'award',    label: 'Credentialed Professionals' },
      { icon: 'lock',     label: 'Confidential & Trusted' },
      { icon: 'calendar', label: 'By Appointment' },
    ],
    statsLabel: 'Years Experience',
    servicesHeading: 'What We Offer',
    servicesSubheading: 'Expert {niche} services in {city}',
    contactCta: 'Schedule a Consultation',
    contactSubtext: 'Confidential, professional, and results-driven.',
    stickyBar: {
      show: true,
      primaryLabel: 'Book Consultation',
      primaryHref: '/contact',
      secondaryLabel: 'Email Us',
      secondaryHref: 'mailto:{email}',
    },
    ctaBand: {
      heading: 'Let\'s Work Together',
      subtext: 'Schedule a confidential consultation with our team.',
      buttonLabel: 'Book a Consultation',
      buttonHref: '/contact',
    },
    processHeading: 'Our Process',
  },

  'health-wellness': {
    skin: 'light',
    emergencyBarEnabled: false,
    heroCta: 'Book an Appointment',
    heroCtaSecondary: 'Our Services',
    trustSignals: [
      { icon: 'badge-check', label: 'Certified Practitioners' },
      { icon: 'heart',       label: 'Welcoming Environment' },
      { icon: 'calendar',    label: 'Flexible Scheduling' },
    ],
    statsLabel: 'Happy Clients',
    servicesHeading: 'Our Services',
    servicesSubheading: 'Health & wellness in {city}',
    contactCta: 'Book Your Session',
    contactSubtext: 'Take the first step toward feeling better.',
    stickyBar: {
      show: true,
      primaryLabel: 'Book Appointment',
      primaryHref: '/contact',
      secondaryLabel: 'Call Us',
      secondaryHref: 'tel:{phone}',
    },
    ctaBand: {
      heading: 'Start Your Wellness Journey',
      subtext: 'Book a session today — your first step to feeling better.',
      buttonLabel: 'Book an Appointment',
      buttonHref: '/contact',
    },
    processHeading: 'How It Works',
  },

  'restaurant': {
    skin: 'light',
    emergencyBarEnabled: false,
    heroCta: 'View Our Menu',
    heroCtaSecondary: 'Book a Table',
    trustSignals: [
      { icon: 'utensils', label: 'Fresh Ingredients Daily' },
      { icon: 'star',     label: 'Top Rated' },
      { icon: 'clock',    label: 'Open Now' },
    ],
    statsLabel: 'Years Serving {city}',
    servicesHeading: 'Our Menu',
    servicesSubheading: 'Delicious food in {city}',
    contactCta: 'Make a Reservation',
    contactSubtext: 'Walk-ins welcome. Reserve for groups.',
    stickyBar: {
      show: true,
      primaryLabel: 'Reserve a Table',
      primaryHref: '/contact',
      secondaryLabel: 'View Menu',
      secondaryHref: '/menu',
    },
    ctaBand: {
      heading: 'Come Dine With Us',
      subtext: 'Reserve your table or order online today.',
      buttonLabel: 'Book a Table',
      buttonHref: '/contact',
    },
    processHeading: 'How to Order',
  },

  'ecommerce': {
    skin: 'light',
    emergencyBarEnabled: false,
    heroCta: 'Shop Now',
    heroCtaSecondary: 'View Collections',
    trustSignals: [
      { icon: 'truck',        label: 'Free Shipping Available' },
      { icon: 'refresh-ccw',  label: 'Easy Returns' },
      { icon: 'shield-check', label: 'Secure Checkout' },
    ],
    statsLabel: 'Happy Customers',
    servicesHeading: 'Our Products',
    servicesSubheading: 'Quality products delivered to you',
    contactCta: 'Get in Touch',
    contactSubtext: 'Questions? We respond within 24 hours.',
    stickyBar: {
      show: true,
      primaryLabel: 'Shop Now',
      primaryHref: '/shop',
      secondaryLabel: 'View Collections',
      secondaryHref: '/collections',
    },
    ctaBand: {
      heading: 'Ready to Shop?',
      subtext: 'Free shipping on orders over a qualifying amount.',
      buttonLabel: 'Shop Now',
      buttonHref: '/shop',
    },
    processHeading: 'How It Works',
  },

  'real-estate': {
    skin: 'light',
    emergencyBarEnabled: false,
    heroCta: 'Browse Listings',
    heroCtaSecondary: 'Free Valuation',
    trustSignals: [
      { icon: 'badge-check', label: 'Licensed Realtor' },
      { icon: 'map-pin',     label: 'Local Market Expert' },
      { icon: 'home',        label: 'Free Home Valuation' },
    ],
    statsLabel: 'Homes Sold',
    servicesHeading: 'Our Services',
    servicesSubheading: 'Real estate expertise in {city}',
    contactCta: 'Talk to an Agent',
    contactSubtext: 'Local expertise, personal service.',
    stickyBar: {
      show: true,
      primaryLabel: 'Talk to an Agent',
      primaryHref: '/contact',
      secondaryLabel: 'Free Valuation',
      secondaryHref: '/contact',
    },
    ctaBand: {
      heading: 'Ready to Buy or Sell?',
      subtext: 'Get a free home valuation from a local expert.',
      buttonLabel: 'Talk to an Agent',
      buttonHref: '/contact',
    },
    processHeading: 'How We Work',
  },

  'other': {
    skin: 'light',
    emergencyBarEnabled: false,
    heroCta: 'Get Started',
    heroCtaSecondary: 'Learn More',
    trustSignals: [
      { icon: 'home',         label: 'Locally Owned' },
      { icon: 'thumbs-up',    label: 'Trusted Service' },
      { icon: 'check-circle', label: 'Satisfaction Guaranteed' },
    ],
    statsLabel: 'Years in Business',
    servicesHeading: 'What We Offer',
    servicesSubheading: 'Quality services in {city}',
    contactCta: 'Contact Us Today',
    contactSubtext: "We'd love to hear from you.",
    stickyBar: {
      show: true,
      primaryLabel: 'Contact Us',
      primaryHref: '/contact',
      secondaryLabel: 'Call Us',
      secondaryHref: 'tel:{phone}',
    },
    ctaBand: {
      heading: 'Ready to Get Started?',
      subtext: "We'd love to hear from you — reach out today.",
      buttonLabel: 'Contact Us',
      buttonHref: '/contact',
    },
    processHeading: 'How It Works',
  },

  'general': {
    skin: 'light',
    emergencyBarEnabled: false,
    heroCta: 'Get in Touch',
    heroCtaSecondary: 'Learn More',
    trustSignals: [],
    statsLabel: 'Years in Business',
    servicesHeading: 'What We Do',
    servicesSubheading: 'Our work in {city}',
    contactCta: 'Send a Message',
    contactSubtext: 'We respond to all messages within one business day.',
    stickyBar: {
      show: false,
      primaryLabel: 'Contact Us',
      primaryHref: '/contact',
      secondaryLabel: 'Learn More',
      secondaryHref: '/about',
    },
    ctaBand: {
      heading: 'Ready to Connect?',
      subtext: "Get in touch — we'd love to hear from you.",
      buttonLabel: 'Get in Touch',
      buttonHref: '/contact',
    },
    processHeading: 'How It Works',
  },
};

export function getPreset(businessType: string): BusinessPreset {
  return BUSINESS_PRESETS[businessType as BusinessType] ?? BUSINESS_PRESETS['other'];
}

export function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}
