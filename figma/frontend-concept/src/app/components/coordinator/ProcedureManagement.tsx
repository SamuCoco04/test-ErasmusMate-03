import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { FileText, Plus, Edit, Trash2, Eye, Users, Calendar, AlertCircle, Settings } from 'lucide-react';
import { useState } from 'react';

export function ProcedureManagement() {
  const [showAddModal, setShowAddModal] = useState(false);

  const procedures = [
    {
      id: 1,
      name: 'Learning Agreement - Before Mobility',
      category: 'Academic',
      required: true,
      deadline: 'Before departure',
      description: 'Official agreement detailing courses to be taken at the host institution',
      activeStudents: 5,
      completedStudents: 12,
      pendingStudents: 3,
      status: 'active' as const,
      createdDate: '2024-01-15',
      lastModified: '2026-03-10',
    },
    {
      id: 2,
      name: 'Learning Agreement - During Mobility',
      category: 'Academic',
      required: true,
      deadline: 'Within first month',
      description: 'Modifications to the original learning agreement if needed',
      activeStudents: 8,
      completedStudents: 8,
      pendingStudents: 4,
      status: 'active' as const,
      createdDate: '2024-01-15',
      lastModified: '2026-02-20',
    },
    {
      id: 3,
      name: 'Grant Agreement',
      category: 'Financial',
      required: true,
      deadline: 'Before departure',
      description: 'Financial agreement for Erasmus+ grant funding',
      activeStudents: 6,
      completedStudents: 14,
      pendingStudents: 0,
      status: 'active' as const,
      createdDate: '2024-01-15',
      lastModified: '2026-01-05',
    },
    {
      id: 4,
      name: 'Certificate of Arrival',
      category: 'Administrative',
      required: true,
      deadline: 'Within first week',
      description: 'Proof of arrival at the host institution',
      activeStudents: 10,
      completedStudents: 7,
      pendingStudents: 3,
      status: 'active' as const,
      createdDate: '2024-01-15',
      lastModified: '2026-02-15',
    },
    {
      id: 5,
      name: 'Mid-term Evaluation',
      category: 'Academic',
      required: true,
      deadline: 'Midpoint of mobility',
      description: 'Evaluation of progress halfway through the mobility period',
      activeStudents: 15,
      completedStudents: 5,
      pendingStudents: 0,
      status: 'active' as const,
      createdDate: '2024-01-15',
      lastModified: '2026-03-01',
    },
    {
      id: 6,
      name: 'Transcript of Records',
      category: 'Academic',
      required: true,
      deadline: 'End of mobility',
      description: 'Official grades obtained at the host institution',
      activeStudents: 2,
      completedStudents: 18,
      pendingStudents: 0,
      status: 'active' as const,
      createdDate: '2024-01-15',
      lastModified: '2026-01-20',
    },
    {
      id: 7,
      name: 'Final Report',
      category: 'Administrative',
      required: true,
      deadline: 'After return',
      description: 'Comprehensive report about the mobility experience',
      activeStudents: 3,
      completedStudents: 17,
      pendingStudents: 0,
      status: 'active' as const,
      createdDate: '2024-01-15',
      lastModified: '2025-12-10',
    },
    {
      id: 8,
      name: 'Language Assessment (OLS)',
      category: 'Academic',
      required: false,
      deadline: 'Before and after mobility',
      description: 'Online language proficiency test',
      activeStudents: 8,
      completedStudents: 10,
      pendingStudents: 2,
      status: 'active' as const,
      createdDate: '2024-01-15',
      lastModified: '2026-02-01',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">Procedure Management</h1>
          <p className="text-slate-600">Configure and manage mobility procedures and requirements</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Procedure
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <div className="text-2xl text-slate-900 mb-1">{procedures.length}</div>
          <div className="text-sm text-slate-600">Total Procedures</div>
        </Card>
        <Card className="text-center bg-red-50 border-red-200">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl text-red-700 mb-1">
            {procedures.filter(p => p.required).length}
          </div>
          <div className="text-sm text-slate-700">Required</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl text-blue-700 mb-1">
            {procedures.reduce((sum, p) => sum + p.activeStudents, 0)}
          </div>
          <div className="text-sm text-slate-700">Active Submissions</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {procedures.reduce((sum, p) => sum + p.completedStudents, 0)}
          </div>
          <div className="text-sm text-slate-700">Completed This Year</div>
        </Card>
      </div>

      {/* Procedures List */}
      <div className="space-y-4">
        {procedures.map((procedure) => (
          <Card key={procedure.id} hoverable>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg text-slate-900">{procedure.name}</h3>
                    {procedure.required && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Required</span>
                    )}
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {procedure.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{procedure.description}</p>

                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Deadline</p>
                        <p className="text-sm text-slate-900">{procedure.deadline}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Active</p>
                      <p className="text-sm text-slate-900">{procedure.activeStudents} students</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Completed</p>
                      <p className="text-sm text-green-700">{procedure.completedStudents} students</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Pending</p>
                      <p className="text-sm text-yellow-700">{procedure.pendingStudents} students</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500">
                    Last modified: {new Date(procedure.lastModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
                {!procedure.required && (
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Overall Completion Rate</span>
                <span className="text-slate-900">
                  {procedure.completedStudents + procedure.activeStudents > 0
                    ? Math.round((procedure.completedStudents / (procedure.completedStudents + procedure.activeStudents + procedure.pendingStudents)) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{
                    width: `${
                      procedure.completedStudents + procedure.activeStudents > 0
                        ? Math.round((procedure.completedStudents / (procedure.completedStudents + procedure.activeStudents + procedure.pendingStudents)) * 100)
                        : 0
                    }%`
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Procedure Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <Card className="w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl text-slate-900 mb-4">Add New Procedure</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Procedure Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter procedure name"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a category</option>
                  <option value="academic">Academic</option>
                  <option value="administrative">Administrative</option>
                  <option value="financial">Financial</option>
                  <option value="housing">Housing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                  placeholder="Describe the procedure"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Deadline</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Before departure, Within 2 weeks"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="required" className="w-4 h-4" />
                <label htmlFor="required" className="text-sm text-slate-700">Mark as required procedure</label>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary">
                  Create Procedure
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
