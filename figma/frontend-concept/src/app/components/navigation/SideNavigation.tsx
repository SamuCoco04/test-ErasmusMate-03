import { ReactNode } from 'react';
import {
  Home,
  FileText,
  Upload,
  Calendar,
  AlertCircle,
  CheckCircle,
  Users,
  MessageSquare,
  MapPin,
  Star,
  Settings,
  Shield,
  BarChart3,
  UserCog,
  Flag,
  LucideIcon
} from 'lucide-react';

interface SideNavigationProps {
  activeSection: 'institutional' | 'social';
  userRole: 'student' | 'coordinator' | 'admin';
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

export function SideNavigation({ activeSection, userRole, activeItem, onItemClick }: SideNavigationProps) {
  const institutionalNavStudent: NavSection[] = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'mobility', label: 'My Mobility Record', icon: FileText },
      ]
    },
    {
      title: 'Procedures & Documents',
      items: [
        { id: 'procedures', label: 'Official Procedures', icon: FileText },
        { id: 'submissions', label: 'My Submissions', icon: Upload },
        { id: 'signatures', label: 'Signatures', icon: CheckCircle },
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'deadlines', label: 'Deadlines', icon: Calendar },
        { id: 'exceptions', label: 'Exception Requests', icon: AlertCircle },
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const socialNavStudent: NavSection[] = [
    {
      items: [
        { id: 'social-home', label: 'Discover', icon: Home },
        { id: 'connections', label: 'My Connections', icon: Users },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
      ]
    },
    {
      title: 'Content',
      items: [
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'recommendations', label: 'Recommendations', icon: Star },
        { id: 'map', label: 'Map Explorer', icon: MapPin },
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'social-profile', label: 'My Profile', icon: Settings },
      ]
    }
  ];

  const coordinatorNav: NavSection[] = [
    {
      items: [
        { id: 'coordinator-dashboard', label: 'Dashboard', icon: Home },
      ]
    },
    {
      title: 'Review & Approval',
      items: [
        { id: 'review-queue', label: 'Review Queue', icon: FileText },
        { id: 'signatures', label: 'Signature Requests', icon: CheckCircle },
        { id: 'exceptions', label: 'Exception Decisions', icon: AlertCircle },
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'mobilities', label: 'Student Mobilities', icon: Users },
        { id: 'procedures', label: 'Procedure Management', icon: FileText },
        { id: 'deadlines', label: 'Deadline Management', icon: Calendar },
      ]
    },
  ];

  const adminNav: NavSection[] = [
    {
      items: [
        { id: 'admin-dashboard', label: 'Dashboard', icon: Home },
      ]
    },
    {
      title: 'Governance',
      items: [
        { id: 'users', label: 'User Management', icon: UserCog },
        { id: 'features', label: 'Feature Scoping', icon: Shield },
      ]
    },
    {
      title: 'Moderation',
      items: [
        { id: 'moderation', label: 'Moderation Queue', icon: Flag },
        { id: 'reports', label: 'Reports', icon: AlertCircle },
      ]
    },
    {
      title: 'Operations',
      items: [
        { id: 'audit', label: 'Audit & Traceability', icon: BarChart3 },
      ]
    },
  ];

  const getNavItems = () => {
    if (userRole === 'student') {
      return activeSection === 'institutional' ? institutionalNavStudent : socialNavStudent;
    } else if (userRole === 'coordinator') {
      return coordinatorNav;
    } else {
      return adminNav;
    }
  };

  const navSections = getNavItems();
  const bgColor = activeSection === 'social' && userRole === 'student' ? 'bg-[--social-bg]/30' : 'bg-slate-50';
  const accentColor = activeSection === 'social' && userRole === 'student' ? '[--social-primary]' : '[--institutional-primary]';

  return (
    <aside className={`w-64 border-r border-border ${bgColor} h-screen sticky top-16 overflow-y-auto`}>
      <div className="p-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <h3 className="text-xs uppercase text-slate-500 px-3 mb-2">{section.title}</h3>
            )}
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onItemClick?.(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? `bg-white text-${accentColor} shadow-sm`
                        : 'text-slate-700 hover:bg-white/60'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
