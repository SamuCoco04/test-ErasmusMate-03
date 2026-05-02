import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { AlertCircle, User, Calendar, MessageSquare, CheckCircle, X, Eye, FileText } from 'lucide-react';
import { useState } from 'react';

export function ExceptionDecisions() {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const requests = [
    {
      id: 1,
      studentName: 'Maria Rodriguez',
      studentId: 'STU2024001',
      title: 'Extension of Mobility Period',
      category: 'Duration Extension',
      description: 'Request to extend mobility from June 2026 to July 2026 due to additional research opportunity with Prof. Martinez',
      submittedDate: '2026-03-01',
      status: 'pending' as const,
      priority: 'high',
      justification: 'I have been offered a research assistant position for July 2026 with Prof. Martinez to help complete a machine learning project. This is a valuable opportunity that aligns with my thesis topic.',
      supportingDocs: ['Research_Offer_Letter.pdf', 'Professor_Recommendation.pdf'],
    },
    {
      id: 2,
      studentName: 'John Smith',
      studentId: 'STU2024002',
      title: 'Course Substitution Request',
      category: 'Academic',
      description: 'Request to substitute "Database Systems" with "Cloud Computing" due to course cancellation',
      submittedDate: '2026-02-15',
      status: 'approved' as const,
      decidedDate: '2026-02-20',
      priority: 'medium',
      justification: 'The Database Systems course was cancelled at the host institution. Cloud Computing covers similar topics and maintains the same ECTS value.',
      supportingDocs: ['Course_Cancellation_Notice.pdf'],
      decision: 'Approved. The substitution is acceptable as it maintains equivalent ECTS and learning outcomes.',
    },
    {
      id: 3,
      studentName: 'Emma Wilson',
      studentId: 'STU2024003',
      title: 'Late Document Submission',
      category: 'Administrative',
      description: 'Request permission to submit Certificate of Arrival 2 weeks late',
      submittedDate: '2026-02-25',
      status: 'rejected' as const,
      decidedDate: '2026-02-27',
      priority: 'low',
      justification: 'Administrative delays at the host institution prevented timely submission.',
      supportingDocs: [],
      decision: 'Rejected. While we understand the circumstances, this deadline is mandated by EU regulations and cannot be extended.',
    },
    {
      id: 4,
      studentName: 'Tom Brown',
      studentId: 'STU2024004',
      title: 'Emergency Return Home',
      category: 'Personal',
      description: 'Request to temporarily return home for family emergency',
      submittedDate: '2026-04-10',
      status: 'urgent' as const,
      priority: 'high',
      justification: 'Family medical emergency requires my immediate presence. I plan to return to Barcelona within 10 days.',
      supportingDocs: ['Medical_Certificate.pdf'],
    },
    {
      id: 5,
      studentName: 'Sarah Chen',
      studentId: 'STU2024005',
      title: 'Additional ECTS Request',
      category: 'Academic',
      description: 'Request to take an additional course exceeding the standard 30 ECTS limit',
      submittedDate: '2026-04-15',
      status: 'pending' as const,
      priority: 'medium',
      justification: 'I am performing well in all my courses and would like to take an additional elective that would benefit my specialization.',
      supportingDocs: ['Current_Transcript.pdf'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Exception Decisions</h1>
        <p className="text-slate-600">Review and decide on student exception requests</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center bg-red-50 border-red-200">
          <div className="text-2xl text-red-700 mb-1">
            {requests.filter(r => r.status === 'urgent').length}
          </div>
          <div className="text-sm text-slate-700">Urgent Decisions</div>
        </Card>
        <Card className="text-center bg-yellow-50 border-yellow-200">
          <div className="text-2xl text-yellow-700 mb-1">
            {requests.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-sm text-slate-700">Pending Review</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {requests.filter(r => r.status === 'approved').length}
          </div>
          <div className="text-sm text-slate-700">Approved</div>
        </Card>
        <Card className="text-center bg-slate-50">
          <div className="text-2xl text-slate-700 mb-1">
            {requests.filter(r => r.status === 'rejected').length}
          </div>
          <div className="text-sm text-slate-700">Rejected</div>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <Card
            key={request.id}
            className={`transition-all ${
              request.status === 'urgent' ? 'border-l-4 border-l-red-500' :
              request.status === 'pending' ? 'border-l-4 border-l-yellow-500' :
              request.status === 'approved' ? 'border-l-4 border-l-green-500' :
              'border-l-4 border-l-slate-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  request.status === 'urgent' ? 'bg-red-100' :
                  request.status === 'pending' ? 'bg-yellow-100' :
                  request.status === 'approved' ? 'bg-green-100' : 'bg-slate-100'
                }`}>
                  {request.status === 'approved' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : request.status === 'rejected' ? (
                    <X className="w-6 h-6 text-slate-600" />
                  ) : (
                    <AlertCircle className={`w-6 h-6 ${
                      request.status === 'urgent' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg text-slate-900">{request.title}</h3>
                    <StatusChip status={request.status} />
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {request.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {request.studentName} ({request.studentId})
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Submitted: {new Date(request.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{request.description}</p>

                  {/* Justification */}
                  <div className="bg-slate-50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-slate-600 mb-1">Student Justification:</p>
                    <p className="text-sm text-slate-800">{request.justification}</p>
                  </div>

                  {/* Supporting Documents */}
                  {request.supportingDocs.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <FileText className="w-4 h-4" />
                      <span>Supporting documents ({request.supportingDocs.length}):</span>
                      {request.supportingDocs.map((doc, idx) => (
                        <button key={idx} className="text-blue-600 hover:underline">
                          {doc}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Decision */}
                  {request.decision && (
                    <div className={`p-3 rounded-lg ${
                      request.status === 'approved' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {request.status === 'approved' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <X className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm text-slate-900">
                          Decision on {new Date(request.decidedDate!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700">{request.decision}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {!request.decision && (
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                  <Button variant="primary" size="sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm">
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            </div>

            {/* Comment Section */}
            {selectedRequest === request.id && !request.decision && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <label className="block text-sm text-slate-700 mb-2">Add your decision and comments:</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Provide detailed reasoning for your decision..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                />
                <div className="flex gap-2 mt-3 justify-end">
                  <Button variant="outline" size="sm" onClick={() => setSelectedRequest(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Submit Decision
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
