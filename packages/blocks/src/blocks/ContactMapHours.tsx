import type { BaseBlockProps, HeadingLevel } from '../types';

export interface HoursEntry {
  day: string;
  hours: string;
}

export interface ContactMapHoursProps extends BaseBlockProps {
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  mapEmbedUrl?: string;
  hours?: HoursEntry[];
}

function Heading({ level, children }: { level: HeadingLevel; children: React.ReactNode }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className="sr-only">{children}</Tag>;
}

export default function ContactMapHours({
  id,
  headingLevel = 2,
  phone,
  email,
  address,
  city,
  state,
  zip,
  mapEmbedUrl,
  hours = [],
}: ContactMapHoursProps) {
  const phoneDigits = phone ? phone.replace(/\D/g, '') : '';
  const fullAddress = [address, city, state, zip].filter(Boolean).join(', ');

  return (
    <section
      id={id}
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <Heading level={headingLevel}>Contact &amp; Hours</Heading>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(1.5rem, 4vw, 3rem)',
        alignItems: 'start',
      }}>
        {/* Contact info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '0.75rem',
            }}>Get in touch</span>
            <address style={{ fontStyle: 'normal', fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
              {fullAddress && <span style={{ display: 'block', marginBottom: '0.5rem' }}>{fullAddress}</span>}
              {phoneDigits && (
                <a href={`tel:${phoneDigits}`} style={{
                  display: 'block',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  marginBottom: '0.5rem',
                }}>
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} style={{
                  display: 'block',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                }}>
                  {email}
                </a>
              )}
            </address>
          </div>

          {hours.length > 0 && (
            <div>
              <span style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                marginBottom: '0.75rem',
              }}>Hours</span>
              <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {hours.map((entry) => (
                  <div key={entry.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <dt style={{ color: 'var(--color-text-muted)', margin: 0 }}>{entry.day}</dt>
                    <dd style={{ color: 'var(--color-text)', margin: 0, fontWeight: 500 }}>{entry.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Map */}
        {mapEmbedUrl && (
          <div style={{
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
            minHeight: '300px',
            aspectRatio: '4 / 3',
          }}>
            <iframe
              src={mapEmbedUrl}
              title={`Map showing ${fullAddress || 'business location'}`}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </section>
  );
}
