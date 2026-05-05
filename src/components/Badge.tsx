import { cn } from '@/src/lib/cn';

type BadgeTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const badgeTones: Record<BadgeTone, string> = {
  info: 'bg-blue-50 text-accent',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-rose-100 text-rose-800',
  neutral: 'bg-slate-100 text-slate-700'
};

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone };

export function Badge({ tone = 'info', className, ...props }: BadgeProps) {
  return <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-medium tracking-wide', badgeTones[tone], className)} {...props} />;
}

type StatusTone = 'info' | 'pending' | 'success' | 'warning';

const statusTones: Record<StatusTone, string> = {
  info: 'bg-blue-100 text-blue-800',
  pending: 'bg-amber-100 text-amber-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-rose-100 text-rose-800'
};

export function StatusBadge({
  tone = 'info',
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: StatusTone }) {
  return <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', statusTones[tone], className)} {...props} />;
}
