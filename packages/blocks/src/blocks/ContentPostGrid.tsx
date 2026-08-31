import type { BaseBlockProps, HeadingLevel } from '../types';

export interface PostCard {
  title: string;
  excerpt?: string;
  href: string;
  date?: string;
  category?: string;
  image?: string;
  imageAlt?: string;
}

export interface ContentPostGridProps extends BaseBlockProps {
  eyebrow?: string;
  headline?: string;
  posts: PostCard[];
  columns?: 2 | 3 | 4;
}

function Heading({ level, children }: { level: HeadingLevel; children: React.ReactNode }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag>{children}</Tag>;
}

export default function ContentPostGrid({
  id,
  headingLevel = 2,
  eyebrow,
  headline = 'Latest Posts',
  posts = [],
  columns = 3,
}: ContentPostGridProps) {
  const gridCols = {
    2: 'repeat(auto-fill, minmax(300px, 1fr))',
    3: 'repeat(auto-fill, minmax(280px, 1fr))',
    4: 'repeat(auto-fill, minmax(220px, 1fr))',
  }[columns];

  return (
    <section
      id={id}
      style={{
        background: 'var(--color-surface)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: 'clamp(1rem, 3vw, 1.75rem)',
        }}>
          {posts.map((post) => (
            <a
              key={post.href}
              href={post.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                background: 'var(--color-bg)',
                border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.imageAlt || ''}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              )}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {post.category && (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                  }}>{post.category}</span>
                )}
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: 'var(--color-text)',
                }}>{post.title}</span>
                {post.excerpt && (
                  <span style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: 'var(--color-text-muted)',
                  }}>{post.excerpt}</span>
                )}
                {post.date && (
                  <span style={{
                    marginTop: 'auto',
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-muted)',
                  }}>{post.date}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
