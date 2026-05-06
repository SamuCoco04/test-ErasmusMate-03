import { ActivityFeedPanel } from '@/src/components/activity-feed-panel';
import { NotificationsPanel } from '@/src/components/notifications-panel';

export default function AdminNotificationsPage(){
  return <div className="space-y-4"><NotificationsPanel heading="Admin notifications" /><ActivityFeedPanel heading="Platform activity" /></div>;
}
