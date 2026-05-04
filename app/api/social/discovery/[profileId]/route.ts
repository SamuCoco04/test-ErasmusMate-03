import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getDiscoveryProfileDetail } from '@/src/modules/social/discovery';
import { SocialForbiddenError, SocialNotFoundError } from '@/src/modules/social/social-errors';

export async function GET(_: Request, { params }: { params: Promise<{ profileId: string }> }) {
  try { const actor = await getDemoContextFromRequest(); const { profileId } = await params; return NextResponse.json(await getDiscoveryProfileDetail(prisma, actor, profileId)); }
  catch (error) { if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 }); if (error instanceof SocialNotFoundError) return NextResponse.json({ error: 'Not found' }, { status: 404 }); return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}
