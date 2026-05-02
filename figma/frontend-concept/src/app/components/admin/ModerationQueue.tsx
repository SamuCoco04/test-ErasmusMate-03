import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { StatusChip } from '../design-system/StatusChip';
import { Flag, Eye, Ban, CheckCircle, X, AlertTriangle, User, MessageSquare, Image } from 'lucide-react';
import { useState } from 'react';

export function ModerationQueue() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const cases = [
    {
      id: 1,
      type: 'Content Report',
      contentType: 'Review',
      reporter: 'Student #2847 (Maria R.)',
      reported: 'Student #3421 (John D.)',
      reason: 'Inappropriate language',
      content: '"This place is terrible and the people are awful. Don\'t waste your time here."',
      priority: 'high',
      timestamp: '2 hours ago',
      previousReports: 0,
    },
    {
      id: 2,
      type: 'Profile Report',
      contentType: 'Profile',
      reporter: 'Auto-Detection System',
      reported: 'Student #4782 (Sarah M.)',
      reason: 'Suspicious activity pattern',
      content: 'Multiple rapid profile updates, unusual contact patterns',
      priority: 'high',
      timestamp: '4 hours ago',
      previousReports: 2,
    },
    {
      id: 3,
      type: 'Content Report',
      contentType: 'Recommendation',
      reporter: 'Student #1923 (Emma D.)',
      reported: 'Student #5621 (Alex K.)',
      reason: 'Misleading information',
      content: '"Free accommodation available at this address for any student" [potentially fraudulent]',
      priority: 'medium',
      timestamp: '1 day ago',
      previousReports: 1,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-slate-900 mb-2">Moderation Queue</h1>
        <p className="text-slate-600">Review reported content and user behavior</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">7</div>
          <div className="text-sm text-slate-600">Pending</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl text-red-600 mb-1">3</div>
          <div className="text-sm text-slate-600">High Priority</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">24h</div>
          <div className="text-sm text-slate-600">Avg Response</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">94%</div>
          <div className="text-sm text-slate-600">Resolved in SLA</div>
        </Card>
      </div>

      {/* Moderation Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-lg text-slate-900">Cases</h3>
          {cases.map((caseItem) => (
            <Card
              key={caseItem.id}
              hoverable
              className={`cursor-pointer ${
                selectedCase === caseItem.id ? 'border-2 border-[--institutional-primary]' : ''
              } ${caseItem.priority === 'high' ? 'border-l-4 border-l-red-500' : ''}`}
              onClick={() => setSelectedCase(caseItem.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flag className={`w-4 h-4 ${
                    caseItem.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <h4 className="text-sm text-slate-900">{caseItem.type}</h4>
                </div>
                {caseItem.priority === 'high' && (
                  <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                    High
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-1">{caseItem.reason}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{caseItem.timestamp}</span>
                {caseItem.previousReports > 0 && (
                  <span className="text-red-600">{caseItem.previousReports} prev reports</span>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Case Detail */}
        <div className="lg:col-span-2">
          {selectedCase ? (
            <Card className="space-y-6">
              {(() => {
                const caseData = cases.find(c => c.id === selectedCase);
                if (!caseData) return null;

                return (
                  <>
                    {/* Case Header */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-xl text-slate-900 mb-2">{caseData.type}</h2>
                          <div className="flex items-center gap-2">
                            <StatusChip status="review" size="sm" />
                            {caseData.priority === 'high' && (
                              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                                High Priority
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-slate-600">Case ID</p>
                          <p className="text-slate-900 font-mono">MOD-{String(caseData.id).padStart(4, '0')}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Reported By</p>
                          <p className="text-sm text-slate-900">{caseData.reporter}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Reported User</p>
                          <p className="text-sm text-slate-900">{caseData.reported}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Content Type</p>
                          <p className="text-sm text-slate-900">{caseData.contentType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Timestamp</p>
                          <p className="text-sm text-slate-900">{caseData.timestamp}</p>
                        </div>
                      </div>
                    </div>

                    {/* Report Reason */}
                    <div className="border-l-4 border-l-orange-500 bg-orange-50 p-4 rounded">
                      <h3 className="text-sm text-slate-900 mb-2">Report Reason</h3>
                      <p className="text-sm text-slate-700">{caseData.reason}</p>
                    </div>

                    {/* Reported Content */}
                    <div>
                      <h3 className="text-slate-900 mb-3">Reported Content</h3>
                      <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-700">{caseData.content}</p>
                      </div>
                    </div>

                    {/* Context Information */}
                    <div>
                      <h3 className="text-slate-900 mb-3">Context & History</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Previous reports on this user:</span>
                          <span className={`${caseData.previousReports > 0 ? 'text-red-600 font-medium' : 'text-slate-900'}`}>
                            {caseData.previousReports}
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Account age:</span>
                          <span className="text-slate-900">4 months</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Total content published:</span>
                          <span className="text-slate-900">23 items</span>
                        </div>
                        <div className="flex justify-between p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">Previous moderation actions:</span>
                          <span className="text-slate-900">{caseData.previousReports > 0 ? '1 warning issued' : 'None'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Moderation Actions */}
                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="text-slate-900 mb-4">Moderation Decision</h3>

                      <div className="space-y-3 mb-4">
                        <label className="text-sm text-slate-700">Action Rationale *</label>
                        <textarea
                          placeholder="Provide clear rationale for your moderation decision. This will be recorded in the audit log."
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg min-h-24 resize-none focus:border-[--institutional-primary] focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-center">
                          <Eye className="w-4 h-4" /> Dismiss Report
                        </Button>
                        <Button variant="secondary" className="justify-center">
                          <AlertTriangle className="w-4 h-4" /> Issue Warning
                        </Button>
                        <Button variant="destructive" className="justify-center">
                          <X className="w-4 h-4" /> Remove Content
                        </Button>
                        <Button variant="destructive" className="justify-center">
                          <Ban className="w-4 h-4" /> Suspend Account
                        </Button>
                      </div>

                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-slate-600">
                          <strong>Note:</strong> All moderation actions are logged for audit purposes and
                          subject to review. The reported user will be notified of any action taken.
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center text-center p-12">
              <div>
                <Flag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Select a case from the list to review</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Moderation Guidelines Reference */}
      <Card className="bg-blue-50 border-blue-200">
        <h3 className="text-slate-900 mb-2">Moderation Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
          <div>
            <h4 className="font-medium mb-2">Content Violations</h4>
            <ul className="space-y-1 text-xs">
              <li>• Harassment or hate speech</li>
              <li>• Explicit or inappropriate content</li>
              <li>• Fraudulent or misleading information</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Response Times</h4>
            <ul className="space-y-1 text-xs">
              <li>• High priority: 24 hours</li>
              <li>• Medium priority: 48 hours</li>
              <li>• Low priority: 72 hours</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Actions Available</h4>
            <ul className="space-y-1 text-xs">
              <li>• Warning (first offense)</li>
              <li>• Content removal</li>
              <li>• Temporary/permanent suspension</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
