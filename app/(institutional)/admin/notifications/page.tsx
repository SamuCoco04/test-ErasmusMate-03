import { ActivityFeedPanel } from '@/src/components/activity-feed-panel';
import { NotificationsPanel } from '@/src/components/notifications-panel';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';

export default function AdminNotificationsPage(){
  return <PageShell>
    <PageHeader sectionLabel='Admin notifications' title='Institution updates' subtitle='Monitor institutional alerts and activity across procedures, requirements, and reviews.'/>
    <div className="grid gap-4 lg:grid-cols-2"><NotificationsPanel heading="Admin notifications" /><ActivityFeedPanel heading="Platform activity" /></div>
  </PageShell>;
}
