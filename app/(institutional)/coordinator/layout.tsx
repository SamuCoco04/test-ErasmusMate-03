import { SidebarNav } from '@/src/components/ShellNav';
import { TopBar } from '@/src/components/TopBar';

export default function CoordinatorInstitutionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-canvas px-4 py-6 md:px-8">
      <TopBar areaName="Official mobility area · Coordinator" notificationsHref="/coordinator/notifications" profileHref="/coordinator/dashboard" />
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
          <SidebarNav
            items={[
              { label: 'Coordinator dashboard', href: '/coordinator/dashboard', active: true },
              { label: 'Review queue', href: '/coordinator/review-queue' },
              { label: 'Procedures', href: '/coordinator/procedures' },
              { label: 'Document requirements', href: '/coordinator/document-requirements' },
              { label: 'Learning Agreement review', href: '/coordinator/learning-agreement-review' },
              { label: 'Deadlines', href: '/coordinator/deadlines' },
              { label: 'Exceptions', href: '/coordinator/exceptions' },
              { label: 'Notifications', href: '/coordinator/notifications' }
            ]}
          />
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
