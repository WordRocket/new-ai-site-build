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
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    noindex: z.boolean().default(false),
    canonical: z.string().optional(),
    ogImage: z.string().optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    noindex: z.boolean().default(false),
    canonical: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    icon: z.string().optional(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    areaServed: z.array(z.string()).default([]),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    order: z.number().default(0),
  }),
});

const locations = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    city: z.string(),
    state: z.string(),
    service: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

export const collections = { blog, pages, services, locations };
