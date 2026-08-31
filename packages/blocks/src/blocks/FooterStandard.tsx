import type { BaseBlockProps, HeadingLevel } from '../types';

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: 'linkedin' | 'facebook' | 'twitter' | 'instagram' | 'youtube';
}

export interface FooterStandardProps extends BaseBlockProps {
  brandName: string;
  tagline?: string;
  navLinks: NavLink[];
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  socialLinks?: SocialLink[];
  copyrightYear?: number;
}

function Heading({ level, children }: { level: HeadingLevel; children: React.ReactNode }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className="sr-only">{children}</Tag>;
}

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />,
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  twitter: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
  youtube: <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />,
};

export default function FooterStandard({
  id,
  headingLevel = 2,
  brandName,
  tagline,
  navLinks,
  phone,
  email,
  address,
  city,
  state,
  zip,
  socialLinks = [],
  copyrightYear = new Date().getFullYear(),
}: FooterStandardProps) {
  const phoneDigits = phone ? phone.replace(/\D/g, '') : '';
  const fullAddress = [address, city, state, zip].filter(Boolean).join(', ');

  return (
    <footer
      id={id}
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Heading level={headingLevel}>Footer</Heading>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          marginBottom: '2rem',
        }}>
          {/* Brand + contact */}
          <div>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '0.5rem',
            }}>{brandName}</span>
            {tagline && (
              <p style={{
                margin: '0 0 1rem',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: 'var(--color-text-muted)',
                maxWidth: '28em',
              }}>{tagline}</p>
            )}
            <address style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--color-text-muted)', fontStyle: 'normal' }}>
              {fullAddress && <span style={{ display: 'block', marginBottom: '0.25rem' }}>{fullAddress}</span>}
              {phoneDigits && (
                <a href={`tel:${phoneDigits}`} style={{ display: 'block', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: '0.25rem' }}>
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} style={{ display: 'block', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                  {email}
                </a>
              )}
            </address>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer">
            <span style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              marginBottom: '1rem',
            }}>Navigation</span>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    textDecoration: 'none',
                  }}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div>
              <span style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                marginBottom: '1rem',
              }}>Follow us</span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    aria-label={social.label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius)',
                      color: 'var(--color-text-muted)',
                      background: 'color-mix(in srgb, var(--color-text) 5%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
                      textDecoration: 'none',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {socialIcons[social.icon || social.label.toLowerCase()] || null}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
          fontSize: '0.8125rem',
          color: 'var(--color-text-muted)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>&copy; {copyrightYear} {brandName}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
