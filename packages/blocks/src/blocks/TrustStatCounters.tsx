import type { BaseBlockProps, HeadingLevel } from '../types';

export interface TrustStatCountersProps extends BaseBlockProps {
  srHeading?: string;
  stats: { value: string; unit?: string; label: string }[];
}

function Heading({ level, children, className }: { level: HeadingLevel; children: React.ReactNode; className?: string }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className} style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{children}</Tag>;
}

export default function TrustStatCounters({
  id,
  headingLevel = 2,
  srHeading = 'Trusted by businesses nationwide',
  stats = [],
}: TrustStatCountersProps) {
  return (
    <section
      id={id}
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <Heading level={headingLevel}>{srHeading}</Heading>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`, gap: 'clamp(1.5rem, 4vw, 3rem)', textAlign: 'center' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1,
              color: 'var(--color-primary)',
              letterSpacing: '-0.02em',
            }}>
              {stat.value}
              {stat.unit && (
                <span style={{ fontSize: '0.6em', fontWeight: 700, marginLeft: '0.1em', color: 'var(--color-text-muted)' }}>{stat.unit}</span>
              )}
            </div>
            <div style={{
              fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.4,
              color: 'var(--color-text-muted)',
              maxWidth: '16em', margin: '0 auto',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
