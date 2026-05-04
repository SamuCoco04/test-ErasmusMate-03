export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <section className="mb-10">
        <p className="badge mb-4">Phase 2A foundation</p>
        <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">ErasmusMate</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          A full-stack MVP foundation for Erasmus mobility management. This first app shell introduces
          the visual baseline and structure while workflow features are still in development.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card">
          <h2 className="text-2xl font-semibold text-ink">Institutional core</h2>
          <p className="mt-3 text-muted">
            Official mobility procedures, learning agreement handling, review flows, and audit-ready
            records will be implemented in upcoming phases.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-700">
            <li>• Procedure submissions and coordinator review</li>
            <li>• Deadlines and exception requests</li>
            <li>• Learning Agreement and academic summary</li>
          </ul>
        </article>

        <article className="card">
          <h2 className="text-2xl font-semibold text-ink">Social support layer</h2>
          <p className="mt-3 text-muted">
            Student discovery and community support features are planned as a separate layer, without
            mixing them into official institutional processing.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-700">
            <li>• Connections and accepted-only messaging</li>
            <li>• Tips, reviews, and favorites</li>
            <li>• Map-based discovery and moderation controls</li>
          </ul>
        </article>
      </section>

      <div className="mt-10">
        <span className="status">In progress</span>
        <p className="mt-3 text-sm text-muted">
          This page is intentionally honest: workflows, identity, and persistence are not implemented in
          this phase.
        </p>
      </div>
    </main>
  );
}
