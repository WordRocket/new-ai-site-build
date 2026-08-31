import type { ComponentType } from 'react';
import HeroSplitMockup from './blocks/HeroSplitMockup';
import TrustStatCounters from './blocks/TrustStatCounters';
import FeatureGridBento from './blocks/FeatureGridBento';
import ServiceListNumbered from './blocks/ServiceListNumbered';
import TestimonialsMarquee from './blocks/TestimonialsMarquee';
import CtaBandGradient from './blocks/CtaBandGradient';
import RoiCalculator from './blocks/RoiCalculator';

export type { HeroSplitMockupProps } from './blocks/HeroSplitMockup';
export type { TrustStatCountersProps } from './blocks/TrustStatCounters';
export type { FeatureGridBentoProps } from './blocks/FeatureGridBento';
export type { ServiceListNumberedProps } from './blocks/ServiceListNumbered';
export type { TestimonialsMarqueeProps } from './blocks/TestimonialsMarquee';
export type { CtaBandGradientProps } from './blocks/CtaBandGradient';
export type { RoiCalculatorProps } from './blocks/RoiCalculator';
export type { BaseBlockProps, HeadingLevel } from './types';

export { default as HeroSplitMockup } from './blocks/HeroSplitMockup';
export { default as TrustStatCounters } from './blocks/TrustStatCounters';
export { default as FeatureGridBento } from './blocks/FeatureGridBento';
export { default as ServiceListNumbered } from './blocks/ServiceListNumbered';
export { default as TestimonialsMarquee } from './blocks/TestimonialsMarquee';
export { default as CtaBandGradient } from './blocks/CtaBandGradient';
export { default as RoiCalculator } from './blocks/RoiCalculator';

export const registry: Record<string, ComponentType<any>> = {
  'hero.splitMockup': HeroSplitMockup,
  'trust.statCounters': TrustStatCounters,
  'features.bento': FeatureGridBento,
  'serviceList.numbered': ServiceListNumbered,
  'testimonials.marquee': TestimonialsMarquee,
  'cta.centeredGradient': CtaBandGradient,
  'interactive.roiCalculator': RoiCalculator,
};

/** Block keys that require client-side interactivity.
 *  Used by the Astro render layer to decide which island directive to use. */
export const interactiveBlockKeys = new Set<string>([
  'interactive.roiCalculator',
]);
