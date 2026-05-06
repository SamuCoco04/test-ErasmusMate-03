import { ActivityFeedPanel } from '@/src/components/activity-feed-panel';
import { NotificationsPanel } from '@/src/components/notifications-panel';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';

export default function StudentNotificationsPage(){
  return <PageShell>
    <PageHeader sectionLabel='Student notifications' title='Updates and activity' subtitle='Stay on top of reminders, review decisions, and activity on your mobility record.'/>
    <div className="grid gap-4 lg:grid-cols-2"><NotificationsPanel heading="Student notifications" /><ActivityFeedPanel heading="Recent activity" /></div>
  </PageShell>;
}
