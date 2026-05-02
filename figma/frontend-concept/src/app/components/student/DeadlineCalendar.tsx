import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { StatusChip } from '../design-system/StatusChip';
import { Calendar, Clock, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface DeadlineCalendarProps {
  onNavigate?: (destination: string) => void;
}

export function DeadlineCalendar({ onNavigate }: DeadlineCalendarProps) {
  const deadlines = [
    {
      title: 'Learning Agreement Revision',
      procedure: 'Document Submission',
      date: 'March 10, 2026',
      daysUntil: -3,
      status: 'overdue' as const,
      priority: 'high',
    },
    {
      title: 'Transcript of Records Upload',
      procedure: 'Document Submission',
      date: 'March 15, 2026',
      daysUntil: 5,
      status: 'pending' as const,
      priority: 'high',
    },
    {
      title: 'Mid-term Evaluation Form',
      procedure: 'Evaluation',
      date: 'March 20, 2026',
      daysUntil: 10,
      status: 'pending' as const,
      priority: 'medium',
    },
    {
      title: 'Course Registration Confirmation',
      procedure: 'Administrative',
      date: 'March 25, 2026',
      daysUntil: 15,
      status: 'pending' as const,
      priority: 'medium',
    },
    {
      title: 'Accommodation Extension Request',
      procedure: 'Housing',
      date: 'April 1, 2026',
      daysUntil: 22,
      status: 'pending' as const,
      priority: 'low',
    },
    {
      title: 'Insurance Documentation',
      procedure: 'Document Submission',
      date: 'April 10, 2026',
      daysUntil: 31,
      status: 'pending' as const,
      priority: 'low',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-slate-900 mb-2">Deadlines & Calendar</h1>
        <p className="text-slate-600">Track all your important mobility deadlines</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center border-l-4 border-l-red-500">
          <div className="text-2xl text-red-600 mb-1">1</div>
          <div className="text-xs text-slate-600">Overdue</div>
        </Card>
        <Card className="text-center border-l-4 border-l-yellow-500">
          <div className="text-2xl text-yellow-600 mb-1">2</div>
          <div className="text-xs text-slate-600">Due This Week</div>
        </Card>
        <Card className="text-center border-l-4 border-l-blue-500">
          <div className="text-2xl text-blue-600 mb-1">3</div>
          <div className="text-xs text-slate-600">This Month</div>
        </Card>
        <Card className="text-center border-l-4 border-l-green-500">
          <div className="text-2xl text-green-600 mb-1">8</div>
          <div className="text-xs text-slate-600">Completed</div>
        </Card>
      </div>

      {/* Urgent Deadlines */}
      {deadlines.filter(d => d.daysUntil <= 7).length > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-slate-900 mb-1">Urgent Attention Required</h3>
              <p className="text-sm text-slate-600">
                You have {deadlines.filter(d => d.daysUntil <= 0).length} overdue deadline(s) and{' '}
                {deadlines.filter(d => d.daysUntil > 0 && d.daysUntil <= 7).length} deadline(s) due within 7 days
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Calendar Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deadline List */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg text-slate-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {deadlines.map((deadline, idx) => (
                <div
                  key={idx}
                  className={`p-4 border rounded-lg ${
                    deadline.daysUntil <= 0
                      ? 'border-red-200 bg-red-50'
                      : deadline.daysUntil <= 7
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-slate-900">{deadline.title}</h4>
                        <StatusChip status={deadline.status} size="sm" />
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{deadline.procedure}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          {deadline.date}
                        </span>
                        <span className={`flex items-center gap-1.5 ${
                          deadline.daysUntil <= 0
                            ? 'text-red-600 font-medium'
                            : deadline.daysUntil <= 7
                            ? 'text-yellow-600 font-medium'
                            : 'text-slate-600'
                        }`}>
                          <Clock className="w-4 h-4" />
                          {deadline.daysUntil <= 0
                            ? `${Math.abs(deadline.daysUntil)} days overdue`
                            : `${deadline.daysUntil} days left`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {deadline.priority === 'high' && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={deadline.daysUntil <= 0 ? 'destructive' : 'primary'}
                    size="sm"
                    onClick={() => onNavigate?.('submissions')}
                  >
                    {deadline.daysUntil <= 0 ? 'Submit Now' : 'View Details'} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Calendar View & Tips */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card>
            <h3 className="text-slate-900 mb-4">March 2026</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                <div key={idx} className="text-slate-500 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const hasDeadline = [10, 15, 20, 25].includes(day);
                const isOverdue = day === 10;
                const isToday = day === 10;
                return (
                  <div
                    key={day}
                    className={`py-2 rounded ${
                      isToday
                        ? 'bg-[--institutional-primary] text-white'
                        : hasDeadline
                        ? isOverdue
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    } cursor-pointer`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 rounded" />
                <span className="text-slate-600">Overdue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 rounded" />
                <span className="text-slate-600">Upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[--institutional-primary] rounded" />
                <span className="text-slate-600">Today</span>
              </div>
            </div>
          </Card>

          {/* Deadline Tips */}
          <Card className="bg-blue-50 border-blue-200">
            <h3 className="text-slate-900 mb-3">Deadline Tips</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Set personal reminders 3-5 days before deadlines</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Prepare documents early to avoid last-minute issues</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Contact coordinators if you anticipate missing a deadline</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
