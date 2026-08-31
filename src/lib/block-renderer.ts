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

/** Builds the :root CSS custom property string from a theme object.
 *  This is the entire theming mechanism — emit these as a <style> block
 *  once per page, overriding the token-bridge defaults in global.css. */
export function themeToCss(theme: Theme): string {
  const entries: string[] = [];
  if (theme.colorPrimary) entries.push(`--color-primary: ${theme.colorPrimary}`);
  if (theme.colorSecondary) entries.push(`--color-secondary: ${theme.colorSecondary}`);
  if (theme.colorAccent) entries.push(`--color-accent: ${theme.colorAccent}`);
  if (theme.colorBg) entries.push(`--color-bg: ${theme.colorBg}`);
  if (theme.colorSurface) entries.push(`--color-surface: ${theme.colorSurface}`);
  if (theme.colorText) entries.push(`--color-text: ${theme.colorText}`);
  if (theme.colorTextMuted) entries.push(`--color-text-muted: ${theme.colorTextMuted}`);
  if (theme.colorOnPrimary) entries.push(`--color-on-primary: ${theme.colorOnPrimary}`);
  if (theme.fontHeading) entries.push(`--font-heading: ${theme.fontHeading}`);
  if (theme.fontBody) entries.push(`--font-body: ${theme.fontBody}`);
  if (theme.radius) entries.push(`--radius: ${theme.radius}`);
  return entries.length > 0 ? `:root { ${entries.join('; ')}; }` : '';
}

/** Retrieves and validates a page schema for a given page type.
 *  Returns null if no schema exists (the fallback-to-fixed-template path). */
export function getValidatedSchema(
  pageSchemas: PageSchemas | undefined,
  pageType: string,
): { schema: PageSchema; themeCss: string } | null {
  if (!pageSchemas || !pageSchemas[pageType]) return null;

  const schema = pageSchemas[pageType];
  const result = validatePageSchema(schema);
  if (!result.valid) {
    // Defensive: log errors but fall back to fixed template
    console.warn(`[blocks] Page schema for "${pageType}" failed validation:`, result.errors);
    return null;
  }

  const themeCss = schema.theme ? themeToCss(schema.theme) : '';
  return { schema, themeCss };
}
