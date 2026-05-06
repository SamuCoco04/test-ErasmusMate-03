import { ActivityFeedPanel } from '@/src/components/activity-feed-panel';
import { NotificationsPanel } from '@/src/components/notifications-panel';

export default function StudentNotificationsPage(){
  return <div className="space-y-4"><NotificationsPanel heading="Student notifications" /><ActivityFeedPanel heading="Recent activity" /></div>;
}
