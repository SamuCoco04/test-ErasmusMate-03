import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { transitionSocialReport } from '@/src/modules/social/moderation';
import { SocialForbiddenError, SocialNotFoundError, SocialValidationError } from '@/src/modules/social/social-errors';

export async function PATCH(request: Request, { params }: { params: Promise<{ reportId: string }> }) {
  try {
    const actor = await getDemoContextFromRequest();
    const body = (await request.json().catch(() => ({}))) as { action?: 'DISMISS' | 'HIDE_PROFILE'; decisionRationale?: string };
    const { reportId } = await params;
    return NextResponse.json(await transitionSocialReport(prisma, actor, reportId, { action: body.action ?? 'DISMISS', decisionRationale: body.decisionRationale }));
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof SocialNotFoundError) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
