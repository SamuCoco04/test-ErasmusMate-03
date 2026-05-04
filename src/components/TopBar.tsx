import { getDemoContextFromRequest, resolveRoleLabel } from '@/src/modules/shared/demo-context';

import { DemoRoleSwitcher } from './DemoRoleSwitcher';

export async function TopBar({ areaName }: { areaName: string }) {
  const demoContext = await getDemoContextFromRequest();

  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-card">
      <p className="text-sm font-medium text-slate-700">{areaName}</p>
      <div className="text-right">
        <DemoRoleSwitcher currentRole={demoContext.role} currentUserId={demoContext.userId} />
        <p className="mt-1 text-xs text-slate-500">
          Current: {resolveRoleLabel(demoContext.role)} · Demo-only context
        </p>
      </div>
    </div>
  );
}
