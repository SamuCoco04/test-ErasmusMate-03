import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getOwnSocialProfile, updateOwnSocialProfile } from '@/src/modules/social/profile';
import { SocialForbiddenError } from '@/src/modules/social/social-errors';
import { ZodError } from 'zod';

export async function GET() {
  try { const actor = await getDemoContextFromRequest(); return NextResponse.json(await getOwnSocialProfile(prisma, actor)); }
  catch (error) { if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 }); return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}

export async function PATCH(request: Request) {
  try { const actor = await getDemoContextFromRequest(); const body = await request.json().catch(() => ({})); return NextResponse.json(await updateOwnSocialProfile(prisma, actor, body)); }
  catch (error) { if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 }); if (error instanceof ZodError) return NextResponse.json({ error: 'Validation failed', issues: error.issues }, { status: 400 }); return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}
