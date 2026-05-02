import { useState } from 'react';
import { TopNavigation } from './components/navigation/TopNavigation';
import { SideNavigation } from './components/navigation/SideNavigation';

// Student Components
import { StudentDashboard } from './components/student/StudentDashboard';
import { DocumentSubmission } from './components/student/DocumentSubmission';
import { SubmissionDetail } from './components/student/SubmissionDetail';
import { MobilityRecord } from './components/student/MobilityRecord';
import { OfficialProcedures } from './components/student/OfficialProcedures';
import { Signatures } from './components/student/Signatures';
import { DeadlineCalendar } from './components/student/DeadlineCalendar';
import { ExceptionRequests } from './components/student/ExceptionRequests';
import { Settings } from './components/student/Settings';

// Coordinator Components
import { CoordinatorDashboard } from './components/coordinator/CoordinatorDashboard';
import { SubmissionReview } from './components/coordinator/SubmissionReview';
import { SignatureRequests } from './components/coordinator/SignatureRequests';
import { ExceptionDecisions } from './components/coordinator/ExceptionDecisions';
import { StudentMobilities } from './components/coordinator/StudentMobilities';
import { ProcedureManagement } from './components/coordinator/ProcedureManagement';
import { DeadlineManagement } from './components/coordinator/DeadlineManagement';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ModerationQueue } from './components/admin/ModerationQueue';
import { UserManagement } from './components/admin/UserManagement';
import { FeatureScoping } from './components/admin/FeatureScoping';
import { Reports } from './components/admin/Reports';
import { AuditTraceability } from './components/admin/AuditTraceability';

// Social Components
import { SocialDiscovery } from './components/social/SocialDiscovery';
import { ConnectionsList } from './components/social/ConnectionsList';
import { MessagingInterface } from './components/social/MessagingInterface';
import { MapDiscovery } from './components/social/MapDiscovery';
import { Recommendations } from './components/social/Recommendations';
import { SocialProfile } from './components/social/SocialProfile';
import { Events } from './components/social/Events';

// Shared Components
import { Notifications } from './components/shared/Notifications';
import { Help } from './components/shared/Help';

// Design System
import { Card } from './components/design-system/Card';
import { Button } from './components/design-system/Button';

type UserRole = 'student' | 'coordinator' | 'admin';
type Section = 'institutional' | 'social';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeSection, setActiveSection] = useState<Section>('institutional');
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const handleNavigate = (destination: string) => {
    setActiveScreen(destination);
  };

  const renderContent = () => {
    // Shared Screens (accessible from all roles)
    if (activeScreen === 'notifications') {
      return <Notifications userRole={currentRole} />;
    }
    if (activeScreen === 'help') {
      return <Help />;
    }

    // Student Institutional Screens
    if (currentRole === 'student' && activeSection === 'institutional') {
      switch (activeScreen) {
        case 'dashboard':
          return <StudentDashboard onNavigate={handleNavigate} />;
        case 'mobility':
          return <MobilityRecord onNavigate={handleNavigate} />;
        case 'procedures':
          return <OfficialProcedures onNavigate={handleNavigate} />;
        case 'submissions':
          return <DocumentSubmission />;
        case 'submission-detail':
          return <SubmissionDetail onNavigate={handleNavigate} />;
        case 'signatures':
          return <Signatures onNavigate={handleNavigate} />;
        case 'deadlines':
          return <DeadlineCalendar onNavigate={handleNavigate} />;
        case 'exceptions':
          return <ExceptionRequests onNavigate={handleNavigate} />;
        case 'settings':
          return <Settings />;
        default:
          return <StudentDashboard onNavigate={handleNavigate} />;
      }
    }

    // Student Social Screens
    if (currentRole === 'student' && activeSection === 'social') {
      switch (activeScreen) {
        case 'social-home':
        case 'dashboard':
          return <SocialDiscovery onNavigate={handleNavigate} />;
        case 'connections':
          return <ConnectionsList onNavigate={handleNavigate} />;
        case 'messages':
          return <MessagingInterface />;
        case 'recommendations':
          return <Recommendations onNavigate={handleNavigate} />;
        case 'map':
          return <MapDiscovery />;
        case 'events':
          return <Events onNavigate={handleNavigate} />;
        case 'social-profile':
          return <SocialProfile onNavigate={handleNavigate} />;
        default:
          return <SocialDiscovery onNavigate={handleNavigate} />;
      }
    }

    // Coordinator Screens
    if (currentRole === 'coordinator') {
      switch (activeScreen) {
        case 'coordinator-dashboard':
        case 'dashboard':
          return <CoordinatorDashboard onNavigate={handleNavigate} />;
        case 'review-queue':
          return <SubmissionReview />;
        case 'signatures':
          return <SignatureRequests />;
        case 'exceptions':
          return <ExceptionDecisions />;
        case 'mobilities':
          return <StudentMobilities />;
        case 'procedures':
          return <ProcedureManagement />;
        case 'deadlines':
          return <DeadlineManagement />;
        default:
          return <CoordinatorDashboard onNavigate={handleNavigate} />;
      }
    }

    // Admin Screens
    if (currentRole === 'admin') {
      switch (activeScreen) {
        case 'admin-dashboard':
        case 'dashboard':
          return <AdminDashboard onNavigate={handleNavigate} />;
        case 'users':
          return <UserManagement />;
        case 'features':
          return <FeatureScoping />;
        case 'moderation':
          return <ModerationQueue />;
        case 'reports':
          return <Reports />;
        case 'audit':
          return <AuditTraceability />;
        default:
          return <AdminDashboard onNavigate={handleNavigate} />;
      }
    }

    return <StudentDashboard onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Role Switcher - Demo purposes */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="shadow-xl">
          <div className="text-xs text-slate-600 mb-2">Demo: Switch Role</div>
          <div className="flex gap-2">
            <Button
              variant={currentRole === 'student' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => {
                setCurrentRole('student');
                setActiveSection('institutional');
                setActiveScreen('dashboard');
              }}
            >
              Student
            </Button>
            <Button
              variant={currentRole === 'coordinator' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => {
                setCurrentRole('coordinator');
                setActiveSection('institutional');
                setActiveScreen('dashboard');
              }}
            >
              Coordinator
            </Button>
            <Button
              variant={currentRole === 'admin' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => {
                setCurrentRole('admin');
                setActiveSection('institutional');
                setActiveScreen('dashboard');
              }}
            >
              Admin
            </Button>
          </div>
        </Card>
      </div>

      {/* Top Navigation */}
      <TopNavigation
        userRole={currentRole}
        userName={
          currentRole === 'student' ? 'Maria Rodriguez' :
          currentRole === 'coordinator' ? 'Dr. Anna Jensen' :
          'System Administrator'
        }
        notificationCount={5}
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section);
          setActiveScreen('dashboard');
        }}
        onNavigate={handleNavigate}
      />

      <div className="flex">
        {/* Side Navigation */}
        <SideNavigation
          activeSection={activeSection}
          userRole={currentRole}
          activeItem={activeScreen}
          onItemClick={handleNavigate}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}