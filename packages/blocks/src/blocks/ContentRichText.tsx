import type { BaseBlockProps, HeadingLevel } from '../types';

export interface ContentRichTextProps extends BaseBlockProps {
  eyebrow?: string;
  headline?: string;
  html: string;
}

function Heading({ level, children }: { level: HeadingLevel; children: React.ReactNode }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag>{children}</Tag>;
}

export default function ContentRichText({
  id,
  headingLevel = 2,
  eyebrow,
  headline,
  html,
}: ContentRichTextProps) {
  return (
    <section
      id={id}
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
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
            marginBottom: '1rem',
          }}>{eyebrow}</span>
        )}
        {headline && (
          <Heading level={headingLevel}>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              marginBottom: '1.5rem',
            }}>{headline}</span>
          </Heading>
        )}
        <div
          className="rs-rich-text"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--color-text)',
          }}
        />
      </div>
    </section>
  );
}
