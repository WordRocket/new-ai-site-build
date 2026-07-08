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

export function imgUrl(src: string | null | undefined, opts: ImgOpts = {}): string {
  if (!src) return '';

  if (
    src.startsWith('data:') ||
    src.startsWith('/') ||        // local paths — served directly, CDN unavailable in dev
    /\.svg(\?|$)/i.test(src) ||
    src.includes('/.netlify/images')
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
 * Build a srcset string at multiple widths.
 * e.g. imgSrcset(src, [640, 960, 1440]) → "...640w, ...960w, ...1440w"
 */
export function imgSrcset(
  src: string | null | undefined,
  widths: number[],
  opts: Omit<ImgOpts, 'w'> = {},
): string {
  if (!src) return '';
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
