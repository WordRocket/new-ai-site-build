import siteConfig from '../data/site-config.json'
export default siteConfig
export type SiteConfig = typeof siteConfig

/** Capitalise the first letter of each whitespace-separated word.
 *  Internal casing (e.g. "McDonald's") is left untouched. */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

/** Strip a trailing " | <Business Name>" SEO suffix and apply title case.
 *  Use for all user-facing display text (H1, breadcrumbs, nav labels).
 *  The raw `d.title` value (which may already include the suffix) should
 *  be used as-is only in the <title> meta tag. */
export function cleanTitle(str: string): string {
  const clean = str.includes(' | ') ? str.split(' | ')[0].trim() : str;
  return toTitleCase(clean);
}

/** Normalise and format a phone number for display.
 *  Strips to digits first (handles already-formatted inputs),
 *  then formats 10-digit NA numbers as XXX-XXX-XXXX.
 *  Falls back to the raw value if it isn't 10 digits. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return raw;
}
