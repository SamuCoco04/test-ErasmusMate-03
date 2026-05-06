import { ButtonLink } from '@/src/components/Button';
import { DashboardCard } from '@/src/components/DashboardCard';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';
import { getDemoContextFromRequest, resolveRoleLabel } from '@/src/modules/shared/demo-context';

export default async function SocialStudentDashboardPage() {
  const demoContext = await getDemoContextFromRequest();

  return <PageShell>
    <PageHeader
      sectionLabel='Social support'
      title='Erasmus student support space'
      subtitle={`Demo user: ${demoContext.userId} (${resolveRoleLabel(demoContext.role)}). Use this area to discover peers, exchange practical tips, and communicate safely with accepted connections.`}
    />

    <div className='grid gap-4 md:grid-cols-2'>
      <DashboardCard title='Complete your social profile' description='Share your Erasmus context, study area, and privacy preferences.' status='Recommended first step' action={<ButtonLink href='/social/student/profile' variant='secondary'>Open profile</ButtonLink>} />
      <DashboardCard title='Discover students' description='Find students by city and study area, respecting visibility preferences.' status='Available now' action={<ButtonLink href='/social/student/discovery' variant='secondary'>Open discovery</ButtonLink>} />
      <DashboardCard title='Manage connections' description='Accept, reject, block, and unblock requests with clear safety controls.' status='Available now' action={<ButtonLink href='/social/student/connections' variant='secondary'>Open connections</ButtonLink>} />
      <DashboardCard title='Read and send messages' description='Messaging is enabled only after connection acceptance.' status='Accepted connections only' action={<ButtonLink href='/social/student/messages' variant='secondary'>Open messages</ButtonLink>} />
      <DashboardCard title='Browse recommendations' description='Get practical city tips from students and publish your own advice.' status='Available now' action={<ButtonLink href='/social/student/recommendations' variant='secondary'>Open recommendations</ButtonLink>} />
      <DashboardCard title='Explore map recommendations' description='View place-based recommendations on the city map with safe visibility rules.' status='Available now' action={<ButtonLink href='/social/student/map' variant='secondary'>Open map</ButtonLink>} />
    </div>

    <ButtonLink href='/student/dashboard' variant='secondary'>Back to official mobility area</ButtonLink>
  </PageShell>;
}
