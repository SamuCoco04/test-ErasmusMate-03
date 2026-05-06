import { SidebarNav } from '@/src/components/ShellNav';
import { TopBar } from '@/src/components/TopBar';

export default function AdminInstitutionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-canvas px-4 py-6 md:px-8">
      <TopBar areaName="Official mobility area · Admin" notificationsHref="/admin/notifications" profileHref="/admin/dashboard" />
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
          <SidebarNav
            items={[
              { label: 'Admin dashboard', href: '/admin/dashboard', active: true },
              { label: 'Procedures', href: '/admin/procedures' },
              { label: 'Document requirements', href: '/admin/document-requirements' },
              { label: 'Moderation overview', href: '/admin/social-moderation' },
              { label: 'Platform status', href: '/admin/dashboard' },
              { label: 'Notifications', href: '/admin/notifications' }
            ]}
          />
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
