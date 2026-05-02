import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Shield, Globe, Users, Settings, AlertCircle, CheckCircle, Save } from 'lucide-react';
import { useState } from 'react';

export function FeatureScoping() {
  const [features, setFeatures] = useState({
    institutional: {
      documentSubmission: true,
      signatures: true,
      procedures: true,
      deadlines: true,
      exceptions: true,
      mobilityRecords: true,
    },
    social: {
      discovery: true,
      connections: true,
      messaging: true,
      recommendations: true,
      mapExplorer: true,
      events: true,
    },
    coordinator: {
      reviewQueue: true,
      signatureApproval: true,
      exceptionDecisions: true,
      studentMobilities: true,
      procedureManagement: true,
      deadlineManagement: true,
      bulkOperations: false,
    },
    admin: {
      userManagement: true,
      featureScoping: true,
      moderation: true,
      auditLogs: true,
      analytics: true,
      systemSettings: false,
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  const toggleFeature = (category: keyof typeof features, feature: string) => {
    setFeatures(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [feature]: !prev[category][feature as keyof typeof prev[typeof category]]
      }
    }));
    setHasChanges(true);
  };

  const featureCategories = [
    {
      id: 'institutional' as const,
      title: 'Institutional Features',
      description: 'Core mobility management features for students',
      icon: Shield,
      color: 'blue',
      items: [
        { id: 'documentSubmission', label: 'Document Submission', description: 'Allow students to upload and submit documents' },
        { id: 'signatures', label: 'Digital Signatures', description: 'Electronic signature workflow for agreements' },
        { id: 'procedures', label: 'Official Procedures', description: 'Access to procedure catalog and requirements' },
        { id: 'deadlines', label: 'Deadline Tracking', description: 'View and manage submission deadlines' },
        { id: 'exceptions', label: 'Exception Requests', description: 'Submit requests for special circumstances' },
        { id: 'mobilityRecords', label: 'Mobility Records', description: 'Personal mobility history and certificates' },
      ],
    },
    {
      id: 'social' as const,
      title: 'Social Features',
      description: 'Community and networking features for students',
      icon: Users,
      color: 'purple',
      items: [
        { id: 'discovery', label: 'Student Discovery', description: 'Find and connect with other students' },
        { id: 'connections', label: 'Connections Management', description: 'Manage student connections and network' },
        { id: 'messaging', label: 'Direct Messaging', description: 'Private messaging between students' },
        { id: 'recommendations', label: 'Place Recommendations', description: 'Share and discover local recommendations' },
        { id: 'mapExplorer', label: 'Map Explorer', description: 'Interactive map with student locations' },
        { id: 'events', label: 'Social Events', description: 'Create and join social events' },
      ],
    },
    {
      id: 'coordinator' as const,
      title: 'Coordinator Tools',
      description: 'Features for managing and coordinating mobilities',
      icon: Settings,
      color: 'green',
      items: [
        { id: 'reviewQueue', label: 'Document Review Queue', description: 'Review and approve student submissions' },
        { id: 'signatureApproval', label: 'Signature Approval', description: 'Digital signature and approval workflow' },
        { id: 'exceptionDecisions', label: 'Exception Decisions', description: 'Review and decide on exception requests' },
        { id: 'studentMobilities', label: 'Student Mobility Overview', description: 'Track all student mobilities' },
        { id: 'procedureManagement', label: 'Procedure Management', description: 'Configure mobility procedures' },
        { id: 'deadlineManagement', label: 'Deadline Management', description: 'Set and manage deadlines' },
        { id: 'bulkOperations', label: 'Bulk Operations', description: 'Perform actions on multiple items' },
      ],
    },
    {
      id: 'admin' as const,
      title: 'Admin Features',
      description: 'System administration and governance tools',
      icon: Shield,
      color: 'red',
      items: [
        { id: 'userManagement', label: 'User Management', description: 'Create and manage user accounts' },
        { id: 'featureScoping', label: 'Feature Scoping', description: 'Enable/disable platform features' },
        { id: 'moderation', label: 'Content Moderation', description: 'Review and moderate user content' },
        { id: 'auditLogs', label: 'Audit & Traceability', description: 'View system audit logs' },
        { id: 'analytics', label: 'Analytics Dashboard', description: 'System usage and performance metrics' },
        { id: 'systemSettings', label: 'System Settings', description: 'Advanced system configuration' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl text-slate-900 mb-2">Feature Scoping</h1>
          <p className="text-slate-600">Control which features are enabled across the platform</p>
        </div>
        {hasChanges && (
          <Button variant="primary" onClick={() => setHasChanges(false)}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        )}
      </div>

      {/* Warning Banner */}
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-slate-900 mb-1">Important: Feature Changes Impact</h3>
            <p className="text-sm text-slate-700">
              Disabling features will immediately affect all users. Make sure to communicate changes to coordinators and students before applying them.
              Some features may have dependencies on other features.
            </p>
          </div>
        </div>
      </Card>

      {/* Feature Categories */}
      <div className="space-y-6">
        {featureCategories.map((category) => {
          const Icon = category.icon;
          const enabledCount = Object.values(features[category.id]).filter(Boolean).length;
          const totalCount = category.items.length;

          return (
            <Card key={category.id}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${category.color}-600`} />
                  </div>
                  <div>
                    <h2 className="text-xl text-slate-900 mb-1">{category.title}</h2>
                    <p className="text-sm text-slate-600">{category.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl ${enabledCount === totalCount ? 'text-green-700' : 'text-slate-900'}`}>
                    {enabledCount}/{totalCount}
                  </div>
                  <div className="text-sm text-slate-600">Enabled</div>
                </div>
              </div>

              <div className="space-y-3">
                {category.items.map((item) => {
                  const isEnabled = features[category.id][item.id as keyof typeof features[typeof category.id]];

                  return (
                    <div
                      key={item.id}
                      className={`flex items-start justify-between p-4 rounded-lg border-2 transition-all ${
                        isEnabled
                          ? 'border-green-200 bg-green-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {isEnabled ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-slate-900 mb-1">{item.label}</h3>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                      <label className="relative inline-block w-14 h-7 flex-shrink-0 ml-4">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={() => toggleFeature(category.id, item.id)}
                          className="sr-only peer"
                        />
                        <span className="absolute inset-0 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors cursor-pointer"></span>
                        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7"></span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg text-slate-900 mb-1">Platform Feature Summary</h3>
            <p className="text-sm text-slate-700">
              {Object.values(features).reduce((sum, category) => sum + Object.values(category).filter(Boolean).length, 0)} of{' '}
              {Object.values(features).reduce((sum, category) => sum + Object.keys(category).length, 0)} features enabled
            </p>
          </div>
          <Globe className="w-12 h-12 text-blue-600" />
        </div>
      </Card>
    </div>
  );
}
