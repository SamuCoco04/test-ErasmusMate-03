import { ActivityFeedPanel } from '@/src/components/activity-feed-panel';
import { NotificationsPanel } from '@/src/components/notifications-panel';

export default function CoordinatorNotificationsPage(){
  return <div className="space-y-4"><NotificationsPanel heading="Coordinator notifications" /><ActivityFeedPanel heading="Assigned students activity" /></div>;
}
