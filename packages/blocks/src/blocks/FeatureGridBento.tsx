import type { BaseBlockProps, HeadingLevel } from '../types';

export interface BentoTile {
  kind: 'quote' | 'days' | 'people' | 'bars' | 'seal';
  span: number;
  rows: 1 | 2;
  title?: string;
  body?: string;
  quote?: { caption: string; status: string; lines: [string, string][]; totalLabel: string; total: string };
  days?: string[];
  people?: string[];
  bars?: [string, number][];
  seal?: { figure: string; line1: string; line2: string };
}

export interface FeatureGridBentoProps extends BaseBlockProps {
  eyebrow?: string;
  headline?: string;
  tiles: BentoTile[];
}

function Heading({ level, children, className }: { level: HeadingLevel; children: React.ReactNode; className?: string }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}

export default function FeatureGridBento({
  id,
  headingLevel = 2,
  eyebrow,
  headline,
  tiles = [],
}: FeatureGridBentoProps) {
  return (
    <section
      id={id}
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: 'minmax(140px, auto)',
          gap: '1rem',
        }}>
          {tiles.map((tile, i) => {
            const baseStyle: React.CSSProperties = {
              gridColumn: `span ${Math.min(tile.span, 12)}`,
              gridRow: tile.rows === 2 ? 'span 2' : undefined,
              background: 'var(--color-surface)',
              border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
              borderRadius: 'calc(var(--radius) * 1.25)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              overflow: 'hidden',
            };

            return (
              <div key={i} style={baseStyle}>
                {tile.title && (
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)' }}>{tile.title}</p>
                )}

                {tile.kind === 'quote' && tile.quote && (
                  <>
                    <p style={{ margin: 0, fontSize: '0.9375rem', lineHeight: 1.5, color: 'var(--color-text)', fontStyle: 'italic', flex: 1 }}>
                      "{tile.quote.caption}"
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{tile.quote.status}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '0.5rem', borderTop: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)' }}>
                      {tile.quote.lines.map(([label, value], j) => (
                        <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, paddingTop: '0.25rem' }}>
                        <span style={{ color: 'var(--color-text)' }}>{tile.quote.totalLabel}</span>
                        <span style={{ color: 'var(--color-primary)' }}>{tile.quote.total}</span>
                      </div>
                    </div>
                  </>
                )}

                {tile.kind === 'days' && tile.days && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', flex: 1, alignContent: 'flex-start' }}>
                    {tile.days.map((day, j) => (
                      <span key={j} style={{
                        padding: '0.3rem 0.6rem', borderRadius: 'calc(var(--radius) * 0.6)',
                        fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)',
                        background: 'var(--color-bg)',
                        border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
                      }}>{day}</span>
                    ))}
                  </div>
                )}

                {tile.kind === 'people' && tile.people && (
                  <div style={{ display: 'flex', flex: 1 }}>
                    {tile.people.map((person, j) => (
                      <div key={j} style={{
                        width: '2.25rem', height: '2.25rem', borderRadius: '50%',
                        marginLeft: j > 0 ? '-0.5rem' : 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-on-primary)',
                        background: 'var(--color-primary)',
                        border: '2px solid var(--color-surface)',
                      }}>{person}</div>
                    ))}
                  </div>
                )}

                {tile.kind === 'bars' && tile.bars && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, justifyContent: 'center' }}>
                    {tile.bars.map(([label, pct], j) => (
                      <div key={j}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                          <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{pct}%</span>
                        </div>
                        <div style={{ height: '6px', borderRadius: '3px', background: 'color-mix(in srgb, var(--color-text) 8%, transparent)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, borderRadius: '3px', background: 'var(--color-primary)', transition: 'width 0.6s ease' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tile.kind === 'seal' && tile.seal && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', gap: '0.375rem' }}>
                    <div style={{
                      width: '3rem', height: '3rem', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-on-primary)',
                      background: 'var(--color-primary)',
                      fontFamily: 'var(--font-heading)',
                    }}>{tile.seal.figure}</div>
                    <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)' }}>{tile.seal.line1}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{tile.seal.line2}</p>
                  </div>
                )}

                {tile.body && tile.kind !== 'quote' && (
                  <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.5, color: 'var(--color-text-muted)' }}>{tile.body}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
