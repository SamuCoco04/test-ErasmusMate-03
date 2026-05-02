import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { BarChart3, TrendingUp, Users, FileText, Download, Calendar, AlertTriangle, CheckCircle, Globe, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const stats = {
    totalUsers: 1247,
    activeStudents: 856,
    activeMobilities: 234,
    completedMobilities: 542,
    pendingDocuments: 167,
    moderationQueue: 23,
  };

  const reports = [
    {
      id: 1,
      title: 'User Activity Report',
      description: 'Overview of user engagement and platform usage',
      category: 'Users',
      icon: Users,
      color: 'blue',
      lastGenerated: '2026-04-18',
      downloadFormats: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 2,
      title: 'Mobility Statistics',
      description: 'Detailed statistics on student mobilities by country, program, and period',
      category: 'Mobilities',
      icon: Globe,
      color: 'green',
      lastGenerated: '2026-04-15',
      downloadFormats: ['PDF', 'Excel'],
    },
    {
      id: 3,
      title: 'Document Processing Report',
      description: 'Analysis of document submission and approval rates',
      category: 'Documents',
      icon: FileText,
      color: 'purple',
      lastGenerated: '2026-04-17',
      downloadFormats: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 4,
      title: 'Moderation Activity',
      description: 'Summary of content moderation actions and trends',
      category: 'Moderation',
      icon: AlertTriangle,
      color: 'orange',
      lastGenerated: '2026-04-18',
      downloadFormats: ['PDF', 'CSV'],
    },
    {
      id: 5,
      title: 'Social Engagement Report',
      description: 'Metrics on connections, messages, and recommendations',
      category: 'Social',
      icon: MessageSquare,
      color: 'pink',
      lastGenerated: '2026-04-16',
      downloadFormats: ['PDF', 'Excel'],
    },
    {
      id: 6,
      title: 'Compliance Report',
      description: 'Compliance status for EU regulations and institutional requirements',
      category: 'Compliance',
      icon: CheckCircle,
      color: 'teal',
      lastGenerated: '2026-04-10',
      downloadFormats: ['PDF'],
    },
  ];

  const recentIssues = [
    {
      id: 1,
      title: 'High pending document rate in Computer Science',
      severity: 'medium',
      department: 'Computer Science',
      count: 34,
    },
    {
      id: 2,
      title: 'Delayed signature approvals',
      severity: 'high',
      department: 'Engineering',
      count: 12,
    },
    {
      id: 3,
      title: 'Inactive user accounts',
      severity: 'low',
      department: 'All Departments',
      count: 45,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">Reports & Analytics</h1>
          <p className="text-slate-600">Generate and download comprehensive platform reports</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedPeriod === 'week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('week')}
          >
            Week
          </Button>
          <Button
            variant={selectedPeriod === 'month' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('month')}
          >
            Month
          </Button>
          <Button
            variant={selectedPeriod === 'quarter' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('quarter')}
          >
            Quarter
          </Button>
          <Button
            variant={selectedPeriod === 'year' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('year')}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl text-slate-900 mb-1">{stats.totalUsers}</div>
          <div className="text-sm text-slate-600">Total Users</div>
          <div className="text-xs text-green-600 mt-1">+12% vs last month</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">{stats.activeStudents}</div>
          <div className="text-sm text-slate-600">Active Students</div>
          <div className="text-xs text-green-600 mt-1">+8% vs last month</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-700 mb-1">{stats.activeMobilities}</div>
          <div className="text-sm text-slate-700">Active Mobilities</div>
          <div className="text-xs text-blue-600 mt-1">+15% vs last month</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">{stats.completedMobilities}</div>
          <div className="text-sm text-slate-700">Completed</div>
          <div className="text-xs text-green-600 mt-1">+5% vs last month</div>
        </Card>
        <Card className="text-center bg-yellow-50 border-yellow-200">
          <div className="text-2xl text-yellow-700 mb-1">{stats.pendingDocuments}</div>
          <div className="text-sm text-slate-700">Pending Docs</div>
          <div className="text-xs text-red-600 mt-1">+3% vs last month</div>
        </Card>
        <Card className="text-center bg-red-50 border-red-200">
          <div className="text-2xl text-red-700 mb-1">{stats.moderationQueue}</div>
          <div className="text-sm text-slate-700">Moderation</div>
          <div className="text-xs text-green-600 mt-1">-20% vs last month</div>
        </Card>
      </div>

      {/* Recent Issues Alert */}
      {recentIssues.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-slate-900 mb-1">Attention Required</h3>
              <p className="text-sm text-slate-700 mb-3">
                {recentIssues.length} issue(s) detected that may require attention
              </p>
              <div className="space-y-2">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-sm text-slate-900">{issue.title}</p>
                      <p className="text-xs text-slate-600">{issue.department}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-700">{issue.count} items</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                        issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {issue.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Available Reports */}
      <div>
        <h2 className="text-xl text-slate-900 mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} hoverable>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 text-${report.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-slate-900 mb-1">{report.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{report.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Last generated: {new Date(report.lastGenerated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.downloadFormats.map((format) => (
                        <Button key={format} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          {format}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-slate-900">Mobility Trends</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Chart visualization would appear here</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-slate-900">Document Processing Rate</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Chart visualization would appear here</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Export All */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg text-slate-900 mb-1">Export Complete Report Package</h3>
            <p className="text-sm text-slate-700">
              Download all reports for the selected period in a single package
            </p>
          </div>
          <Button variant="primary">
            <Download className="w-4 h-4 mr-2" />
            Export All Reports
          </Button>
        </div>
      </Card>
    </div>
  );
}
