import Link from 'next/link';
import { getDemoContextFromRequest, resolveRoleLabel } from '@/src/modules/shared/demo-context';
import { listNotificationsForContext } from '@/src/modules/notifications/notifications';

import { DemoRoleSwitcher } from './DemoRoleSwitcher';

type TopBarProps = {
  areaName: string;
  notificationsHref?: string;
  profileHref?: string;
};

export async function TopBar({ areaName, notificationsHref, profileHref }: TopBarProps) {
  const demoContext = await getDemoContextFromRequest();
  const notifications = await listNotificationsForContext(demoContext);
  const unreadCount = notifications.filter((notification) => notification.readAt === null).length;

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">{areaName}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <Link href="/" className="text-accent no-underline hover:underline">
              Back to ErasmusMate home
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {notificationsHref ? (
            <Link
              href={notificationsHref}
              aria-label="Open notifications"
              data-testid="topbar-notifications"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 no-underline hover:bg-slate-100"
            >
              <span aria-hidden="true">🔔</span>
              Open notifications
              {unreadCount > 0 ? (
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white" aria-label={`${unreadCount} unread notifications`}>
                  {unreadCount}
                </span>
              ) : null}
            </Link>
          ) : null}
          {profileHref ? (
            <Link
              href={profileHref}
              aria-label="Open profile"
              data-testid="topbar-profile"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 no-underline hover:bg-slate-100"
            >
              <span aria-hidden="true">👤</span>
              Open profile
            </Link>
          ) : null}
          <div className="text-right">
            <DemoRoleSwitcher currentRole={demoContext.role} currentUserId={demoContext.userId} />
            <p className="mt-1 text-xs text-slate-500">
              Current: {resolveRoleLabel(demoContext.role)} · Demo-only context
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
