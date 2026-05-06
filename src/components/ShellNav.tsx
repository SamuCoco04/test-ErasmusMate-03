'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/cn';

type SidebarItem = {
  label: string;
  href: string;
  active?: boolean;
  variant?: 'default' | 'area-switch';
};

export function SidebarNav({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2" aria-label="Sidebar">
      {items.map((item, index) => {
        const isActive = item.active ?? (pathname === item.href || pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={`${index}-${item.href}`}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'block rounded-lg px-3 py-2 text-sm font-medium no-underline transition',
              item.variant === 'area-switch'
                ? 'border border-dashed border-blue-200 bg-blue-50/70 text-accent hover:bg-blue-100'
                : isActive
                  ? 'bg-blue-50 text-accent'
                  : 'text-slate-700 hover:bg-slate-100'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
