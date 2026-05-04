'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type DemoRole = 'STUDENT' | 'COORDINATOR' | 'ADMIN';

const options: Array<{ role: DemoRole; label: string }> = [
  { role: 'STUDENT', label: 'Student' },
  { role: 'COORDINATOR', label: 'Coordinator' },
  { role: 'ADMIN', label: 'Admin' },
];

export function DemoRoleSwitcher({ currentRole, currentUserId }: { currentRole: DemoRole; currentUserId: string }) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<DemoRole>(currentRole);
  const [isPending, startTransition] = useTransition();

  async function onRoleChange(nextRole: DemoRole) {
    setSelectedRole(nextRole);
    await fetch('/api/demo-context', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: nextRole }),
    });
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-accent">Demo mode</span>
      <label className="text-slate-600" htmlFor="demo-role-select">Role</label>
      <select
        id="demo-role-select"
        value={selectedRole}
        onChange={(event) => onRoleChange(event.target.value as DemoRole)}
        disabled={isPending}
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-800"
      >
        {options.map((option) => (
          <option key={option.role} value={option.role}>{option.label}</option>
        ))}
      </select>
      <span className="text-xs text-slate-500">{currentUserId}</span>
    </div>
  );
}
