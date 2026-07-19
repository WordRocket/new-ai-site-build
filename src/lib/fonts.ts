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

export interface ResolvedFont {
  /** Value for the --rs-font-display CSS variable */
  display: string;
  /** Value for the --rs-font-body CSS variable */
  body: string;
  /** Google Fonts stylesheet URL to <link>, or '' when none is needed */
  googleFontsUrl: string;
  /** True when the resolved preset is the self-hosted Inter default */
  isInterFont: boolean;
  /** True when a custom uploaded font takes priority over the preset */
  hasCustomFont: boolean;
  /** Inline @font-face block to inject in <head>, or '' when none */
  customFontFace: string;
}

const CSS_ESCAPER: Record<string, string> = {
  '\\': '\\\\',
  '"': '\\"',
};

function escapeCssString(s: string): string {
  return s.replace(/["\\]/g, (ch) => CSS_ESCAPER[ch] ?? ch);
}

/**
 * Resolve the final font configuration for a site, applying custom-font
 * priority. When customFontUrl is present it wins over any Google Fonts
 * preset — the @font-face is emitted and both CSS variables point at the
 * custom family name. When customFontUrl is absent, the Google Fonts
 * preset logic runs unchanged.
 *
 * `customFontFamilyName` is the user-supplied font-family name used in
 * the @font-face declaration; it falls back to "Custom Font" when blank.
 */
export function resolveFont(opts: {
  fontFamily?: string;
  fontStyle?: string;
  customFontUrl?: string;
  customFontFamilyName?: string;
}): ResolvedFont {
  // `fontFamily` (dashboard body-font selector) takes priority over the
  // legacy `fontStyle` key; either resolves through the same preset table.
  const preset = getFontPreset(opts.fontFamily || opts.fontStyle);
  const customUrl = (opts.customFontUrl ?? '').trim();
  const isInterFont = !preset.googleFontsUrl;

  if (!customUrl) {
    return {
      display: preset.display,
      body: preset.body,
      googleFontsUrl: preset.googleFontsUrl,
      isInterFont,
      hasCustomFont: false,
      customFontFace: '',
    };
  }

  const familyName = (opts.customFontFamilyName ?? '').trim() || 'Custom Font';
  const escapedName = escapeCssString(familyName);
  const quotedEscapedName = `"${escapedName}"`;

  // Detect format from the URL extension so the browser loads the right
  // decoder.woff2/woff/ttf/otf are the realistic upload formats.
  const ext = customUrl.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
  const formatMap: Record<string, string> = {
    woff2: 'woff2',
    woff: 'woff',
    ttf: 'truetype',
    otf: 'opentype',
    eot: 'embedded-opentype',
    svg: 'svg',
  };
  const formatHint = formatMap[ext] ?? 'woff2';

  const fallback = preset.fallback;
  const fontStack = `${quotedEscapedName}, ${fallback}`;

  // Custom uploaded font overrides HEADINGS (display) only. Body copy stays
  // on the selected preset's body font (fontFamily), so a site can pair a
  // custom display face with a readable body face. The preset's Google
  // Fonts stylesheet is still loaded so the body font renders correctly.
  const customFontFace = [
    '@font-face {',
    `  font-family: ${quotedEscapedName};`,
    `  src: url("${customUrl}") format("${formatHint}");`,
    `  font-weight: 100 900;`,
    `  font-style: normal;`,
    `  font-display: swap;`,
    '}',
  ].join('\n');

  return {
    display: fontStack,
    body: preset.body,
    // Load the preset's Google Fonts stylesheet so the body font (which the
    // custom font no longer overrides) still renders. Empty for Inter since
    // it's self-hosted.
    googleFontsUrl: preset.googleFontsUrl,
    isInterFont,
    hasCustomFont: true,
    customFontFace,
  };
}
