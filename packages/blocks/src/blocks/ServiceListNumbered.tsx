import type { BaseBlockProps, HeadingLevel } from '../types';

export interface ServiceListNumberedProps extends BaseBlockProps {
  eyebrow?: string;
  headline?: string;
  lede?: string;
  detailsLabel?: string;
  services: { title: string; href?: string; description: string; price?: string }[];
}

function Heading({ level, children, className }: { level: HeadingLevel; children: React.ReactNode; className?: string }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}

export default function ServiceListNumbered({
  id,
  headingLevel = 2,
  eyebrow,
  headline,
  lede,
  detailsLabel = 'Details',
  services = [],
}: ServiceListNumberedProps) {
  return (
    <section
      id={id}
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {(eyebrow || headline) && (
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            {eyebrow && (
              <span style={{
                display: 'inline-block', padding: '0.25rem 0.7rem', borderRadius: 'var(--radius)',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--color-primary)',
                background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                marginBottom: '0.75rem',
              }}>{eyebrow}</span>
            )}
            {headline && (
              <Heading level={headingLevel}>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                }}>{headline}</span>
              </Heading>
            )}
            {lede && (
              <p style={{
                margin: '0.75rem auto 0', fontSize: '1.0625rem', lineHeight: 1.6,
                color: 'var(--color-text-muted)', maxWidth: '40em',
              }}>{lede}</p>
            )}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {services.map((svc, i) => (
            <div key={i} style={{
              display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
              padding: '1.5rem 0',
              borderTop: i === 0 ? '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)' : undefined,
              borderBottom: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
            }}>
              <span style={{
                flexShrink: 0, width: '2rem', height: '2rem', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-on-primary)',
                background: 'var(--color-primary)',
                fontFamily: 'var(--font-heading)',
              }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                  {svc.href ? (
                    <a href={svc.href} style={{
                      fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)',
                      textDecoration: 'none',
                    }}>
                      {svc.title}
                    </a>
                  ) : (
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)' }}>{svc.title}</span>
                  )}
                  {svc.price && (
                    <span style={{
                      fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)',
                      whiteSpace: 'nowrap',
                    }}>{svc.price}</span>
                  )}
                </div>
                <p style={{
                  margin: '0.375rem 0 0', fontSize: '0.9375rem', lineHeight: 1.5,
                  color: 'var(--color-text-muted)',
                }}>{svc.description}</p>
                {svc.href && (
                  <a href={svc.href} style={{
                    display: 'inline-block', marginTop: '0.5rem',
                    fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary)',
                    textDecoration: 'none',
                  }}>{detailsLabel} &rarr;</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
