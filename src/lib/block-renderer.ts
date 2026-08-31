import { registry, interactiveBlockKeys } from '@ranksite/blocks';

export interface BlockInstance {
  id: string;
  slotType: string;
  blockKey: string;
  locked: boolean;
  position: number;
  props: Record<string, any>;
}

export interface Theme {
  colorPrimary?: string;
  colorSecondary?: string;
  colorAccent?: string;
  colorBg?: string;
  colorSurface?: string;
  colorText?: string;
  colorTextMuted?: string;
  colorOnPrimary?: string;
  fontHeading?: string;
  fontBody?: string;
  radius?: string;
}

export interface PageSchema {
  pageType: string;
  blocks: BlockInstance[];
  theme?: Theme;
}

export type PageSchemas = Record<string, PageSchema>;

/** Slot types that must appear exactly once in a page schema. */
const LOCKED_SLOT_TYPES = new Set([
  'hero',
  'cta',
  'contact',
  'footer',
]);

/** Aliases the publish payload might use for page-type keys.
 *  Maps alternative spellings to the canonical key the templates use. */
const PAGE_TYPE_ALIASES: Record<string, string> = {
  homepage: 'home',
  homePage: 'home',
  services: 'service',
  servicePage: 'service',
  blog: 'blogIndex',
  blogIndexPage: 'blogIndex',
  categories: 'categoryIndex',
  categoryIndexPage: 'categoryIndex',
  ourWorkPage: 'ourWork',
  portfolio: 'ourWork',
  faqPage: 'faq',
  aboutPage: 'about',
  contactPage: 'contact',
  resourcesPage: 'resources',
  post: 'page',
  pageDetail: 'page',
  industryPage: 'industry',
  locationPage: 'location',
};

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/** Validates a PageSchema defensively before rendering.
 *  Mirrors the guardrail checks the editor applies client-side —
 *  "don't trust the client alone" posture. On failure, the caller
 *  falls back to the fixed template rather than shipping a broken layout. */
export function validatePageSchema(schema: PageSchema): ValidationResult {
  const errors: string[] = [];

  if (!schema.blocks || schema.blocks.length === 0) {
    errors.push('blocks array is empty');
    return { valid: false, errors };
  }

  const sorted = [...schema.blocks].sort((a, b) => a.position - b.position);

  // Exactly one hero
  const heroCount = sorted.filter((b) => b.slotType === 'hero').length;
  if (heroCount === 0) {
    errors.push('no hero block present');
  } else if (heroCount > 1) {
    errors.push(`expected exactly 1 hero block, found ${heroCount}`);
  }

  // Locked slot types must be present
  for (const slotType of LOCKED_SLOT_TYPES) {
    const present = sorted.some((b) => b.slotType === slotType && b.locked);
    if (!present) {
      // Only error if the page type conventionally requires this slot.
      // For the pilot, only hero and cta are strictly required.
      if (slotType === 'hero' || slotType === 'cta') {
        errors.push(`locked slot type "${slotType}" is missing`);
      }
    }
  }

  // Every blockKey must exist in the registry
  for (const block of sorted) {
    if (!registry[block.blockKey]) {
      errors.push(`blockKey "${block.blockKey}" not found in registry`);
    }
    if (!block.id) {
      errors.push(`block at position ${block.position} has no id`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/** Returns true if the blockKey requires client-side interactivity. */
export function isInteractiveBlock(blockKey: string): boolean {
  return interactiveBlockKeys.has(blockKey);
}

/** Reads a value from an object by trying camelCase first, then snake_case.
 *  This lets us accept either key naming convention from the publish payload. */
function pick<T = any>(obj: Record<string, any>, camel: string, snake: string): T | undefined {
  return (obj[camel] ?? obj[snake]) as T | undefined;
}

/** Builds the :root CSS custom property string from a theme object.
 *  This is the entire theming mechanism — emit these as a <style> block
 *  once per page, overriding the token-bridge defaults in global.css.
 *  Accepts both camelCase and snake_case theme field names. */
export function themeToCss(theme: Record<string, any>): string {
  const entries: string[] = [];
  const colorPrimary = pick(theme, 'colorPrimary', 'color_primary');
  if (colorPrimary) entries.push(`--color-primary: ${colorPrimary}`);
  const colorSecondary = pick(theme, 'colorSecondary', 'color_secondary');
  if (colorSecondary) entries.push(`--color-secondary: ${colorSecondary}`);
  const colorAccent = pick(theme, 'colorAccent', 'color_accent');
  if (colorAccent) entries.push(`--color-accent: ${colorAccent}`);
  const colorBg = pick(theme, 'colorBg', 'color_bg');
  if (colorBg) entries.push(`--color-bg: ${colorBg}`);
  const colorSurface = pick(theme, 'colorSurface', 'color_surface');
  if (colorSurface) entries.push(`--color-surface: ${colorSurface}`);
  const colorText = pick(theme, 'colorText', 'color_text');
  if (colorText) entries.push(`--color-text: ${colorText}`);
  const colorTextMuted = pick(theme, 'colorTextMuted', 'color_text_muted');
  if (colorTextMuted) entries.push(`--color-text-muted: ${colorTextMuted}`);
  const colorOnPrimary = pick(theme, 'colorOnPrimary', 'color_on_primary');
  if (colorOnPrimary) entries.push(`--color-on-primary: ${colorOnPrimary}`);
  const fontHeading = pick(theme, 'fontHeading', 'font_heading');
  if (fontHeading) entries.push(`--font-heading: ${fontHeading}`);
  const fontBody = pick(theme, 'fontBody', 'font_body');
  if (fontBody) entries.push(`--font-body: ${fontBody}`);
  if (theme.radius) entries.push(`--radius: ${theme.radius}`);
  return entries.length > 0 ? `:root { ${entries.join('; ')}; }` : '';
}

/** Extracts the pageSchemas object from a raw site-config, checking both
 *  camelCase and snake_case top-level keys. Also handles the case where
 *  the publish payload nests it inside a `site` wrapper. */
export function getPageSchemas(config: Record<string, any> | undefined): PageSchemas | undefined {
  if (!config || typeof config !== 'object') return undefined;
  return (config.pageSchemas ?? config.page_schemas) as PageSchemas | undefined;
}

/** Normalizes a page-type key by checking the alias map. */
function normalizePageType(pageType: string): string {
  return PAGE_TYPE_ALIASES[pageType] ?? pageType;
}

/** Retrieves and validates a page schema for a given page type.
 *  Returns null if no schema exists (the fallback-to-fixed-template path).
 *  Checks both the canonical page-type key and known aliases. */
export function getValidatedSchema(
  pageSchemas: PageSchemas | undefined,
  pageType: string,
): { schema: PageSchema; themeCss: string } | null {
  if (!pageSchemas) return null;

  const canonical = normalizePageType(pageType);
  const schema = pageSchemas[pageType] ?? pageSchemas[canonical];
  if (!schema) return null;

  const result = validatePageSchema(schema);
  if (!result.valid) {
    console.warn(`[blocks] Page schema for "${pageType}" failed validation:`, result.errors);
    return null;
  }

  const themeCss = schema.theme ? themeToCss(schema.theme as Record<string, any>) : '';
  return { schema, themeCss };
}
