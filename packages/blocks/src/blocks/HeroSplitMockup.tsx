import { useEffect, useRef, useState } from 'react';
import type { BaseBlockProps, HeadingLevel } from '../types';

export interface HeroSplitMockupProps extends BaseBlockProps {
  eyebrow?: string;
  headline: string;
  headlineAccent?: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  trustItems?: { icon: 'star' | 'shield'; value?: string; label: string }[];
  panel?: {
    title: string;
    timestamp: string;
    jobs: { time: string; title: string; meta: string; status: 'active' | 'pending' | 'done'; tone: 'active' | 'pending' | 'done'; value?: string }[];
    metric: { label: string; value: string; delta: string; series: number[] };
  };
  incoming?: { title: string; meta: string };
  badge?: { value: string; label: string };
  panelDescription?: string;
}

function Heading({ level, children, className }: { level: HeadingLevel; children: React.ReactNode; className?: string }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}

const toneStyles: Record<string, { dot: string; text: string }> = {
  active: { dot: 'var(--color-primary)', text: 'var(--color-primary)' },
  pending: { dot: 'var(--color-accent)', text: 'var(--color-text-muted)' },
  done: { dot: '#22c55e', text: 'var(--color-text-muted)' },
};

export default function HeroSplitMockup({
  id,
  headingLevel = 1,
  eyebrow,
  headline,
  headlineAccent,
  subheadline,
  primaryCta,
  secondaryCta,
  trustItems = [],
  panel,
  incoming,
  badge,
  panelDescription,
}: HeroSplitMockupProps) {
  const sparkRef = useRef<SVGSVGElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const series = panel?.metric?.series ?? [];
  const sparkPath = (() => {
    if (series.length < 2) return '';
    const w = 200, h = 50, pad = 4;
    const min = Math.min(...series), max = Math.max(...series);
    const range = max - min || 1;
    const step = (w - pad * 2) / (series.length - 1);
    return series
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${pad + i * step} ${h - pad - ((v - min) / range) * (h - pad * 2)}`)
      .join(' ');
  })();

  return (
    <section
      id={id}
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 3rem)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gap: 'clamp(2rem, 5vw, 4rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}>
        {/* Left: copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {eyebrow && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 0.85rem', borderRadius: 'var(--radius)',
              fontSize: '0.8125rem', fontWeight: 600,
              color: 'var(--color-primary)',
              background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
              width: 'fit-content',
            }}>
              {eyebrow}
            </span>
          )}
          <Heading level={headingLevel} className="" >
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              display: 'block',
            }}>
              {headline}{' '}
              {headlineAccent && (
                <span style={{ color: 'var(--color-primary)' }}>{headlineAccent}</span>
              )}
            </span>
          </Heading>
          {subheadline && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-muted)',
              maxWidth: '32em',
              margin: 0,
            }}>
              {subheadline}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.75rem 1.75rem', fontSize: '1rem', fontWeight: 600,
                    borderRadius: 'var(--radius)', textDecoration: 'none', cursor: 'pointer',
                    background: 'var(--color-primary)', color: 'var(--color-on-primary)',
                    transition: 'transform .15s ease, box-shadow .15s ease',
                  }}
                >
                  {primaryCta.label}
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.75rem 1.75rem', fontSize: '1rem', fontWeight: 600,
                    borderRadius: 'var(--radius)', textDecoration: 'none', cursor: 'pointer',
                    background: 'transparent', color: 'var(--color-primary)',
                    border: '1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)',
                    transition: 'transform .15s ease, box-shadow .15s ease',
                  }}
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
          {trustItems.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem', paddingTop: '1.25rem', borderTop: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)' }}>
              {trustItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.icon === 'star' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {item.value && <strong style={{ color: 'var(--color-text)' }}>{item.value} </strong>}
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: decorative panel */}
        {panel && (
          <div style={{ position: 'relative' }}>
            {panelDescription && (
              <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                {panelDescription}
              </span>
            )}
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
              borderRadius: 'calc(var(--radius) * 1.5)',
              padding: '1.5rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}>
              {/* Panel header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                    {panel.title}
                  </p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    {panel.timestamp}
                  </p>
                </div>
                {badge && (
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                      {badge.value}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{badge.label}</p>
                  </div>
                )}
              </div>

              {/* Jobs list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {panel.jobs.map((job, i) => {
                  const ts = toneStyles[job.tone] ?? toneStyles.done;
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.625rem 0.75rem', borderRadius: 'var(--radius)',
                      background: 'var(--color-bg)',
                      border: '1px solid color-mix(in srgb, var(--color-text) 6%, transparent)',
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: ts.dot }} />
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)', minWidth: '3rem' }}>{job.time}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{job.meta}</p>
                      </div>
                      {job.value && (
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: ts.text }}>{job.value}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Metric */}
              {panel.metric && (
                <div style={{ paddingTop: '1rem', borderTop: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{panel.metric.label}</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{panel.metric.value}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22c55e', marginLeft: '0.5rem' }}>{panel.metric.delta}</span>
                    </div>
                  </div>
                  {sparkPath && (
                    <svg ref={sparkRef} viewBox="0 0 200 50" width="100%" height="40" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {mounted && (
                        <>
                          <path d={`${sparkPath} L 196 50 L 4 50 Z`} fill={`url(#spark-${id})`} />
                          <path d={sparkPath} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </>
                      )}
                    </svg>
                  )}
                </div>
              )}
            </div>

            {/* Incoming callout */}
            {incoming && (
              <div style={{
                marginTop: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius)',
                background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)',
                display: 'flex', alignItems: 'center', gap: '0.625rem',
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0, animation: 'rs-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)' }}>{incoming.title}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>{incoming.meta}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes rs-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </section>
  );
}
