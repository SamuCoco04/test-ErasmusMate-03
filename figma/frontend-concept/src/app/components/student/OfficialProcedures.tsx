import { Card } from '../design-system/Card';
import { StatusChip } from '../design-system/StatusChip';
import { Button } from '../design-system/Button';
import { FileText, Search, Filter, ChevronRight, Clock, AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { useState } from 'react';

interface OfficialProceduresProps {
  onNavigate?: (destination: string) => void;
}

export function OfficialProcedures({ onNavigate }: OfficialProceduresProps) {
  const [filter, setFilter] = useState<'all' | 'required' | 'optional'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const procedures = [
    {
      id: 1,
      title: 'Learning Agreement - Before Mobility',
      category: 'Academic',
      description: 'Official agreement detailing courses to be taken at the host institution',
      required: true,
      deadline: 'Before departure',
      status: 'approved' as const,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Learning Agreement - During Mobility',
      category: 'Academic',
      description: 'Modifications to the original learning agreement if needed',
      required: true,
      deadline: 'Within first month',
      status: 'pending' as const,
      priority: 'high',
    },
    {
      id: 3,
      title: 'Grant Agreement',
      category: 'Financial',
      description: 'Financial agreement for Erasmus+ grant funding',
      required: true,
      deadline: 'Before departure',
      status: 'approved' as const,
      priority: 'high',
    },
    {
      id: 4,
      title: 'Certificate of Arrival',
      category: 'Administrative',
      description: 'Proof of arrival at the host institution',
      required: true,
      deadline: 'Within first week',
      status: 'review' as const,
      priority: 'high',
    },
    {
      id: 5,
      title: 'Mid-term Evaluation',
      category: 'Academic',
      description: 'Evaluation of progress halfway through the mobility period',
      required: true,
      deadline: 'March 2026',
      status: 'not_started' as const,
      priority: 'medium',
    },
    {
      id: 6,
      title: 'Transcript of Records',
      category: 'Academic',
      description: 'Official grades obtained at the host institution',
      required: true,
      deadline: 'End of mobility',
      status: 'not_started' as const,
      priority: 'low',
    },
    {
      id: 7,
      title: 'Certificate of Stay',
      category: 'Administrative',
      description: 'Official confirmation of the mobility period duration',
      required: true,
      deadline: 'End of mobility',
      status: 'not_started' as const,
      priority: 'low',
    },
    {
      id: 8,
      title: 'Final Report',
      category: 'Administrative',
      description: 'Comprehensive report about the mobility experience',
      required: true,
      deadline: 'After return',
      status: 'not_started' as const,
      priority: 'low',
    },
    {
      id: 9,
      title: 'Language Assessment',
      category: 'Academic',
      description: 'Online language proficiency test (OLS)',
      required: false,
      deadline: 'Before and after mobility',
      status: 'not_started' as const,
      priority: 'low',
    },
  ];

  const filteredProcedures = procedures.filter(proc => {
    const matchesFilter = filter === 'all' || (filter === 'required' ? proc.required : !proc.required);
    const matchesSearch = proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'review':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Official Procedures</h1>
        <p className="text-slate-600">Complete list of required and optional procedures for your mobility</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl text-slate-900 mb-1">{procedures.length}</div>
          <div className="text-sm text-slate-600">Total Procedures</div>
        </Card>
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-2xl text-green-700 mb-1">
            {procedures.filter(p => p.status === 'approved').length}
          </div>
          <div className="text-sm text-slate-700">Completed</div>
        </Card>
        <Card className="text-center bg-yellow-50 border-yellow-200">
          <div className="text-2xl text-yellow-700 mb-1">
            {procedures.filter(p => p.status === 'pending' || p.status === 'review').length}
          </div>
          <div className="text-sm text-slate-700">In Progress</div>
        </Card>
        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-2xl text-blue-700 mb-1">
            {procedures.filter(p => p.status === 'not_started').length}
          </div>
          <div className="text-sm text-slate-700">Pending</div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'required' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('required')}
            >
              Required
            </Button>
            <Button
              variant={filter === 'optional' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('optional')}
            >
              Optional
            </Button>
          </div>
        </div>
      </Card>

      {/* Procedures List */}
      <div className="space-y-3">
        {filteredProcedures.map((procedure) => (
          <Card key={procedure.id} hoverable className="transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {getStatusIcon(procedure.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-slate-900">{procedure.title}</h3>
                      {procedure.required && (
                        <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">Required</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{procedure.description}</p>
                  </div>
                  <StatusChip status={procedure.status} />
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {procedure.category}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Deadline: {procedure.deadline}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate?.('submissions')}
              >
                {procedure.status === 'approved' ? 'View' : 'Start'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
