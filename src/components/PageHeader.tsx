import { Badge } from '@/src/components/Badge';

export function PageHeader({
  title,
  subtitle,
  sectionLabel
}: {
  title: string;
  subtitle: string;
  sectionLabel?: string;
}) {
  return (
    <header className="space-y-3">
      {sectionLabel ? <Badge>{sectionLabel}</Badge> : null}
      <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
      <p className="max-w-3xl text-sm text-muted md:text-base">{subtitle}</p>
    </header>
  );
}
