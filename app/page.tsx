import { ButtonLink } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { PageHeader } from '@/src/components/PageHeader';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl space-y-8 px-6 py-16">
      <PageHeader
        sectionLabel="Phase 2B shell foundation"
        title="ErasmusMate"
        subtitle="Choose a dashboard area. Workflow implementation, demo identity, and map features are coming in next phases."
      />

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Institutional core</h2>
          <p className="text-sm text-muted">Official mobility dashboards are ready as placeholders.</p>
          <div className="grid gap-2">
            <ButtonLink href="/student/dashboard" variant="secondary">Student dashboard</ButtonLink>
            <ButtonLink href="/coordinator/dashboard" variant="secondary">Coordinator dashboard</ButtonLink>
            <ButtonLink href="/admin/dashboard" variant="secondary">Admin dashboard</ButtonLink>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Social support</h2>
          <p className="text-sm text-muted">Student social support remains separate and secondary.</p>
          <ButtonLink href="/social/student/dashboard" variant="secondary">Social student dashboard</ButtonLink>
        </Card>
      </section>
    </main>
  );
}
