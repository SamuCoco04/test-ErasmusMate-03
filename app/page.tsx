import { ButtonLink } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { PageHeader } from '@/src/components/PageHeader';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl space-y-8 px-6 py-16">
      <PageHeader
        sectionLabel="Global launcher"
        title="ErasmusMate"
        subtitle="Choose the area you want to open for this demo session."
      />

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Student institutional area</h2>
          <p className="text-sm text-muted">Official mobility procedures, documents, deadlines, and Learning Agreement.</p>
          <ButtonLink href="/student/dashboard" variant="secondary">Open student institutional area</ButtonLink>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Student social support</h2>
          <p className="text-sm text-muted">Erasmus discovery, connections, messages, and city recommendations.</p>
          <ButtonLink href="/social/student/dashboard" variant="secondary">Open student social support</ButtonLink>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Coordinator workspace</h2>
          <p className="text-sm text-muted">Review assigned student requests and academic workflows.</p>
          <ButtonLink href="/coordinator/dashboard" variant="secondary">Open coordinator workspace</ButtonLink>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Admin console</h2>
          <p className="text-sm text-muted">Configure institutional processes and moderate social content.</p>
          <ButtonLink href="/admin/dashboard" variant="secondary">Open admin console</ButtonLink>
        </Card>
      </section>
    </main>
  );
}
