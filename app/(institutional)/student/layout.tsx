import { SidebarNav } from '@/src/components/ShellNav';
import { TopBar } from '@/src/components/TopBar';

export default function StudentInstitutionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-canvas px-4 py-6 md:px-8">
      <TopBar areaName="Institutional area · Student" />
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
          <SidebarNav
            items={[
              { label: 'Student dashboard', href: '/student/dashboard', active: true },
              { label: 'Submissions', href: '/student/submissions' },
              { label: 'Learning Agreement', href: '/student/learning-agreement' },
              { label: 'Academic summary', href: '/student/academic-summary' },
              { label: 'Deadlines', href: '/student/deadlines' },
              { label: 'Exceptions', href: '/student/exceptions' },
              { label: 'Notifications', href: '/student/notifications' }
            ]}
          />
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
