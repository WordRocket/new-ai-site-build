import type { ComponentType } from 'react';
import HeroSplitMockup from './blocks/HeroSplitMockup';
import TrustStatCounters from './blocks/TrustStatCounters';
import FeatureGridBento from './blocks/FeatureGridBento';
import ServiceListNumbered from './blocks/ServiceListNumbered';
import TestimonialsMarquee from './blocks/TestimonialsMarquee';
import CtaBandGradient from './blocks/CtaBandGradient';
import RoiCalculator from './blocks/RoiCalculator';
import FooterStandard from './blocks/FooterStandard';
import BreadcrumbsStandard from './blocks/BreadcrumbsStandard';
import ContactMapHours from './blocks/ContactMapHours';
import FaqAccordion from './blocks/FaqAccordion';
import ContentRichText from './blocks/ContentRichText';
import ContentPostGrid from './blocks/ContentPostGrid';

export type { HeroSplitMockupProps } from './blocks/HeroSplitMockup';
export type { TrustStatCountersProps } from './blocks/TrustStatCounters';
export type { FeatureGridBentoProps } from './blocks/FeatureGridBento';
export type { ServiceListNumberedProps } from './blocks/ServiceListNumbered';
export type { TestimonialsMarqueeProps } from './blocks/TestimonialsMarquee';
export type { CtaBandGradientProps } from './blocks/CtaBandGradient';
export type { RoiCalculatorProps } from './blocks/RoiCalculator';
export type { FooterStandardProps, NavLink, SocialLink } from './blocks/FooterStandard';
export type { BreadcrumbsStandardProps, BreadcrumbItem } from './blocks/BreadcrumbsStandard';
export type { ContactMapHoursProps, HoursEntry } from './blocks/ContactMapHours';
export type { FaqAccordionProps, FaqItem } from './blocks/FaqAccordion';
export type { ContentRichTextProps } from './blocks/ContentRichText';
export type { ContentPostGridProps, PostCard } from './blocks/ContentPostGrid';
export type { BaseBlockProps, HeadingLevel } from './types';

export { default as HeroSplitMockup } from './blocks/HeroSplitMockup';
export { default as TrustStatCounters } from './blocks/TrustStatCounters';
export { default as FeatureGridBento } from './blocks/FeatureGridBento';
export { default as ServiceListNumbered } from './blocks/ServiceListNumbered';
export { default as TestimonialsMarquee } from './blocks/TestimonialsMarquee';
export { default as CtaBandGradient } from './blocks/CtaBandGradient';
export { default as RoiCalculator } from './blocks/RoiCalculator';
export { default as FooterStandard } from './blocks/FooterStandard';
export { default as BreadcrumbsStandard } from './blocks/BreadcrumbsStandard';
export { default as ContactMapHours } from './blocks/ContactMapHours';
export { default as FaqAccordion } from './blocks/FaqAccordion';
export { default as ContentRichText } from './blocks/ContentRichText';
export { default as ContentPostGrid } from './blocks/ContentPostGrid';

export const registry: Record<string, ComponentType<any>> = {
  'hero.splitMockup': HeroSplitMockup,
  'trust.statCounters': TrustStatCounters,
  'features.bento': FeatureGridBento,
  'serviceList.numbered': ServiceListNumbered,
  'testimonials.marquee': TestimonialsMarquee,
  'cta.centeredGradient': CtaBandGradient,
  'interactive.roiCalculator': RoiCalculator,
  'footer.standard': FooterStandard,
  'breadcrumbs.standard': BreadcrumbsStandard,
  'contact.mapHours': ContactMapHours,
  'faq.accordion': FaqAccordion,
  'content.richText': ContentRichText,
  'content.postGrid': ContentPostGrid,
};

/** Block keys that require client-side interactivity.
 *  Used by the Astro render layer to decide which island directive to use. */
export const interactiveBlockKeys = new Set<string>([
  'interactive.roiCalculator',
  'faq.accordion',
]);
