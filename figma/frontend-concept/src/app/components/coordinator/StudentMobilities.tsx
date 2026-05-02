import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { User, MapPin, Calendar, GraduationCap, FileText, Search, Filter, Eye, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function StudentMobilities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const mobilities = [
    {
      id: 1,
      studentName: 'Maria Rodriguez',
      studentId: 'STU2024001',
      email: 'maria.rodriguez@university.edu',
      hostInstitution: 'University of Barcelona',
      hostCountry: 'Spain',
      program: 'Erasmus+ Studies',
      startDate: '2026-02-01',
      endDate: '2026-06-30',
      status: 'active' as const,
      ects: 30,
      documentsComplete: 85,
    },
    {
      id: 2,
      studentName: 'John Smith',
      studentId: 'STU2024002',
      email: 'john.smith@university.edu',
      hostInstitution: 'Sorbonne University',
      hostCountry: 'France',
      program: 'Erasmus+ Studies',
      startDate: '2026-02-15',
      endDate: '2026-07-15',
      status: 'active' as const,
      ects: 30,
      documentsComplete: 92,
    },
    {
      id: 3,
      studentName: 'Emma Wilson',
      studentId: 'STU2024003',
      email: 'emma.wilson@university.edu',
      hostInstitution: 'Technical University of Munich',
      hostCountry: 'Germany',
      program: 'Erasmus+ Internship',
      startDate: '2026-07-01',
      endDate: '2026-09-30',
      status: 'upcoming' as const,
      ects: 15,
      documentsComplete: 45,
    },
    {
      id: 4,
      studentName: 'Tom Brown',
      studentId: 'STU2024004',
      email: 'tom.brown@university.edu',
      hostInstitution: 'Politecnico di Milano',
      hostCountry: 'Italy',
      program: 'Erasmus+ Studies',
      startDate: '2025-09-01',
      endDate: '2026-01-31',
      status: 'completed' as const,
      ects: 30,
      documentsComplete: 100,
    },
    {
      id: 5,
      studentName: 'Sarah Chen',
      studentId: 'STU2024005',
      email: 'sarah.chen@university.edu',
      hostInstitution: 'University of Amsterdam',
      hostCountry: 'Netherlands',
      program: 'Erasmus+ Studies',
      startDate: '2026-02-10',
      endDate: '2026-06-20',
      status: 'active' as const,
      ects: 30,
      documentsComplete: 78,
    },
    {
      id: 6,
      studentName: 'Alex Thompson',
      studentId: 'STU2024006',
      email: 'alex.thompson@university.edu',
      hostInstitution: 'KU Leuven',
      hostCountry: 'Belgium',
      program: 'Erasmus+ Studies',
      startDate: '2026-09-01',
      endDate: '2027-01-31',
      status: 'upcoming' as const,
      ects: 30,
      documentsComplete: 25,
    },
  ];

  const filteredMobilities = mobilities.filter(m => {
    const matchesSearch = m.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.hostInstitution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Student Mobilities</h1>
        <p className="text-slate-600">Overview and management of all student mobility programs</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">{mobilities.length}</div>
          <div className="text-sm text-slate-600">Total Mobilities</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-700 mb-1">
            {mobilities.filter(m => m.status === 'active').length}
          </div>
          <div className="text-sm text-slate-700">Active</div>
        </Card>
        <Card className="text-center bg-yellow-50 border-yellow-200">
          <div className="text-2xl text-yellow-700 mb-1">
            {mobilities.filter(m => m.status === 'upcoming').length}
          </div>
          <div className="text-sm text-slate-700">Upcoming</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {mobilities.filter(m => m.status === 'completed').length}
          </div>
          <div className="text-sm text-slate-700">Completed</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name, ID, or institution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === 'upcoming' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={statusFilter === 'completed' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </div>
      </Card>

      {/* Mobilities Table */}
      <Card className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-sm text-slate-600">Student</th>
              <th className="text-left py-3 px-4 text-sm text-slate-600">Destination</th>
              <th className="text-left py-3 px-4 text-sm text-slate-600">Program</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Period</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">ECTS</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Progress</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Status</th>
              <th className="text-center py-3 px-4 text-sm text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMobilities.map((mobility) => (
              <tr key={mobility.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {mobility.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm text-slate-900">{mobility.studentName}</p>
                      <p className="text-xs text-slate-600">{mobility.studentId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm text-slate-900">{mobility.hostInstitution}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <MapPin className="w-3 h-3" />
                      {mobility.hostCountry}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-slate-700">{mobility.program}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="text-sm text-slate-700">
                    {new Date(mobility.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    <span className="text-slate-400 mx-1">-</span>
                    {new Date(mobility.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm text-slate-900">{mobility.ects}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          mobility.documentsComplete === 100 ? 'bg-green-500' :
                          mobility.documentsComplete >= 75 ? 'bg-blue-500' :
                          mobility.documentsComplete >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${mobility.documentsComplete}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-600 w-10">{mobility.documentsComplete}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <StatusChip status={mobility.status} size="sm" />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
