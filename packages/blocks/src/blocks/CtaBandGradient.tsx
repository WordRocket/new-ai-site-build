import type { BaseBlockProps, HeadingLevel } from '../types';

export interface CtaBandGradientProps extends BaseBlockProps {
  availability?: string;
  headline: string;
  subheadline?: string;
  primaryCta: { label: string; href: string };
  phone?: { label: string; href: string };
}

function Heading({ level, children, className }: { level: HeadingLevel; children: React.ReactNode; className?: string }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}

export default function CtaBandGradient({
  id,
  headingLevel = 2,
  availability,
  headline,
  subheadline,
  primaryCta,
  phone,
}: CtaBandGradientProps) {
  return (
    <section
      id={id}
      style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        '--hero-mesh-strength': '0.72',
      } as React.CSSProperties}
    >
      {/* Gradient mesh background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: -1,
          background: `
            radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--color-primary) calc(var(--hero-mesh-strength) * 100%), transparent), transparent 60%),
            radial-gradient(ellipse at 80% 50%, color-mix(in srgb, var(--color-secondary) calc(var(--hero-mesh-strength) * 60%), transparent), transparent 60%),
            radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-accent) calc(var(--hero-mesh-strength) * 40%), transparent), transparent 70%),
            var(--color-surface)
          `,
        }}
      />
      <div style={{
        maxWidth: '760px', margin: '0 auto', textAlign: 'center',
        padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(1.25rem, 5vw, 3rem)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem',
      }}>
        {availability && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 0.85rem', borderRadius: '999px',
            fontSize: '0.8125rem', fontWeight: 600,
            color: 'var(--color-on-primary)',
            background: 'color-mix(in srgb, var(--color-primary) 85%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            {availability}
          </span>
        )}
        <Heading level={headingLevel}>
          <span style={{
            display: 'block',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em',
            color: 'var(--color-text)',
          }}>{headline}</span>
        </Heading>
        {subheadline && (
          <p style={{
            margin: 0, fontSize: 'clamp(1rem, 2vw, 1.1875rem)', lineHeight: 1.5,
            color: 'var(--color-text-muted)', maxWidth: '36em',
          }}>{subheadline}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem' }}>
          <a
            href={primaryCta.href}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', fontSize: '1.0625rem', fontWeight: 700,
              borderRadius: 'var(--radius)', textDecoration: 'none', cursor: 'pointer',
              background: 'var(--color-primary)', color: 'var(--color-on-primary)',
              transition: 'transform .15s ease, box-shadow .15s ease',
              boxShadow: '0 4px 20px color-mix(in srgb, var(--color-primary) 30%, transparent)',
            }}
          >
            {primaryCta.label}
          </a>
          {phone && (
            <a
              href={phone.href}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.875rem 1.75rem', fontSize: '1.0625rem', fontWeight: 600,
                borderRadius: 'var(--radius)', textDecoration: 'none', cursor: 'pointer',
                background: 'transparent', color: 'var(--color-text)',
                border: '1px solid color-mix(in srgb, var(--color-text) 20%, transparent)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {phone.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
