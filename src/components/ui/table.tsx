import { cn } from '@/src/lib/cn';

export function DataTable({ className, ...props }: React.ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full text-sm', className)} {...props} />
    </div>
  );
}

export function DataTableHead({ className, ...props }: React.ComponentPropsWithoutRef<'thead'>) {
  return <thead className={cn('border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-muted', className)} {...props} />;
}

export function DataTableBody({ className, ...props }: React.ComponentPropsWithoutRef<'tbody'>) {
  return <tbody className={cn('divide-y divide-slate-100', className)} {...props} />;
}

export function DataTableRow({ className, ...props }: React.ComponentPropsWithoutRef<'tr'>) {
  return <tr className={cn('hover:bg-slate-50 transition-colors', className)} {...props} />;
}

export function DataTableCell({ className, ...props }: React.ComponentPropsWithoutRef<'td'>) {
  return <td className={cn('px-4 py-3 text-ink', className)} {...props} />;
}

export function DataTableHeadCell({ className, ...props }: React.ComponentPropsWithoutRef<'th'>) {
  return <th className={cn('px-4 py-3 text-left', className)} {...props} />;
}
