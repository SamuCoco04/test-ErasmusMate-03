interface StatusChipProps {
  status: 'pending' | 'approved' | 'rejected' | 'draft' | 'review' | 'overdue' | 'submitted' | 'active' | 'completed' | 'blocked';
  size?: 'sm' | 'md';
}

export function StatusChip({ status, size = 'md' }: StatusChipProps) {
  const statusConfig = {
    pending: { label: 'Pending', bg: 'bg-[--status-pending]/10', text: 'text-[--status-pending]', border: 'border-[--status-pending]/20' },
    approved: { label: 'Approved', bg: 'bg-[--success-bg]', text: 'text-[--success]', border: 'border-[--success]/20' },
    rejected: { label: 'Rejected', bg: 'bg-red-50', text: 'text-[--destructive]', border: 'border-[--destructive]/20' },
    draft: { label: 'Draft', bg: 'bg-slate-50', text: 'text-[--status-draft]', border: 'border-slate-300' },
    review: { label: 'In Review', bg: 'bg-blue-50', text: 'text-[--status-review]', border: 'border-blue-200' },
    overdue: { label: 'Overdue', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    submitted: { label: 'Submitted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    active: { label: 'Active', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    completed: { label: 'Completed', bg: 'bg-[--success-bg]', text: 'text-[--success]', border: 'border-[--success]/20' },
    blocked: { label: 'Blocked', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
  };

  const config = statusConfig[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}>
      {config.label}
    </span>
  );
}
