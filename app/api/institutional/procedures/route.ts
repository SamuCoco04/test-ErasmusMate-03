import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { prisma } from '@/src/lib/prisma';

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/png', 'image/jpeg'] as const;
const MIN_MAX_SIZE_BYTES = 1;
const MAX_MAX_SIZE_BYTES = 25 * 1024 * 1024;

function parseMimeTypes(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const parsed = value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean);
  return parsed.length ? parsed : null;
}

function parseSortOrder(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value);
    if (Number.isFinite(n)) return Math.trunc(n);
  }
  return null;
}

export async function GET(req: Request) {
  const ctx = await getDemoContextFromRequest(req);
  if (!['STUDENT', 'COORDINATOR', 'ADMIN'].includes(ctx.role)) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const data = await prisma.procedureDefinition.findMany({
    where: ctx.role === 'ADMIN' ? undefined : { isActive: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
  return Response.json({ data });
}

export async function POST(req: Request) {
  const ctx = await getDemoContextFromRequest(req);
  if (ctx.role !== 'ADMIN') return Response.json({ error: 'Forbidden' }, { status: 403 });
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) return Response.json({ error: 'Title is required' }, { status: 400 });

  const sortOrder = parseSortOrder(body.sortOrder);
  if (sortOrder === null) return Response.json({ error: 'Sort order must be a valid number' }, { status: 400 });

  const maxSizeBytes = parseSortOrder(body.maxSizeBytes);
  if (maxSizeBytes === null || maxSizeBytes < MIN_MAX_SIZE_BYTES || maxSizeBytes > MAX_MAX_SIZE_BYTES) {
    return Response.json({ error: `Max file size must be between ${MIN_MAX_SIZE_BYTES} and ${MAX_MAX_SIZE_BYTES} bytes` }, { status: 400 });
  }

  const acceptedMimeTypes = parseMimeTypes(body.acceptedMimeTypes);
  if (!acceptedMimeTypes || acceptedMimeTypes.some((mime) => !ALLOWED_MIME_TYPES.includes(mime as (typeof ALLOWED_MIME_TYPES)[number]))) {
    return Response.json({ error: 'Accepted MIME types must be from the allowed list' }, { status: 400 });
  }

  if (typeof body.isActive !== 'boolean') return Response.json({ error: 'Active state must be explicit' }, { status: 400 });

  const data = await prisma.procedureDefinition.create({ data: {
    id: `proc-${crypto.randomUUID()}`,
    institutionId: 'inst-home-1',
    title,
    description: typeof body.description === 'string' ? body.description.trim() : '',
    isRequired: body.isRequired === true,
    sortOrder,
    acceptedMimeTypesJson: JSON.stringify(acceptedMimeTypes),
    maxSizeBytes,
    isActive: body.isActive,
    createdById: ctx.userId,
  }});

  return Response.json({ data }, { status: 201 });
}

export async function PATCH(req: Request) {
  const ctx = await getDemoContextFromRequest(req);
  if (ctx.role !== 'ADMIN') return Response.json({ error: 'Forbidden' }, { status: 403 });
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const id = typeof body.id === 'string' ? body.id : '';
  if (!id) return Response.json({ error: 'Procedure id is required' }, { status: 400 });

  const existing = await prisma.procedureDefinition.findUnique({ where: { id } });
  if (!existing) return Response.json({ error: 'Procedure not found' }, { status: 404 });

  const patch: Record<string, unknown> = {};
  if ('title' in body) {
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title) return Response.json({ error: 'Title is required' }, { status: 400 });
    patch.title = title;
  }
  if ('description' in body) patch.description = typeof body.description === 'string' ? body.description.trim() : '';
  if ('isRequired' in body) patch.isRequired = body.isRequired === true;
  if ('isActive' in body) {
    if (typeof body.isActive !== 'boolean') return Response.json({ error: 'Active state must be explicit' }, { status: 400 });
    patch.isActive = body.isActive;
  }
  if ('sortOrder' in body) {
    const sortOrder = parseSortOrder(body.sortOrder);
    if (sortOrder === null) return Response.json({ error: 'Sort order must be a valid number' }, { status: 400 });
    patch.sortOrder = sortOrder;
  }
  if ('maxSizeBytes' in body) {
    const maxSizeBytes = parseSortOrder(body.maxSizeBytes);
    if (maxSizeBytes === null || maxSizeBytes < MIN_MAX_SIZE_BYTES || maxSizeBytes > MAX_MAX_SIZE_BYTES) return Response.json({ error: `Max file size must be between ${MIN_MAX_SIZE_BYTES} and ${MAX_MAX_SIZE_BYTES} bytes` }, { status: 400 });
    patch.maxSizeBytes = maxSizeBytes;
  }
  if ('acceptedMimeTypes' in body) {
    const acceptedMimeTypes = parseMimeTypes(body.acceptedMimeTypes);
    if (!acceptedMimeTypes || acceptedMimeTypes.some((mime) => !ALLOWED_MIME_TYPES.includes(mime as (typeof ALLOWED_MIME_TYPES)[number]))) {
      return Response.json({ error: 'Accepted MIME types must be from the allowed list' }, { status: 400 });
    }
    patch.acceptedMimeTypesJson = JSON.stringify(acceptedMimeTypes);
  }

  const data = await prisma.procedureDefinition.update({ where: { id }, data: patch });
  return Response.json({ data });
}
