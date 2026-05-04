import { Card } from '@/src/components/Card';

function StateCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-dashed">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </Card>
  );
}

export const EmptyState = ({ description }: { description: string }) => (
  <StateCard title="Nothing here yet" description={description} />
);

export const LoadingState = ({ description }: { description: string }) => (
  <StateCard title="Loading" description={description} />
);

export const ErrorState = ({ description }: { description: string }) => (
  <StateCard title="Something needs attention" description={description} />
);

export const SuccessState = ({ description }: { description: string }) => (
  <StateCard title="Saved" description={description} />
);
