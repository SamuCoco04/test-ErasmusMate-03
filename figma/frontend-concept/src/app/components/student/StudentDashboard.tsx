import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { AlertCircle, CheckCircle, Clock, FileText, Calendar, ArrowRight } from 'lucide-react';

interface StudentDashboardProps {
  onNavigate?: (destination: string) => void;
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Welcome back, Maria</h1>
        <p className="text-slate-600">Here's an overview of your Erasmus mobility status</p>
      </div>

      {/* Mobility Overview Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl text-slate-900">Spring 2026 Mobility</h2>
              <StatusChip status="active" />
            </div>
            <p className="text-slate-600 mb-1">University of Barcelona, Spain</p>
            <p className="text-sm text-slate-500">February 2026 - June 2026</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => onNavigate?.('mobility')}>
            View Details
          </Button>
        </div>
      </Card>

      {/* Action Required Section */}
      <div>
        <h2 className="text-xl text-slate-900 mb-4">Action Required</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card hoverable className="border-l-4 border-l-red-500">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-slate-900">Learning Agreement Revision</h3>
                  <StatusChip status="overdue" size="sm" />
                </div>
                <p className="text-sm text-slate-600 mb-3">Due 3 days ago</p>
                <Button variant="destructive" size="sm" onClick={() => onNavigate?.('submissions')}>
                  Submit Now
                </Button>
              </div>
            </div>
          </Card>

          <Card hoverable className="border-l-4 border-l-yellow-500">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-slate-900">Transcript of Records Upload</h3>
                  <StatusChip status="pending" size="sm" />
                </div>
                <p className="text-sm text-slate-600 mb-3">Due in 5 days</p>
                <Button variant="primary" size="sm" onClick={() => onNavigate?.('submissions')}>
                  Upload Document
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl text-slate-900 mb-1">8</div>
          <div className="text-sm text-slate-600">Active Procedures</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl text-slate-900 mb-1">12</div>
          <div className="text-sm text-slate-600">Approved Documents</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl text-slate-900 mb-1">3</div>
          <div className="text-sm text-slate-600">Pending Reviews</div>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl text-slate-900 mb-1">2</div>
          <div className="text-sm text-slate-600">Upcoming Deadlines</div>
        </Card>
      </div>

      {/* Recent Activity & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <h3 className="text-lg text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { title: 'Learning Agreement approved', date: '2 days ago', status: 'approved' as const },
              { title: 'Housing confirmation submitted', date: '5 days ago', status: 'review' as const },
              { title: 'Visa documentation uploaded', date: '1 week ago', status: 'approved' as const },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-slate-900">{activity.title}</p>
                    <StatusChip status={activity.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <h3 className="text-lg text-slate-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {[
              { title: 'Mid-term Evaluation Form', date: 'March 15, 2026', daysLeft: 5, urgent: false },
              { title: 'Course Registration Confirmation', date: 'March 20, 2026', daysLeft: 10, urgent: false },
              { title: 'Accommodation Extension Request', date: 'April 1, 2026', daysLeft: 22, urgent: false },
            ].map((deadline, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm text-slate-900 mb-1">{deadline.title}</p>
                  <p className="text-xs text-slate-600">{deadline.date}</p>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  deadline.daysLeft <= 5 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {deadline.daysLeft} days
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-4" onClick={() => onNavigate?.('deadlines')}>
            View All Deadlines <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>

      {/* Document Status Summary */}
      <Card>
        <h3 className="text-lg text-slate-900 mb-4">Document Status Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl text-slate-900">12</div>
              <div className="text-sm text-slate-600">Approved</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl text-slate-900">3</div>
              <div className="text-sm text-slate-600">In Review</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <FileText className="w-8 h-8 text-slate-600" />
            <div>
              <div className="text-2xl text-slate-900">2</div>
              <div className="text-sm text-slate-600">Draft</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
