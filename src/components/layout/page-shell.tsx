import { Badge } from '@/src/components/ui/badge';
import { cn } from '@/src/lib/cn';

export function PageShell({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-6', className)} {...props} />;
}

export function PageHeader({ title, subtitle, sectionLabel }: { title: string; subtitle: string; sectionLabel?: string }) {
  return (
    <header className='space-y-3'>
      {sectionLabel ? <Badge>{sectionLabel}</Badge> : null}
      <h1 className='text-3xl font-bold tracking-tight text-ink'>{title}</h1>
      <p className='max-w-3xl text-sm text-muted md:text-base'>{subtitle}</p>
    </header>
  );
}

export function SectionHeader({ title, description }: { title: string; description?: string }) {
  return <div className='space-y-1'><h2 className='text-lg font-semibold text-ink'>{title}</h2>{description ? <p className='text-sm text-muted'>{description}</p> : null}</div>;
}
