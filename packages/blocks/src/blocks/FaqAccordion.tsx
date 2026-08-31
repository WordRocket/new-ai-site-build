import { useState } from 'react';
import type { BaseBlockProps, HeadingLevel } from '../types';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps extends BaseBlockProps {
  eyebrow?: string;
  headline?: string;
  items: FaqItem[];
}

function Heading({ level, children }: { level: HeadingLevel; children: React.ReactNode }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag>{children}</Tag>;
}

export default function FaqAccordion({
  id,
  headingLevel = 2,
  eyebrow,
  headline = 'Frequently Asked Questions',
  items = [],
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={id}
      style={{
        background: 'var(--color-surface)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {eyebrow && (
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.7rem',
              borderRadius: 'var(--radius)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
              marginBottom: '0.75rem',
            }}>{eyebrow}</span>
          )}
          <Heading level={headingLevel}>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
            }}>{headline}</span>
          </Heading>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: 'var(--radius)',
                  border: `1px solid color-mix(in srgb, var(--color-text) ${isOpen ? '15%' : '8%'}, transparent)`,
                  background: 'var(--color-bg)',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel-${i}`}
                  id={`${id}-button-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                  }}
                >
                  <span>{item.question}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      color: 'var(--color-text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id={`${id}-panel-${i}`}
                    role="region"
                    aria-labelledby={`${id}-button-${i}`}
                    style={{
                      padding: '0 1.25rem 1.25rem',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
