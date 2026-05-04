import Link from 'next/link';
import { cn } from '@/src/lib/cn';

export function SidebarNav({ items }: { items: Array<{ label: string; href: string; active?: boolean }> }) {
  return (
    <nav className="space-y-2" aria-label="Sidebar">
      {items.map((item, index) => (
        <Link
          key={`${index}-${item.href}`}
          href={item.href}
          aria-current={item.active ? 'page' : undefined}
          className={cn(
            'block rounded-lg px-3 py-2 text-sm font-medium no-underline transition',
            item.active ? 'bg-blue-50 text-accent' : 'text-slate-700 hover:bg-slate-100'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
