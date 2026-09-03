import siteConfig from '../data/site-config.json';

export type BusinessType = 'local_service' | 'general';
export type EntityType = 'LocalBusiness' | 'Organization';
export type ContentScope = 'local' | 'national' | 'global';

interface SiteConfigLike {
  businessType?: string;
  isLocal?: boolean;
  showNap?: boolean;
  showGeoMeta?: boolean;
  entityType?: string;
  contentScope?: string;
}

const cfg = siteConfig as any as SiteConfigLike;

/**
 * Normalize a businessType string: lowercase and replace hyphens with
 * underscores so both "local-service" and "local_service" resolve the
 * same way. Production data contains both spellings.
 */
export function normalizeBusinessType(raw?: string): BusinessType {
  const normalized = (raw ?? '').trim().toLowerCase().replace(/-/g, '_');
  return normalized === 'general' ? 'general' : 'local_service';
}

const normalizedType = normalizeBusinessType(cfg.businessType);

/** True when the site is a general/national site (not a local service business). */
export function isGeneralSite(): boolean {
  return normalizedType === 'general';
}

/** Master switch for all local rendering. Default: true unless businessType is general. */
export function isLocalSite(sc?: SiteConfigLike): boolean {
  const c = sc ?? cfg;
  if (typeof c.isLocal === 'boolean') return c.isLocal;
  return normalizeBusinessType(c.businessType) !== 'general';
}

/** Render the name/address/phone block as a local business identity. */
export function showNap(sc?: SiteConfigLike): boolean {
  const c = sc ?? cfg;
  if (typeof c.showNap === 'boolean') return c.showNap;
  return isLocalSite(c);
}

/** Emit geo.* meta tags. */
export function showGeoMeta(sc?: SiteConfigLike): boolean {
  const c = sc ?? cfg;
  if (typeof c.showGeoMeta === 'boolean') return c.showGeoMeta;
  return isLocalSite(c);
}

/** Primary JSON-LD @type. */
export function getEntityType(sc?: SiteConfigLike): EntityType {
  const c = sc ?? cfg;
  if (c.entityType === 'LocalBusiness' || c.entityType === 'Organization') {
    return c.entityType as EntityType;
  }
  return isLocalSite(c) ? 'LocalBusiness' : 'Organization';
}

/** Used for copy framing only. */
export function getContentScope(sc?: SiteConfigLike): ContentScope {
  const c = sc ?? cfg;
  if (c.contentScope === 'local' || c.contentScope === 'national' || c.contentScope === 'global') {
    return c.contentScope as ContentScope;
  }
  return isLocalSite(c) ? 'local' : 'national';
}
