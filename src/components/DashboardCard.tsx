import type { ReactNode } from 'react';
import { StatusBadge } from '@/src/components/ui/badge';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';

export function DashboardCard({ title, description, status, action }: { title: string; description: string; status: string; action?: ReactNode }) {
  return (
    <Card className='space-y-4'>
      <CardHeader>
        <CardTitle className='text-lg'>{title}</CardTitle>
        <StatusBadge tone='pending'>{status}</StatusBadge>
      </CardHeader>
      <CardBody>
        <CardDescription>{description}</CardDescription>
      </CardBody>
      {action ? <div className='pt-2'>{action}</div> : null}
    </Card>
  );
}
