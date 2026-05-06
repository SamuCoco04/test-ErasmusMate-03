import { ActivityFeedPanel } from '@/src/components/activity-feed-panel';
import { NotificationsPanel } from '@/src/components/notifications-panel';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';

export default function CoordinatorNotificationsPage(){
  return <PageShell>
    <PageHeader sectionLabel='Coordinator notifications' title='Assigned student updates' subtitle='Track submissions, exception requests, and Learning Agreement activity from students in your scope.'/>
    <div className="grid gap-4 lg:grid-cols-2"><NotificationsPanel heading="Coordinator notifications" /><ActivityFeedPanel heading="Assigned students activity" /></div>
  </PageShell>;
}
