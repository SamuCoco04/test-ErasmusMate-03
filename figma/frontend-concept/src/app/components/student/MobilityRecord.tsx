import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { MapPin, Calendar, GraduationCap, Building2, Users, FileText, Download, CheckCircle } from 'lucide-react';

interface MobilityRecordProps {
  onNavigate?: (destination: string) => void;
}

export function MobilityRecord({ onNavigate }: MobilityRecordProps) {
  const currentMobility = {
    id: 1,
    destination: 'University of Barcelona',
    city: 'Barcelona',
    country: 'Spain',
    program: 'Erasmus+ Studies',
    startDate: 'February 2026',
    endDate: 'June 2026',
    status: 'active' as const,
    faculty: 'Computer Science',
    ects: 30,
  };

  const previousMobilities = [
    {
      id: 2,
      destination: 'Technical University of Munich',
      city: 'Munich',
      country: 'Germany',
      program: 'Erasmus+ Internship',
      startDate: 'July 2025',
      endDate: 'September 2025',
      status: 'completed' as const,
      ects: 10,
    },
  ];

  const courses = [
    { code: 'CS401', name: 'Advanced Algorithms', ects: 6, grade: null },
    { code: 'CS402', name: 'Distributed Systems', ects: 8, grade: null },
    { code: 'CS403', name: 'Machine Learning', ects: 6, grade: null },
    { code: 'CS404', name: 'Database Systems', ects: 6, grade: null },
    { code: 'CS405', name: 'Software Architecture', ects: 4, grade: null },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">My Mobility Record</h1>
        <p className="text-slate-600">Complete overview of your current and past mobility experiences</p>
      </div>

      {/* Current Mobility */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-slate-900">Current Mobility</h2>
              <StatusChip status={currentMobility.status} />
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Certificate
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">Host Institution</p>
                <p className="text-slate-900">{currentMobility.destination}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">Location</p>
                <p className="text-slate-900">{currentMobility.city}, {currentMobility.country}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">Faculty/Department</p>
                <p className="text-slate-900">{currentMobility.faculty}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">Duration</p>
                <p className="text-slate-900">{currentMobility.startDate} - {currentMobility.endDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">Program Type</p>
                <p className="text-slate-900">{currentMobility.program}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">ECTS Credits</p>
                <p className="text-slate-900">{currentMobility.ects} ECTS</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Course Registration */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-slate-900">Registered Courses</h3>
          <div className="text-sm text-slate-600">
            Total: <span className="text-slate-900">{courses.reduce((sum, c) => sum + c.ects, 0)} ECTS</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm text-slate-600">Course Code</th>
                <th className="text-left py-3 px-4 text-sm text-slate-600">Course Name</th>
                <th className="text-center py-3 px-4 text-sm text-slate-600">ECTS</th>
                <th className="text-center py-3 px-4 text-sm text-slate-600">Grade</th>
                <th className="text-center py-3 px-4 text-sm text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 px-4 text-sm text-slate-900">{course.code}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{course.name}</td>
                  <td className="py-3 px-4 text-sm text-center text-slate-900">{course.ects}</td>
                  <td className="py-3 px-4 text-sm text-center text-slate-600">
                    {course.grade || 'In Progress'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusChip status="active" size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Previous Mobilities */}
      <div>
        <h3 className="text-xl text-slate-900 mb-4">Previous Mobility Experiences</h3>
        <div className="space-y-4">
          {previousMobilities.map((mobility) => (
            <Card key={mobility.id} hoverable>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-slate-900">{mobility.destination}</h4>
                      <StatusChip status={mobility.status} size="sm" />
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{mobility.city}, {mobility.country}</p>
                    <p className="text-sm text-slate-500">{mobility.startDate} - {mobility.endDate} • {mobility.program}</p>
                    <p className="text-sm text-slate-500 mt-2">Credits earned: {mobility.ects} ECTS</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-3xl text-blue-600 mb-2">2</div>
          <div className="text-sm text-slate-700">Total Mobilities</div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100">
          <div className="text-3xl text-green-600 mb-2">40</div>
          <div className="text-sm text-slate-700">Total ECTS Credits</div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="text-3xl text-purple-600 mb-2">2</div>
          <div className="text-sm text-slate-700">Countries Visited</div>
        </Card>
      </div>
    </div>
  );
}
