import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { createSocialReport } from '@/src/modules/social/moderation';
import { SocialForbiddenError, SocialNotFoundError, SocialValidationError } from '@/src/modules/social/social-errors';

export async function POST(request: Request) {
  try {
    const actor = await getDemoContextFromRequest();
    const body = (await request.json().catch(() => ({}))) as { targetProfileId?: string; targetMessageId?: string; reason?: string; details?: string };
    const reason = body.reason?.trim();
    if (!reason) {
      return NextResponse.json({ error: 'Reason is required' }, { status: 400 });
    }
    const report = await createSocialReport(prisma, actor, {
      targetProfileId: body.targetProfileId,
      targetMessageId: body.targetMessageId,
      reason,
      details: body.details,
    });
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof SocialNotFoundError) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
