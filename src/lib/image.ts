/**
 * Netlify Image CDN utilities.
 * https://docs.netlify.com/image-cdn/overview/
 *
 * Serves every image through /.netlify/images for on-the-fly resizing and
 * WebP conversion, eliminating the raw 2K source problem.
 *
 * SVGs and data URIs are passed through unchanged — they cannot or need not
 * be rasterised.
 */

export interface ImgOpts {
  w?: number;
  h?: number;
  /** Quality 1–100. Default 82. */
  q?: number;
  fm?: 'webp' | 'avif' | 'jpeg' | 'png';
  fit?: 'cover' | 'contain' | 'fill';
}

/**
 * Pre-generated image variants produced by the upload pipeline.
 * Keys are the pixel widths as strings (e.g. "640", "960", "1440").
 */
export type ImageVariants = Record<string, { url: string; width: number; height: number }>;

export function imgUrl(src: string | null | undefined, opts: ImgOpts = {}): string {
  if (!src) return '';

  if (
    src.startsWith('data:') ||
    src.startsWith('/') ||                      // local paths — served directly, CDN unavailable in dev
    /\.svg(\?|$)/i.test(src) ||
    src.includes('/.netlify/images') ||
    src.includes('/storage/v1/object/sign/')    // Supabase signed URLs — JWT token forwarding by CDN is undocumented;
                                                // each new token also produces a distinct CDN cache key with no reuse,
                                                // so serve these directly from Supabase without the CDN layer
  ) {
    return src;
  }

  const { w, h, q = 82, fm = 'webp', fit = 'cover' } = opts;
  const p = new URLSearchParams({ url: src });
  if (w) p.set('w', String(w));
  if (h) p.set('h', String(h));
  p.set('q', String(q));
  p.set('fm', fm);
  if (w && h) p.set('fit', fit);

  return `/.netlify/images?${p.toString()}`;
}

/**
 * Build a srcset string from pre-generated image variants.
 * Returns empty string when variants are absent or empty — callers fall
 * back to the plain src attribute with no srcset.
 *
 * e.g. variantsSrcset({ "640": { url: "...", width: 640, height: 360 }, ... })
 *   → "https://...640.webp 640w, https://...960.webp 960w, ..."
 */
export function variantsSrcset(variants: ImageVariants | null | undefined): string {
  if (!variants) return '';
  const entries = Object.values(variants)
    .filter(v => v?.url && v?.width)
    .sort((a, b) => a.width - b.width)
    .map(v => `${v.url} ${v.width}w`);
  return entries.length > 0 ? entries.join(', ') : '';
}

/**
 * Build a srcset string at multiple widths via the Netlify Image CDN.
 * Returns empty string when the URL bypasses the CDN (local paths, signed
 * Supabase URLs, SVGs) — all entries would be identical in that case.
 *
 * Prefer variantsSrcset() when pre-generated variants are available.
 */
export function imgSrcset(
  src: string | null | undefined,
  widths: number[],
  opts: Omit<ImgOpts, 'w'> = {},
): string {
  if (!src) return '';
  // Probe with the first width — if CDN is bypassed the URL comes back unchanged.
  const probe = imgUrl(src, { ...opts, w: widths[0] });
  if (probe === src) return '';
  return widths.map(w => `${imgUrl(src, { ...opts, w })} ${w}w`).join(', ');
}

/**
 * Convert an aspect-ratio string like "16/9" or "4/3" into pixel dimensions
 * at a given reference width, so <img> width/height attrs can be set for
 * layout-space reservation (prevents CLS).
 */
export function aspectDims(aspect: string, refW = 800): { width: number; height: number } {
  const parts = aspect.split('/').map(Number);
  if (parts.length === 2 && parts[0] > 0 && parts[1] > 0) {
    return { width: refW, height: Math.round((refW * parts[1]) / parts[0]) };
  }
  return { width: refW, height: Math.round((refW * 9) / 16) };
}
