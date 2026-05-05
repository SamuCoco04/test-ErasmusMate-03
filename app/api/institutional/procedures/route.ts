import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  const ctx = await getDemoContextFromRequest();
  if (ctx.role !== 'STUDENT' && ctx.role !== 'COORDINATOR' && ctx.role !== 'ADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  const data = await prisma.procedureDefinition.findMany({ orderBy: { sortOrder: 'asc' } });
  return Response.json({ data });
}

export async function POST(req: Request) {
  const ctx = await getDemoContextFromRequest();
  if (ctx.role !== 'COORDINATOR' && ctx.role !== 'ADMIN') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) return Response.json({ error: 'Title is required' }, { status: 400 });

  const count = await prisma.procedureDefinition.count({ where: { institutionId: 'inst-home-1' } });
  const data = await prisma.procedureDefinition.create({
    data: {
      id: `proc-${crypto.randomUUID()}`,
      institutionId: 'inst-home-1',
      title,
      description: typeof body.description === 'string' ? body.description : '',
      isRequired: body.isRequired !== false,
      sortOrder: count + 1,
    },
  });

  return Response.json({ data }, { status: 201 });
}
