import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { AlertCircle, Plus, Calendar, FileText, MessageSquare, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

interface ExceptionRequestsProps {
  onNavigate?: (destination: string) => void;
}

export function ExceptionRequests({ onNavigate }: ExceptionRequestsProps) {
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const requests = [
    {
      id: 1,
      title: 'Extension of Mobility Period',
      category: 'Duration Extension',
      description: 'Request to extend mobility from June 2026 to July 2026 due to additional research opportunity',
      submittedDate: '2026-03-01',
      status: 'review' as const,
      reviewedBy: 'Dr. Sarah Thompson',
      priority: 'high',
      comments: [
        {
          author: 'Dr. Sarah Thompson',
          role: 'Home Coordinator',
          date: '2026-03-05',
          message: 'I need more details about the research project and confirmation from the host institution.',
        },
      ],
    },
    {
      id: 2,
      title: 'Course Substitution Request',
      category: 'Academic',
      description: 'Request to substitute "Database Systems" with "Cloud Computing" due to course cancellation at host',
      submittedDate: '2026-02-15',
      status: 'approved' as const,
      reviewedBy: 'Dr. Sarah Thompson',
      decidedDate: '2026-02-20',
      priority: 'medium',
      comments: [
        {
          author: 'Dr. Sarah Thompson',
          role: 'Home Coordinator',
          date: '2026-02-20',
          message: 'Approved. The substitution maintains the same ECTS credits and is within your program requirements.',
        },
      ],
    },
    {
      id: 3,
      title: 'Late Document Submission',
      category: 'Administrative',
      description: 'Request permission to submit Certificate of Arrival 2 weeks late due to administrative delays',
      submittedDate: '2026-02-25',
      status: 'rejected' as const,
      reviewedBy: 'Anna Jensen',
      decidedDate: '2026-02-27',
      priority: 'low',
      comments: [
        {
          author: 'Anna Jensen',
          role: 'IRO Officer',
          date: '2026-02-27',
          message: 'Unfortunately, we cannot approve this as the deadline is mandatory per EU guidelines. Please submit the document as soon as possible.',
        },
      ],
    },
    {
      id: 4,
      title: 'Change of Accommodation',
      category: 'Housing',
      description: 'Request to change accommodation from university dorm to private apartment',
      submittedDate: '2026-03-10',
      status: 'pending' as const,
      priority: 'medium',
      comments: [],
    },
  ];

  const exceptionCategories = [
    'Duration Extension',
    'Academic',
    'Administrative',
    'Housing',
    'Financial',
    'Other',
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">Exception Requests</h1>
          <p className="text-slate-600">Submit and track requests for special circumstances or deviations from standard procedures</p>
        </div>
        <Button variant="primary" onClick={() => setShowNewRequestModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">{requests.length}</div>
          <div className="text-sm text-slate-600">Total Requests</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-700 mb-1">
            {requests.filter(r => r.status === 'pending' || r.status === 'review').length}
          </div>
          <div className="text-sm text-slate-700">Under Review</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {requests.filter(r => r.status === 'approved').length}
          </div>
          <div className="text-sm text-slate-700">Approved</div>
        </Card>
        <Card className="text-center bg-red-50 border-red-200">
          <div className="text-2xl text-red-700 mb-1">
            {requests.filter(r => r.status === 'rejected').length}
          </div>
          <div className="text-sm text-slate-700">Rejected</div>
        </Card>
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-slate-900 mb-1">About Exception Requests</h3>
            <p className="text-sm text-slate-700">
              Exception requests allow you to request deviations from standard procedures when special circumstances arise.
              Each request is reviewed by your coordinator and may require additional documentation. Response time typically ranges from 3-7 business days.
            </p>
          </div>
        </div>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  request.status === 'approved' ? 'bg-green-100' :
                  request.status === 'rejected' ? 'bg-red-100' :
                  request.status === 'review' ? 'bg-blue-100' : 'bg-yellow-100'
                }`}>
                  {request.status === 'approved' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : request.status === 'rejected' ? (
                    <X className="w-6 h-6 text-red-600" />
                  ) : (
                    <AlertCircle className={`w-6 h-6 ${
                      request.status === 'review' ? 'text-blue-600' : 'text-yellow-600'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg text-slate-900">{request.title}</h3>
                    <StatusChip status={request.status} />
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {request.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{request.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Submitted: {new Date(request.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    {request.decidedDate && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Decided: {new Date(request.decidedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>

            {/* Reviewer Info */}
            {request.reviewedBy && (
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-3 pb-3 border-b border-slate-200">
                <FileText className="w-4 h-4" />
                <span>Reviewed by: {request.reviewedBy}</span>
              </div>
            )}

            {/* Comments Section */}
            {request.comments.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-700 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Comments ({request.comments.length})</span>
                </div>
                {request.comments.map((comment, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm text-slate-900">{comment.author}</p>
                          <p className="text-xs text-slate-500">{comment.role}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(comment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">{comment.message}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* New Request Modal (placeholder) */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewRequestModal(false)}>
          <Card className="w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl text-slate-900 mb-4">New Exception Request</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Request Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief title for your request"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a category</option>
                  {exceptionCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                  placeholder="Provide detailed information about your request and the reason for the exception"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowNewRequestModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary">
                  Submit Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
