import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { StatusChip } from '../design-system/StatusChip';
import { Upload, FileCheck, AlertTriangle, Download, Eye } from 'lucide-react';

interface SubmissionDetailProps {
  onNavigate?: (destination: string) => void;
}

export function SubmissionDetail({ onNavigate }: SubmissionDetailProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => onNavigate?.('submissions')}>
          ← Back to Submissions
        </Button>
      </div>

      {/* Submission Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl text-slate-900 mb-2">Learning Agreement - Before Mobility</h1>
            <p className="text-slate-600 mb-3">Submitted on February 28, 2026 at 14:32</p>
            <div className="flex items-center gap-2">
              <StatusChip status="approved" />
              <span className="text-sm text-slate-600">Reviewed by Dr. Jensen on March 2, 2026</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        </div>
      </Card>

      {/* Review Decision */}
      <Card className="border-l-4 border-l-green-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-slate-900 mb-2">Submission Approved</h3>
            <p className="text-slate-600 mb-4">
              Your learning agreement has been reviewed and approved. All course selections are confirmed,
              and credit recognition has been validated according to institutional requirements.
            </p>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-sm text-slate-700 mb-2">Reviewer Comments</h4>
              <p className="text-sm text-slate-600">
                Excellent course selection that aligns well with your program requirements. The credit
                distribution is balanced and meets all academic standards. Please ensure you maintain
                regular communication with your host institution coordinator.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Submitted Documents */}
      <Card>
        <h3 className="text-lg text-slate-900 mb-4">Submitted Documents</h3>
        <div className="space-y-3">
          {[
            { name: 'Learning_Agreement_Form.pdf', size: '2.4 MB', status: 'approved' as const },
            { name: 'Course_Catalog_Selection.pdf', size: '1.8 MB', status: 'approved' as const },
            { name: 'Academic_Transcript.pdf', size: '856 KB', status: 'approved' as const },
          ].map((doc, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-900">{doc.name}</p>
                  <p className="text-xs text-slate-500">{doc.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusChip status={doc.status} size="sm" />
                <div className="flex gap-2">
                  <button className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Validation Details */}
      <Card>
        <h3 className="text-lg text-slate-900 mb-4">Validation Details</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Submission ID</p>
              <p className="text-sm text-slate-900">SUB-2026-00847</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Procedure</p>
              <p className="text-sm text-slate-900">Learning Agreement Submission</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Reviewed By</p>
              <p className="text-sm text-slate-900">Dr. Anna Jensen (Home Coordinator)</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Review Date</p>
              <p className="text-sm text-slate-900">March 2, 2026 at 10:15</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-sm text-slate-700 mb-3">Validation Checklist</h4>
            <div className="space-y-2">
              {[
                'All required documents submitted',
                'Course selections align with program requirements',
                'Credit distribution meets minimum requirements (30 ECTS)',
                'Host institution approval obtained',
                'Learning outcomes properly defined',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="bg-blue-50 border-blue-200">
        <h3 className="text-lg text-slate-900 mb-3">Next Steps</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span>Keep a copy of the approved learning agreement for your records</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span>Contact your host institution to confirm course enrollment</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            <span>Submit any changes through the "During Mobility" procedure if needed</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
