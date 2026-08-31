import { useMemo, useState } from 'react';
import type { BaseBlockProps, HeadingLevel } from '../types';

export interface RoiCalculatorProps extends BaseBlockProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  currencySymbol?: string;
  defaults?: {
    monthlyLeads: number;
    closeRate: number;
    avgDealSize: number;
    monthlyCost: number;
  };
  ctaLabel?: string;
  ctaHref?: string;
}

function Heading({ level, children, className }: { level: HeadingLevel; children: React.ReactNode; className?: string }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}

function formatCurrency(value: number, symbol: string) {
  return `${symbol}${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export default function RoiCalculator({
  id,
  headingLevel = 2,
  eyebrow,
  headline = 'Calculate Your ROI',
  subheadline,
  currencySymbol = '$',
  defaults = { monthlyLeads: 50, closeRate: 20, avgDealSize: 2500, monthlyCost: 2000 },
  ctaLabel = 'Get Started',
  ctaHref = '/contact',
}: RoiCalculatorProps) {
  const [monthlyLeads, setMonthlyLeads] = useState(defaults.monthlyLeads);
  const [closeRate, setCloseRate] = useState(defaults.closeRate);
  const [avgDealSize, setAvgDealSize] = useState(defaults.avgDealSize);
  const [monthlyCost, setMonthlyCost] = useState(defaults.monthlyCost);

  const results = useMemo(() => {
    const monthlyRevenue = monthlyLeads * (closeRate / 100) * avgDealSize;
    const monthlyProfit = monthlyRevenue - monthlyCost;
    const roi = monthlyCost > 0 ? Math.round((monthlyProfit / monthlyCost) * 100) : 0;
    const annualRevenue = monthlyRevenue * 12;
    return { monthlyRevenue, monthlyProfit, roi, annualRevenue };
  }, [monthlyLeads, closeRate, avgDealSize, monthlyCost]);

  const inputClass: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    fontSize: '1rem',
    color: 'var(--color-text)',
    background: 'var(--color-bg)',
    border: '1px solid color-mix(in srgb, var(--color-text) 15%, transparent)',
    borderRadius: 'var(--radius)',
    outline: 'none',
  };

  const labelClass: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    marginBottom: '0.375rem',
  };

  return (
    <section
      id={id}
      style={{
        background: 'var(--color-surface)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {(eyebrow || headline) && (
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
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
            <Heading level={headingLevel}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}>{headline}</span>
            </Heading>
            {subheadline && (
              <p style={{
                margin: '0.75rem auto 0', fontSize: '1rem', lineHeight: 1.5,
                color: 'var(--color-text-muted)', maxWidth: '36em',
              }}>{subheadline}</p>
            )}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {/* Inputs */}
          <div style={{
            background: 'var(--color-bg)',
            border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
            borderRadius: 'calc(var(--radius) * 1.5)',
            padding: '1.75rem',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
          }}>
            <div>
              <label htmlFor={`${id}-leads`} style={labelClass}>Monthly leads</label>
              <input
                id={`${id}-leads`}
                type="number"
                min={0}
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Math.max(0, Number(e.target.value)))}
                style={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${id}-close`} style={labelClass}>Close rate (%)</label>
              <input
                id={`${id}-close`}
                type="number"
                min={0}
                max={100}
                value={closeRate}
                onChange={(e) => setCloseRate(Math.min(100, Math.max(0, Number(e.target.value))))}
                style={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${id}-deal`} style={labelClass}>Average deal size ({currencySymbol})</label>
              <input
                id={`${id}-deal`}
                type="number"
                min={0}
                value={avgDealSize}
                onChange={(e) => setAvgDealSize(Math.max(0, Number(e.target.value)))}
                style={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${id}-cost`} style={labelClass}>Monthly service cost ({currencySymbol})</label>
              <input
                id={`${id}-cost`}
                type="number"
                min={0}
                value={monthlyCost}
                onChange={(e) => setMonthlyCost(Math.max(0, Number(e.target.value)))}
                style={inputClass}
              />
            </div>
          </div>

          {/* Results */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            <div style={{
              background: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
              borderRadius: 'calc(var(--radius) * 1.5)',
              padding: '1.75rem',
              display: 'flex', flexDirection: 'column', gap: '0.5rem',
            }}>
              <span style={{
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', opacity: 0.85,
              }}>Estimated ROI</span>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em',
              }}>
                {results.roi}%
              </span>
              <span style={{ fontSize: '0.8125rem', opacity: 0.85 }}>
                per month
              </span>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
            }}>
              <div style={{
                background: 'var(--color-bg)',
                border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                borderRadius: 'var(--radius)', padding: '1rem',
              }}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Monthly revenue</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
                  {formatCurrency(results.monthlyRevenue, currencySymbol)}
                </p>
              </div>
              <div style={{
                background: 'var(--color-bg)',
                border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                borderRadius: 'var(--radius)', padding: '1rem',
              }}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Monthly profit</p>
                <p style={{
                  margin: '0.25rem 0 0', fontSize: '1.25rem', fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  color: results.monthlyProfit >= 0 ? '#22c55e' : '#ef4444',
                }}>
                  {formatCurrency(results.monthlyProfit, currencySymbol)}
                </p>
              </div>
            </div>

            <div style={{
              background: 'var(--color-bg)',
              border: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
              borderRadius: 'var(--radius)', padding: '1rem',
            }}>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Projected annual revenue</p>
              <p style={{ margin: '0.25rem 0 0', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                {formatCurrency(results.annualRevenue, currencySymbol)}
              </p>
            </div>

            <a
              href={ctaHref}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.75rem 1.75rem', fontSize: '1rem', fontWeight: 600,
                borderRadius: 'var(--radius)', textDecoration: 'none', cursor: 'pointer',
                background: 'var(--color-primary)', color: 'var(--color-on-primary)',
                transition: 'transform .15s ease',
                marginTop: '0.25rem',
              }}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
