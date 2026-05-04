import { getDemoContextFromRequest, resolveRoleLabel } from '@/src/modules/shared/demo-context';
import { ButtonLink } from '@/src/components/Button';
import { DashboardCard } from '@/src/components/DashboardCard';
import { PageHeader } from '@/src/components/PageHeader';

export default async function SocialStudentDashboardPage() {
  const demoContext = await getDemoContextFromRequest();
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Social support' title='Student community area' subtitle={`Demo user: ${demoContext.userId} (${resolveRoleLabel(demoContext.role)}). This area supports student social orientation only.`} />
    <div className='grid gap-4 md:grid-cols-2'>
      <DashboardCard title='My social profile' description='Manage what other Erasmus students can see in social discovery.' status='Available now' action={<ButtonLink href='/social/student/profile' variant='secondary'>Open profile</ButtonLink>} />
      <DashboardCard title='Discover students' description='Find visible student profiles with simple city/study filters.' status='Available now' action={<ButtonLink href='/social/student/discovery' variant='secondary'>Open discovery</ButtonLink>} />
          <DashboardCard title='My connections' description='Review requests you sent and received.' status='Available now' action={<ButtonLink href='/social/student/connections' variant='secondary'>Open connections</ButtonLink>} />
    </div>
    <ButtonLink href='/student/dashboard' variant='secondary'>Back to official mobility area</ButtonLink>
  </div>;
}
