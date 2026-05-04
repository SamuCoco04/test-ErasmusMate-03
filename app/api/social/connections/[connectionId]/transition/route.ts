import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { transitionConnection } from '@/src/modules/social/connections';
import { SocialForbiddenError, SocialInvalidTransitionError, SocialNotFoundError, SocialValidationError } from '@/src/modules/social/social-errors';

export async function POST(request: Request, { params }: { params: Promise<{ connectionId: string }> }) {
  try {
    const actor = await getDemoContextFromRequest();
    const body = await request.json().catch(()=>({}));
    const { connectionId } = await params;
    return NextResponse.json(await transitionConnection(prisma, actor, connectionId, String(body.action ?? '')));
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialNotFoundError) return NextResponse.json({ error: error.message }, { status: 404 });
    if (error instanceof SocialInvalidTransitionError || error instanceof SocialValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
