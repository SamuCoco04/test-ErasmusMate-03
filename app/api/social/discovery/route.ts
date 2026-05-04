import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listDiscoveryProfiles } from '@/src/modules/social/discovery';
import { SocialForbiddenError } from '@/src/modules/social/social-errors';

export async function GET(request: Request) {
  try { const actor = await getDemoContextFromRequest(); const url = new URL(request.url); return NextResponse.json({ items: await listDiscoveryProfiles(prisma, actor, url.searchParams) }); }
  catch (error) { if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 }); return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}
