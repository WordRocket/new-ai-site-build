export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface BaseBlockProps {
  id: string;
  headingLevel?: HeadingLevel;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface TrustItem {
  icon: 'star' | 'shield';
  value?: string;
  label: string;
}

export interface JobItem {
  time: string;
  title: string;
  meta: string;
  status: 'active' | 'pending' | 'done';
  tone: 'active' | 'pending' | 'done';
  value?: string;
}

export interface MetricData {
  label: string;
  value: string;
  delta: string;
  series: number[];
}

export interface PanelData {
  title: string;
  timestamp: string;
  jobs: JobItem[];
  metric: MetricData;
}

export interface IncomingData {
  title: string;
  meta: string;
}

export interface BadgeData {
  value: string;
  label: string;
}
