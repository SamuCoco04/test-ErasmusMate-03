import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { FileCheck, User, Calendar, Eye, CheckCircle, X, AlertCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export function SignatureRequests() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'signed'>('pending');

  const requests = [
    {
      id: 1,
      studentName: 'Maria Rodriguez',
      studentId: 'STU2024001',
      documentType: 'Learning Agreement - Before Mobility',
      submittedDate: '2026-04-15',
      deadline: '2026-04-22',
      status: 'pending' as const,
      priority: 'high',
      previousSignatures: [
        { role: 'Student', signed: true, date: '2026-04-15' },
      ],
      nextSignatures: [
        { role: 'Host Coordinator', signed: false },
      ],
    },
    {
      id: 2,
      studentName: 'John Smith',
      studentId: 'STU2024002',
      documentType: 'Learning Agreement - During Mobility',
      submittedDate: '2026-04-16',
      deadline: '2026-04-23',
      status: 'pending' as const,
      priority: 'medium',
      previousSignatures: [
        { role: 'Student', signed: true, date: '2026-04-16' },
      ],
      nextSignatures: [
        { role: 'Host Coordinator', signed: false },
      ],
    },
    {
      id: 3,
      studentName: 'Emma Wilson',
      studentId: 'STU2024003',
      documentType: 'Grant Agreement',
      submittedDate: '2026-04-10',
      deadline: '2026-04-17',
      status: 'urgent' as const,
      priority: 'high',
      previousSignatures: [
        { role: 'Student', signed: true, date: '2026-04-10' },
      ],
      nextSignatures: [
        { role: 'IRO Officer', signed: false },
      ],
    },
    {
      id: 4,
      studentName: 'Tom Brown',
      studentId: 'STU2024004',
      documentType: 'Learning Agreement - Before Mobility',
      submittedDate: '2026-04-12',
      deadline: '2026-04-19',
      status: 'signed' as const,
      signedDate: '2026-04-14',
      priority: 'medium',
      previousSignatures: [
        { role: 'Student', signed: true, date: '2026-04-12' },
        { role: 'Home Coordinator', signed: true, date: '2026-04-14' },
      ],
      nextSignatures: [
        { role: 'Host Coordinator', signed: false },
      ],
    },
    {
      id: 5,
      studentName: 'Sarah Chen',
      studentId: 'STU2024005',
      documentType: 'Certificate of Arrival',
      submittedDate: '2026-04-17',
      deadline: '2026-04-24',
      status: 'pending' as const,
      priority: 'low',
      previousSignatures: [
        { role: 'Student', signed: true, date: '2026-04-17' },
      ],
      nextSignatures: [
        { role: 'Host Institution', signed: false },
      ],
    },
  ];

  const filteredRequests = filter === 'all'
    ? requests
    : filter === 'pending'
    ? requests.filter(r => r.status === 'pending' || r.status === 'urgent')
    : requests.filter(r => r.status === 'signed');

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date('2026-04-18');
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Signature Requests</h1>
        <p className="text-slate-600">Review and sign documents submitted by students</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center bg-red-50 border-red-200">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl text-red-700 mb-1">
            {requests.filter(r => r.status === 'urgent').length}
          </div>
          <div className="text-sm text-slate-700">Urgent</div>
        </Card>
        <Card className="text-center bg-yellow-50 border-yellow-200">
          <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl text-yellow-700 mb-1">
            {requests.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-sm text-slate-700">Pending Review</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl text-green-700 mb-1">
            {requests.filter(r => r.status === 'signed').length}
          </div>
          <div className="text-sm text-slate-700">Signed Today</div>
        </Card>
        <Card className="text-center">
          <FileCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <div className="text-2xl text-slate-900 mb-1">{requests.length}</div>
          <div className="text-sm text-slate-600">Total Requests</div>
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
            variant={filter === 'pending' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending ({requests.filter(r => r.status === 'pending' || r.status === 'urgent').length})
          </Button>
          <Button
            variant={filter === 'signed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('signed')}
          >
            Signed
          </Button>
        </div>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const daysLeft = getDaysUntilDeadline(request.deadline);
          return (
            <Card
              key={request.id}
              className={`transition-all ${
                request.status === 'urgent' ? 'border-l-4 border-l-red-500' :
                request.status === 'pending' ? 'border-l-4 border-l-yellow-500' :
                'border-l-4 border-l-green-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    request.status === 'urgent' ? 'bg-red-100' :
                    request.status === 'pending' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    {request.status === 'signed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : request.status === 'urgent' ? (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    ) : (
                      <FileCheck className="w-6 h-6 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg text-slate-900">{request.documentType}</h3>
                      <StatusChip status={request.status} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {request.studentName} ({request.studentId})
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Submitted: {new Date(request.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className={`flex items-center gap-1 ${
                        daysLeft <= 2 ? 'text-red-600' : daysLeft <= 5 ? 'text-yellow-600' : ''
                      }`}>
                        <Clock className="w-4 h-4" />
                        Deadline: {daysLeft} days left
                      </div>
                    </div>

                    {/* Signature Progress */}
                    <div className="flex items-center gap-2 mb-2">
                      {request.previousSignatures.map((sig, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-xs text-slate-600">{sig.role}</span>
                          {idx < request.previousSignatures.length - 1 && (
                            <span className="text-slate-300 mx-1">→</span>
                          )}
                        </div>
                      ))}
                      <span className="text-slate-300 mx-1">→</span>
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-xs text-blue-600">Your Signature</span>
                      </div>
                      {request.nextSignatures.map((sig, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <span className="text-slate-300 mx-1">→</span>
                          <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="text-xs text-slate-400">{sig.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                  {request.status !== 'signed' && (
                    <>
                      <Button variant="primary" size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve & Sign
                      </Button>
                      <Button variant="destructive" size="sm">
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {request.signedDate && (
                <div className="flex items-center gap-2 pt-3 border-t border-slate-200 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Signed on {new Date(request.signedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
