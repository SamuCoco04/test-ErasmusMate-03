import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { FileCheck, User, Calendar, Download, Eye, AlertCircle } from 'lucide-react';

interface SignaturesProps {
  onNavigate?: (destination: string) => void;
}

export function Signatures({ onNavigate }: SignaturesProps) {
  const signatures = [
    {
      id: 1,
      documentName: 'Learning Agreement - Before Mobility',
      type: 'Learning Agreement',
      requiredSignatures: [
        { role: 'Student', name: 'Maria Rodriguez', signed: true, date: '2025-12-15' },
        { role: 'Home Coordinator', name: 'Dr. Sarah Thompson', signed: true, date: '2025-12-18' },
        { role: 'Host Coordinator', name: 'Prof. Carlos Martinez', signed: true, date: '2025-12-20' },
      ],
      status: 'completed' as const,
      completedDate: '2025-12-20',
    },
    {
      id: 2,
      documentName: 'Grant Agreement',
      type: 'Financial Agreement',
      requiredSignatures: [
        { role: 'Student', name: 'Maria Rodriguez', signed: true, date: '2025-12-10' },
        { role: 'IRO Officer', name: 'Anna Jensen', signed: true, date: '2025-12-12' },
        { role: 'Financial Office', name: 'John Smith', signed: false, date: null },
      ],
      status: 'pending' as const,
      completedDate: null,
    },
    {
      id: 3,
      documentName: 'Learning Agreement - During Mobility',
      type: 'Learning Agreement',
      requiredSignatures: [
        { role: 'Student', name: 'Maria Rodriguez', signed: true, date: '2026-02-10' },
        { role: 'Home Coordinator', name: 'Dr. Sarah Thompson', signed: false, date: null },
        { role: 'Host Coordinator', name: 'Prof. Carlos Martinez', signed: false, date: null },
      ],
      status: 'pending' as const,
      completedDate: null,
    },
    {
      id: 4,
      documentName: 'Certificate of Arrival',
      type: 'Administrative',
      requiredSignatures: [
        { role: 'Student', name: 'Maria Rodriguez', signed: false, date: null },
        { role: 'Host Institution', name: 'International Office UB', signed: false, date: null },
      ],
      status: 'not_started' as const,
      completedDate: null,
    },
  ];

  const getProgressPercentage = (sigs: any[]) => {
    const signed = sigs.filter(s => s.signed).length;
    return (signed / sigs.length) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Signatures</h1>
        <p className="text-slate-600">Track and manage document signatures throughout your mobility process</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">{signatures.length}</div>
          <div className="text-sm text-slate-600">Total Documents</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {signatures.filter(s => s.status === 'completed').length}
          </div>
          <div className="text-sm text-slate-700">Fully Signed</div>
        </Card>
        <Card className="text-center bg-yellow-50 border-yellow-200">
          <div className="text-2xl text-yellow-700 mb-1">
            {signatures.filter(s => s.status === 'pending').length}
          </div>
          <div className="text-sm text-slate-700">Awaiting Signatures</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-700 mb-1">
            {signatures.filter(s => s.status === 'not_started').length}
          </div>
          <div className="text-sm text-slate-700">Not Started</div>
        </Card>
      </div>

      {/* Action Required */}
      {signatures.some(s => s.requiredSignatures.some(sig => sig.role === 'Student' && !sig.signed)) && (
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-slate-900 mb-1">Your Action Required</h3>
              <p className="text-sm text-slate-700">
                You have {signatures.filter(s => s.requiredSignatures.some(sig => sig.role === 'Student' && !sig.signed)).length} document(s) awaiting your signature
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Documents List */}
      <div className="space-y-4">
        {signatures.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  doc.status === 'completed' ? 'bg-green-100' :
                  doc.status === 'pending' ? 'bg-yellow-100' : 'bg-slate-100'
                }`}>
                  <FileCheck className={`w-6 h-6 ${
                    doc.status === 'completed' ? 'text-green-600' :
                    doc.status === 'pending' ? 'text-yellow-600' : 'text-slate-400'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg text-slate-900">{doc.documentName}</h3>
                    <StatusChip status={doc.status} />
                  </div>
                  <p className="text-sm text-slate-600">{doc.type}</p>
                  {doc.completedDate && (
                    <p className="text-xs text-green-600 mt-1">
                      Completed on {new Date(doc.completedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                {doc.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Signature Progress</span>
                <span className="text-slate-900">
                  {doc.requiredSignatures.filter(s => s.signed).length}/{doc.requiredSignatures.length} signed
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    doc.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${getProgressPercentage(doc.requiredSignatures)}%` }}
                />
              </div>
            </div>

            {/* Signatures */}
            <div className="space-y-2">
              {doc.requiredSignatures.map((sig, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${
                  sig.signed ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <User className={`w-5 h-5 ${sig.signed ? 'text-green-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="text-sm text-slate-900">{sig.role}</p>
                      <p className="text-xs text-slate-600">{sig.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {sig.signed ? (
                      <>
                        <div className="flex items-center gap-1 text-sm text-green-700">
                          <Calendar className="w-4 h-4" />
                          {new Date(sig.date!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Signed
                        </div>
                      </>
                    ) : (
                      <>
                        {sig.role === 'Student' ? (
                          <Button variant="primary" size="sm">
                            Sign Now
                          </Button>
                        ) : (
                          <div className="px-3 py-1 bg-slate-200 text-slate-600 text-xs rounded-full">
                            Pending
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
