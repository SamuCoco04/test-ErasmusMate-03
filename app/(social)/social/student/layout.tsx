import { SidebarNav } from '@/src/components/ShellNav';
import { TopBar } from '@/src/components/TopBar';

export default function SocialStudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-canvas px-4 py-6 md:px-8">
      <TopBar areaName="Social support · Student" />
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
          <SidebarNav
            items={[
              { label: 'Social dashboard', href: '/social/student/dashboard' },
              { label: 'Discover students', href: '/social/student/discovery' },
              { label: 'Recommendations', href: '/social/student/recommendations' },
              { label: 'Map', href: '/social/student/map' },
              { label: 'Connections', href: '/social/student/connections' },
              { label: 'Messages', href: '/social/student/messages' },
              { label: 'My social profile', href: '/social/student/profile' },
              { label: 'Back to official mobility area', href: '/student/dashboard' }
            ]}
          />
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
