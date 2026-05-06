import { Card, CardBody, CardTitle, CardDescription } from '@/src/components/ui/card';

function BaseState({ title, description }: { title: string; description: string }) {
  return (
    <Card className='border-dashed'>
      <CardBody>
        <CardTitle className='text-base'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardBody>
    </Card>
  );
}

export const EmptyState = ({ description }: { description: string }) => <BaseState title='Nothing here yet' description={description} />;
export const LoadingState = ({ description }: { description: string }) => <BaseState title='Loading' description={description} />;
export const ErrorState = ({ description }: { description: string }) => <BaseState title='Something needs attention' description={description} />;

export function InlineAlert({ title, description }: { title: string; description: string }) {
  return <div className='rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900'><p className='font-semibold'>{title}</p><p className='mt-1'>{description}</p></div>;
}
