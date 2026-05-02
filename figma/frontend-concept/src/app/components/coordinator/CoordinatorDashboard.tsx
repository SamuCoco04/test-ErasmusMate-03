import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { StatusChip } from '../design-system/StatusChip';
import { FileText, Clock, AlertCircle, CheckCircle, User, Eye, Download } from 'lucide-react';

interface CoordinatorDashboardProps {
  onNavigate?: (destination: string) => void;
}

export function CoordinatorDashboard({ onNavigate }: CoordinatorDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Coordinator Dashboard</h1>
        <p className="text-slate-600">Monitor and manage Erasmus mobility processes</p>
      </div>

      {/* Alert Section */}
      <Card className="border-l-4 border-l-red-500 bg-red-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-slate-900 mb-1">Urgent Attention Required</h3>
            <p className="text-sm text-slate-600">
              <span className="font-medium">3 submissions</span> are approaching their review deadline within 24 hours
            </p>
          </div>
          <Button variant="destructive" size="sm" className="ml-auto" onClick={() => onNavigate?.('review-queue')}>
            Review Now
          </Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-3xl text-slate-900 mb-1">12</div>
          <div className="text-sm text-slate-600">Pending Reviews</div>
          <div className="text-xs text-yellow-600 mt-2">3 urgent</div>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl text-slate-900 mb-1">8</div>
          <div className="text-sm text-slate-600">Signature Requests</div>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-3xl text-slate-900 mb-1">5</div>
          <div className="text-sm text-slate-600">Exception Requests</div>
          <div className="text-xs text-orange-600 mt-2">2 new</div>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl text-slate-900 mb-1">45</div>
          <div className="text-sm text-slate-600">Active Mobilities</div>
        </Card>
      </div>

      {/* Pending Reviews - Priority Queue */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-slate-900">Priority Review Queue</h2>
          <Button variant="outline" size="sm" onClick={() => onNavigate?.('review-queue')}>
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {[
            {
              student: 'Maria Rodriguez',
              procedure: 'Learning Agreement Revision',
              submitted: '2 days ago',
              deadline: '1 day',
              urgent: true,
              id: 'SUB-847'
            },
            {
              student: 'Johan Andersson',
              procedure: 'Transcript of Records',
              submitted: '5 hours ago',
              deadline: '1 day',
              urgent: true,
              id: 'SUB-849'
            },
            {
              student: 'Emma Dubois',
              procedure: 'Final Evaluation Report',
              submitted: '1 day ago',
              deadline: '2 days',
              urgent: true,
              id: 'SUB-845'
            },
            {
              student: 'Luca Bianchi',
              procedure: 'Mid-term Assessment',
              submitted: '3 days ago',
              deadline: '5 days',
              urgent: false,
              id: 'SUB-842'
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 border rounded-lg hover:bg-slate-50 transition-colors ${
                item.urgent ? 'border-red-200 bg-red-50/50' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">{item.student}</h3>
                      <p className="text-sm text-slate-600">{item.procedure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 ml-13">
                    <span>ID: {item.id}</span>
                    <span>Submitted {item.submitted}</span>
                    <span className={item.urgent ? 'text-red-600 font-medium' : ''}>
                      Due in {item.deadline}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusChip status="review" size="sm" />
                  <Button variant="primary" size="sm" onClick={() => onNavigate?.('review-queue')}>
                    Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Decisions & Exception Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Decisions */}
        <Card>
          <h3 className="text-lg text-slate-900 mb-4">Recent Decisions</h3>
          <div className="space-y-3">
            {[
              { student: 'Anna Kowalski', action: 'Approved', procedure: 'Housing Documentation', time: '1 hour ago' },
              { student: 'Carlos Martinez', action: 'Approved', procedure: 'Learning Agreement', time: '3 hours ago' },
              { student: 'Sophie Laurent', action: 'Rejected', procedure: 'Course Change Request', time: '5 hours ago' },
              { student: 'Thomas Weber', action: 'Approved', procedure: 'Extension Request', time: '1 day ago' },
            ].map((decision, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{decision.student}</p>
                  <p className="text-xs text-slate-600">{decision.procedure}</p>
                </div>
                <div className="text-right">
                  <StatusChip
                    status={decision.action === 'Approved' ? 'approved' : 'rejected'}
                    size="sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">{decision.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Exception Requests */}
        <Card>
          <h3 className="text-lg text-slate-900 mb-4">Exception Requests</h3>
          <div className="space-y-3">
            {[
              { student: 'Maria Rodriguez', type: 'Deadline Extension', reason: 'Health issues', urgent: true },
              { student: 'Oliver Schmidt', type: 'Credit Override', reason: 'Course availability', urgent: false },
              { student: 'Isabella Romano', type: 'Procedure Waiver', reason: 'Transfer student', urgent: true },
            ].map((exception, idx) => (
              <div
                key={idx}
                className={`p-3 border rounded-lg ${
                  exception.urgent ? 'border-orange-200 bg-orange-50/50' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-slate-900 mb-1">{exception.student}</p>
                    <p className="text-xs text-slate-600">{exception.type}</p>
                  </div>
                  {exception.urgent && (
                    <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mb-3">Reason: {exception.reason}</p>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => onNavigate?.('exceptions')}>
                    Review
                  </Button>
                  <Button variant="ghost" size="sm">
                    Delegate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Student Progress Overview */}
      <Card>
        <h3 className="text-lg text-slate-900 mb-4">Student Progress Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="text-left text-xs text-slate-600 pb-3 px-2">Student</th>
                <th className="text-left text-xs text-slate-600 pb-3 px-2">Destination</th>
                <th className="text-left text-xs text-slate-600 pb-3 px-2">Stage</th>
                <th className="text-left text-xs text-slate-600 pb-3 px-2">Completion</th>
                <th className="text-left text-xs text-slate-600 pb-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Maria Rodriguez', dest: 'Barcelona, ES', stage: 'During', completion: 65, status: 'active' as const },
                { name: 'Johan Andersson', dest: 'Rome, IT', stage: 'Before', completion: 85, status: 'active' as const },
                { name: 'Emma Dubois', dest: 'Berlin, DE', stage: 'After', completion: 40, status: 'blocked' as const },
                { name: 'Luca Bianchi', dest: 'Paris, FR', stage: 'Before', completion: 90, status: 'active' as const },
              ].map((student, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-2">
                    <p className="text-sm text-slate-900">{student.name}</p>
                  </td>
                  <td className="py-3 px-2">
                    <p className="text-sm text-slate-600">{student.dest}</p>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {student.stage}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[--institutional-primary]"
                          style={{ width: `${student.completion}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 w-8">{student.completion}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <StatusChip status={student.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
