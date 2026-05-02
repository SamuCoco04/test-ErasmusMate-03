import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Shield, Search, Filter, Calendar, User, FileText, Activity, Download, Eye } from 'lucide-react';
import { useState } from 'react';

export function AuditTraceability() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<'all' | 'create' | 'update' | 'delete' | 'login'>('all');
  const [userFilter, setUserFilter] = useState<'all' | 'student' | 'coordinator' | 'admin'>('all');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2026-04-18T14:32:15Z',
      user: 'Maria Rodriguez',
      userRole: 'student' as const,
      action: 'create' as const,
      resource: 'Document Submission',
      resourceId: 'DOC-2024-156',
      details: 'Created new Learning Agreement submission',
      ipAddress: '192.168.1.45',
      userAgent: 'Chrome 122.0 / Windows 10',
    },
    {
      id: 2,
      timestamp: '2026-04-18T14:28:42Z',
      user: 'Dr. Sarah Thompson',
      userRole: 'coordinator' as const,
      action: 'update' as const,
      resource: 'Signature Request',
      resourceId: 'SIG-2024-089',
      details: 'Approved and signed grant agreement',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari 17.0 / macOS',
    },
    {
      id: 3,
      timestamp: '2026-04-18T14:15:23Z',
      user: 'System Administrator',
      userRole: 'admin' as const,
      action: 'update' as const,
      resource: 'Feature Settings',
      resourceId: 'FEATURE-SOCIAL',
      details: 'Enabled social messaging feature',
      ipAddress: '192.168.1.1',
      userAgent: 'Chrome 122.0 / macOS',
    },
    {
      id: 4,
      timestamp: '2026-04-18T13:45:18Z',
      user: 'John Smith',
      userRole: 'student' as const,
      action: 'login' as const,
      resource: 'Authentication',
      resourceId: 'AUTH-STU2024002',
      details: 'Successful login',
      ipAddress: '192.168.1.78',
      userAgent: 'Firefox 124.0 / Windows 11',
    },
    {
      id: 5,
      timestamp: '2026-04-18T13:30:55Z',
      user: 'Anna Jensen',
      userRole: 'coordinator' as const,
      action: 'delete' as const,
      resource: 'Deadline',
      resourceId: 'DEADLINE-2024-034',
      details: 'Removed obsolete deadline entry',
      ipAddress: '192.168.1.95',
      userAgent: 'Chrome 122.0 / Windows 10',
    },
    {
      id: 6,
      timestamp: '2026-04-18T12:15:34Z',
      user: 'Emma Wilson',
      userRole: 'student' as const,
      action: 'create' as const,
      resource: 'Exception Request',
      resourceId: 'EXC-2024-045',
      details: 'Submitted course substitution request',
      ipAddress: '192.168.1.56',
      userAgent: 'Chrome 122.0 / Android',
    },
    {
      id: 7,
      timestamp: '2026-04-18T11:42:19Z',
      user: 'Dr. Sarah Thompson',
      userRole: 'coordinator' as const,
      action: 'update' as const,
      resource: 'Exception Decision',
      resourceId: 'EXC-2024-041',
      details: 'Approved duration extension request',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari 17.0 / macOS',
    },
    {
      id: 8,
      timestamp: '2026-04-18T11:20:07Z',
      user: 'System Administrator',
      userRole: 'admin' as const,
      action: 'create' as const,
      resource: 'User Account',
      resourceId: 'USER-2024-189',
      details: 'Created new coordinator account',
      ipAddress: '192.168.1.1',
      userAgent: 'Chrome 122.0 / macOS',
    },
    {
      id: 9,
      timestamp: '2026-04-18T10:55:33Z',
      user: 'Tom Brown',
      userRole: 'student' as const,
      action: 'update' as const,
      resource: 'Profile Settings',
      resourceId: 'PROFILE-STU2024004',
      details: 'Updated contact information',
      ipAddress: '192.168.1.89',
      userAgent: 'Edge 122.0 / Windows 11',
    },
    {
      id: 10,
      timestamp: '2026-04-18T10:30:12Z',
      user: 'Anna Jensen',
      userRole: 'coordinator' as const,
      action: 'create' as const,
      resource: 'Procedure',
      resourceId: 'PROC-2024-023',
      details: 'Created new procedure: Final Evaluation',
      ipAddress: '192.168.1.95',
      userAgent: 'Chrome 122.0 / Windows 10',
    },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesUser = userFilter === 'all' || log.userRole === userFilter;
    return matchesSearch && matchesAction && matchesUser;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-700';
      case 'update':
        return 'bg-blue-100 text-blue-700';
      case 'delete':
        return 'bg-red-100 text-red-700';
      case 'login':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'coordinator':
        return 'bg-blue-100 text-blue-700';
      case 'student':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">Audit & Traceability</h1>
          <p className="text-slate-600">Complete audit trail of all system activities and changes</p>
        </div>
        <Button variant="primary">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <div className="text-2xl text-slate-900 mb-1">{auditLogs.length}</div>
          <div className="text-sm text-slate-600">Events Today</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {auditLogs.filter(l => l.action === 'create').length}
          </div>
          <div className="text-sm text-slate-700">Created</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-700 mb-1">
            {auditLogs.filter(l => l.action === 'update').length}
          </div>
          <div className="text-sm text-slate-700">Updated</div>
        </Card>
        <Card className="text-center bg-red-50 border-red-200">
          <div className="text-2xl text-red-700 mb-1">
            {auditLogs.filter(l => l.action === 'delete').length}
          </div>
          <div className="text-sm text-slate-700">Deleted</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by user, resource, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2">
              <span className="text-sm text-slate-700 self-center">Action:</span>
              <Button
                variant={actionFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('all')}
              >
                All
              </Button>
              <Button
                variant={actionFilter === 'create' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('create')}
              >
                Create
              </Button>
              <Button
                variant={actionFilter === 'update' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('update')}
              >
                Update
              </Button>
              <Button
                variant={actionFilter === 'delete' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('delete')}
              >
                Delete
              </Button>
              <Button
                variant={actionFilter === 'login' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActionFilter('login')}
              >
                Login
              </Button>
            </div>
            <div className="border-l border-slate-300 mx-2"></div>
            <div className="flex gap-2">
              <span className="text-sm text-slate-700 self-center">User:</span>
              <Button
                variant={userFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setUserFilter('all')}
              >
                All
              </Button>
              <Button
                variant={userFilter === 'student' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setUserFilter('student')}
              >
                Students
              </Button>
              <Button
                variant={userFilter === 'coordinator' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setUserFilter('coordinator')}
              >
                Coordinators
              </Button>
              <Button
                variant={userFilter === 'admin' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setUserFilter('admin')}
              >
                Admins
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Audit Logs */}
      <div className="space-y-2">
        {filteredLogs.map((log) => (
          <Card key={log.id} hoverable className="hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded text-xs ${getActionColor(log.action)}`}>
                      {log.action.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getRoleColor(log.userRole)}`}>
                      {log.userRole}
                    </span>
                    <span className="text-sm text-slate-900">{log.user}</span>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                    {new Date(log.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{log.details}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {log.resource} ({log.resourceId})
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {log.ipAddress}
                  </div>
                  <div className="flex items-center gap-1 truncate">
                    <Activity className="w-3 h-3" />
                    {log.userAgent}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-slate-900 mb-1">Audit Log Retention</h3>
            <p className="text-sm text-slate-700">
              Audit logs are retained for 365 days and can be exported at any time.
              All user actions, system changes, and security events are automatically logged and cannot be modified or deleted.
              For compliance reporting, use the Export Logs button to download complete audit trails.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
