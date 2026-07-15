/**
 * Font presets exposed via Site Settings → font style.
 *
 * Each preset maps the dashboard's fontStyle key to a display + body
 * font stack and the Google Fonts URL that loads them. Inter stays
 * self-hosted (already bundled in /public/fonts) so the default needs
 * no external request; every other preset loads from Google Fonts.
 *
 * BaseLayout reads getFontPreset(siteConfig.fontStyle) and injects:
 *   1. A <link> to the Google Fonts stylesheet (non-inter presets only)
 *   2. Inline CSS variables --rs-font-display / --rs-font-body on <html>
 * This overrides the hardcoded defaults in global.css so the published
 * site actually reflects the customer's font choice, not just the
 * dashboard preview.
 */

export type FontKey =
  | 'inter'
  | 'poppins'
  | 'playfair'
  | 'roboto'
  | 'montserrat'
  | 'lora'
  | 'dm-sans'
  | 'work-sans';

export interface FontPreset {
  /** Display/headings font stack (sets --rs-font-display) */
  display: string;
  /** Body copy font stack (sets --rs-font-body) */
  body: string;
  /** Google Fonts stylesheet URL, or '' when self-hosted (inter) */
  googleFontsUrl: string;
  /** Metric-compatible fallback stack used while the web font loads */
  fallback: string;
}

const SYSTEM = "'Space Grotesk Fallback', system-ui, sans-serif";
const SERIF_FALLBACK = "Georgia, 'Times New Roman', serif";

export const FONT_PRESETS: Record<FontKey, FontPreset> = {
  inter: {
    // Self-hosted — no external request. Matches global.css defaults.
    display: `'Space Grotesk', ${SYSTEM}`,
    body: `'Inter', 'Inter Fallback', system-ui, sans-serif`,
    googleFontsUrl: '',
    fallback: SYSTEM,
  },
  poppins: {
    display: `Poppins, ${SYSTEM}`,
    body: `Poppins, ${SYSTEM}`,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
    fallback: SYSTEM,
  },
  playfair: {
    display: `'Playfair Display', ${SERIF_FALLBACK}`,
    body: `Inter, 'Inter Fallback', system-ui, sans-serif`,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
    fallback: SERIF_FALLBACK,
  },
  roboto: {
    display: `Roboto, ${SYSTEM}`,
    body: `Roboto, ${SYSTEM}`,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap',
    fallback: SYSTEM,
  },
  montserrat: {
    display: `Montserrat, ${SYSTEM}`,
    body: `Montserrat, ${SYSTEM}`,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap',
    fallback: SYSTEM,
  },
  lora: {
    display: `Lora, ${SERIF_FALLBACK}`,
    body: `Lora, ${SERIF_FALLBACK}`,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap',
    fallback: SERIF_FALLBACK,
  },
  'dm-sans': {
    display: `'DM Sans', ${SYSTEM}`,
    body: `'DM Sans', ${SYSTEM}`,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap',
    fallback: SYSTEM,
  },
  'work-sans': {
    display: `'Work Sans', ${SYSTEM}`,
    body: `'Work Sans', ${SYSTEM}`,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800&display=swap',
    fallback: SYSTEM,
  },
};

const DEFAULT_PRESET: FontPreset = FONT_PRESETS.inter;

/**
 * Resolve a fontStyle value (which may be blank, unknown, or
 * differently-cased) to a FontPreset. Unknown values fall back to
 * Inter so a bad or missing value never breaks rendering.
 */
export function getFontPreset(rawFontStyle?: string): FontPreset {
  if (!rawFontStyle) return DEFAULT_PRESET;
  const key = rawFontStyle.trim().toLowerCase().replace(/[^a-z-]/g, '') as FontKey;
  return FONT_PRESETS[key] ?? DEFAULT_PRESET;
}
