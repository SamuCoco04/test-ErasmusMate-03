import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getMyConnections, requestConnection } from '@/src/modules/social/connections';
import { SocialDuplicateError, SocialForbiddenError, SocialValidationError } from '@/src/modules/social/social-errors';

export async function GET() {
  try { const actor = await getDemoContextFromRequest(); return NextResponse.json(await getMyConnections(prisma, actor)); }
  catch (error) { if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 }); return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const actor = await getDemoContextFromRequest();
    const body = await request.json().catch(()=>({}));
    return NextResponse.json(await requestConnection(prisma, actor, String(body.targetProfileId ?? '')),{status:201});
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof SocialDuplicateError) return NextResponse.json({ error: error.message }, { status: 409 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
