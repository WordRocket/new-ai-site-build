import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.string(),
    dateModified: z.string(),
    author: z.string(),
    authorBio: z.string().optional(),
    authorImage: z.string().optional(),
    heroImage: z.string().optional(),
    sectionImage: z.string().optional(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    noindex: z.boolean().default(false),
    canonical: z.string().optional(),
    ogImage: z.string().optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    schemaJsonld: z.string().optional(),
  }),
});

const faqItemSchema = z.object({ question: z.string(), answer: z.string() });

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    sectionImage: z.string().optional(),
    serviceImage: z.string().optional(),
    aboutImage: z.string().optional(),
    noindex: z.boolean().default(false),
    canonical: z.string().optional(),
    ogImage: z.string().optional(),
    faq: z.array(faqItemSchema).default([]),
    faqCategories: z.array(z.object({ label: z.string(), items: z.array(faqItemSchema) })).optional(),
    faqPageTitle: z.string().optional(),
    faqPageDescription: z.string().optional(),
    schemaJsonld: z.string().optional(),
  }),
});

const stepSchema = z.object({ title: z.string(), desc: z.string(), icon: z.string().optional() });
const featureSchema = z.object({ title: z.string(), desc: z.string(), icon: z.string().optional() });
const testimonialSchema = z.object({
  quote: z.string().optional(),
  name: z.string().optional(),
  role: z.string().optional(),
  rating: z.number().optional(),
  result: z.string().optional(),
});

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    icon: z.string().optional(),
    heroImage: z.string().optional(),
    sectionImage: z.string().optional(),
    serviceImage: z.string().optional(),
    aboutImage: z.string().optional(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    areaServed: z.array(z.string()).default([]),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    order: z.number().default(0),
    steps: z.array(stepSchema).optional(),
    features: z.array(featureSchema).optional(),
    testimonials: z.array(testimonialSchema).optional(),
    schemaJsonld: z.string().optional(),
  }),
});

const locations = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    city: z.string(),
    state: z.string(),
    service: z.string(),
    heroImage: z.string().optional(),
    sectionImage: z.string().optional(),
    serviceImage: z.string().optional(),
    aboutImage: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    steps: z.array(stepSchema).optional(),
    features: z.array(featureSchema).optional(),
    testimonials: z.array(testimonialSchema).optional(),
    schemaJsonld: z.string().optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    images: z.array(z.string()).default([]),
    date: z.string().optional(),
    location: z.string().optional(),
    cost: z.string().optional(),
    relatedService: z.string().optional(),
    featuredOnService: z.boolean().default(false),
    customerQuote: z.string().optional(),
  }),
});

export const collections = { blog, pages, services, locations, projects };
