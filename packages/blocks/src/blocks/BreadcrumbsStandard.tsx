import type { BaseBlockProps } from '../types';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbsStandardProps extends BaseBlockProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbsStandard({
  id,
  items = [],
}: BreadcrumbsStandardProps) {
  return (
    <nav
      id={id}
      aria-label="Breadcrumb"
      style={{
        padding: '1rem clamp(1.25rem, 5vw, 3rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8125rem',
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {i > 0 && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
              {isLast ? (
                <span aria-current="page" style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  style={{
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
