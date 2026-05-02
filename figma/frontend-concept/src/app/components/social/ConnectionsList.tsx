import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { StatusChip } from '../design-system/StatusChip';
import { Users, MessageSquare, UserX, Clock, Check, X } from 'lucide-react';

interface ConnectionsListProps {
  onNavigate?: (destination: string) => void;
}

export function ConnectionsList({ onNavigate }: ConnectionsListProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-slate-900 mb-2">My Connections</h1>
        <p className="text-slate-600">Manage your student network</p>
      </div>

      {/* Connection Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">12</div>
          <div className="text-xs text-slate-600">Active</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl text-orange-600 mb-1">3</div>
          <div className="text-xs text-slate-600">Pending Requests</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl text-blue-600 mb-1">5</div>
          <div className="text-xs text-slate-600">Received</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">2</div>
          <div className="text-xs text-slate-600">Barcelona</div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card padding="none">
        <div className="flex border-b border-slate-200">
          <button className="flex-1 px-4 py-3 text-sm text-[--social-primary] border-b-2 border-[--social-primary]">
            Active (12)
          </button>
          <button className="flex-1 px-4 py-3 text-sm text-slate-600 hover:text-slate-900">
            Pending (3)
          </button>
          <button className="flex-1 px-4 py-3 text-sm text-slate-600 hover:text-slate-900">
            Requests (5)
          </button>
        </div>

        {/* Active Connections */}
        <div className="p-4 space-y-3">
          {[
            {
              name: 'Anna Kowalski',
              university: 'University of Warsaw',
              destination: 'Barcelona, Spain',
              connected: '2 weeks ago',
              messages: 12,
              lastMessage: '2 days ago',
            },
            {
              name: 'Johan Andersson',
              university: 'Stockholm University',
              destination: 'Barcelona, Spain',
              connected: '1 month ago',
              messages: 24,
              lastMessage: '1 hour ago',
            },
            {
              name: 'Sophie Laurent',
              university: 'University of Lyon',
              destination: 'Barcelona, Spain',
              connected: '3 weeks ago',
              messages: 8,
              lastMessage: '1 week ago',
            },
            {
              name: 'Luca Bianchi',
              university: 'University of Milan',
              destination: 'Rome, Italy',
              connected: '1 week ago',
              messages: 3,
              lastMessage: '3 days ago',
            },
          ].map((connection, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-[--social-primary] to-[--social-secondary] rounded-full flex items-center justify-center text-white flex-shrink-0">
                {connection.name.split(' ').map(n => n[0]).join('')}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-slate-900">{connection.name}</h3>
                  <StatusChip status="active" size="sm" />
                </div>
                <p className="text-sm text-slate-600 mb-1">{connection.university}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{connection.destination}</span>
                  <span>• Connected {connection.connected}</span>
                  <span>• {connection.messages} messages</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="social" size="sm" onClick={() => onNavigate?.('messages')}>
                  <MessageSquare className="w-4 h-4" /> Message
                </Button>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pending Sent Requests */}
      <Card>
        <h3 className="text-lg text-slate-900 mb-4">Pending Sent Requests</h3>
        <div className="space-y-3">
          {[
            {
              name: 'Emma Dubois',
              university: 'Sorbonne University',
              destination: 'Barcelona, Spain',
              sent: '3 days ago',
            },
            {
              name: 'Carlos Martinez',
              university: 'University of Lisbon',
              destination: 'Barcelona, Spain',
              sent: '1 week ago',
            },
            {
              name: 'Isabella Romano',
              university: 'University of Rome',
              destination: 'Berlin, Germany',
              sent: '2 weeks ago',
            },
          ].map((request, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 border border-slate-200 rounded-lg">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 flex-shrink-0">
                {request.name.split(' ').map(n => n[0]).join('')}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-slate-900 mb-0.5">{request.name}</h4>
                <p className="text-xs text-slate-600">{request.university}</p>
                <p className="text-xs text-slate-500 mt-1">Sent {request.sent}</p>
              </div>

              <div className="flex items-center gap-2">
                <StatusChip status="pending" size="sm" />
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" /> Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Received Connection Requests */}
      <Card className="border-l-4 border-l-orange-500">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-slate-900">Connection Requests</h3>
          <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
            5 New
          </span>
        </div>

        <div className="space-y-3">
          {[
            {
              name: 'Thomas Weber',
              university: 'Technical University Berlin',
              destination: 'Barcelona, Spain',
              message: 'Hi! I\'m also going to Barcelona next semester. Would love to connect!',
              received: '1 day ago',
              mutualConnections: 2,
            },
            {
              name: 'Marie Dubois',
              university: 'University of Paris',
              destination: 'Barcelona, Spain',
              message: 'Looking forward to connecting with students at UB!',
              received: '2 days ago',
              mutualConnections: 0,
            },
          ].map((request, idx) => (
            <div key={idx} className="p-4 border border-orange-200 bg-orange-50/50 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[--social-primary] to-[--social-secondary] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {request.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 mb-0.5">{request.name}</h4>
                  <p className="text-sm text-slate-600 mb-1">{request.university}</p>
                  {request.mutualConnections > 0 && (
                    <p className="text-xs text-[--social-primary] flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {request.mutualConnections} mutual connection{request.mutualConnections > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                <span className="text-xs text-slate-500">{request.received}</span>
              </div>

              {request.message && (
                <div className="bg-white p-3 rounded-lg mb-3 text-sm text-slate-700 italic">
                  "{request.message}"
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="social" size="sm" className="flex-1">
                  <Check className="w-4 h-4" /> Accept
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <X className="w-4 h-4" /> Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
