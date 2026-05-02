import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Input } from '../design-system/Input';
import { StatusChip } from '../design-system/StatusChip';
import { ProgressIndicator } from '../design-system/ProgressIndicator';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

export function DocumentSubmission() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'Learning_Agreement_Form.pdf',
    'Academic_Transcript.pdf',
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Indicator */}
      <ProgressIndicator
        steps={['Select Procedure', 'Upload Documents', 'Review & Submit', 'Confirmation']}
        currentStep={1}
      />

      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-slate-900 mb-2">Submit Documents</h1>
        <p className="text-slate-600">Learning Agreement - Before Mobility</p>
      </div>

      {/* Procedure Information */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm text-slate-900 mb-1">Important Information</h3>
            <p className="text-sm text-slate-600">
              Please ensure all documents are complete and signed before submission. Incomplete submissions
              will be rejected. Deadline: <span className="font-medium text-slate-900">March 10, 2026</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Required Documents */}
      <Card>
        <h2 className="text-lg text-slate-900 mb-4">Required Documents</h2>

        <div className="space-y-4">
          {/* Document 1 */}
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-slate-900">Learning Agreement Form</h3>
                  <StatusChip status="submitted" size="sm" />
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Official learning agreement document with all course selections and credit allocations
                </p>
                <p className="text-xs text-slate-500">Required format: PDF • Max size: 10 MB</p>
              </div>
            </div>

            {/* Uploaded File */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-900">Learning_Agreement_Form.pdf</p>
                  <p className="text-xs text-slate-500">2.4 MB</p>
                </div>
              </div>
              <button className="p-1.5 text-slate-600 hover:bg-white rounded transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Document 2 */}
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-slate-900">Course Catalog with Selections</h3>
                  <StatusChip status="draft" size="sm" />
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Host institution course catalog with your selected courses highlighted
                </p>
                <p className="text-xs text-slate-500">Required format: PDF • Max size: 10 MB</p>
              </div>
            </div>

            {/* Upload Zone */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[--institutional-primary] transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 mb-1">
                <span className="text-[--institutional-primary]">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500">PDF up to 10MB</p>
            </div>
          </div>

          {/* Document 3 */}
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-slate-900">Current Academic Transcript</h3>
                  <StatusChip status="submitted" size="sm" />
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Official transcript showing your current academic standing and completed courses
                </p>
                <p className="text-xs text-slate-500">Required format: PDF • Max size: 10 MB</p>
              </div>
            </div>

            {/* Uploaded File */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-slate-900">Academic_Transcript.pdf</p>
                  <p className="text-xs text-slate-500">856 KB</p>
                </div>
              </div>
              <button className="p-1.5 text-slate-600 hover:bg-white rounded transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Optional Document */}
          <div className="border border-dashed border-slate-200 rounded-lg p-4 bg-slate-50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-slate-700">Language Proficiency Certificate</h3>
                  <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full">Optional</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  If available, provide language proficiency documentation for the host country language
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4" /> Add Optional Document
            </Button>
          </div>
        </div>
      </Card>

      {/* Validation Status */}
      <Card className="border-l-4 border-l-yellow-500">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm text-slate-900 mb-2">Document Validation</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-slate-700">Learning Agreement Form - Valid</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-slate-700">Course Catalog - Not uploaded</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-slate-700">Academic Transcript - Valid</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Comments */}
      <Card>
        <h3 className="text-slate-900 mb-3">Additional Comments (Optional)</h3>
        <textarea
          placeholder="Add any additional information or context for your submission..."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg min-h-24 resize-none focus:border-[--institutional-primary] focus:ring-2 focus:ring-blue-100 transition-colors"
        />
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Button variant="ghost">Save as Draft</Button>
        <div className="flex gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary" disabled={true}>
            Continue to Review
          </Button>
        </div>
      </div>
    </div>
  );
}
