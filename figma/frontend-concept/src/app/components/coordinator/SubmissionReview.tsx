import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { StatusChip } from '../design-system/StatusChip';
import { FileText, User, Download, Eye, CheckCircle, X, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function SubmissionReview() {
  const [decision, setDecision] = useState<'approve' | 'reject' | 'reopen' | null>(null);
  const [rationale, setRationale] = useState('');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-slate-900 mb-2">Review Submission</h1>
          <p className="text-slate-600">Learning Agreement - Before Mobility</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Delegate Review</Button>
          <Button variant="ghost" size="sm">← Back to Queue</Button>
        </div>
      </div>

      {/* Student & Submission Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Overview */}
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[--institutional-primary]" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg text-slate-900 mb-1">Maria Rodriguez</h2>
                <p className="text-sm text-slate-600 mb-2">Student ID: STU-2024-0847</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600">Destination: <span className="text-slate-900">Barcelona, Spain</span></span>
                  <span className="text-slate-600">Host: <span className="text-slate-900">University of Barcelona</span></span>
                </div>
              </div>
              <StatusChip status="review" />
            </div>
          </Card>

          {/* Submission Details */}
          <Card>
            <h3 className="text-lg text-slate-900 mb-4">Submission Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Submission ID</p>
                <p className="text-sm text-slate-900">SUB-2026-00847</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Submitted</p>
                <p className="text-sm text-slate-900">March 8, 2026 at 14:32</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Review Deadline</p>
                <p className="text-sm text-red-600 font-medium">March 10, 2026 (Tomorrow)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Priority</p>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">High</span>
              </div>
            </div>

            {decision === null && (
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-2">Student Comments:</p>
                <p className="text-sm text-slate-700 italic bg-slate-50 p-3 rounded-lg">
                  "This is my revised learning agreement following the feedback from the preliminary review.
                  I have adjusted the course selection to better align with my program requirements and
                  confirmed availability with the host institution coordinator."
                </p>
              </div>
            )}
          </Card>

          {/* Submitted Documents */}
          <Card>
            <h3 className="text-lg text-slate-900 mb-4">Submitted Documents</h3>
            <div className="space-y-3">
              {[
                { name: 'Learning_Agreement_Form_Revised.pdf', size: '2.6 MB', pages: '8 pages', valid: true },
                { name: 'Course_Catalog_Selections.pdf', size: '1.9 MB', pages: '4 pages', valid: true },
                { name: 'Host_Institution_Approval.pdf', size: '524 KB', pages: '2 pages', valid: true },
                { name: 'Academic_Transcript_Updated.pdf', size: '982 KB', pages: '3 pages', valid: true },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      doc.valid ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <FileText className={`w-5 h-5 ${doc.valid ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-900 mb-0.5">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.size} • {doc.pages}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.valid && (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Valid
                      </span>
                    )}
                    <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Review Decision Section */}
          {decision === null && (
            <Card className="border-2 border-blue-200">
              <h3 className="text-lg text-slate-900 mb-4">Review Decision</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-700 mb-2 block">Decision Rationale *</label>
                  <textarea
                    value={rationale}
                    onChange={(e) => setRationale(e.target.value)}
                    placeholder="Provide clear rationale for your decision. This will be visible to the student."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg min-h-32 resize-none focus:border-[--institutional-primary] focus:ring-2 focus:ring-blue-100 transition-colors"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Required for reject/reopen decisions. Recommended for all decisions.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => setDecision('approve')}
                  >
                    <CheckCircle className="w-4 h-4" /> Approve
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setDecision('reopen')}
                  >
                    <AlertTriangle className="w-4 h-4" /> Request Changes
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setDecision('reject')}
                  >
                    <X className="w-4 h-4" /> Reject
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Decision Confirmation */}
          {decision && (
            <Card className={`border-l-4 ${
              decision === 'approve' ? 'border-l-green-500 bg-green-50' :
              decision === 'reject' ? 'border-l-red-500 bg-red-50' :
              'border-l-yellow-500 bg-yellow-50'
            }`}>
              <h3 className="text-lg text-slate-900 mb-3">Confirm Decision</h3>
              <p className="text-sm text-slate-700 mb-4">
                You are about to <span className="font-semibold">{decision}</span> this submission.
                {decision === 'approve' && ' The student will be notified and can proceed to the next stage.'}
                {decision === 'reject' && ' The student will need to resubmit through a new procedure.'}
                {decision === 'reopen' && ' The student will be able to make changes and resubmit.'}
              </p>
              <div className="flex gap-3">
                <Button
                  variant={decision === 'approve' ? 'primary' : 'destructive'}
                  onClick={() => {}}
                >
                  Confirm {decision === 'approve' ? 'Approval' : decision === 'reject' ? 'Rejection' : 'Reopen'}
                </Button>
                <Button variant="outline" onClick={() => setDecision(null)}>
                  Cancel
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar - Validation Checklist & History */}
        <div className="space-y-6">
          {/* Validation Checklist */}
          <Card>
            <h3 className="text-slate-900 mb-3">Validation Checklist</h3>
            <div className="space-y-2.5">
              {[
                { item: 'All required documents submitted', checked: true },
                { item: 'Documents properly formatted', checked: true },
                { item: 'Course selections validated', checked: true },
                { item: 'Credit requirements met (30 ECTS)', checked: true },
                { item: 'Host institution approval', checked: true },
                { item: 'Learning outcomes defined', checked: true },
                { item: 'Student signatures present', checked: true },
              ].map((check, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 ${
                    check.checked ? 'bg-green-500' : 'bg-slate-300'
                  }`}>
                    {check.checked && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-slate-700">{check.item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Previous Reviews */}
          <Card>
            <h3 className="text-slate-900 mb-3">Review History</h3>
            <div className="space-y-3">
              <div className="pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <StatusChip status="review" size="sm" />
                  <span className="text-xs text-slate-500">Current</span>
                </div>
                <p className="text-xs text-slate-600">Assigned to you</p>
                <p className="text-xs text-slate-500">March 8, 2026</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StatusChip status="rejected" size="sm" />
                  <span className="text-xs text-slate-500">Previous</span>
                </div>
                <p className="text-xs text-slate-600">Reviewed by Dr. Jensen</p>
                <p className="text-xs text-slate-500 mb-2">February 25, 2026</p>
                <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded">
                  "Please revise course selection to ensure alignment with program requirements."
                </p>
              </div>
            </div>
          </Card>

          {/* Audit Trail */}
          <Card>
            <h3 className="text-slate-900 mb-3">Audit Information</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Reviewer:</span>
                <span className="text-slate-900">You</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Review Started:</span>
                <span className="text-slate-900">March 9, 2026 10:23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Session ID:</span>
                <span className="text-slate-900 font-mono">REV-9A72B</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
