export { EmptyState, LoadingState, ErrorState } from '@/src/components/ui/state';

export const SuccessState = ({ description }: { description: string }) => (
  <div className='rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900'>
    <p className='font-semibold'>Saved</p>
    <p className='mt-2'>{description}</p>
  </div>
);
