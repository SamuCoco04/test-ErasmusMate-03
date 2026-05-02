import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { Bell, CheckCircle, AlertCircle, MessageSquare, FileText, Calendar, Trash2, Filter } from 'lucide-react';
import { useState } from 'react';

interface NotificationsProps {
  userRole?: 'student' | 'coordinator' | 'admin';
}

export function Notifications({ userRole = 'student' }: NotificationsProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  const notifications = [
    {
      id: 1,
      type: 'deadline' as const,
      title: 'Deadline Approaching: Learning Agreement',
      message: 'Your Learning Agreement submission is due in 2 days',
      timestamp: '2026-04-18T14:30:00Z',
      read: false,
      important: true,
      action: { label: 'Submit Now', screen: 'submissions' },
    },
    {
      id: 2,
      type: 'approval' as const,
      title: 'Document Approved',
      message: 'Your Grant Agreement has been approved by Dr. Sarah Thompson',
      timestamp: '2026-04-18T12:15:00Z',
      read: false,
      important: false,
      action: { label: 'View Document', screen: 'submissions' },
    },
    {
      id: 3,
      type: 'message' as const,
      title: 'New Message from John Smith',
      message: 'Hey! Are you going to the Park Güell meetup this Saturday?',
      timestamp: '2026-04-18T10:45:00Z',
      read: false,
      important: false,
      action: { label: 'Reply', screen: 'messages' },
    },
    {
      id: 4,
      type: 'exception' as const,
      title: 'Exception Request Update',
      message: 'Your course substitution request is under review',
      timestamp: '2026-04-17T16:20:00Z',
      read: true,
      important: false,
      action: { label: 'View Status', screen: 'exceptions' },
    },
    {
      id: 5,
      type: 'signature' as const,
      title: 'Signature Required',
      message: 'Certificate of Arrival needs your digital signature',
      timestamp: '2026-04-17T14:00:00Z',
      read: true,
      important: true,
      action: { label: 'Sign Document', screen: 'signatures' },
    },
    {
      id: 6,
      type: 'social' as const,
      title: 'New Connection Request',
      message: 'Emma Wilson wants to connect with you',
      timestamp: '2026-04-17T11:30:00Z',
      read: true,
      important: false,
      action: { label: 'View Profile', screen: 'connections' },
    },
    {
      id: 7,
      type: 'deadline' as const,
      title: 'Reminder: Mid-term Evaluation',
      message: 'Complete your mid-term evaluation by March 20, 2026',
      timestamp: '2026-04-16T09:00:00Z',
      read: true,
      important: false,
      action: { label: 'Start Evaluation', screen: 'procedures' },
    },
  ];

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'important') return n.important;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'approval':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'signature':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'exception':
        return <Calendar className="w-5 h-5 text-yellow-600" />;
      case 'social':
        return <Bell className="w-5 h-5 text-pink-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date('2026-04-18T15:00:00Z');
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">Notifications</h1>
          <p className="text-slate-600">Stay updated with your mobility activities</p>
        </div>
        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">{notifications.length}</div>
          <div className="text-sm text-slate-600">Total</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-700 mb-1">
            {notifications.filter(n => !n.read).length}
          </div>
          <div className="text-sm text-slate-700">Unread</div>
        </Card>
        <Card className="text-center bg-red-50 border-red-200">
          <div className="text-2xl text-red-700 mb-1">
            {notifications.filter(n => n.important).length}
          </div>
          <div className="text-sm text-slate-700">Important</div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({notifications.filter(n => !n.read).length})
          </Button>
          <Button
            variant={filter === 'important' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('important')}
          >
            Important
          </Button>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-all ${
              !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
            }`}
            hoverable
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                !notification.read ? 'bg-white' : 'bg-slate-100'
              }`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-slate-900 ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h3>
                      {notification.important && (
                        <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                          Important
                        </span>
                      )}
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{notification.message}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {getTimeAgo(notification.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {notification.action && (
                    <Button variant="outline" size="sm">
                      {notification.action.label}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="text-center py-12">
          <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg text-slate-900 mb-2">No notifications</h3>
          <p className="text-sm text-slate-600">You're all caught up!</p>
        </Card>
      )}
    </div>
  );
}
