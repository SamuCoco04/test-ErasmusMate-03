import { Bell, User, LogOut, Settings } from 'lucide-react';
import { Card } from './Card';

interface TopNavigationProps {
  userRole: 'student' | 'coordinator' | 'admin';
  userName: string;
  notificationCount?: number;
  activeSection: 'institutional' | 'social';
  onSectionChange?: (section: 'institutional' | 'social') => void;
  onNavigate?: (destination: string) => void;
}

export function TopNavigation({
  userRole,
  userName,
  notificationCount = 0,
  activeSection,
  onSectionChange,
  onNavigate
}: TopNavigationProps) {
  const showSocialToggle = userRole === 'student';

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[--institutional-primary] rounded-lg flex items-center justify-center text-white">
                EM
              </div>
              <span className="font-semibold text-lg text-slate-900">ErasmusMate</span>
            </div>

            {/* Section Toggle for Students */}
            {showSocialToggle && (
              <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => onSectionChange?.('institutional')}
                  className={`px-4 py-1.5 rounded-md transition-all ${
                    activeSection === 'institutional'
                      ? 'bg-white shadow-sm text-[--institutional-primary]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  My Mobility
                </button>
                <button
                  onClick={() => onSectionChange?.('social')}
                  className={`px-4 py-1.5 rounded-md transition-all ${
                    activeSection === 'social'
                      ? 'bg-white shadow-sm text-[--social-primary]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Community
                </button>
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate?.('notifications')}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-sm text-slate-900">{userName}</div>
                <div className="text-xs text-slate-500 capitalize">{userRole}</div>
              </div>
              <button className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Section Toggle */}
        {showSocialToggle && (
          <div className="md:hidden pb-3">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => onSectionChange?.('institutional')}
                className={`flex-1 px-4 py-2 rounded-md transition-all ${
                  activeSection === 'institutional'
                    ? 'bg-white shadow-sm text-[--institutional-primary]'
                    : 'text-slate-600'
                }`}
              >
                My Mobility
              </button>
              <button
                onClick={() => onSectionChange?.('social')}
                className={`flex-1 px-4 py-2 rounded-md transition-all ${
                  activeSection === 'social'
                    ? 'bg-white shadow-sm text-[--social-primary]'
                    : 'text-slate-600'
                }`}
              >
                Community
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
