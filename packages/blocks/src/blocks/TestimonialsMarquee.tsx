import type { BaseBlockProps, HeadingLevel } from '../types';

export interface TestimonialsMarqueeProps extends BaseBlockProps {
  headline?: string;
  note?: string;
  rows: { quote: string; name: string; meta: string; initials: string }[][];
  durations?: number[];
}

function Heading({ level, children, className }: { level: HeadingLevel; children: React.ReactNode; className?: string }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}

export default function TestimonialsMarquee({
  id,
  headingLevel = 2,
  headline,
  note,
  rows = [],
  durations = [],
}: TestimonialsMarqueeProps) {
  const rowDurations = rows.map((_, i) => durations[i] ?? 40);

  return (
    <section
      id={id}
      style={{
        background: 'var(--color-surface)',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: 'clamp(1.25rem, 5vw, 3rem)', paddingRight: 'clamp(1.25rem, 5vw, 3rem)', marginBottom: '2.5rem', textAlign: 'center' }}>
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
        {note && (
          <p style={{
            margin: '0.75rem auto 0', fontSize: '0.9375rem', color: 'var(--color-text-muted)',
          }}>{note}</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rows.map((rowCards, rowIdx) => {
          const cards = rowCards.length < 4 ? [...rowCards, ...rowCards] : rowCards;
          const duration = rowDurations[rowIdx];
          return (
            <div
              key={rowIdx}
              className={`rs-marquee-row-${id}-${rowIdx}`}
              style={{
                display: 'flex', gap: '1rem',
                width: 'max-content',
                animation: `rs-marquee-${id}-${rowIdx} ${duration}s linear infinite`,
              }}
            >
              {cards.map((card, i) => (
                <div key={i} style={{
                  width: 'clamp(280px, 30vw, 360px)',
                  flexShrink: 0,
                  background: 'var(--color-bg)',
                  border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                  borderRadius: 'calc(var(--radius) * 1.25)',
                  padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                }}>
                    <svg width="20" height="16" viewBox="0 0 24 16" fill="var(--color-primary)" aria-hidden="true" style={{ opacity: 0.8 }}>
                      <path d="M7.5 0C4.46 0 2 2.46 2 5.5S4.46 11 7.5 11c.34 0 .67-.03 1-.09v3.59c0 1.38 1.12 2.5 2.5 2.5h.5V16h-1c-2.76 0-5-2.24-5-5V0h2.5zM17.5 0C14.46 0 12 2.46 12 5.5S14.46 11 17.5 11c.34 0 .67-.03 1-.09v3.59c0 1.38 1.12 2.5 2.5 2.5h.5V16h-1c-2.76 0-5-2.24-5-5V0h2.5z" transform="scale(0.83)" />
                    </svg>
                    <p style={{
                      margin: 0, fontSize: '0.9375rem', lineHeight: 1.5,
                      color: 'var(--color-text)', flex: 1,
                    }}>{card.quote}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', paddingTop: '0.5rem', borderTop: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)' }}>
                      <span style={{
                        width: '2rem', height: '2rem', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-on-primary)',
                        background: 'var(--color-primary)', flexShrink: 0,
                      }}>{card.initials}</span>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)' }}>{card.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{card.meta}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      <style>{`
        ${rows.map((_, rowIdx) => {
          const cards = _.length < 4 ? [..._, ..._] : _;
          const cardWidth = 360;
          const gap = 16;
          const totalWidth = cards.length * (cardWidth + gap);
          const halfWidth = totalWidth / 2;
          return `@keyframes rs-marquee-${id}-${rowIdx} {
            from { transform: translateX(0); }
            to { transform: translateX(-${halfWidth}px); }
          }`;
        }).join('\n')}
        @media (prefers-reduced-motion: reduce) {
          ${rows.map((_, rowIdx) => `.rs-marquee-row-${id}-${rowIdx}`).join(', ')} {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
