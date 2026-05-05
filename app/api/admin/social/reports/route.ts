import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listSocialReports } from '@/src/modules/social/moderation';
import { SocialForbiddenError } from '@/src/modules/social/social-errors';

export async function GET() {
  try {
    const actor = await getDemoContextFromRequest();
    return NextResponse.json(await listSocialReports(prisma, actor));
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
