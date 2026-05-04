import { cn } from '@/src/lib/cn';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-slate-200 bg-white p-6 shadow-card', className)} {...props} />;
}
