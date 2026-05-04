import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { SocialForbiddenError, SocialNotFoundError, SocialValidationError } from '@/src/modules/social/social-errors';
import { getMessagesForConnection, sendMessage } from '@/src/modules/social/messages';

export async function GET(_request: Request, { params }: { params: Promise<{ connectionId: string }> }) {
  try {
    const actor = await getDemoContextFromRequest();
    const { connectionId } = await params;
    return NextResponse.json(await getMessagesForConnection(prisma, actor, connectionId));
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialNotFoundError) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ connectionId: string }> }) {
  try {
    const actor = await getDemoContextFromRequest();
    const { connectionId } = await params;
    const body = await request.json().catch(() => ({}));
    return NextResponse.json(await sendMessage(prisma, actor, connectionId, { body: String(body.body ?? '') }), { status: 201 });
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof SocialNotFoundError) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
