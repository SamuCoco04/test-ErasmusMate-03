import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Calendar, Plus, Edit, Trash2, Users, AlertCircle, Clock, Bell } from 'lucide-react';
import { useState } from 'react';

export function DeadlineManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const deadlines = [
    {
      id: 1,
      title: 'Learning Agreement Submission',
      description: 'Final deadline for submitting before-mobility learning agreements',
      date: '2026-04-25',
      category: 'Academic',
      affectedStudents: 8,
      completedStudents: 5,
      priority: 'high',
      notifications: true,
    },
    {
      id: 2,
      title: 'Grant Agreement Signatures',
      description: 'All grant agreements must be fully signed',
      date: '2026-04-30',
      category: 'Financial',
      affectedStudents: 12,
      completedStudents: 9,
      priority: 'high',
      notifications: true,
    },
    {
      id: 3,
      title: 'Certificate of Arrival',
      description: 'Students must submit arrival confirmation',
      date: '2026-05-05',
      category: 'Administrative',
      affectedStudents: 15,
      completedStudents: 10,
      priority: 'medium',
      notifications: true,
    },
    {
      id: 4,
      title: 'Mid-term Evaluation Forms',
      description: 'Complete mid-term evaluation for all active mobilities',
      date: '2026-05-15',
      category: 'Academic',
      affectedStudents: 18,
      completedStudents: 3,
      priority: 'medium',
      notifications: false,
    },
    {
      id: 5,
      title: 'Housing Contract Renewals',
      description: 'Process housing contract renewals for extended stays',
      date: '2026-06-01',
      category: 'Housing',
      affectedStudents: 4,
      completedStudents: 0,
      priority: 'low',
      notifications: false,
    },
    {
      id: 6,
      title: 'Final Report Submissions',
      description: 'Deadline for students to submit final mobility reports',
      date: '2026-07-15',
      category: 'Administrative',
      affectedStudents: 20,
      completedStudents: 2,
      priority: 'medium',
      notifications: true,
    },
  ];

  const getDaysUntilDeadline = (date: string) => {
    const today = new Date('2026-04-18');
    const deadline = new Date(date);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedDeadlines = [...deadlines].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">Deadline Management</h1>
          <p className="text-slate-600">Manage and track important deadlines for student mobilities</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            Calendar View
          </Button>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Deadline
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <div className="text-2xl text-slate-900 mb-1">{deadlines.length}</div>
          <div className="text-sm text-slate-600">Total Deadlines</div>
        </Card>
        <Card className="text-center bg-red-50 border-red-200">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl text-red-700 mb-1">
            {deadlines.filter(d => getDaysUntilDeadline(d.date) <= 7).length}
          </div>
          <div className="text-sm text-slate-700">Due This Week</div>
        </Card>
        <Card className="text-center bg-yellow-50 border-yellow-200">
          <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl text-yellow-700 mb-1">
            {deadlines.filter(d => getDaysUntilDeadline(d.date) > 7 && getDaysUntilDeadline(d.date) <= 30).length}
          </div>
          <div className="text-sm text-slate-700">Due This Month</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {Math.round((deadlines.reduce((sum, d) => sum + d.completedStudents, 0) / deadlines.reduce((sum, d) => sum + d.affectedStudents, 0)) * 100)}%
          </div>
          <div className="text-sm text-slate-700">Overall Completion</div>
        </Card>
      </div>

      {/* Urgent Deadlines Alert */}
      {deadlines.some(d => getDaysUntilDeadline(d.date) <= 3) && (
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-slate-900 mb-1">Urgent Deadlines Approaching</h3>
              <p className="text-sm text-slate-700">
                You have {deadlines.filter(d => getDaysUntilDeadline(d.date) <= 3).length} deadline(s) due within the next 3 days.
                Make sure all affected students are notified.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Deadlines List */}
      <div className="space-y-4">
        {sortedDeadlines.map((deadline) => {
          const daysLeft = getDaysUntilDeadline(deadline.date);
          const completionRate = Math.round((deadline.completedStudents / deadline.affectedStudents) * 100);

          return (
            <Card
              key={deadline.id}
              className={`transition-all ${
                daysLeft <= 3 ? 'border-l-4 border-l-red-500' :
                daysLeft <= 7 ? 'border-l-4 border-l-yellow-500' :
                'border-l-4 border-l-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    daysLeft <= 3 ? 'bg-red-100' :
                    daysLeft <= 7 ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Calendar className={`w-6 h-6 ${
                      daysLeft <= 3 ? 'text-red-600' :
                      daysLeft <= 7 ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg text-slate-900">{deadline.title}</h3>
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                        {deadline.category}
                      </span>
                      {deadline.notifications && (
                        <Bell className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{deadline.description}</p>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500">Deadline</p>
                        <p className={`text-sm ${
                          daysLeft <= 3 ? 'text-red-700' :
                          daysLeft <= 7 ? 'text-yellow-700' : 'text-slate-900'
                        }`}>
                          {new Date(deadline.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {daysLeft >= 0 && (
                            <span className="ml-2 text-xs">
                              ({daysLeft} {daysLeft === 1 ? 'day' : 'days'})
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Affected Students</p>
                        <p className="text-sm text-slate-900">{deadline.affectedStudents}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Completed</p>
                        <p className="text-sm text-green-700">{deadline.completedStudents}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Pending</p>
                        <p className="text-sm text-yellow-700">{deadline.affectedStudents - deadline.completedStudents}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-600">Completion Progress</span>
                        <span className="text-slate-900">{completionRate}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            completionRate === 100 ? 'bg-green-500' :
                            completionRate >= 75 ? 'bg-blue-500' :
                            completionRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-1" />
                    View Students
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-1" />
                    Send Reminder
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Deadline Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <Card className="w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl text-slate-900 mb-4">Add New Deadline</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Deadline Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter deadline title"
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
                  placeholder="Describe the deadline"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 mb-2">Due Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifications" className="w-4 h-4" defaultChecked />
                <label htmlFor="notifications" className="text-sm text-slate-700">Send automatic reminders to students</label>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary">
                  Create Deadline
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
