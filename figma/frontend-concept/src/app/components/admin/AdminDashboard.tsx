import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { StatusChip } from '../design-system/StatusChip';
import { Shield, Flag, AlertTriangle, BarChart3, Users, Settings, Eye, Ban } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate?: (destination: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Administrator Dashboard</h1>
        <p className="text-slate-600">Platform governance and operational oversight</p>
      </div>

      {/* System Health Alert */}
      <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-slate-900 mb-1">System Alert</h3>
            <p className="text-sm text-slate-600">
              Integration sync delayed for University of Lisbon. Last successful sync: 3 hours ago.
            </p>
          </div>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Flag className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-3xl text-slate-900 mb-1">7</div>
          <div className="text-sm text-slate-600">Pending Moderation</div>
          <div className="text-xs text-red-600 mt-2">3 high priority</div>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl text-slate-900 mb-1">2</div>
          <div className="text-sm text-slate-600">Integration Issues</div>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl text-slate-900 mb-1">342</div>
          <div className="text-sm text-slate-600">Active Users</div>
          <div className="text-xs text-slate-500 mt-2">↑ 12% this month</div>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl text-slate-900 mb-1">98.7%</div>
          <div className="text-sm text-slate-600">System Uptime</div>
        </Card>
      </div>

      {/* Moderation Queue & User Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Moderation Queue */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-slate-900">Moderation Queue</h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.('moderation')}>
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                type: 'Reported Content',
                content: 'Inappropriate review comment',
                reporter: 'Student #2847',
                priority: 'high',
                time: '2 hours ago'
              },
              {
                type: 'Flagged Profile',
                content: 'Suspicious profile activity',
                reporter: 'Auto-detect',
                priority: 'high',
                time: '4 hours ago'
              },
              {
                type: 'Content Report',
                content: 'Misleading recommendation',
                reporter: 'Student #1923',
                priority: 'medium',
                time: '1 day ago'
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-4 border rounded-lg ${
                  item.priority === 'high' ? 'border-red-200 bg-red-50/50' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Flag className={`w-4 h-4 ${item.priority === 'high' ? 'text-red-600' : 'text-slate-600'}`} />
                      <h3 className="text-sm text-slate-900">{item.type}</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{item.content}</p>
                    <p className="text-xs text-slate-500">Reported by {item.reporter} • {item.time}</p>
                  </div>
                  {item.priority === 'high' && (
                    <span className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded-full">
                      High
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="primary" size="sm" onClick={() => onNavigate?.('moderation')}>
                    Review
                  </Button>
                  <Button variant="outline" size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Admin Actions */}
        <Card>
          <h3 className="text-lg text-slate-900 mb-4">Recent Admin Actions</h3>
          <div className="space-y-3">
            {[
              { action: 'Content Removed', target: 'Review #8472', admin: 'Admin-01', time: '1 hour ago', type: 'moderation' },
              { action: 'User Role Updated', target: 'User #3421', admin: 'Admin-02', time: '3 hours ago', type: 'user' },
              { action: 'Social Feature Disabled', target: 'Institution: UNI-042', admin: 'Admin-01', time: '5 hours ago', type: 'feature' },
              { action: 'Account Suspended', target: 'User #1847', admin: 'Admin-03', time: '1 day ago', type: 'moderation' },
            ].map((action, idx) => (
              <div key={idx} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-slate-900 mb-1">{action.action}</p>
                  <p className="text-xs text-slate-600">{action.target}</p>
                  <p className="text-xs text-slate-500 mt-1">By {action.admin} • {action.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  action.type === 'moderation' ? 'bg-red-500' :
                  action.type === 'user' ? 'bg-blue-500' :
                  'bg-orange-500'
                }`} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Feature Scoping & Integration Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Feature Scoping */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-slate-900">Social Feature Scoping</h3>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.('features')}>
              Manage
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { institution: 'University of Barcelona', features: 'All Enabled', students: 124, status: 'active' },
              { institution: 'University of Rome', features: 'Map Disabled', students: 89, status: 'partial' },
              { institution: 'Technical University Berlin', features: 'Messaging Only', students: 156, status: 'partial' },
              { institution: 'Sorbonne University', features: 'All Disabled', students: 67, status: 'disabled' },
            ].map((scope, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-slate-900 mb-1">{scope.institution}</p>
                  <p className="text-xs text-slate-600">{scope.features} • {scope.students} students</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  scope.status === 'active' ? 'bg-green-100 text-green-700' :
                  scope.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {scope.status === 'active' ? 'Active' :
                   scope.status === 'partial' ? 'Partial' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Integration Status */}
        <Card>
          <h3 className="text-lg text-slate-900 mb-4">Integration Status</h3>
          <div className="space-y-3">
            {[
              { system: 'University of Barcelona SIS', status: 'operational', lastSync: '5 min ago' },
              { system: 'University of Rome SIS', status: 'operational', lastSync: '12 min ago' },
              { system: 'University of Lisbon SIS', status: 'warning', lastSync: '3 hours ago' },
              { system: 'Technical University Berlin', status: 'operational', lastSync: '8 min ago' },
            ].map((integration, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-slate-900 mb-1">{integration.system}</p>
                  <p className="text-xs text-slate-600">Last sync: {integration.lastSync}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  integration.status === 'operational' ? 'bg-green-500' :
                  integration.status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-4">
            View Integration Logs
          </Button>
        </Card>
      </div>

      {/* Platform Activity Overview */}
      <Card>
        <h3 className="text-lg text-slate-900 mb-4">Platform Activity (Last 7 Days)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl text-slate-900 mb-1">1,247</div>
            <div className="text-xs text-slate-600">Submissions Reviewed</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl text-slate-900 mb-1">342</div>
            <div className="text-xs text-slate-600">Social Connections Made</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl text-slate-900 mb-1">89</div>
            <div className="text-xs text-slate-600">Content Items Published</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl text-slate-900 mb-1">12</div>
            <div className="text-xs text-slate-600">Moderation Actions</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
